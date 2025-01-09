import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { InferRequestType, InferResponseType } from "hono";
import { useGetBoardId } from "@/hooks/use-get-board-id";

type RequestType = InferRequestType<
  (typeof client.api.tasks)[":boardId"]["$post"]
>;
type ResponseType = InferResponseType<
  (typeof client.api.tasks)[":boardId"]["$post"],
  200
>;

export const useCreateTask = () => {
  const boardId = useGetBoardId();
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const response = await client.api.tasks[":boardId"].$post({
        param,
        json,
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["columns-with-tasks", { boardId }],
      });
    },
  });

  return mutation;
};
