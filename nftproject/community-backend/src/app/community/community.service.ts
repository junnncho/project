import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PostStatus, CreateCommunityDto } from '@type';
import { CommunityRepository, UserRepository } from '@repo';
import { InjectRepository } from '@nestjs/typeorm';
import { User, Community } from '@entity';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(CommunityRepository)
    private communityRepository: CommunityRepository,

    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
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

  async createCommunity(
    createCommunityDto: CreateCommunityDto,
    user: User,
  ): Promise<Community> {
    const admin = await this.userRepository.findOneBy({ id: user.id });
    if (!admin.admin) {
      throw new UnauthorizedException('not admin');
    }
    return this.communityRepository.createCommunity(createCommunityDto);
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
