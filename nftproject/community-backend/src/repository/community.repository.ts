import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CustomRepository } from '@custom/index';
import { CreateCommunityDto } from '@type';
import { Community } from '@entity';

@CustomRepository(Community)
export class CommunityRepository extends Repository<Community> {
  async createCommunity(
    createCommunityDto: CreateCommunityDto,
  ): Promise<Community> {
    const community = this.create({
      name: createCommunityDto.name,
      description: createCommunityDto.description,
      banner_img: createCommunityDto.bannerimg
        ? { url: createCommunityDto.bannerimg }
        : undefined,
      profile_img: createCommunityDto.profileimg
        ? { url: createCommunityDto.profileimg }
        : undefined,
      contracts: createCommunityDto.account
        ? createCommunityDto.account.map((item) => ({ account: item }))
        : [],
    });
    await this.save(community);
    return community;
  }
}
