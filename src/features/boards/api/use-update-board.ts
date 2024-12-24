import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type RequestType = InferRequestType<
  (typeof client.api.boards)[":id"]["$patch"]
>;

type ResponseType = InferResponseType<
  (typeof client.api.boards)[":id"]["$patch"],
  200
>;

export const useUpdateBoard = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async ({ param, json }) => {
      const response = await client.api.boards[":id"].$patch({
        json,
        param,
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      return await response.json();
    },
    onSuccess: ({ data }) => {
      toast.success("Board updated successfully");

      queryClient.invalidateQueries({ queryKey: ["boards"] });
      queryClient.invalidateQueries({ queryKey: ["board", data.id] });
    },
    onError: () => {
      toast.error("Failed to update board");
    },
  });
  return mutation;
};
