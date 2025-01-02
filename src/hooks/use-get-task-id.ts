import { useQueryState, parseAsString } from "nuqs";

export const useGetTaskId = () => {
  const [id, setId] = useQueryState(
    "taskId",
    parseAsString.withDefault("").withOptions({ clearOnDefault: true })
  );

  return {
    id,
    setId,
  };
};
