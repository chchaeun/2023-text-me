import { create } from "zustand";

interface AlertModal {
  text: string | null;
  openAlertModal: (text: string) => void;
  closeAlertModal: () => void;
}

const useAlertModal = create<AlertModal>((set, get) => ({
  text: null,
  openAlertModal: (text) => {
    set({ text });
  },
  closeAlertModal: () => {
    set({ text: null });
  },
}));

export { useAlertModal };
