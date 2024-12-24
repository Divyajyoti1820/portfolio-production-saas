import { useQueryState, parseAsString } from "nuqs";

export const useGetColumnId = () => {
  return useQueryState(
    "columnId",
    parseAsString.withDefault("").withOptions({ clearOnDefault: true })
  );
};
