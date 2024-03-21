import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PostStatus, CreateCommentDto, GetBoardDto } from '@type';
import { CommentRepository, PostRepository } from '@repo';
import { InjectRepository } from '@nestjs/typeorm';
import { Post, User, Comment, Community } from '@entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository,

    @InjectRepository(PostRepository)
    private postRepository: PostRepository,
  ) {}

  // getAllBoards(): Board[] {
  //     return this.boards;
  // }

  //   async getAllBoards(user: User): Promise<Post[]> {
  //     const query = this.postRepository.createQueryBuilder('post');

  //     query.where('post.userId = :userId', { userId: user.id });

  //     const posts = await query.getMany();

  //     return posts;
  //   }

  //   // createBoard(createBoardDto: CreateBoardDto) {
  //   //     const { title, description } = createBoardDto;

  //   //     const board: Board = {
  //   //         id: uuid(),
  //   //         title,
  //   //         description,
  //   //         status: BoardStatus.PUBLIC
  //   //     }

  //   //     this.boards. wpush(board);
  //   //     return board;
  //   // }

  async getComment(id: number, user: User): Promise<Comment> {
    const comment = await this.commentRepository.getUnitComment(user, id);
    if (!comment) {
      throw new UnauthorizedException('you request not authorized comment');
    }
    return comment;
  }

  async getComments(
    getBoardDto: GetBoardDto,
    user: User,
    id: number = 0,
  ): Promise<Comment[]> {
    return this.commentRepository.getComments(getBoardDto, user, id);
    // const userCommunity: CommunityDict = {};
    // // ex {'1': true,"2" : false}

    // user &&
    //   (
    //     await this.userRepository.getSimpleCommunities(user)
    //   ).userCommunities.map((item) => {
    //     userCommunity[item.community.id] = item.holder;
    //   });
  }

  async createComment(
    createCommentDto: CreateCommentDto,
    user: User,
  ): Promise<Comment> {
    const post = this.postRepository.findOneBy({ id: createCommentDto.postid });
    if (!post) {
      throw new NotFoundException('post not exist');
    }
    return this.commentRepository.createComment(createCommentDto, user);
  }

  //   async getBoardById(id: number): Promise<Post> {
  //     const found = await this.postRepository.findOne(id);

  //     if (!found) {
  //       throw new NotFoundException(`Can't find Board with id ${id}`);
  //     }

  //     return found;
  //   }

  //   // getBoardById(id: string): Board {
  //   //     const found = this.boards.find((board) => board.id === id);

  //   //     if (!found) {
  //   //         throw new NotFoundException(`Can't find Board with id ${id}`);
  //   //     }

  //   //     return found;
  //   // }

  //   async deleteBoard(id: number, user: User): Promise<void> {
  //     const result = await this.postRepository.delete({ id, user });

  //     if (result.affected === 0) {
  //       throw new NotFoundException(`Can't find Board with id ${id}`);
  //     }
  //   }

  //   // deleteBoard(id: string): void {
  //   //     const found = this.getBoardById(id);
  //   //     this.boards = this.boards.filter((board) => board.id !== found.id);
  //   // }

  //   async updateBoardStatus(id: number, status: BoardStatus): Promise<Post> {
  //     const post = await this.getBoardById(id);

  //     post.status = status;
  //     await this.postRepository.save(board);

  //     return board;
  //   }
  //   // updateBoardStatus(id: string, status: BoardStatus): Board {
  //   //     const board = this.getBoardById(id);
  //   //     board.status = status;
  //   //     return board;
  //   // }
}
