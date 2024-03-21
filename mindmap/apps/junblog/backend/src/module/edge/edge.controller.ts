import { Controller, Injectable } from '@nestjs/common';
import { EdgeService } from './edge.service';
import { Id } from '@nogql/util-server';
import { IsInt, IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { KeyringService } from '@nogql/module/srv';

export class NewEdgePostDto {
  @IsNotEmpty()
  @IsString()
  youtubeId: string;

  @IsNotEmpty()
  @IsInt()
  goal: number;
}

export class FinishEdgePostDto {
  @IsMongoId({ each: true })
  edges: Id[];

  @IsMongoId({ each: true })
  errors: Id[];

  @IsNotEmpty()
  @IsString()
  secret: string;
}

@Injectable()
@Controller('edge')
export class EdgeController {
  constructor(private readonly keyringService: KeyringService, private readonly edgeService: EdgeService) {}
}
