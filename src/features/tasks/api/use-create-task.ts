import { InferRequestType, InferResponseType } from "hono";

import { toast } from "sonner";

import { client } from "@/lib/hono";
import { useMutation } from "@tanstack/react-query";

type ResponseType = InferResponseType<(typeof client.api.tasks)["$post"], 200>;
type RequestType = InferRequestType<(typeof client.api.tasks)["$post"]>["json"];

export const useCreateTask = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.tasks.$post({ json });

      if (!response.ok) {
        throw new Error("[CREATE_TASK] : Something went wrong!!");
      }

      return await response.json();
    },
    onSuccess: (data) => {
      toast.success(`New Task "${data.data.title}" created`);
    },
    onError: () => {
      toast.success("Failed to create Task");
    },
  });

  return mutation;
};
