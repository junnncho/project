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
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { S3Client } from '@aws-sdk/client-s3';
import * as multerS3 from 'multer-s3';
import * as config from 'config';
import { v4 as uuidv4 } from 'uuid';
const s3Config: any = config.get('s3');
import * as AWS from 'aws-sdk';
import { User, Post as Board } from '@entity';
import {
  GetBoardDto,
  CreateBoardDto,
  PlaceStatus,
  PostStatus,
  GetPostsAPI,
  SuccessResponse,
  UpdateBoardDto,
} from '@type';
import { PostService } from './post.service';
import { GetUser, OptionalAuthGuard } from '@custom/index';
import { PostConvert } from 'src/function';
import { FilesInterceptor } from '@nestjs/platform-express/';

@Controller('post')
export class PostController {
  private logger = new Logger('Post');
  constructor(private postService: PostService) {}

  // @Get('profile/:id')
  // getProfileContents(
  //   @Param('id') id: number,
  //   @Query('offset') offset: number,
  //   @Query('limit') limit: number,
  //   @Query('type') type: PostStatus,
  // ): Promise<Board[]> {
  //   this.logger.verbose(`User ${user.id} trying to get all boards`);
  //   return this.postService.getBoards(PlaceStatus.PROFILE, user);
  // }

  // @Get('community/:id')
  // getCommunityContents(
  //   @Param('id') id: number,
  //   @GetUser() user: User,
  //   @Query() query:
  // ): Promise<Board[]> {
  //   this.logger.verbose(`User ${user.id} trying to get all boards`);
  //   if (user.id == id)
  //     return this.postService.getBoards(PlaceStatus.COMMU, user);
  // }

  @Get('/')
  @UseGuards(OptionalAuthGuard)
  async getTotalPosts(
    @GetUser() user: User,
    @Query() getBoardDto: GetBoardDto,
  ): Promise<GetPostsAPI[]> {
    console.log('i', getBoardDto);
    this.logger.verbose(`User ${user?.id} trying to get all boards`);
    const result = await this.postService.getPosts(
      getBoardDto,
      user,
      PlaceStatus.TOTAL,
    );
    return result.map((item) => PostConvert(item));
  }

  @Get('/:id')
  @UseGuards(OptionalAuthGuard)
  async getPost(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id,
  ): Promise<GetPostsAPI> {
    this.logger.verbose(`User ${user?.id} trying to get one board`);
    const result = await this.postService.getPost(id, user);
    return PostConvert(result);
  }

  @Delete('/:id')
  @UseGuards(AuthGuard())
  async deletePost(
    @GetUser() user: User,
    @Param('id', ParseIntPipe) id,
  ): Promise<SuccessResponse> {
    await this.postService.deletePost(id, user);
    const response = { status: 'Completed' };
    return response;
  }

  @Get('/profile/:id')
  @UseGuards(OptionalAuthGuard)
  async getProfilePosts(
    @Param('id', ParseIntPipe) id,
    @GetUser() user: User,
    @Query() getBoardDto: GetBoardDto,
  ): Promise<GetPostsAPI[]> {
    console.log('i', getBoardDto);
    this.logger.verbose(`User ${user?.id} trying to get profile boards`);
    const result = await this.postService.getPosts(
      getBoardDto,
      user,
      PlaceStatus.PROFILE,
      id,
    );
    return result.map((item) => PostConvert(item));
  }

  @Get('/community/:id')
  @UseGuards(OptionalAuthGuard)
  async getCommunityPosts(
    @Param('id', ParseIntPipe) id,
    @GetUser() user: User,
    @Query() getBoardDto: GetBoardDto,
  ): Promise<GetPostsAPI[]> {
    console.log('i', getBoardDto);
    this.logger.verbose(`User ${user?.id} trying to get profile boards`);
    const result = await this.postService.getPosts(
      getBoardDto,
      user,
      PlaceStatus.COMMU,
      id,
    );
    return result.map((item) => PostConvert(item));
  }

  //   @Post()
  //   @UsePipes(ValidationPipe)
  //   createBoard(
  //       @Body() createBoardDto: CreateBoardDto
  //   ): Board {
  //       return this.boardsService.createBoard(createBoardDto);
  //   }

  @Post('/')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  @UseInterceptors(FilesInterceptor('files', 3))
  @UsePipes(new ValidationPipe({ transform: true }))
  async createBoard(
    @UploadedFiles() imgs: Express.MulterS3.File[],
    @Body() createBoardDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<GetPostsAPI> {
    this.logger.verbose(`User ${user.id} creating a new board.
        Payload: ${JSON.stringify(createBoardDto)} `);

    createBoardDto['imgs'] = imgs ? imgs.map((item) => item.location) : [];

    console.log('!!test', createBoardDto, typeof createBoardDto.communityId);
    const post = await this.postService.createBoard(createBoardDto, user);

    const result = await this.postService.getPost(post.id, user);

    return PostConvert(result);
  }

  @Patch('/:id')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  @UseInterceptors(FilesInterceptor('files', 3))
  @UsePipes(new ValidationPipe({ transform: true }))
  async updateBoard(
    @UploadedFiles() imgs: Express.MulterS3.File[],
    @Param('id', ParseIntPipe) id,
    @Body() updateBoardDto: UpdateBoardDto,
    @GetUser() user: User,
  ): Promise<SuccessResponse> {
    this.logger.verbose(`User ${user.id} update board ${id}.
        Payload: ${JSON.stringify(updateBoardDto)} `);

    updateBoardDto['imgs'] = imgs ? imgs.map((item) => item.location) : [];

    console.log('!!test', updateBoardDto);
    await this.postService.updateBoard(updateBoardDto, user, id);

    const response = { status: 'Completed' };
    return response;
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
