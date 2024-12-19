import { client } from "@/lib/hono";

import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";

export type ResponseType = InferResponseType<
  (typeof client.api.boards)["boards"],
  200
>;

export const useGetBoards = () => {
  const query = useQuery({
    queryKey: ["boards"],
    queryFn: async () => {
      const response = await client.api.boards["boards"].$get();

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const { data } = await response.json();

      return data;
    },
  });
  return query;
};
