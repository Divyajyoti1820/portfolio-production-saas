import { atom, useAtom } from "jotai";

const createBoardModalState = atom(false);

export const useCreateBoardModal = () => {
  return useAtom(createBoardModalState);
};
