import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { InferRequestType, InferResponseType } from "hono";

type RequestType = InferRequestType<
  (typeof client.api.tasks)[":boardId"][":columnId"][":id"]["$delete"]
>["param"];

type ResponseType = InferResponseType<
  (typeof client.api.tasks)[":boardId"]["$post"],
  200
>;

export const useDeleteTask = (boardId: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.tasks[":boardId"].$post({
        param: { boardId },
        json,
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      queryClient.invalidateQueries({ queryKey: ["column", { boardId }] });
    },
  });

  return mutation;
};
