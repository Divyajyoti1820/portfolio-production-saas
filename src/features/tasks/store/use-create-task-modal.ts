import { useQueryState, parseAsString } from "nuqs";

export const useCreateTaskModal = () => {
  const [id, setId] = useQueryState("create-task", parseAsString);

  const open = (id: string) => setId(id);
  const close = () => setId(null);

  return {
    id,
    open,
    close,
    setId,
  };
};
