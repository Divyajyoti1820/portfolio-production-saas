import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetTask = (boardId: string, columnId: string, id: string) => {
  const query = useQuery({
    queryKey: ["tasks", { boardId, columnId, id }],
    queryFn: async () => {
      const response = await client.api.tasks[":boardId"][":columnId"][
        ":id"
      ].$get({ param: { boardId, columnId, id } });

      const data = await response.json();
      return data;
    },
  });
  return query;
};
