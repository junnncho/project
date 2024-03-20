import * as gql from "../gql";
import {
  Call,
  Get,
  SetPick,
  Slice,
  createActions,
  createSlicer,
  createState,
} from "@shared/util-client";
type CallConnection = {
  userId: string;
  mic: number;
  cam: boolean;
};
const callMap = new Map<string, Call>();
// ? Slice는 재사용가능한 상태와 액션을 정의합니다. 외부 상태를 가져다쓰지 않는 경우에만 사용하세요.
// * 1. State에 대한 내용을 정의하세요.
const state = (setget, suffix: string) => ({
  ...createState(gql.groupCallGraphQL),
  ...createActions(gql.groupCallGraphQL, setget, suffix),
});

// * 2. Action을 내용을 정의하세요. Action은 모두 void 함수여야 합니다.
// * 다른 action을 참조 시 get() as <Model>State 또는 RootState 를 사용하세요.
const actions = ({ set, pick }: SetPick<typeof state>, suffix: string) => ({
  //
});

export type GroupCallSliceState = Get<typeof state, typeof actions>;
export type GroupCallSlice = Slice<"groupCall", GroupCallSliceState>;
export const makeGroupCallSlice = createSlicer("groupCall" as const, state, actions);
