import { useAtom, atom } from "jotai";

const modalState = atom(false);

export const useShowTaskModal = () => {
  return useAtom(modalState);
};
