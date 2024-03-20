import * as Story from "./story.model";
import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { StoryResolver } from "./story.resolver";
import { StoryService } from "./story.service";

@Global()
@Module({
  imports: [MongooseModule.forFeatureAsync([{ name: Story.name, useFactory: Story.middleware() }])],
  providers: [StoryService, StoryResolver],
  exports: [StoryService],
})
export class StoryModule {}
