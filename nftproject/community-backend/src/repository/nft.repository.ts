import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CustomRepository } from '@custom/index';
import { NFT } from '@entity';

@CustomRepository(NFT)
export class NFTRepository extends Repository<NFT> {}
