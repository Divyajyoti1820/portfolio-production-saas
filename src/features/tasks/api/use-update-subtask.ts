import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { InferRequestType, InferResponseType } from "hono";

type RequestType = InferRequestType<
  (typeof client.api.tasks)["subtasks"][":columnId"][":id"]["$patch"]
>["json"];

type ResponseType = InferResponseType<
  (typeof client.api.tasks)["subtasks"][":columnId"][":id"]["$patch"],
  200
>;

export const useUpdateSubtask = (columnId: string, taskId: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.tasks["subtasks"][":columnId"][
        ":id"
      ].$patch({
        param: { columnId, id: taskId },
        json,
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      return await response.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks", { taskId }] });
    },
  });

  return mutation;
};
