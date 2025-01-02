import { useQueryState, parseAsString } from "nuqs";

export const useUpdateTaskModal = () => {
  const [taskId, setTaskId] = useQueryState("update-task", parseAsString);

  const open = (id: string) => setTaskId(id);
  const close = () => setTaskId(null);

  return {
    taskId,
    open,
    close,
    setTaskId,
  };
};
