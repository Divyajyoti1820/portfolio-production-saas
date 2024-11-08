import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { InferResponseType, InferRequestType } from "hono";

type RequestType = InferRequestType<
  (typeof client.api.columns)["$post"]
>["json"];

type ResponseType = InferResponseType<
  (typeof client.api.columns)["$post"],
  200
>;

export const useCreateColumn = (boardId: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.columns.$post({ json });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      return await response.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      queryClient.invalidateQueries({ queryKey: ["columns", { boardId }] });
    },
  });

  return mutation;
};
