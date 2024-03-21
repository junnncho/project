import { create } from 'zustand';

interface ModalStore {
  modal: 'delete' | 'deposit' | 'edit' | undefined;
  setModal: (modal?: 'delete' | 'deposit' | 'edit') => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  modal: undefined,
  setModal: (modal) =>
    set((state) => ({
      modal: modal,
    })),
}));
