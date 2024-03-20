"use client";
import { ActionLogState, addActionLogToStore } from "./actionLog/actionLog.store";
import { BoardState, addBoardToStore } from "./board/board.store";
import { ChatBoardState, addChatBoardToStore } from "./chatBoard/chatBoard.store";
import { ChatRoomState, addChatRoomToStore } from "./chatRoom/chatRoom.store";
import { CommentState, addCommentToStore } from "./comment/comment.store";
import { EmojiState, addEmojiToStore } from "./emoji/emoji.store";
import { GroupCallState, addGroupCallToStore } from "./groupCall/groupCall.store";
import { ReportState, addReportToStore } from "./report/report.store";
import { ServiceDeskState, addServiceDeskToStore } from "./serviceDesk/serviceDesk.store";
import { SetGet } from "@shared/util-client";
import { StoryState, addStoryToStore } from "./story/story.store";
import { store as shared } from "@shared/data-access";

export interface State
  extends ActionLogState,
    BoardState,
    CommentState,
    ReportState,
    StoryState,
    ChatRoomState,
    ServiceDeskState,
    EmojiState,
    GroupCallState,
    ChatBoardState {}
export interface RootState extends shared.RootState, State {}
export const addToStore = ({ set, get, pick }: SetGet<RootState>) => ({
  ...addChatBoardToStore({ set, get, pick }),
  ...addGroupCallToStore({ set, get, pick }),
  ...addChatRoomToStore({ set, get, pick }),
  ...addEmojiToStore({ set, get, pick }),
  ...addServiceDeskToStore({ set, get, pick }),
  ...addActionLogToStore({ set, get, pick }),
  ...addBoardToStore({ set, get, pick }),
  ...addCommentToStore({ set, get, pick }),
  ...addReportToStore({ set, get, pick }),
  ...addStoryToStore({ set, get, pick }),
});
