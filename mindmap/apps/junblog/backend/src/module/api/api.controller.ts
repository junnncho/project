import {
  Body,
  Controller,
  Get,
  Injectable,
  Param,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../srv';
import { FlowService } from '../flow/flow.service';
// import { EdgeService } from '../edge/edge.service';
import { Account, Allow, Id, RequiredAuth } from '@nogql/util-server';
import { ArrayNotEmpty, IsArray, IsJSON, IsObject } from 'class-validator';
import { FileService } from '@nogql/module/srv';
import { FileController } from '@nogql/module/file/file.controller';
import { FileInterceptor } from '@nestjs/platform-express';

export class UpdatePostDto {
  @ArrayNotEmpty()
  @IsArray()
  nodes: any;

  // @IsArray()
  // @ArrayNotEmpty()
  // @IsJSON({ each: true })
  @IsArray()
  edges: any;

  @IsObject()
  color: any;
}

@Injectable()
@Controller('api')
export class ApiController {
  constructor(
    private readonly userService: UserService,
    private readonly flowService: FlowService,
    private readonly fileService: FileService // private readonly fileController: FileController
  ) {}

  @Post('update')
  @UseGuards(Allow.User)
  async newFlow(@RequiredAuth() account: Account, @Body() body: UpdatePostDto) {
    // console.log("newNode", body);
    await this.flowService.updateFlow(account._id, body?.nodes, body?.edges);
    await this.userService.updateColor(account._id, body?.color);
  }

  @Get('load')
  @UseGuards(Allow.User)
  async load(@RequiredAuth() account: Account) {
    const flow = await this.flowService.getFlow(account._id);
    const user = await this.userService.getUserById(account._id);
    const url = user?.image && (await this.fileService.resolveUrl(user.image));
    const flowUser = { id: user.id, nickname: user.nickname, image: url, color: user.color };
    if (!flow) return { nodes: [], edges: [], user: flowUser };
    return { nodes: flow.nodes, edges: flow.edges, user: flowUser };
  }

  @Get('load/:id')
  @UseGuards(Allow.Public)
  async loadPublic(@Param('id') id: string) {
    const flow = await this.flowService.getFlow(new Id(id));
    const user = await this.userService.getUserById(new Id(id));
    const url = user?.image && (await this.fileService.resolveUrl(user.image));
    const flowUser = { id: user.id, nickname: user.nickname, image: url, color: user.color };
    if (!flow) return { nodes: [], edges: [], user: flowUser };
    return { nodes: flow.nodes.filter((node) => !node.data.private), edges: flow.edges, user: flowUser };
  }

  @Post('test')
  // @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Req() req) {
    // console.log(req);
    await this.uploadFile(req);
    // return await this.fileService.uploadFile(file);
  }

  @Get('test')
  @UseInterceptors(FileInterceptor('file'))
  async test(@UploadedFile() file: Express.Multer.File) {
    console.log(file.filename);
    // return await this.fileService.uploadFile(file);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFiles(@UploadedFile() file: Express.Multer.File) {
    console.log('file', file);
    // return await this.fileService.uploadFile(file);
  }
}
