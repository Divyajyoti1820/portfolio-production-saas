import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { InferResponseType, InferRequestType } from "hono";

type RequestType = InferRequestType<
  (typeof client.api.columns)[":id"]["$patch"]
>["json"];

type ResponseType = InferResponseType<
  (typeof client.api.columns)[":id"]["$patch"],
  200
>;

export const useUpdateColumn = (id: string, boardId: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: [!!id],
    mutationFn: async (json) => {
      const response = await client.api.columns[":id"].$patch({
        param: { id },
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
