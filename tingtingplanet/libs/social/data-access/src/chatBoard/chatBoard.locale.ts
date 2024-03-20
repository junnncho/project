import { ChatBoard, ChatBoardSummary } from "./chatBoard.gql";
import { Locale, baseLocale } from "@shared/util-client";

export const chatBoardLocale = {
  ...baseLocale,
  field: ["Field", "필드"], // 샘플
  totalChatBoard: ["TotalChatBoard", "총 모델"], // 모델명 수정 필요
  name: ["이름", "name"],
  rootRoom: ["루트룸", "rootRoom"],
  recentRoom: ["최근룸", "recentRoom"],
} as const;

export type ChatBoardLocale = Locale<"chatBoard", ChatBoard & ChatBoardSummary, typeof chatBoardLocale>;
