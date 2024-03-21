import { PostState, User, Post, Img } from '@entity';
import { Repository } from 'typeorm';
import {
  PostStatus,
  CreateBoardDto,
  GetBoardDto,
  PlaceStatus,
  CommunityDict,
  AccessStatus,
  UpdateBoardDto,
} from '@type';
import { CustomRepository } from '@custom/index';

@CustomRepository(Post)
export class PostRepository extends Repository<Post> {
  async createBoard(
    createBoardDto: CreateBoardDto,
    user: User,
    state: PostState,
  ): Promise<Post> {
    const post = await this.create({
      postState: { id: state.id },
      content: createBoardDto.content,
      likes: 0,
      condition: createBoardDto.condition,
      user: { id: user.id },
      community: { id: createBoardDto.communityId },
      imgs: createBoardDto.imgs
        ? createBoardDto.imgs.map((item) => ({ url: item }))
        : [],
      ...(createBoardDto?.shareId && {
        sharePost: { id: createBoardDto.shareId },
      }),
    });
    await this.save(post);
    return post;
  }

  async getUnitPost(id: number, user: User): Promise<Post> {
    return this.findOne({
      where: [
        { condition: AccessStatus.PUBLIC, id: id },
        ...(user
          ? [
              {
                id: id,
                condition: AccessStatus.PRIVATE,
                community: { userCommunities: { user: { id: user.id } } },
              },
              {
                id: id,
                condition: AccessStatus.HOLDER,
                community: {
                  userCommunities: { user: { id: user.id }, holder: true },
                },
              },
            ]
          : []),
      ],
      relations: {
        community: { profile_img: true },
        user: { profile_img: true },
        imgs: true,
        comments: true,
        sharePost: true,
        postState: true,
      },
      select: {
        createdAt: true,
        id: true,
        community: { id: true, name: true, profile_img: { url: true } },
        user: { id: true, profile_img: { url: true }, nickname: true },
        content: true,
        likes: true,
        comments: true,
        condition: true,
        sharePost: { id: true },
        postState: { page: true },
      },
    });
  }

  async getTotalPosts(getBoardDto: GetBoardDto, user: User): Promise<Post[]> {
    return this.find({
      where: [
        { condition: AccessStatus.PUBLIC },
        ...(user
          ? [
              {
                condition: AccessStatus.PRIVATE,
                community: { userCommunities: { user: { id: user.id } } },
              },
              {
                condition: AccessStatus.HOLDER,
                community: {
                  userCommunities: { user: { id: user.id }, holder: true },
                },
              },
            ]
          : []),
      ],
      relations: {
        community: { profile_img: true },
        user: { profile_img: true },
        imgs: true,
        comments: true,
        sharePost: true,
        postState: true,
      },
      select: {
        createdAt: true,
        id: true,
        community: { id: true, name: true, profile_img: { url: true } },
        user: { id: true, profile_img: { url: true }, nickname: true },
        content: true,

        likes: true,
        comments: true,
        condition: true,
        sharePost: { id: true },
        postState: { page: true },
      },
      order: {
        createdAt: 'DESC',
      },
      ...(getBoardDto.limit && { take: getBoardDto.limit }),
      ...(getBoardDto.offset && { skip: getBoardDto.offset }),
    });
  }

  async getCommunityPosts(
    getBoardDto: GetBoardDto,
    user: User,
    id: number,
  ): Promise<Post[]> {
    return this.find({
      where: [
        { condition: AccessStatus.PUBLIC, community: { id: id } },
        ...(user
          ? [
              {
                condition: AccessStatus.PRIVATE,
                community: {
                  id: id,
                  userCommunities: { user: { id: user.id } },
                },
              },
              {
                condition: AccessStatus.HOLDER,
                community: {
                  id: id,
                  userCommunities: { user: { id: user.id }, holder: true },
                },
              },
            ]
          : []),
      ],
      relations: {
        community: { profile_img: true },
        user: { profile_img: true },
        imgs: true,
        sharePost: true,
        postState: true,
      },
      select: {
        createdAt: true,
        id: true,
        community: { id: true, name: true, profile_img: { url: true } },
        user: { id: true, profile_img: { url: true }, nickname: true },
        content: true,

        likes: true,
        comments: true,
        condition: true,
        sharePost: { id: true },
        postState: { page: true },
      },
      order: {
        createdAt: 'DESC',
      },
      ...(getBoardDto.limit && { take: getBoardDto.limit }),
      ...(getBoardDto.offset && { skip: getBoardDto.offset }),
    });
  }

  async getProfilePosts(
    getBoardDto: GetBoardDto,
    user: User,
    id: number,
  ): Promise<Post[]> {
    return this.find({
      where: [
        { condition: AccessStatus.PUBLIC, user: { id: id } },

        ...(user
          ? [
              {
                condition: AccessStatus.PRIVATE,
                user: { id: id },
                community: { userCommunities: { user: { id: user.id } } },
              },
              {
                condition: AccessStatus.HOLDER,
                user: { id: id },
                community: {
                  userCommunities: { user: { id: user.id }, holder: true },
                },
              },
            ]
          : []),
      ],
      relations: {
        community: { profile_img: true },
        user: { profile_img: true },
        imgs: true,
        postState: true,
      },
      select: {
        createdAt: true,
        id: true,
        community: { id: true, name: true, profile_img: { url: true } },
        user: { id: true, profile_img: { url: true }, nickname: true },
        content: true,

        likes: true,
        comments: true,
        condition: true,
        postState: { page: true },
      },
      order: {
        createdAt: 'DESC',
      },
      ...(getBoardDto.limit && { take: getBoardDto.limit }),
      ...(getBoardDto.offset && { skip: getBoardDto.offset }),
    });
  }

  async updateBoard(
    updateBoardDto: UpdateBoardDto,
    post: Post,
    result_imgs: Img[],
  ): Promise<void> {
    updateBoardDto.imgs.forEach((url) => {
      const img = new Img();
      img.url = url;
      result_imgs.push(img);
    });
    post.imgs = result_imgs;
    updateBoardDto.content &&
      post.content != updateBoardDto.content &&
      (post.content = updateBoardDto.content);
    updateBoardDto.condition &&
      post.condition != updateBoardDto.condition &&
      (post.condition = updateBoardDto.condition);
    await this.save(post);
  }
}
