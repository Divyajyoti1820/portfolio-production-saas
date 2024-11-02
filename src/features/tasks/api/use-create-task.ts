import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { InferRequestType, InferResponseType } from "hono";

type RequestType = InferRequestType<
  (typeof client.api.tasks)[":boardId"]["$post"]
>["json"];
type ResponseType = InferResponseType<
  (typeof client.api.tasks)[":boardId"]["$post"],
  200
>;

export const useCreateTask = (boardId: string, columnId: string) => {
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
      queryClient.invalidateQueries({
        queryKey: ["tasks", { boardId, columnId }],
      });
    },
  });

  return mutation;
};
