import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetTasks = (boardId: string, columnId: string) => {
  const query = useQuery({
    queryKey: ["tasks", { boardId, columnId }],
    queryFn: async () => {
      const response = await client.api.tasks[":boardId"][":columnId"].$get({
        param: { boardId, columnId },
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const { data } = await response.json();

      if (data.length === 0) {
        return [];
      }

      return data;
    },
  });

  return query;
};
