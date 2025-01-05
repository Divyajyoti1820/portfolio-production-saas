"use client";

import { useRouter } from "next/navigation";
import { ColumnContent } from "./_components/column-content";
import { Navbar } from "./_components/navbar";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useGetBoardCount } from "@/features/boards/api/use-get-board-count";
import { PageError } from "@/components/custom-components/page-error";
import { useGetBoard } from "@/features/boards/api/use-get-board";
import { useGetBoardId } from "@/hooks/use-get-board-id";
import { Loader2Icon } from "lucide-react";
export const BoardIdClient = () => {
  const router = useRouter();
  const presentBoardId = useGetBoardId();
  const { open } = useSidebar();

  const { data: boardsInfo, isLoading: boardInfoLoading } = useGetBoardCount();
  const { data: boardData, isLoading: boardDataLoading } = useGetBoard({
    boardId: presentBoardId,
  });

  const isLoading = boardInfoLoading || boardDataLoading;

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center gap-y-2 justify-center">
        <Loader2Icon className="size-10 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading Board</p>
      </div>
    );
  }

  if (!boardsInfo || !boardData) {
    return <PageError />;
  }

  if (boardsInfo.count === 0) {
    router.push("/create");
  }

  const board = {
    title: boardData.title,
    id: boardData.id,
  };

  return (
    <div
      className={cn(
        "h-full w-[calc(100vw-4rem)]",
        open && "w-[calc(100vw-12rem)]"
      )}
    >
      <Navbar
        board={board}
        boardsInfo={boardsInfo}
        boardLoadingStatus={boardDataLoading}
      />
      <ColumnContent boardId={presentBoardId} />
    </div>
  );
};
