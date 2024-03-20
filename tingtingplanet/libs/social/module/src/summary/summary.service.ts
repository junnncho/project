import * as Summary from "./summary.model";
import * as gql from "../gql";
import { ActionLogService } from "../actionLog/actionLog.service";
import { BoardService } from "../board/board.service";
import { ChatRoomService } from "../chatRoom/chatRoom.service";
import { CommentService } from "../comment/comment.service";
import { EmojiService } from "../emoji/emoji.service";
import { GetObject, Utils } from "@shared/util";
import { GroupCallService } from "../groupCall/groupCall.service";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { LoadService } from "@shared/util-server";
import { ReportService } from "../report/report.service";
import { ServiceDeskService } from "../serviceDesk/serviceDesk.service";
import { StoryService } from "../story/story.service";
import { UserService } from "../user/user.service";
import { srv as shared } from "@shared/module";
@Injectable()
export class SummaryService<
    Mdl extends Summary.Mdl = Summary.Mdl,
    Doc extends Summary.Doc = Summary.Doc,
    Input extends Summary.Input = Summary.Input
  >
  extends LoadService<Mdl, Doc, Input>
  implements GetObject<shared.SummaryService<Mdl, Doc, Input>>
{
  constructor(
    @InjectModel(Summary.name) Summary: Mdl,
    // private readonly chatBoardService: ChatBoardService,
    private readonly groupCallService: GroupCallService,
    // ================= Library Import Zone ================= //
    private readonly adminService: shared.AdminService,
    private readonly currencyService: shared.CurrencyService,
    private readonly fileService: shared.FileService,
    private readonly keyringService: shared.KeyringService,
    private readonly productService: shared.ProductService,
    private readonly thingService: shared.ThingService,
    private readonly notificationService: shared.NotificationService,
    // ================= Library Import Zone ================= //
    private readonly actionLogService: ActionLogService,
    private readonly boardService: BoardService,
    private readonly commentService: CommentService,
    private readonly storyService: StoryService,
    private readonly userService: UserService,
    private readonly reportService: ReportService,
    private readonly chatRoomService: ChatRoomService,
    private readonly serviceDeskService: ServiceDeskService,
    private readonly emojiService: EmojiService
  ) {
    super(SummaryService.name, Summary);
  }
  async getSocialSummary(): Promise<gql.SocialSummary> {
    return {
      ...(await this.actionLogService.summarize()),
      // ...(await this.chatBoardService.summarize()),
      ...(await { totalGroupCall: 3 }),
      ...(await this.emojiService.summarize()),
      ...(await this.serviceDeskService.summarize()),
      ...(await this.chatRoomService.summarize()),
      ...(await this.reportService.summarize()),
      ...(await this.boardService.summarize()),
      ...(await this.commentService.summarize()),
      ...(await this.storyService.summarize()),
      ...(await this.userService.summarizeSocial()),
    };
  }
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface SummaryService<
  Mdl extends Summary.Mdl = Summary.Mdl,
  Doc extends Summary.Doc = Summary.Doc,
  Input extends Summary.Input = Summary.Input
> extends GetObject<shared.SummaryService<Mdl, Doc, Input>> {}
Utils.applyMixins(SummaryService, [shared.SummaryService]);
