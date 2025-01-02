import { useQueryState, parseAsString } from "nuqs";

export const useGetColumnId = () => {
  const [id, setId] = useQueryState(
    "columnId",
    parseAsString.withDefault("").withOptions({ clearOnDefault: true })
  );

  return {
    id,
    setId,
  };
};
