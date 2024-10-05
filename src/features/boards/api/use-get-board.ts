import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { InferResponseType } from "hono";

export type BoardsResponseType = InferResponseType<
  (typeof client.api.boards)[":id"]["$get"],
  200
>;

export const useGetBoard = (id: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["board", { id }],
    queryFn: async () => {
      const response = await client.api.boards[":id"].$get({ param: { id } });

      if (!response.ok) {
        throw new Error("[GET_BOARD_BY_ID] : Something went wrong");
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
