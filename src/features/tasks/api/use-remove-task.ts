import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { InferRequestType } from "hono";

type RequestType = InferRequestType<
  (typeof client.api.tasks)[":id"]["$delete"]
>;

type ResponseType = InferResponseType<
  (typeof client.api.tasks)[":id"]["$delete"],
  200
>;

export const useRemoveTask = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const response = await client.api.tasks[":id"].$delete({
        param,
        json,
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", data.columnId],
      });
    },
  });

  return mutation;
};
