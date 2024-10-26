import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";

type RequestType = InferRequestType<
  (typeof client.api.boards)[":id"]["$delete"]
>["param"];

type ResponseType = InferResponseType<
  (typeof client.api.boards)[":id"]["$delete"],
  200
>;

export const useDeleteBoard = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async () => {
      const response = await client.api.boards[":id"].$delete({
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Failed to remove board");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });

  return mutation;
};
