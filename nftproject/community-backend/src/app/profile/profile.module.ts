import { AuthModule } from '@app/auth/auth.module';
import { PostService } from '@app/post/post.service';
import { TypeOrmExModule } from '@custom/typeorm-ex.module';
import { Module } from '@nestjs/common';
import { ImgRepository, UserRepository } from '@repo';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([UserRepository, ImgRepository]),
    AuthModule,
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule {}
