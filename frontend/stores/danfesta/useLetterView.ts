import { AxiosError } from "axios";
import { create } from "zustand";
import api from "../../auth/api";
import { PATH } from "../../constants/api";

interface Letter {
  id: string;
  senderName: string;
  contents: string;
  imageUrl: string;
  contactInfo: string;
}

interface LetterView {
  isLoading: boolean;
  error: AxiosError | null;
  letter: Letter;
  getLetter: (letterId: number) => void;
}

const useLetterView = create<LetterView>((set) => ({
  isLoading: false,
  error: null,
  letter: null,
  getLetter: async (letterId: number) => {
    set({ isLoading: true });
    await api
      .get(PATH.DKU.LETTER.GET_ONE(letterId))
      .then((res) => {
        set({ letter: res.data });
      })
      .catch((error) => {
        set({ error });
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
}));

export { useLetterView };
