import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const useGetTask = (
  boardId: string,
  columnId: string,
  taskId: string
) => {
  const query = useQuery({
    queryKey: ["tasks", { taskId }],

    queryFn: async () => {
      const response = await client.api.tasks[":boardId"][":columnId"][
        ":id"
      ].$get({
        param: {
          boardId,
          columnId,
          id: taskId,
        },
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
