"use client";
import { JobState, addJobToStore } from "./job/job.store";
import { QuestState, addQuestToStore } from "./quest/quest.store";
import { QuestVerifyState, addQuestVerifyToStore } from "./questVerify/questVerify.store";
import { store as shared } from "@shared/data-access";
import { store as social } from "@social/data-access";
// import { MainState, addMainToStore } from "./main/main.store";
import { SetGet } from "@shared/util-client";
import { UserState, addUserToStore } from "./user/user.store";
import { create } from "zustand";

export interface State
  // MainState,
  extends UserState {
  temp: string;
}
export interface RootState extends shared.State, social.State, State, JobState, QuestState, QuestVerifyState {}
// ChatRoomState

export const addToStore = ({ set, get, pick }: SetGet<RootState>) => ({
  ...addJobToStore({ set, get, pick }),
  ...shared.addToStore({ set, get, pick }),
  ...social.addToStore({ set, get, pick }),
  ...addUserToStore({ set, get, pick }),
  ...addQuestToStore({ set, get, pick }),
  ...addQuestVerifyToStore({ set, get, pick }),
});
type CustomStore = {
  phone: string;
  setPhone: (phone: string) => void;
};
export const customStore = create<CustomStore>((set) => ({
  phone: "1234567890",
  setPhone: (phone: string) => set({ phone }),
}));
