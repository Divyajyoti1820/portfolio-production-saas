import { atom, useAtom } from "jotai";

const editBoardModalState = atom(false);

export const useEditBoardModal = () => {
  return useAtom(editBoardModalState);
};
