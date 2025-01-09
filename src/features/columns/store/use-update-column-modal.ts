import { useQueryState, parseAsString } from "nuqs";

export const useUpdateColumnModal = () => {
  const [id, setId] = useQueryState("update-column", parseAsString);

  const open = (id: string) => setId(id);
  const close = () => setId(null);

  return {
    id,
    open,
    close,
    setId,
  };
};
