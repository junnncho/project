import * as gql from "../gql";
import { Get, SetPick, Slice, createActions, createSlicer, createState } from "@shared/util-client";
import { message } from "@shared/ui-web";

// ? Slice는 재사용가능한 상태와 액션을 정의합니다. 외부 상태를 가져다쓰지 않는 경우에만 사용하세요.
// * 1. State에 대한 내용을 정의하세요.
const state = (setget, suffix: string) => ({
  ...createState(gql.questGraphQL),
  ...createActions(gql.questGraphQL, setget, suffix),
});

// * 2. Action을 내용을 정의하세요. Action은 모두 void 함수여야 합니다.
// * 다른 action을 참조 시 get() as <Model>State 또는 RootState 를 사용하세요.
const actions = ({ set, pick }: SetPick<typeof state>, suffix: string) => ({
  reserveQuest: async (userId: string) => {
    const { quest } = pick("quest");
    try {
      const newQuest = await gql.reserveQuest(quest.id, userId);
      set({ quest: newQuest });
      message.open({
        key: "reserveHoldemEvent",
        type: "success",
        content: "승락완료",
      });
    } catch (e) {
      message.open({
        key: "reserveHoldemEvent",
        type: "error",
        content: "승락실패" + e.message,
      });
    }
  },
  unReserveQuest: async (userId: string) => {
    const { quest } = pick("quest");
    try {
      const newQuest = await gql.unReserveQuest(quest.id, userId);
      set({ quest: newQuest });
      message.open({ key: "reserveHoldemEvent", type: "success", content: "예약 취소 완료" });
    } catch (e) {
      message.open({ key: "reserveHoldemEvent", type: "error", content: "예약 취소 실패" + e.message });
    }
  },
  applyQuest: async () => {
    const { quest } = pick("quest");
    try {
      const newQuest = await gql.applyQuest(quest.id);
      set({ quest: newQuest });
      // message.open({
      //   key: "reserveHoldemEvent",
      //   type: "success",
      //   content: "예약완료",
      // });
    } catch (e) {
      message.open({
        key: "reserveHoldemEvent",
        type: "error",
        content: "예약실패" + e.message,
      });
    }
  },
  //
});

export type QuestSliceState = Get<typeof state, typeof actions>;
export type QuestSlice = Slice<"quest", QuestSliceState>;
export const makeQuestSlice = createSlicer("quest" as const, state, actions);
