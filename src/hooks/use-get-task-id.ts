import { atom, useAtom } from "jotai";

const modalState = atom<string | undefined>(undefined);

export const useGetTaskId = () => {
  return useAtom(modalState);
};
