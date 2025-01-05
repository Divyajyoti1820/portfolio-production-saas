import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { InferResponseType, InferRequestType } from "hono";

type RequestType = InferRequestType<
  (typeof client.api.columns)[":id"]["$delete"]
>;

type ResponseType = InferResponseType<
  (typeof client.api.columns)[":id"]["$delete"],
  200
>;

export const useDeleteColumn = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const response = await client.api.columns[":id"].$delete({
        param,
        json,
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      queryClient.invalidateQueries({
        queryKey: ["columns-with-tasks", { boardId: data.boardId }],
      });
      queryClient.invalidateQueries({ queryKey: ["columns", data.boardId] });
    },
  });

  return mutation;
};
