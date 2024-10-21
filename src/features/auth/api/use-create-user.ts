import { useMutation } from "@tanstack/react-query";

import { client } from "@/lib/hono";

import { InferRequestType, InferResponseType } from "hono";

type RequestType = InferRequestType<(typeof client.api.users)["$post"]>["json"];
type ResponseType = InferResponseType<(typeof client.api.users)["$post"]>;

export const useCreateUser = () => {
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.users.$post({ json });
      if (response.ok) {
        throw new Error("Something went wrong");
      }

      return await response.json();
    },
  });

  return mutation;
};
