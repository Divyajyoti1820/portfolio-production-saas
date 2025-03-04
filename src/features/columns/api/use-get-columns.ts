import { client } from "@/lib/hono";
import { useQuery } from "@tanstack/react-query";

type Props = {
  boardId: string;
};

export const useGetColumns = ({ boardId }: Props) => {
  const query = useQuery({
    queryKey: ["columns", boardId],
    queryFn: async () => {
      const response = await client.api.columns[":boardId"].$get({
        param: { boardId },
      });

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      const { data } = await response.json();
      return data;
    },
  });

  return query;
};
