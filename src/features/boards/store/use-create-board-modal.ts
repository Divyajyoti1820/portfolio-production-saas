import { useAtom, atom } from "jotai";

const modalState = atom(false);

export const useCreateBoardModal = () => {
  return useAtom(modalState);
};
