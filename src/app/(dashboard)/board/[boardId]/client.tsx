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
import { useGetColumnsWithTasks } from "@/features/columns/api/use-get-columns-with-tasks";
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { useIsMobile } from "@/hooks/use-mobile";

export const BoardIdClient = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const presentBoardId = useGetBoardId();

  const { open } = useSidebar();

  const { data: boardsInfo, isLoading: boardInfoLoading } = useGetBoardCount();
  const { data: boardData, isLoading: boardDataLoading } = useGetBoard({
    boardId: presentBoardId,
  });
  const { data: columnWithTaskData, isLoading: columnWithTaskDataLoading } =
    useGetColumnsWithTasks({ boardId: presentBoardId });

  const isLoading =
    boardInfoLoading || boardDataLoading || columnWithTaskDataLoading;

  if (isLoading) {
    return (
      <div className="max-w-screen-lg h-full flex flex-col items-center gap-y-2 justify-center">
        <Loader2Icon className="size-10 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading Board</p>
      </div>
    );
  }

  if (!boardsInfo) {
    return <PageError />;
  }

  if (boardsInfo.count === 0) {
    router.push("/create");
  }

  if (!boardData || !columnWithTaskData) {
    return <PageError />;
  }

  if (isMobile) {
    return (
      <div className="h-full w-full">
        <AlertDialog
          open={isMobile}
          onOpenChange={() => (!isMobile ? true : false)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="text-destructive">
                Mobile Device Detected
              </AlertDialogTitle>
              <AlertDialogDescription>
                For the best experience, please use a desktop device to access
                this web application. While basic functionality is available on
                mobile, certain features may be limited or not optimized for
                smaller screens.
              </AlertDialogDescription>
            </AlertDialogHeader>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    );
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

      {columnWithTaskData && (
        <ColumnContent
          mainData={columnWithTaskData}
          mainDataLoadingStatus={columnWithTaskDataLoading}
          boardId={presentBoardId}
        />
      )}
    </div>
  );
};
