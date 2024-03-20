import * as Emoji from "./emoji.model";
import { EmojiResolver } from "./emoji.resolver";
import { EmojiService } from "./emoji.service";
import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

@Global()
@Module({
  imports: [MongooseModule.forFeatureAsync([{ name: Emoji.name, useFactory: Emoji.middleware() }])],
  providers: [EmojiService, EmojiResolver],
  exports: [EmojiService],
})
export class EmojiModule {}
