import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Raffle } from '@entity';
import { CustomRepository } from '@custom/index';

@CustomRepository(Raffle)
export class RaffleRepository extends Repository<Raffle> {}
