import {
  ConflictException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CustomRepository } from '@custom/index';
import { Img, User } from '@entity';
import { updateProfileDto } from 'src/type';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(account: string): Promise<void> {
    //account 안의 데이터 조회해오는 함수넣기(caver?)
    const user = this.create({ account });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        return;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async GetProfileById(id: number): Promise<User> {
    const found = await this.findOne({
      where: { id: id },
      relations: { profile_img: true, banner_img: true, nfts: true },
      select: {
        id: true,
        profile_img: { url: true },
        nickname: true,
        banner_img: { url: true },
        nfts: true,
        account: true,
        description: true,
      },
    });

    if (!found) {
      throw new NotFoundException(`Cant find user with id ${id}`);
    }

    return found;
  }

  async GetFirstInformation(id: number): Promise<User> {
    const found = await this.findOne({
      where: { id: id },
      relations: {
        profile_img: true,
        userCommunities: { community: { profile_img: true } },
        nfts: true,
      },
      select: {
        id: true,

        profile_img: { url: true },
        nickname: true,
        nfts: true,
        account: true,
      },
    });
    if (!found) {
      throw new NotFoundException(`Cant find me with id ${id}`);
    }

    return found;
  }

  async getSimpleCommunities(user: User): Promise<User> {
    return this.findOne({
      where: { id: user.id },

      select: {
        id: true,
        userCommunities: {
          holder: true,
          community: {
            id: true,
          },
        },
      },
    });
  }
  async updateProfile(user: User, updateData: updateProfileDto): Promise<void> {
    console.log('update', updateData);
    if (updateData.profileImg) {
      if (user.profile_img) {
        //기존 이미지 삭제
        user.profile_img.url = updateData.profileImg;
      } else {
        const img = new Img();
        img.url = updateData.profileImg;
        user.profile_img = img;
      }
    }
    if (updateData.bannerImg) {
      if (user.banner_img) {
        //기존 이미지 삭제
        user.banner_img.url = updateData.bannerImg;
      } else {
        const img = new Img();
        img.url = updateData.bannerImg;
        user.banner_img = img;
      }
    }
    updateData.name && (user.nickname = updateData.name);
    updateData.description && (user.description = updateData.description);
    await this.save(user);
  }
}
