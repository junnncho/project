import { ChatRoom, ChatRoomSummary } from "./chatRoom.gql";
import { Locale, baseLocale } from "@shared/util-client";

export const chatRoomLocale = {
  ...baseLocale,
  field: ["Field", "필드"],
  totalChatRoom: ["Total ChatRoom", "총 채팅방수"],
  prevChat: ["Prev Chat", "이전 채팅"],
  nextChat: ["Next Chat", "다음 채팅"],
  root: ["Root", "루트"],
  rootCreatedAt: ["Root Created At", "루트 생성일"],
  chats: ["Chats", "채팅"],
  totalContribution: ["Total Contribution", "총 기여"],
  contribution: ["Contribution", "기여"],
  roomNum: ["Room Number", "방번호"],
  users: ["Users", "사용자"],
  files: ["Files", "파일"],
  emojis: ["Emojis", "이모지"],
  read: ["Read", "읽음"],
} as const;

export type ChatRoomLocale = Locale<"chatRoom", ChatRoom & ChatRoomSummary, typeof chatRoomLocale>;
