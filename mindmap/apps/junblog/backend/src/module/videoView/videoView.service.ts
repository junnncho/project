import * as VideoView from './videoView.model';
import { Id, LoadService } from '@nogql/util-server';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Utils } from '@nogql/util';

@Injectable()
export class VideoViewService extends LoadService<VideoView.Mdl, VideoView.Doc> {
  constructor(
    @InjectModel(VideoView.name)
    private readonly VideoView: VideoView.Mdl
  ) {
    super(VideoViewService.name, VideoView);
  }
  async updateVideoView(views: number, userId: Id): Promise<void> {
    await this.VideoView.updateOne(
      { user: userId, createdAt: Utils.getTodayRange() },
      // { $push: { videos: { $each: videos } } },
      { $inc: { views } },
      { upsert: true }
    );
  }

  async getViews(userId: Id): Promise<VideoView.Doc[]> {
    return await this.VideoView.find({ user: userId }).sort({ createdAt: -1 });
  }
}
