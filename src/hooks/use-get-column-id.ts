import { atom, useAtom } from "jotai";

const modalState = atom<string | undefined>(undefined);

export const useGetColumnId = () => {
  return useAtom(modalState);
};
