import { client } from "@/lib/hono";

import { InferRequestType, InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";

export type RequestType = InferRequestType<
  (typeof client.api.boards)[":id"]["$get"]
>["query"];

export type ResponseType = InferResponseType<
  (typeof client.api.boards)[":id"]["$get"],
  200
>;

export const useGetBoard = (id: string) => {
  const query = useQuery({
    enabled: !!id,
    queryKey: ["board", { id }],
    queryFn: async () => {
      const response = await client.api.boards[":id"]["$get"]({
        query: { id },
      });

      if (!response.ok) {
        throw new Error("[BOARD_GET] : Failed to get boards");
      }

      const { data } = await response.json();

      return data;
    },
  });

  return query;
};
