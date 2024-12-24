import { useQueryState, parseAsString } from "nuqs";

export const useGetTaskId = () => {
  return useQueryState(
    "taskId",
    parseAsString.withDefault("").withOptions({ clearOnDefault: true })
  );
};
