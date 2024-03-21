export * from "./dummy";

export interface View {
  id: string;
  youtubeId: string;
  owner: User;
}

export interface StoreView extends View {
  complete: boolean;
  owner: User;
}

export interface StoreSubscribe {
  owner: StoreUser;
  complete: boolean;
}

export interface User {
  id: string;
  youtubeId: string;
  giveView: number;
  giveSubscribe: number;
}

export interface StoreUser extends User {
  name: string;
  detail: string;
  profile: string;
}
