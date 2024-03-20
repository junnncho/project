import { Board, BoardSummary } from "./board.gql";
import { Locale, baseLocale } from "@shared/util-client";

export const boardLocale = {
  ...baseLocale,
  name: ["Name", "이름"],
  description: ["Description", "설명"],
  categories: ["Categories", "카테고리"],
  viewStyle: ["ViewStyle", "뷰스타일"],
  policy: ["Policy", "정책"],
  roles: ["Roles", "역할"],
  isPrivate: ["IsPrivate", "비공개"],
  canWrite: ["CanWrite", "쓰기가능"],
  totalBoard: ["Total Board", "총 게시판"],
} as const;

export type BoardLocale = Locale<"board", Board & BoardSummary, typeof boardLocale>;
