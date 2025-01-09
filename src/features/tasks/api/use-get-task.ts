import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

type Props = {
  boardId: string;
  columnId: string;
  taskId: string;
};

export const useGetTask = ({ boardId, columnId, taskId }: Props) => {
  const query = useQuery({
    queryKey: ["task", taskId],

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
