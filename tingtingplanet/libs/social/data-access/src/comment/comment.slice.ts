import * as gql from "../gql";
import { Get, SetPick, Slice, createActions, createSlicer, createState } from "@shared/util-client";

// ? Slice는 재사용가능한 상태와 액션을 정의합니다. 외부 상태를 가져다쓰지 않는 경우에만 사용하세요.
// * 1. State에 대한 내용을 정의하세요.
const state = (setget, suffix: string) => ({
  ...createState(gql.commentGraphQL),
  ...createActions(gql.commentGraphQL, setget, suffix),
});

// * 2. Action을 내용을 정의하세요. Action은 모두 void 함수여야 합니다.
// * 다른 action을 참조 시 get() as <Model>State 또는 RootState 를 사용하세요.
const actions = ({ set, pick }: SetPick<typeof state>, suffix: string) => ({
  likeComment: async (idx: number) => {
    const { commentList } = pick("commentList");
    if (commentList[idx].setLike()) gql.likeComment(commentList[idx].id);
    set({ commentList: [...commentList] });
  },
  resetLikeComment: async (idx: number) => {
    const { commentList } = pick("commentList");
    if (commentList[idx].resetLike()) gql.resetLikeComment(commentList[idx].id);
    set({ commentList: [...commentList] });
  },
  unlikeComment: async (idx: number) => {
    const { commentList } = pick("commentList");
    if (commentList[idx].unlike()) gql.unlikeComment(commentList[idx].id);
    set({ commentList: [...commentList] });
  },
  approveComment: async (id: string, idx?: number) => {
    const comment = await gql.approveComment(id);
    if (idx === undefined) return set({ comment });
    const { commentList } = pick("commentList");
    set({ commentList: commentList.map((u, i) => (i === idx ? comment : u)) });
  },
  denyComment: async (id: string, idx?: number) => {
    const comment = await gql.denyComment(id);
    if (idx === undefined) return set({ comment });
    const { commentList } = pick("commentList");
    set({ commentList: commentList.map((u, i) => (i === idx ? comment : u)) });
  },
});

export type CommentSliceState = Get<typeof state, typeof actions>;
export type CommentSlice = Slice<"comment", CommentSliceState>;
export const makeCommentSlice = createSlicer("comment" as const, state, actions);
