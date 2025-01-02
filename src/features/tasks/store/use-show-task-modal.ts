import { useQueryState, parseAsString } from "nuqs";

export const useShowTaskModal = () => {
  const [id, setId] = useQueryState("show-task", parseAsString);

  const open = (id: string) => setId(id);
  const close = () => setId(null);

  return {
    id,
    open,
    close,
    setId,
  };
};
