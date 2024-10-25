import { client } from "@/lib/hono";

import { InferResponseType } from "hono";
import { useQuery } from "@tanstack/react-query";

export type ResponseType = InferResponseType<
  (typeof client.api.boards)["boards-list"],
  200
>;

export const useGetBoard = () => {};
