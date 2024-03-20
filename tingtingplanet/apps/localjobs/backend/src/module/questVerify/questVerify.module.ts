import * as QuestVerify from "./questVerify.model";
import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { QuestVerifyResolver } from "./questVerify.resolver";
import { QuestVerifyService } from "./questVerify.service";

@Global()
@Module({
  imports: [MongooseModule.forFeatureAsync([{ name: QuestVerify.name, useFactory: QuestVerify.middleware() }])],
  providers: [QuestVerifyService, QuestVerifyResolver],
  exports: [QuestVerifyService],
})
export class QuestVerifyModule {}
