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
import { User, Community } from '@entity';
import { CreateCommunityDto } from '@type';
import { CommunityService } from './community.service';
import { GetUser } from '@custom/index';

@Controller('community')
export class CommunityController {
  private logger = new Logger('Community');
  constructor(private communityService: CommunityService) {}

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

  // @Get("/:id")
  // async getCommunity(@Param('id',ParseIntPipe) id):Promise<>{

  // }

  @Post()
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  createCommunity(
    @Body() createCommunityDto: CreateCommunityDto,
    @GetUser() user: User,
  ): Promise<Community> {
    this.logger.verbose(`User ${user.id} creating a new comment.
        Payload: ${JSON.stringify(createCommunityDto)} `);
    return this.communityService.createCommunity(createCommunityDto, user);
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
