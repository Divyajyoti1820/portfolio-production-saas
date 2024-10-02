import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { InferResponseType } from "hono";

export type BoardsResponseType = InferResponseType<
  (typeof client.api.boards)["$get"],
  200
>;

export const useGetBoards = () => {
  const query = useQuery({
    queryKey: ["boards"],
    queryFn: async () => {
      const response = await client.api.boards.$get();

      if (!response.ok) {
        throw new Error("[BOARDS_GET] : Something went wrong");
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
