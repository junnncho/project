import * as Comment from "./comment.model";
import { CommentResolver } from "./comment.resolver";
import { CommentService } from "./comment.service";
import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Global()
@Module({
  imports: [MongooseModule.forFeatureAsync([{ name: Comment.name, useFactory: Comment.middleware() }])],
  providers: [CommentService, CommentResolver],
  exports: [CommentService],
})
export class CommentModule {}
