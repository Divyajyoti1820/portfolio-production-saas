import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { toast } from "sonner";

import { client } from "@/lib/hono";

type ResponseType = InferResponseType<
  (typeof client.api.boards)[":id"]["$delete"],
  200
>;
type RequestType = InferRequestType<
  (typeof client.api.boards)[":id"]["$delete"]
>["param"];

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (param) => {
      const response = await client.api.boards[":id"].$delete({ param });

      if (!response.ok) {
        throw new Error("[DELETE_BOARD] : Something went wrong!!");
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success(`Board removed successfully`);
      queryClient.invalidateQueries({ queryKey: ["boards"] });
      queryClient.invalidateQueries({ queryKey: ["board", { id: data.id }] });
    },
    onError: () => {
      toast.success("Failed to create Board");
    },
  });

  return mutation;
};
