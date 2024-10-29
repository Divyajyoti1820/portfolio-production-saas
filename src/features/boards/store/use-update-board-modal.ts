import { useAtom, atom } from "jotai";

const modalState = atom(false);

export const useUpdateBoardModal = () => {
  return useAtom(modalState);
};
