import { ActionLogLocale, actionLogLocale } from "./actionLog/actionLog.locale";
import { BoardLocale, boardLocale } from "./board/board.locale";
import { ChatRoomLocale, chatRoomLocale } from "./chatRoom/chatRoom.locale";
import { CommentLocale, commentLocale } from "./comment/comment.locale";
import { EmojiLocale, emojiLocale } from "./emoji/emoji.locale";
import { GroupCallLocale, groupCallLocale } from "./groupCall/groupCall.locale";
import { MainLocale, mainLocale } from "./main.locale";
import { ReportLocale, reportLocale } from "./report/report.locale";
import { ServiceDeskLocale, serviceDeskLocale } from "./serviceDesk/serviceDesk.locale";
import { StoryLocale, storyLocale } from "./story/story.locale";
import { SummaryLocale, summaryLocale } from "./summary/summary.locale";
import { getPageProto, usePageProto } from "@shared/util-client";

export const locale = {
  main: mainLocale,
  actionLog: actionLogLocale,
  board: boardLocale,
  chatRoom: chatRoomLocale,
  comment: commentLocale,
  emoji: emojiLocale,
  groupCall: groupCallLocale,
  report: reportLocale,
  serviceDesk: serviceDeskLocale,
  story: storyLocale,
  summary: summaryLocale,
} as const;

export type Locale =
  | MainLocale
  | ActionLogLocale
  | BoardLocale
  | ChatRoomLocale
  | CommentLocale
  | EmojiLocale
  | GroupCallLocale
  | ReportLocale
  | ServiceDeskLocale
  | StoryLocale
  | SummaryLocale;

export const usePage = () => usePageProto<Locale>();
export const getPage = async () => await getPageProto<Locale>();
