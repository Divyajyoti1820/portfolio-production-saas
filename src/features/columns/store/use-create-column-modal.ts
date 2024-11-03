import { useAtom, atom } from "jotai";

const modalState = atom(false);

export const useCreateColumnModal = () => {
  return useAtom(modalState);
};
