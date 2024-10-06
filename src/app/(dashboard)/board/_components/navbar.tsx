"use client";

import React from "react";

import { useMedia } from "react-use";

import { PencilIcon, PlusSquareIcon, Trash2Icon } from "lucide-react";

import { useConfirm } from "@/hooks/use-confirm";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useBoardId } from "@/hooks/use-board-id";
import { useDeleteBoard } from "@/features/boards/api/use-delete-board";
import { useGetBoards } from "@/features/boards/api/use-get-boards";
import { useRouter } from "next/navigation";

export const Navbar = () => {
  const router = useRouter();
  const isSmallScreen = useMedia("(max-width:768px)", false);
  const boardId = useBoardId();
  const { data: boardsData } = useGetBoards();

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
          if (!boardsData || boardsData.length === 0) {
            return router.replace("/");
          }
          return router.replace(`/board/${boardsData[0].id}`);
        },
      }
    );
  };
  /* Board Deletion Handler */

  /* Edit Board Handler */
  /* Edit Board Handler */

  return (
    <>
      <ConfirmationDialog />
      <nav className="w-full px-4 h-14 flex items-center justify-between bg-card border-b-2 border-slate-700">
        <div className="max-w-[200px]">
          <h1 className="text-lg font-semibold">Test Title</h1>
        </div>
        <div className="flex flex-row gap-x-2 items-center justify-center">
          <Hint
            hide={isSmallScreen ? false : true}
            label="Create new task"
            side="bottom"
            align="center"
          >
            <Button
              size="sm"
              className="flex items-center justify-center gap-x-2"
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
            >
              <PencilIcon className="size-5" />
            </Button>
          </Hint>
          <Hint label="Delete Board" side="bottom" align="center">
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
