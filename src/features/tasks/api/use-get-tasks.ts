import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetTasks = (boardId: string, columnId: string) => {
  const query = useQuery({
    queryKey: ["tasks", columnId],
    queryFn: async () => {
      const response = await client.api.tasks[":boardId"][":columnId"].$get({
        param: { boardId, columnId },
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
