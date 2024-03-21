import * as VideoView from "./videoView.model";
import { Global, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { VideoViewService } from "./videoView.service";

@Global()
@Module({
  imports: [MongooseModule.forFeatureAsync([{ name: VideoView.name, useFactory: VideoView.middleware() }])],
  providers: [VideoViewService],
  exports: [VideoViewService],
})
export class VideoViewModule {}
