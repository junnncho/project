import * as gql from "../gql";
import { Get, SetPick, Slice, createActions, createSlicer, createState } from "@shared/util-client";
import { message } from "@shared/ui-web";

// ? Slice는 재사용가능한 상태와 액션을 정의합니다. 외부 상태를 가져다쓰지 않는 경우에만 사용하세요.
// * 1. State에 대한 내용을 정의하세요.
const state = (setget, suffix: string) => ({
  ...createState(gql.jobGraphQL),
  ...createActions(gql.jobGraphQL, setget, suffix),
});

// * 2. Action을 내용을 정의하세요. Action은 모두 void 함수여야 합니다.
// * 다른 action을 참조 시 get() as <Model>State 또는 RootState 를 사용하세요.
const actions = ({ set, pick }: SetPick<typeof state>, suffix: string) => ({
  reserveJob: async (userId: string) => {
    const { job } = pick("job");
    try {
      const newJob = await gql.reserveJob(job.id, userId);
      set({ job: newJob });
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
  unReserveJob: async (userId: string) => {
    const { job } = pick("job");
    try {
      const newJob = await gql.unReserveJob(job.id, userId);
      set({ job: newJob });
      message.open({ key: "reserveHoldemEvent", type: "success", content: "예약 취소 완료" });
    } catch (e) {
      message.open({ key: "reserveHoldemEvent", type: "error", content: "예약 취소 실패" + e.message });
    }
  },
  applyJob: async () => {
    const { job } = pick("job");
    try {
      const newJob = await gql.applyJob(job.id);
      set({ job: newJob });
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

export type JobSliceState = Get<typeof state, typeof actions>;
export type JobSlice = Slice<"job", JobSliceState>;
export const makeJobSlice = createSlicer("job" as const, state, actions);
