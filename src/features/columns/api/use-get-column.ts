import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetColumn = (boardId: string, id: string) => {
  const query = useQuery({
    queryKey: ["column", { boardId, id }],
    queryFn: async () => {
      const response = await client.api.columns[":boardId"][":id"].$get({
        param: { boardId, id },
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
