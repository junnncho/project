import {
  Body,
  Controller,
  Get,
  Inject,
  Injectable,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { KeyringService } from '@nogql/module/srv';
import { Transform } from 'class-transformer';
import { DrawService } from './draw.service';
import { Account, Allow, Id, RequiredAuth } from '@nogql/util-server';
import { ArrayNotEmpty, IsArray, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';
import { FileInterceptor } from '@nestjs/platform-express';
import { EnvironmentOptions } from '../option';

export class UpdateDrawDto {
  @ArrayNotEmpty()
  @IsArray()
  elements: any;

  @IsString()
  @MinLength(1)
  node: string;

  @IsOptional()
  @IsString()
  parentNode?: string;

  @IsBoolean()
  hide: boolean;
}

export class DrawFileDto {
  @IsString()
  mimeType: string;

  @IsString()
  id: string;

  @IsString()
  node: string;

  @Transform(({ value }) => parseInt(value))
  created: number;

  @Transform(({ value }) => parseInt(value))
  @IsOptional()
  lastRetrieved?: number;
}

@Injectable()
@Controller('draw')
export class DrawController {
  constructor(
    private readonly keyringService: KeyringService,
    private readonly drawService: DrawService,
    @Inject('ENVIRONMENT_OPTIONS') private readonly options: EnvironmentOptions
  ) {}

  @Post('update')
  @UseGuards(Allow.User)
  async newNode(@RequiredAuth() account: Account, @Body() body: UpdateDrawDto) {
    await this.drawService.updateDraw(account._id, body);
  }

  @Post('file')
  @UseGuards(Allow.User)
  @UseInterceptors(FileInterceptor('image'))
  async uploadFile(
    @UploadedFile() image: Express.Multer.File,
    @RequiredAuth() account: Account,
    @Body() body: DrawFileDto
  ) {
    const { node, ...newBody } = body;
    const dataURL = `${this.options.origin}/file/${image.filename}`;
    await this.drawService.addFile(account._id, node, { dataURL, ...newBody });
  }

  @Get(':node')
  @UseGuards(Allow.User)
  async getDraw(
    @RequiredAuth()
    account: Account,
    @Param('node') nodeId: string
  ) {
    const draw = await this.drawService.getDraw(account._id, nodeId);
    console.log(draw, 'DRAW FIN');
    return draw;
  }

  @Get('public/:node')
  @UseGuards(Allow.Public)
  async getPublicDraw(@Param('node') nodeId: string, @Query('id') id: string) {
    const draw = await this.drawService.getDraw(new Id(id), nodeId);
    if (draw.hide) throw new Error('noDraw');
    return draw;
  }
}
