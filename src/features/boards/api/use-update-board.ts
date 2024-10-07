import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<
  (typeof client.api.boards)[":id"]["$patch"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.boards)[":id"]["$patch"]
>["json"];

export const useUpdateBoard = (id: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["board", { id }],
    mutationFn: async (json) => {
      const response = await client.api.boards[":id"].$patch({
        param: { id },
        json,
      });

      if (!response.ok) {
        throw new Error("Something went wrong!!");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      queryClient.invalidateQueries({ queryKey: ["board", { id }] });
    },
    onError: () => {
      toast.error("Failed to  update project");
    },
  });

  return mutation;
};
