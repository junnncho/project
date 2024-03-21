import { Module } from '@nestjs/common';
import { TypeOrmExModule, multerOptionsFactory } from '@custom/index';
import { AuthModule } from '@app/auth/auth.module';
import {
  ImgRepository,
  PostRepository,
  PostStateRepository,
  UserRepository,
} from '@repo';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: multerOptionsFactory,
    }),
    TypeOrmExModule.forCustomRepository([
      PostRepository,
      PostStateRepository,
      UserRepository,
      ImgRepository,
    ]),
    AuthModule,
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
