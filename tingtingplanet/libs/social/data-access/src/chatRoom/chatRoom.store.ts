import * as gql from "../gql";
import * as slice from "../slice";
import { SetGet, State } from "@shared/util-client";

// ? Store는 다른 store 내 상태와 상호작용을 정의합니다. 재사용성이 필요하지 않은 단일 기능을 구현할 때 사용합니다.
// * 1. State에 대한 내용을 정의하세요.
const state = ({ set, get, pick }: SetGet<slice.ChatRoomSliceState>) => ({
  ...slice.makeChatRoomSlice({ set, get, pick }),
  ...slice.makeChatRoomSlice({ set, get, pick }, "InLoad"),
  ...{
    text: "",
    images: [] as string[],
    at: new Date(),
    type: "text",
  },
  chatLogs: [{}] as gql.ChatLog[],
});

// * 2. Action을 내용을 정의하세요. Action은 모두 void 함수여야 합니다.
// * 다른 action을 참조 시 get() as <Model>State 또는 RootState 를 사용하세요.
const actions = ({ set, get, pick }: SetGet<typeof state>) => ({
  //
  addChatLogs(data: gql.ChatLog) {
    const { chatLogs } = get();
    const newChatLogs = chatLogs;

    if (newChatLogs.length > 9) {
      //queue newChatLogs

      set({ chatLogs: [...newChatLogs.slice(0, 9), data] });
    } else set({ chatLogs: [...chatLogs, data] });
  },
});

export type ChatRoomState = State<typeof state, typeof actions>;
// * 3. ChildSlice를 추가하세요. Suffix 규칙은 일반적으로 "InModel" as const 로 작성합니다.
export const addChatRoomToStore = ({ set, get, pick }: SetGet<ChatRoomState>) => ({
  ...state({ set, get, pick }),
  ...actions({ set, get, pick }),
});
