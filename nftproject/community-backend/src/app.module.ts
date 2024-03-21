import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from '@app/post/post.module';
import { typeORMConfig } from '../typeorm.config';
import { AuthModule } from '@app/auth/auth.module';
import { CommentModule } from '@app/comment/comment.module';
import { ReplyModule } from '@app/reply/reply.module';
import { CommunityModule } from '@app/community/community.module';
import { ProfileModule } from '@app/profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeORMConfig),
    AuthModule,
    PostModule,
    CommentModule,
    ReplyModule,
    CommunityModule,
    ProfileModule,
  ],
})
export class AppModule {}
