import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CustomRepository } from '@custom/index';
import { Img } from '@entity';

@CustomRepository(Img)
export class ImgRepository extends Repository<Img> {}
