import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferResponseType } from "hono";
import { InferRequestType } from "hono";

type RequestType = InferRequestType<
  (typeof client.api.tasks)[":id"]["$delete"]
>["json"];

type ResponseType = InferResponseType<
  (typeof client.api.tasks)[":id"]["$delete"],
  200
>;

export const useRemoveTask = (
  boardId: string,
  columnId: string,
  taskId: string
) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.tasks[":id"].$delete({
        param: { id: taskId },
        json,
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", { boardId, columnId }],
      });
    },
  });

  return mutation;
};
