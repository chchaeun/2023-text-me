import { AxiosError } from "axios";
import { create } from "zustand";
import api from "../../auth/api";
import { PATH } from "../../constants/api";

interface LetterInfo {
  id: string;
  imageUrl: string;
}

interface Letters {
  isLoading: boolean;
  error: AxiosError | null;
  letterInfos: LetterInfo[];
  getLetters: () => void;
}

const useLetters = create<Letters>((set) => ({
  isLoading: false,
  error: null,
  letterInfos: [],
  getLetters: async () => {
    set({ isLoading: true });
    await api
      .get(PATH.DKU.LETTER.EVENT)
      .then((res) => {
        set({ letterInfos: res.data });
      })
      .catch((error) => {
        set({ error });
      })
      .finally(() => {
        set({ isLoading: false });
      });
  },
}));

export { useLetters };
