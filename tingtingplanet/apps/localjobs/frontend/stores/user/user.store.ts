import * as gql from "../gql";
import * as slice from "../slice";
import { SetGet, State } from "@shared/util-client";

// ? Store는 다른 store 내 상태와 상호작용을 정의합니다. 재사용성이 필요하지 않은 단일 기능을 구현할 때 사용합니다.
// * 1. State에 대한 내용을 정의하세요.
const state = ({ set, get, pick }: SetGet<slice.UserSliceState>) => ({
  ...slice.makeUserSlice({ set, get, pick }),
  self: gql.defaultUser as gql.User,
});

// * 2. Action을 내용을 정의하세요. Action은 모두 void 함수여야 합니다.
// * 다른 action을 참조 시 get() as <Model>State 또는 RootState 를 사용하세요.
const actions = ({ set, get, pick }: SetGet<typeof state>) => ({
  whoAmI: async ({ reset }: { reset?: boolean } = {}) =>
    set({ self: reset ? (gql.defaultUser as gql.User) : await gql.whoAmI() }),
  //
});

export type UserState = State<typeof state, typeof actions>;
// * 3. ChildSlice를 추가하세요. Suffix 규칙은 일반적으로 "InModel" as const 로 작성합니다.
export const addUserToStore = ({ set, get, pick }: SetGet<UserState>) => ({
  ...state({ set, get, pick }),
  ...actions({ set, get, pick }),
});
