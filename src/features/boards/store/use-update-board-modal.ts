import { useQueryState, parseAsString } from "nuqs";

export const useUpdateBoardModal = () => {
  const [id, setId] = useQueryState("update-board", parseAsString);

  const open = (id: string) => setId(id);
  const close = () => setId(null);

  return {
    id,
    open,
    close,
    setId,
  };
};
