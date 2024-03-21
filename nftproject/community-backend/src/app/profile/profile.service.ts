import { Common } from '@custom/common.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Img, User } from '@entity';
import { ImgRepository, UserRepository } from '@repo';
import { updateProfileDto } from 'src/type';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,

    @InjectRepository(ImgRepository)
    private imgRepository: ImgRepository,
  ) {}

  async getProfile(id: number): Promise<User> {
    return this.userRepository.GetProfileById(id);
  }

  async updateProfile(updateData: updateProfileDto, id: number): Promise<void> {
    const user = await this.userRepository.findOne({
      where: { id: id },
      relations: { profile_img: true, banner_img: true },
    });

    await this.userRepository.updateProfile(user, updateData);
  }
}
