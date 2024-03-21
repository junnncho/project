import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { GetBoardDto, CreateReplyDto } from '@type';
import { CommentRepository, PostRepository, ReplyRepository } from '@repo';
import { InjectRepository } from '@nestjs/typeorm';
import { User, Reply } from '@entity';

@Injectable()
export class ReplyService {
  constructor(
    @InjectRepository(ReplyRepository)
    private replyRepository: ReplyRepository,

    @InjectRepository(CommentRepository)
    private commentRepository: CommentRepository,
  ) {}

  async getReplies(
    getBoardDto: GetBoardDto,
    user: User,
    id: number = 0,
  ): Promise<Reply[]> {
    return this.replyRepository.getReplies(getBoardDto, user, id);
  }

  async getReply(id: number, user: User): Promise<Reply> {
    const reply = await this.replyRepository.getUnitReply(user, id);
    if (!reply) {
      throw new UnauthorizedException('you request not authorized comment');
    }
    return reply;
  }
  // getAllBoards(): Board[] {
  //     return this.boards;
  // }

  //   async getAllBoards(user: User): Promise<Post[]> {
  //     const query = this.postRepository.createQueryBuilder('post');

  //     query.where('post.userId = :userId', { userId: user.id });

  //     const posts = await query.getMany();

  //     return posts;
  //   }

  async createReply(
    createReplyDto: CreateReplyDto,
    user: User,
  ): Promise<Reply> {
    const comment = await this.commentRepository.findOneBy({
      id: createReplyDto.commentid,
    });
    if (!comment) {
      throw new NotFoundException('comment not exist');
    }
    return this.replyRepository.createReply(createReplyDto, user);
  }

  //   async getBoardById(id: number): Promise<Post> {
  //     const found = await this.postRepository.findOne(id);

  //     if (!found) {
  //       throw new NotFoundException(`Can't find Board with id ${id}`);
  //     }

  //     return found;
  //   }

  //   async deleteBoard(id: number, user: User): Promise<void> {
  //     const result = await this.postRepository.delete({ id, user });

  //     if (result.affected === 0) {
  //       throw new NotFoundException(`Can't find Board with id ${id}`);
  //     }
  //   }

  //   async updateBoardStatus(id: number, status: BoardStatus): Promise<Post> {
  //     const post = await this.getBoardById(id);

  //     post.status = status;
  //     await this.postRepository.save(board);

  //     return board;
  //   }
}
