import { ActionLogSummary } from "../actionLog/actionLog.gql";
import { BoardSummary } from "../board/board.gql";
import { ChatRoomSummary } from "../chatRoom/chatRoom.gql";
import { CommentSummary } from "../comment/comment.gql";
import { EmojiSummary } from "../emoji/emoji.gql";
import { GroupCallSummary } from "../groupCall/groupCall.gql";
import { ReportSummary } from "../report/report.gql";
import { ServiceDeskSummary } from "../serviceDesk/serviceDesk.gql";
import { StorySummary } from "../story/story.gql";

export const summaries = [
  // ChatBoardSummary,
  GroupCallSummary,
  EmojiSummary,
  ServiceDeskSummary,
  ChatRoomSummary,
  ActionLogSummary,
  BoardSummary,
  CommentSummary,
  ReportSummary,
  StorySummary,
] as const;
export interface Summary
  extends ActionLogSummary,
    BoardSummary,
    CommentSummary,
    ReportSummary,
    StorySummary,
    ChatRoomSummary,
    ServiceDeskSummary,
    EmojiSummary,
    GroupCallSummary {
  // ChatBoardSummary
}
