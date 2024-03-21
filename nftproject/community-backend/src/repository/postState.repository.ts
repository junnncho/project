import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostState } from '@entity';
import { CustomRepository } from '@custom/index';
import { PostStatus } from '@type';

@CustomRepository(PostState)
export class PostStateRepository extends Repository<PostState> {
  async checkId(type: PostStatus): Promise<PostState> {
    const poststate = await this.findOneBy({ page: type });
    return poststate;
  }
}
