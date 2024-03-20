import * as Quest from "./quest.model";
import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { QuestResolver } from "./quest.resolver";
import { QuestService } from "./quest.service";

@Global()
@Module({
  imports: [MongooseModule.forFeatureAsync([{ name: Quest.name, useFactory: Quest.middleware() }])],
  providers: [QuestService, QuestResolver],
  exports: [QuestService],
})
export class QuestModule {}
