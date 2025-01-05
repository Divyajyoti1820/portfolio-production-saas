import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

type Props = {
  boardId: string;
};

export const useGetColumnsWithTasks = ({ boardId }: Props) => {
  const query = useQuery({
    queryKey: ["columns-with-tasks", { boardId }],
    queryFn: async () => {
      const response = await client.api.columns["columns-with-tasks"][
        ":boardId"
      ].$post({ param: { boardId } });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
