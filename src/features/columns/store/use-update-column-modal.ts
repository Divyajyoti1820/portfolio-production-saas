import { atom, useAtom } from "jotai";

const modalState = atom(false);

export const useUpdateColumnModal = () => {
  return useAtom(modalState);
};
