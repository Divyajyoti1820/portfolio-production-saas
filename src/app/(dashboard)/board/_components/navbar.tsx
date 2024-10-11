"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { useMedia } from "react-use";

import { PencilIcon, PlusSquareIcon, Trash2Icon } from "lucide-react";

import { useConfirm } from "@/hooks/use-confirm";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

import { useBoardId } from "@/hooks/use-board-id";
import { useGetBoard } from "@/features/boards/api/use-get-board";
import { useGetBoards } from "@/features/boards/api/use-get-boards";
import { useDeleteBoard } from "@/features/boards/api/use-delete-board";
import { useEditBoardModal } from "@/features/boards/hooks/use-edit-board-modal";
import { useCreateTaskModal } from "@/features/tasks/hooks/use-create-task-modal";

export const Navbar = () => {
  const router = useRouter();
  const isSmallScreen = useMedia("(max-width:768px)", false);
  const boardId = useBoardId();
  const { data: boardsData } = useGetBoards();
  const { data: boardData, isLoading: boardDataLoading } = useGetBoard(boardId);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_taskModalOpen, setTaskModalOpen] = useCreateTaskModal();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_editBoardOpen, setEditBoardOpen] = useEditBoardModal();

  const [Confirm, ConfirmationDialog] = useConfirm({
    title: "Delete board",
    description:
      "Deleting this board results in deletion of all underlying data and progress. This is non reversible",
  });

  /* Board Deletion Handler */
  const deleteMutation = useDeleteBoard();
  const deleteBoardHandler = async () => {
    const ok = await Confirm();
    if (!ok) {
      return null;
    }

    deleteMutation.mutate(
      { id: boardId },
      {
        onSuccess: () => {
          if (boardsData && boardsData.length !== 0)
            router.replace(`/board/${boardsData[0].id}`);
        },
      }
    );
  };
  /* Board Deletion Handler */

  if (!boardsData || boardsData.length === 0) {
    return router.replace("/");
  }

  return (
    <>
      <ConfirmationDialog />
      <nav className="w-full px-4 h-14 flex items-center justify-between bg-card border-b-2 border-slate-700">
        <div className="max-w-[200px]">
          {boardDataLoading ? (
            <Skeleton className="w-36 h-8 bg-black/50" />
          ) : (
            <h1 className="text-lg font-semibold">{boardData?.title}</h1>
          )}
        </div>
        <div className="flex flex-row gap-x-2 items-center justify-center">
          <Hint
            hide={isSmallScreen ? false : true}
            label="Add new task"
            side="bottom"
            align="center"
          >
            <Button
              size="sm"
              className="flex items-center justify-center gap-x-2"
              onClick={() => setTaskModalOpen(true)}
            >
              <PlusSquareIcon className="size-5" />
              {!isSmallScreen && <span>Add a new task</span>}
            </Button>
          </Hint>
          <Hint label="Edit board" side="bottom" align="center">
            <Button
              size="sm"
              variant="ghost"
              className="text-primary hover:bg-secondary hover:text-primary"
              onClick={() => setEditBoardOpen(true)}
            >
              <PencilIcon className="size-5" />
            </Button>
          </Hint>
          <Hint label="Delete board" side="bottom" align="start">
            <Button
              size="sm"
              variant="ghost"
              className="text-destructive hover:text-white hover:bg-destructive"
              onClick={deleteBoardHandler}
            >
              <Trash2Icon className="size-5" />
            </Button>
          </Hint>
        </div>
      </nav>
    </>
  );
};
