import * as ChatRoom from "./chatRoom.model";
import { ChatRoomResolver } from "./chatRoom.resolver";
import { ChatRoomService } from "./chatRoom.service";
import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Global()
@Module({
  imports: [MongooseModule.forFeatureAsync([{ name: ChatRoom.name, useFactory: ChatRoom.middleware() }])],
  providers: [ChatRoomService, ChatRoomResolver],
  exports: [ChatRoomService],
})
export class ChatRoomModule {}
