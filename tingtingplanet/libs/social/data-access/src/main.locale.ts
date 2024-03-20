import { Locale } from "@shared/util-client";

export const mainLocale = {
  title: ["Title", "제목"],
  author: ["Author", "작성자"],
  privateErr: ["This story is private.", "이 스토리는 비공개입니다."],
  edit: ["Edit", "수정"],
  remove: ["Remove", "삭제"],
  removeMsg: ["Are you sure to remove?", "삭제하시겠습니까?"],
  report: ["Report", "신고"],
  removeComment: ["Remove Comment", "댓글 삭제"],
  placeHolderComment: ["Add a comment...", "댓글을 입력해주세요..."],
  close: ["Close", "닫기"],
  comment: ["Comment", "댓글달기"],
  save: ["Save", "저장하기"],
  reply: ["Reply", "답글달기"],
  board: ["Board", "게시판"],
  new: ["New", "신규"],
  submit: ["Submit", "제출"],
  placeHolderSearch: ["Input search text", "검색어를 입력해주세요"],
};

export type MainLocale = Locale<"main", unknown, typeof mainLocale>;
