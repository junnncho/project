import {
  Body,
  Controller,
  Get,
  Injectable,
  Inject,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file.service';
import { Express, Response, Request } from 'express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { EnvironmentOptions } from '../option';
// import { KeyringService } from "@nogql/module/srv";
// import { NodeService } from "./node.service";

// export class NewNodePostDto {
//   @IsString()
//   label: string;

//   @IsNotEmpty()
//   @IsIn(cnst.flowStatuses)
//   type: cnst.FlowStatus;

//   @IsNotEmpty()
//   @IsInt()
//   goal: number;

//   @IsMongoId()
//   parentNode?: Id;

//   @IsArray()
//   @ArrayNotEmpty()
//   @IsInt({ each: true })
//   @ArrayMinSize(2)
//   @ArrayMaxSize(2)
//   position: [number, number];
// }

@Injectable()
@Controller('file')
export class FileController {
  constructor(
    @Inject('ENVIRONMENT_OPTIONS') private readonly options: EnvironmentOptions,
    private readonly fileService: FileService
  ) {}

  // @Post('uploadFile')
  // @UseInterceptors(FileInterceptor('image'))
  // async uploadFile(@UploadedFile() image: Express.Multer.File) {
  //   console.log('uploadFile', image);
  //   // const files = await this.fileService.addFiles([image], "uploadFile");
  //   return {
  //     success: 1,
  //     file: {
  //       url: `${this.options.origin}/file/${image.filename}`,
  //     },
  //   };
  // }

  @Post('uploadFile')
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(@UploadedFile() image: Express.Multer.File) {
    // const files = await this.fileService.addFiles([image], "uploadFile");
    return `${this.options.origin}/file/${image.filename}`;
  }

  @Post('fetchUrl')
  async fetchUrl(@Body() body: any) {
    console.log('fetchUrl', body);
    const result = await this.fileService.saveImageFromUri(body.url);
    // await this.nodeService.addNode(account._id, body);
    // const edge = body.parentNode && await this.edgeService.addEdge(account._id, body.parentNode, node._id);
    return {
      success: 1,
      file: {
        url: `${this.options.origin}/file/${result.filename}`,
        // ... and any additional fields you want to store, such as width, height, color, extension, etc
      },
    };
  }

  @Get(':filename')
  async getImage(@Param('filename') filename: string, @Res() res: Response) {
    res.sendFile(filename, { root: 'data' });
  }
  // @Post("new")
  // @UseGuards(Allow.User)
  // async newNode(@RequiredAuth() account: Account, @Body() body: NewNodePostDto) {
  //   const node = await this.nodeService.addNode(account._id, body);
  //   const edge = body.parentNode && await this.edgeService.addEdge(account._id, body.parentNode, node._id);
  //   return node;
  // }

  // @Get("get")
  // @UseGuards(Allow.User)
  // async getNodes(
  //   @RequiredAuth()
  //   account: Account
  // ) {
  //   return await this.nodeService.getNodes(account._id);
  // }
}
