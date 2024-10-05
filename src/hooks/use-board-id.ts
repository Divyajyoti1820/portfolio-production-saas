import { useParams } from "next/navigation";

export const useBoardId = () => {
  const param = useParams();

  return param.boardId as string;
};
