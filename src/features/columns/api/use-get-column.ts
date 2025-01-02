import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

type Props = {
  boardId: string;
  columnId: string;
};

export const useGetColumn = ({ boardId, columnId }: Props) => {
  const query = useQuery({
    queryKey: ["column", { boardId, columnId }],
    queryFn: async () => {
      const response = await client.api.columns[":boardId"][":id"].$get({
        param: { boardId, id: columnId },
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
