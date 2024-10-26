import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type RequestType = InferRequestType<
  (typeof client.api.boards)[":id"]["$patch"]
>["json"];

type ResponseType = InferResponseType<
  (typeof client.api.boards)[":id"]["$patch"],
  200
>;

export const useUpdateBoard = (id: string) => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationKey: ["board", { id }],
    mutationFn: async (json) => {
      const response = await client.api.boards[":id"].$patch({
        json,
        param: { id },
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      return await response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["board", { id }] });
      queryClient.invalidateQueries({ queryKey: ["boards"] });
    },
  });
  return mutation;
};
