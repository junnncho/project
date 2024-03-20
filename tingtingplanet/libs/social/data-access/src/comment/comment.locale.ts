import { Comment, CommentSummary } from "./comment.gql";
import { Locale, baseLocale } from "@shared/util-client";

export const commentLocale = {
  ...baseLocale,
  rootType: ["RootType", "루트타입"],
  root: ["Root", "루트"],
  parentType: ["ParentType", "Parent타입"],
  parent: ["Parent", "Parent"],
  type: ["Type", "타입"],
  user: ["User", "유저"],
  name: ["Name", "이름"],
  phone: ["Phone", "전화번호"],
  email: ["Email", "이메일"],
  content: ["Content", "콘텐츠"],
  meta: ["Meta", "메타정보"],
  policy: ["Policy", "정책"],
  parentCreatedAt: ["ParentCreatedAt", "Parent생성일"],
  like: ["Like", "좋아요"],
  totalStat: ["TotalStat", "전체통계"],
  unlike: ["Unlike", "싫어요"],
  setLike: ["SetLike", "좋아요설정"],
  resetLike: ["ResetLike", "좋아요취소"],
  totalComment: ["Total Comment", "총 댓글수"],
  activeComment: ["Active Comment", "미처리 댓글수"],
  approvedComment: ["Approved Comment", "승인 댓글수"],
  deniedComment: ["Denied Comment", "거절 댓글수"],
  haComment: ["Hourly Comment", "시간당 댓글수"],
  daComment: ["Daily Comment", "일간 댓글수"],
  waComment: ["WA Comment", "주간 댓글수"],
  maComment: ["MA Comment", "월간 댓글수"],
} as const;

export type CommentLocale = Locale<"comment", Comment & CommentSummary, typeof commentLocale>;
