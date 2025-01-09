import { useGetBoardId } from "@/hooks/use-get-board-id";
import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.tasks)["bulk-update-tasks"]["$patch"],
  200
>;

type RequestType = InferRequestType<
  (typeof client.api.tasks)["bulk-update-tasks"]["$patch"]
>;

export const useBulkUpdateTasks = () => {
  const queryClient = useQueryClient();
  const boardId = useGetBoardId();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ json }) => {
      const response = await client.api.tasks["bulk-update-tasks"]["$patch"]({
        json,
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Successful Task rearrangement.");
    },
    onError: () => {
      toast.error("Failed Task rearrangement.");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["columns-with-tasks", { boardId }],
      });
    },
  });

  return mutation;
};
