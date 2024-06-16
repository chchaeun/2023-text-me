import { AxiosError } from "axios";
import { create } from "zustand";
import api from "../../../auth/api";
import { PATH } from "../../../constants/api";
import { CustomError } from "../../../types/api";

type LetterBody = {
  contents: string;
  senderName: string;
  imageUrl: string;
  category:
    | "EXCHANGE"
    | "SAFETY"
    | "EDUCATION"
    | "FACILITIES"
    | "WELFARE"
    | "ETC";
  webInfoImage: FileList;
  studentCouncilFeeImage: FileList;
  phone: string;
};

interface SendLetter {
  loading: boolean;
  error: AxiosError<CustomError> | null;
  sendLetter: (data: LetterBody, callback: () => void) => void;
}

const useSendLetter = create<SendLetter>((set) => ({
  loading: false,
  error: null,
  sendLetter: async (data, callback) => {
    const formData = new FormData();
    formData.append("contents", data.contents);
    formData.append("webInfoImage", data.webInfoImage[0]);
    if (data.studentCouncilFeeImage.length > 0) {
      formData.append("paymentImage", data.studentCouncilFeeImage[0]);
    } else {
      formData.append("paymentImage", new File([""], ""));
    }
    formData.append("cardImageUrl", data.imageUrl);
    formData.append("category", data.category);
    formData.append("phone", data.phone);

    set({ loading: true });
    await api
      .post(PATH.DKU.LETTER.PRIZE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        callback();
      })
      .catch((error) => {
        set({ error });
      })
      .finally(() => {
        set({ loading: false, error: null });
      });
  },
}));

export { useSendLetter };
