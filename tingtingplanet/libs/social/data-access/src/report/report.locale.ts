import { Locale, baseLocale } from "@shared/util-client";
import { Report, ReportSummary } from "./report.gql";

export const reportLocale = {
  ...baseLocale,
  root: ["Root", "루트"],
  title: ["Title", "제목"],
  files: ["Files", "파일"],
  type: ["Type", "타입"],
  target: ["Target", "타겟"],
  targetUser: ["TargetUser", "타겟유저"],
  from: ["From", "요청자"],
  content: ["Content", "콘텐츠"],
  replyFrom: ["ReplyFrom", "답변자"],
  replyAt: ["ReplyAt", "답변일"],
  replyContent: ["ReplyContent", "답변내용"],
  confirm: ["Are you sure to submit this report?", "신고를 제출하시겠습니까?"],
  totalReport: ["TotalReport", "총 신고"],
  activeReport: ["ActiveReport", "미처리 신고"],
  inProgressReport: ["InProgressReport", "처리중 신고"],
  resolvedReport: ["ResolvedReport", "처리된 신고"],
} as const;

export type ReportLocale = Locale<"report", Report & ReportSummary, typeof reportLocale>;
