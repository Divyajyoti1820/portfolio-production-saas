import { useAtom, atom } from "jotai";

const modalState = atom(false);

export const useUpdateTaskModal = () => {
  return useAtom(modalState);
};
