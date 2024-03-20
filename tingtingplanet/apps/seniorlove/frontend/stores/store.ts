"use client";
import { TourState, addTourToStore } from "./tour/tour.store";
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
export interface RootState extends shared.State, social.State, State, TourState {}
// ChatRoomState

export const addToStore = ({ set, get, pick }: SetGet<RootState>) => ({
  ...addTourToStore({ set, get, pick }),
  ...shared.addToStore({ set, get, pick }),
  ...social.addToStore({ set, get, pick }),
  ...addUserToStore({ set, get, pick }),
});
type CustomStore = {
  phone: string;
  setPhone: (phone: string) => void;
};
export const customStore = create<CustomStore>((set) => ({
  phone: "1234567890",
  setPhone: (phone: string) => set({ phone }),
}));
