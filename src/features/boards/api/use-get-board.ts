import { client } from "@/lib/hono";

import { InferRequestType, InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";

export type RequestType = InferRequestType<
  (typeof client.api.boards)["$get"]
>["query"];

export type ResponseType = InferResponseType<
  (typeof client.api.boards)["$get"],
  200
>;

type Props = {
  boardId: string;
};

export const useGetBoard = ({ boardId }: Props) => {
  const query = useQuery({
    queryKey: ["board", boardId],
    queryFn: async () => {
      const response = await client.api.boards["$get"]({
        query: { id: boardId },
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
