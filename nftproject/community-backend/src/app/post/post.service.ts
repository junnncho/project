import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  PostStatus,
  CreateBoardDto,
  GetBoardDto,
  PlaceStatus,
  CommunityDict,
  UNAUTHORIZED,
  EditedPost,
  UpdateBoardDto,
} from '@type';
import {
  ImgRepository,
  PostRepository,
  PostStateRepository,
  UserRepository,
} from '@repo';
import { InjectRepository } from '@nestjs/typeorm';
import { Post as Board, User, PostState } from '@entity';

@Injectable()
export class PostService {
  constructor(
    private postRepository: PostRepository,
    private postStateRepository: PostStateRepository,
    private userRepository: UserRepository,
    private imgRepository: ImgRepository,
  ) {}

  async getPost(id: number, user: User): Promise<Board> {
    let post: Board = null;
    try {
      post = await this.postRepository.getUnitPost(id, user);
      if (post?.sharePost) {
        const sharedPost = await this.postRepository.getUnitPost(
          post.sharePost.id,
          user,
        );
        (post as EditedPost).sharePost = sharedPost ? sharedPost : UNAUTHORIZED;
      }
    } catch (e) {
      throw new NotFoundException('post not exist');
    }
    if (!post) {
      throw new UnauthorizedException('you request not authorized post');
    }
    return post;
  }

  async deletePost(id: number, user: User): Promise<void> {
    const post = await this.postRepository.findOne({
      where: { id: id },
      relations: { imgs: true },
      // relations: { user: true },
    });
    console.log(post);
    if (post.userid != user.id) {
      throw new UnauthorizedException('you request not authorized post');
    }
    await this.postRepository.delete({ id: id });
  }

  async getPosts(
    getBoardDto: GetBoardDto,
    user: User,
    type: PlaceStatus,
    id: number = 0,
  ): Promise<Board[]> {
    // const userCommunity: CommunityDict = {};
    // // ex {'1': true,"2" : false}

    // user &&
    //   (
    //     await this.userRepository.getSimpleCommunities(user)
    //   ).userCommunities.map((item) => {
    //     userCommunity[item.community.id] = item.holder;
    //   });
    console.log('type', type);
    let posts = null;
    switch (type) {
      case PlaceStatus.TOTAL:
        posts = await this.postRepository.getTotalPosts(getBoardDto, user);
        break;
      case PlaceStatus.COMMU:
        posts = await this.postRepository.getCommunityPosts(
          getBoardDto,
          user,
          id,
        );
        break;
      case PlaceStatus.PROFILE:
        posts = await this.postRepository.getProfilePosts(
          getBoardDto,
          user,
          id,
        );
        break;
    }

    const resultArr = [];
    for (const post of posts) {
      if (post?.sharePost) {
        const sharedPost = await this.postRepository.getUnitPost(
          post.sharePost.id,
          user,
        );
        post.sharePost = sharedPost;
      }
      resultArr.push(post);
    }
    return resultArr;
  }

  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    const state = await this.postStateRepository.checkId(createBoardDto.type);
    if (!state) {
      throw new NotFoundException('poststate not exist');
    }
    return this.postRepository.createBoard(createBoardDto, user, state);
  }

  async updateBoard(
    updateBoardDto: UpdateBoardDto,
    user: User,
    id: number,
  ): Promise<void> {
    const post = await this.postRepository.findOne({
      where: { id: id },
      relations: { imgs: true },
      // relations: { user: true },
    });
    console.log(post);
    if (post.userid != user.id) {
      throw new UnauthorizedException('you request not authorized post');
    }
    const result_imgs = [];
    post.imgs.forEach((img) => {
      if (updateBoardDto.filesIndex.includes(img.id)) {
        result_imgs.push(img);
      } else {
        this.imgRepository.delete({ id: img.id });
      }
    });
    await this.postRepository.updateBoard(updateBoardDto, post, result_imgs);
  }
}
