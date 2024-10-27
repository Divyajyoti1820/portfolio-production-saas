"use client";

import { redirect, useRouter } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";

import {
  AlertTriangleIcon,
  Edit2Icon,
  PlusSquareIcon,
  Trash2Icon,
} from "lucide-react";
import { toast } from "sonner";
import { Hint } from "@/components/hint";
import { Skeleton } from "@/components/ui/skeleton";

import { useGetBoardId } from "@/hooks/use-get-board-id";
import { useConfirmModal } from "@/hooks/use-confirm-modal";

import { useGetBoard } from "@/features/boards/api/use-get-board";
import { useGetBoards } from "@/features/boards/api/use-get-boards";
import { useDeleteBoard } from "@/features/boards/api/use-delete-board";
import { useUpdateBoardModal } from "@/features/boards/store/use-update-board";

export const Navbar = () => {
  const router = useRouter();
  const isBreakpoint = useMediaQuery("(max-width:1080px)");
  const boardId = useGetBoardId();
  const { data: Boards } = useGetBoards();
  const [openBoardUpdateModal, setOpenBoardUpdateModal] = useUpdateBoardModal();
  const [ConfirmationModal, confirm] = useConfirmModal({
    title: "Are you sure?",
    message:
      "Your are going to delete this board. This action is irreversible.",
  });

  const {
    data: BoardData,
    isLoading: loadingBoard,
    isError: boardError,
  } = useGetBoard(boardId);

  const boardDeleteMutation = useDeleteBoard(boardId);

  const deleteBoardHandler = async () => {
    if (!Boards) return;

    const ok = await confirm();

    if (!ok) return;

    boardDeleteMutation.mutate(
      { id: boardId },
      {
        onSuccess: () => {
          toast.success("Board removed successfully");
          if (Boards.length !== 0) {
            router.replace(`/board/${Boards[0].id}`);
          } else {
            redirect("/");
          }
        },
        onError: () => {
          toast.error("Failed to remove board");
        },
      }
    );
  };

  return (
    <>
      <ConfirmationModal />
      <nav className="bg-card h-14 w-full px-3 flex items-center justify-between">
        <div className="h-full flex items-center justify-center">
          {loadingBoard ? (
            <Skeleton className="h-6 w-40 rounded-sm" />
          ) : (
            <>
              {boardError ? (
                <div className="h-8 w-40 flex items-center justify-center rounded-sm gap-x-2 bg-black">
                  <AlertTriangleIcon className="size-4 text-destructive" />
                  <p className="text-xs text-destructive">Board Error</p>
                </div>
              ) : (
                <h3 className="text-lg font-semibold">{BoardData?.title}</h3>
              )}
            </>
          )}
        </div>
        <div className="flex flex-row items-center justify-center gap-x-2">
          <Hint
            hide={!isBreakpoint}
            label="Create new task"
            align="center"
            side="bottom"
          >
            <button
              disabled={boardError}
              className="flex items-center justify-center gap-x-1 bg-teal-500 p-1 rounded-md hover:bg-teal-500/50 transition"
            >
              <PlusSquareIcon className="size-5" />
              {!isBreakpoint && (
                <p className="text-xs font-semibold">Create new task</p>
              )}
            </button>
          </Hint>
          <Hint label="Edit Board" align="center" side="bottom">
            <button
              onClick={() => setOpenBoardUpdateModal(!openBoardUpdateModal)}
              disabled={boardError}
              className="flex items-center justify-center gap-x-1 bg-primary p-1 rounded-md hover:bg-primary/50 transition"
            >
              <Edit2Icon className="size-5" />
            </button>
          </Hint>
          <Hint label="Delete Board" align="center" side="bottom">
            <button
              disabled={boardError}
              onClick={deleteBoardHandler}
              className="flex items-center justify-center gap-x-1 bg-destructive p-1 rounded-md hover:bg-destructive/50 transition"
            >
              <Trash2Icon className="size-5" />
            </button>
          </Hint>
        </div>
      </nav>
    </>
  );
};
