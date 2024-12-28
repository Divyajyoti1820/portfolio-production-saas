import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { InferRequestType, InferResponseType } from "hono";

type RequestType = InferRequestType<
  (typeof client.api.tasks)[":columnId"][":id"]["$patch"]
>;
type ResponseType = InferResponseType<
  (typeof client.api.tasks)[":columnId"][":id"]["$patch"],
  200
>;

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const response = await client.api.tasks[":columnId"][":id"].$patch({
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
