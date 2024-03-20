import * as Board from "./board.model";
import { BoardResolver } from "./board.resolver";
import { BoardService } from "./board.service";
import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Global()
@Module({
  imports: [MongooseModule.forFeatureAsync([{ name: Board.name, useFactory: Board.middleware() }])],
  providers: [BoardService, BoardResolver],
  exports: [BoardService],
})
export class BoardModule {}
