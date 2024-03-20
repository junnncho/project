import * as Emoji from "./emoji.model";
import * as gql from "../gql";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { LoadService } from "@shared/util-server";

@Injectable()
export class EmojiService extends LoadService<Emoji.Mdl, Emoji.Doc, Emoji.Input> {
  constructor(@InjectModel(Emoji.name) private readonly Emoji: Emoji.Mdl) {
    super(EmojiService.name, Emoji);
  }
  async summarize(): Promise<gql.EmojiSummary> {
    return {
      totalEmoji: await this.Emoji.countDocuments({
        status: { $ne: "inactive" },
      }),
    };
  }
}
