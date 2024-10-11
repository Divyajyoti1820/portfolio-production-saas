import { atom, useAtom } from "jotai";

const createTaskModalState = atom(false);

export const useCreateTaskModal = () => {
  return useAtom(createTaskModalState);
};
