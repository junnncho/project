import { GroupCall, GroupCallSummary } from "./groupCall.gql";
import { Locale, baseLocale } from "@shared/util-client";

export const groupCallLocale = {
  ...baseLocale,
  type: ["Type", "타입"],
  roomId: ["Room ID", "방번호"],
  users: ["Users", "전체 유저"],
  totalGroupCall: ["Total GroupCall", "총 그룹콜"],
} as const;
export type GroupCallLocale = Locale<"groupCall", GroupCall & GroupCallSummary, typeof groupCallLocale>;
