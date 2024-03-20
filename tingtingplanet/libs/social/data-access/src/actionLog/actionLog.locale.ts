import { ActionLog, ActionLogSummary } from "./actionLog.gql";
import { Locale, baseLocale } from "@shared/util-client";

export const actionLogLocale = {
  ...baseLocale,
  value: ["Value", "값"],
  type: ["Type", "타입"],
  target: ["Target", "타겟"],
  user: ["User", "유저"],
  action: ["Action", "액션"],
  totalActionLog: ["Total ActionLog", "총 액션로그수"],
  haActionLog: ["HA ActionLog", "시간당 액션로그수"],
  daActionLog: ["DA ActionLog", "일간 액션로그수"],
  waActionLog: ["WA ActionLog", "주간 액션로그수", { week: "주" }],
  maActionLog: ["MA ActionLog", "월간 액션로그수"],
} as const;

export type ActionLogLocale = Locale<"actionLog", ActionLog & ActionLogSummary, typeof actionLogLocale>;
