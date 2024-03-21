import { Module } from '@nestjs/common';
import { TypeOrmExModule } from '@custom/index';
import { AuthModule } from '@app/auth/auth.module';
import { CommentRepository, PostRepository } from '@repo';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';

@Module({
  imports: [
    TypeOrmExModule.forCustomRepository([CommentRepository, PostRepository]),
    AuthModule,
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
