import { create } from "zustand";

interface ConfirmModal {
  text: string | null;
  clickYes: (value: unknown) => void;
  clickNo: (value: unknown) => void;
  openConfirmModal: ({ text }: { text: string }) => Promise<boolean>;
}

const useConfirmModal = create<ConfirmModal>((set, get) => ({
  text: null,
  clickYes: null,
  clickNo: null,
  openConfirmModal: ({ text }) => {
    const promise = new Promise((resolve, reject) => {
      set({ text, clickYes: resolve, clickNo: reject });
    });

    return promise.then(
      () => {
        set({ text: null });
        return true;
      },
      () => {
        set({ text: null });
        return false;
      }
    );
  },
}));

export { useConfirmModal };
