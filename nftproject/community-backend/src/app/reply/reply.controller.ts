import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User, Reply } from '@entity';
import { CreateReplyDto, GetBoardDto, GetRepliesAPI } from '@type';
import { ReplyService } from './reply.service';
import { GetUser, OptionalAuthGuard } from '@custom/index';
import { ReplyConvert } from 'src/function';

@Controller('reply')
export class ReplyController {
  private logger = new Logger('Reply');
  constructor(private replyService: ReplyService) {}

  @Get('/:id')
  @UseGuards(OptionalAuthGuard)
  async getReplies(
    @Param('id', ParseIntPipe) id,
    @GetUser() user: User,
    @Query() getBoardDto: GetBoardDto,
  ): Promise<GetRepliesAPI[]> {
    console.log('i', getBoardDto);
    this.logger.verbose(`User ${user?.id} trying to get ${id}post comments`);
    const result = await this.replyService.getReplies(getBoardDto, user, id);
    return result.map((item) => ReplyConvert(item));
  }
  //   @Get('profile/:id')
  //   getProfileContents(
  //     @Param('id') id: number,
  //     @GetUser() user: User,
  //     @Query('offset') offset: number,
  //     @Query('limit') limit: number,
  //     @Query('type') type: PostStatus,
  //   ): Promise<Board[]> {
  //     this.logger.verbose(`User ${user.id} trying to get all boards`);
  //     return this.postService.getBoards(PlaceStatus.PROFILE, user);
  //   }

  //   @Get('community/:id')
  //   getCommunityContents(
  //     @Param('id') id: number,
  //     @GetUser() user: User,
  //     @Query() query:
  //   ): Promise<Board[]> {
  //     this.logger.verbose(`User ${user.id} trying to get all boards`);
  //     if (user.id == id)
  //       return this.postService.getBoards(PlaceStatus.COMMU, user);
  //   }

  // @Get('/')
  // getAllBoard(): Board[] {
  //     return this.boardsService.getAllBoards();
  // }

  // @Get()
  // getAllBoard(@GetUser() user: User): Promise<Board[]> {
  //   this.logger.verbose(`User ${user.username} trying to get all boards`);
  //   return this.PostService.getAllBoards(user);
  // }

  //   @Post()
  //   @UsePipes(ValidationPipe)
  //   createBoard(
  //       @Body() createBoardDto: CreateBoardDto
  //   ): Board {
  //       return this.boardsService.createBoard(createBoardDto);
  //   }

  @Post()
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  async postReply(
    @Body() createReplyDto: CreateReplyDto,
    @GetUser() user: User,
  ): Promise<GetRepliesAPI> {
    this.logger.verbose(`User ${user.id} creating a new reply.
        Payload: ${JSON.stringify(createReplyDto)} `);
    const reply = await this.replyService.createReply(createReplyDto, user);
    const result = await this.replyService.getReply(reply.id, user);
    return ReplyConvert(result);
  }

  // @Get('/:id')
  // getBoardById(@Param('id') id: number): Promise<Board> {
  //   return this.boardsService.getBoardById(id);
  // }

  // @Get('/:id')
  // getBoardById(@Param('id') id: string): Board {
  //     return this.boardsService.getBoardById(id)
  // }

  // @Delete('/:id')
  // deleteBoard(
  //   @Param('id', ParseIntPipe) id,
  //   @GetUser() user: User,
  // ): Promise<void> {
  //   return this.boardsService.deleteBoard(id, user);
  // }

  // @Delete('/:id')
  // deleteBoard(@Param('id') id: string): void {
  //     this.boardsService.deleteBoard(id);
  // }

  // @Patch('/:id/status')
  // updateBoardStatus(
  //   @Param('id', ParseIntPipe) id: number,
  //   @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  // ) {
  //   return this.boardsService.updateBoardStatus(id, status);
  // }

  // @Patch('/:id/status')
  // updateBoardStatus(
  //     @Param('id') id: string,
  //     @Body('status', BoardStatusValidationPipe) status: BoardStatus
  // ) {
  //     return this.boardsService.updateBoardStatus(id, status);
  // }
}
