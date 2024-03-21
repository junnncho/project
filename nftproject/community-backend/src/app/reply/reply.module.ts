import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '@custom/index';
import { AuthModule } from '@app/auth/auth.module';
import { CommentRepository, PostRepository, ReplyRepository } from '@repo';
import { ReplyController } from './reply.controller';
import { ReplyService } from './reply.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([
      ReplyRepository,
      CommentRepository,
      PostRepository,
    ]),
    AuthModule,
  ],
  controllers: [ReplyController],
  providers: [ReplyService],
})
export class ReplyModule {}
