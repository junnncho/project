import { Body, Controller, Get, Injectable, Param, Post, Query, UseGuards } from '@nestjs/common';
import { KeyringService } from '@nogql/module/srv';
import { TextService } from './text.service';
import { Account, Allow, Id, RequiredAuth } from '@nogql/util-server';
import { ArrayNotEmpty, IsArray, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

// export class NewTextPostDto {
//   @IsString()
//   label: string;

//   @IsNotEmpty()
//   @IsIn(cnst.flowStatuses)
//   type: cnst.FlowStatus;

//   @IsNotEmpty()
//   @IsInt()
//   goal: number;

//   @IsMongoId()
//   parentText?: Id;

//   @IsArray()
//   @ArrayNotEmpty()
//   @IsInt({ each: true })
//   @ArrayMinSize(2)
//   @ArrayMaxSize(2)
//   position: [number, number];
// }

export class UpdateTextDto {
  @ArrayNotEmpty()
  @IsArray()
  blocks: any;

  @IsInt()
  time: number;

  @IsString()
  @MinLength(1)
  node: string;

  @IsOptional()
  @IsString()
  parentNode?: string;

  @IsBoolean()
  hide: boolean;
}

@Injectable()
@Controller('text')
export class TextController {
  constructor(private readonly keyringService: KeyringService, private readonly textService: TextService) {}

  @Post('update')
  @UseGuards(Allow.User)
  async newNode(@RequiredAuth() account: Account, @Body() body: UpdateTextDto) {
    await this.textService.updateText(account._id, body);
  }

  @Get(':node')
  @UseGuards(Allow.User)
  async getText(
    @RequiredAuth()
    account: Account,
    @Param('node') nodeId: string
  ) {
    const text = await this.textService.getText(account._id, nodeId);
    return { blocks: text.blocks, time: text.lastUpdate };
  }
  @Get('public/:node')
  @UseGuards(Allow.Public)
  async getPublicText(@Param('node') nodeId: string, @Query('id') id: string) {
    const text = await this.textService.getText(new Id(id), nodeId);
    if (text.hide) throw new Error('noText');
    return { blocks: text.blocks, time: text.lastUpdate };
  }
}
