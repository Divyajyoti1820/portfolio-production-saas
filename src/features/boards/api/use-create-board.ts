import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { InferRequestType, InferResponseType } from "hono";

type RequestType = InferRequestType<
  (typeof client.api.boards)["$post"]
>["json"];

type ResponseType = InferResponseType<(typeof client.api.boards)["$post"], 200>;

export const useCreateBoard = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.boards.$post({ json });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
  return mutation;
};
