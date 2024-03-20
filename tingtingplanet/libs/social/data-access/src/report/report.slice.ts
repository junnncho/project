import * as gql from "../gql";
import { Get, SetPick, Slice, createActions, createSlicer, createState } from "@shared/util-client";

// ? Slice는 재사용가능한 상태와 액션을 정의합니다. 외부 상태를 가져다쓰지 않는 경우에만 사용하세요.
// * 1. State에 대한 내용을 정의하세요.
const state = (setget, suffix: string) => ({
  ...createState(gql.reportGraphQL),
  ...createActions(gql.reportGraphQL, setget, suffix),
});

// * 2. Action을 내용을 정의하세요. Action은 모두 void 함수여야 합니다.
// * 다른 action을 참조 시 get() as <Model>State 또는 RootState 를 사용하세요.
const actions = ({ set, pick }: SetPick<typeof state>, suffix: string) => ({
  processReport: async (id: string, idx?: number) => {
    const report = await gql.processReport(id);
    if (idx === undefined) return set({ report });
    const { reportList } = pick("reportList");
    set({ reportList: reportList.map((u, i) => (i === idx ? report : u)) });
  },
  resolveReport: async (id: string, idx?: number) => {
    const { reportForm } = pick("reportForm");
    const report = await gql.resolveReport(id, reportForm.replyContent ?? "");
    if (idx === undefined) return set({ report, reportModal: null });
    const { reportList } = pick("reportList");
    set({
      reportList: reportList.map((u, i) => (i === idx ? report : u)),
      reportModal: null,
    });
  },
});

export type ReportSliceState = Get<typeof state, typeof actions>;
export type ReportSlice = Slice<"report", ReportSliceState>;
export const makeReportSlice = createSlicer("report" as const, state, actions);
