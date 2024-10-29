import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

export const useGetColumns = (boardId: string) => {
  const query = useQuery({
    queryKey: ["column", { boardId }],
    queryFn: async () => {
      const response = await client.api.columns[":boardId"].$get({
        param: { boardId },
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
