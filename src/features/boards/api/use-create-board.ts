import { useMutation } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { toast } from "sonner";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<(typeof client.api.boards)["$post"], 200>;
type RequestType = InferRequestType<
  (typeof client.api.boards)["$post"]
>["json"];

export const useCreateBoard = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.boards.$post({ json });

      if (!response.ok) {
        throw new Error("[CREATE_BOARD] : Something went wrong!!");
      }

      return await response.json();
    },
    onSuccess: (data) => {
      toast.success(`New Board "${data.data.title}" created`);
      //TODO : Invalidate Query GET_BOARDS
      //TODO : Invalidate Query GET_BOARDS_BY_ID
    },
    onError: () => {
      toast.success("Failed to create Board");
    },
  });

  return mutation;
};
