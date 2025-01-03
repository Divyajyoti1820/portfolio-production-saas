import { client } from "@/lib/hono";

import { useQuery } from "@tanstack/react-query";

export const useGetBoardCount = () => {
  const query = useQuery({
    queryKey: ["board-count"],
    queryFn: async () => {
      const response = await client.api.boards["boards-count"].$get();

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();

      return data;
    },
  });

  return query;
};
