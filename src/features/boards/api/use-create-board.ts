import { useRouter } from "next/navigation";

import { client } from "@/lib/hono";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

type RequestType = InferRequestType<
  (typeof client.api.boards)["$post"]
>["json"];

type ResponseType = InferResponseType<(typeof client.api.boards)["$post"], 200>;

export const useCreateBoard = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await client.api.boards.$post({ json });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success(`New Board "${data.title}"`);

      router.push(`/board/${data.id}`);

      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
    onError: () => {
      toast.error("Failed to create board");
    },
  });
  return mutation;
};
