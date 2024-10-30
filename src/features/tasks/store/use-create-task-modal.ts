import { useAtom, atom } from "jotai";

const modalState = atom(false);

export const useCreateTaskModal = () => {
  return useAtom(modalState);
};
