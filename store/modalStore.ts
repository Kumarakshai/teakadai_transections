// store/modalStore.ts
import { create } from "zustand";

interface ModalState {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}

export const useModalStore = create<ModalState>((set: any) => ({
  isOpen: false,
  setOpen: (open: boolean) => set({ isOpen: open }),
}));
