import { useParams } from "next/navigation";

export const useGetBoardId = () => {
  const { boardId } = useParams();
  return boardId;
};
