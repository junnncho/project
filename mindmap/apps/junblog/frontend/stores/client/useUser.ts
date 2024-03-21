import { cnst } from '@nogql/util';
import { create } from 'zustand';

export interface Views {
  views: number;
  createdAt: string;
}

export interface Receipts {
  amount: number;
  status: cnst.DepositStatus;
  createdAt: string;
}

export interface UserStore {
  nickname?: string;
  email?: string;
  image?: string;
  giveView?: number;
  takeView?: number;
  point?: number;
  referralCode?: string;
  level?: number;
  myWallet?: string;
  gameWallet?: string;
  role?: cnst.UserRole;
  modal?: 'withdraw' | 'deposit' | 'edit';
  event?: string | null;
  views: Views[];
  receipts: Receipts[];
  setUser: (user: UserStore) => void;
  setPoint: (user: UserStore) => void;
  setWallet: (user: UserStore) => void;
  setModal: (modal?: 'withdraw' | 'deposit' | 'edit') => void;
  setEvent: (event?: string | null) => void;
  clear: () => void;
}

export const useMeStore = create<UserStore>((set) => ({
  nickname: '',
  email: '',
  image: '',
  giveView: 0,
  point: 0,
  takeView: 0,
  referralCode: '',
  level: 1,
  myWallet: '',
  gameWallet: '',
  role: 'guest',
  views: [],
  receipts: [],
  setUser: (user) =>
    set((state) => ({
      nickname: user?.nickname || state.nickname,
      email: user?.email || state.email,
      image: user?.image || state.image,
      giveView: user?.giveView || state.giveView,
      takeView: user?.takeView || state.takeView,
      role: user?.role || state.role,
      point: user?.point || state.point,
      referralCode: user?.referralCode || state.referralCode,
      level: user?.level || state.level,
      myWallet: user?.myWallet || state.myWallet,
      gameWallet: user?.gameWallet || state.gameWallet,
      views: user?.views || state.views,
      receipts: user?.receipts || state.receipts,
    })),
  setPoint: (user) =>
    set((state) => ({
      point: user.point,
    })),
  setWallet: (user) =>
    set((state) => ({
      myWallet: user.myWallet,
    })),
  setModal: (modal) =>
    set((state) => ({ modal: modal === 'deposit' || modal === 'withdraw' || modal === 'edit' ? modal : undefined })),
  setEvent: (event) => set((state) => ({ event })),
  clear: () =>
    set((state) => ({
      nickname: '',
      email: '',
      image: '',
      giveView: 0,
      point: 0,
      takeView: 0,
      referralCode: '',
      level: 1,
      myWallet: '',
      gameWallet: '',
      role: 'guest',
      views: [],
      receipts: [],
    })),
}));
