"use client";

import { useRouter } from "next/navigation";
import { useMediaQuery } from "usehooks-ts";

import {
  AlertTriangleIcon,
  Edit2Icon,
  PlusSquareIcon,
  Trash2Icon,
} from "lucide-react";
import { toast } from "sonner";
import { Hint } from "@/components/custom-components/hint";
import { Skeleton } from "@/components/ui/skeleton";

import { useConfirmModal } from "@/hooks/use-confirm-modal";

import { useDeleteBoard } from "@/features/boards/api/use-delete-board";
import { useUpdateBoardModal } from "@/features/boards/store/use-update-board-modal";
import { useCreateTaskModal } from "@/features/tasks/store/use-create-task-modal";
import { Fragment } from "react";

type Props = {
  board: { title: string; id: string };
  boardsInfo: { count: number; id: string | null };
  boardLoadingStatus: boolean;
};

export const Navbar = ({ board, boardsInfo, boardLoadingStatus }: Props) => {
  const router = useRouter();
  const isBreakpoint = useMediaQuery("(max-width:1080px)");
  const { open: setIsOpenCreateTaskModal } = useCreateTaskModal();

  const { open } = useUpdateBoardModal();

  const boardDeleteMutation = useDeleteBoard();
  const [ConfirmationModal, confirm] = useConfirmModal({
    title: "Are you sure want to delete board?",
    message:
      "Your are going to delete this board. This action is irreversible.",
  });
  const deleteBoardHandler = async () => {
    if (!board) return;

    const ok = await confirm();

    if (!ok) return;

    boardDeleteMutation.mutate(
      { id: board.id },
      {
        onSuccess: () => {
          toast.success("Board removed successfully");
          if (boardsInfo.count !== 0) {
            router.replace(`/board/${boardsInfo.id}`);
          } else {
            router.replace("/create");
          }
        },
        onError: () => {
          toast.error("Failed to remove board");
        },
      }
    );
  };

  return (
    <Fragment>
      <ConfirmationModal />
      <nav className="bg-card h-14 w-full px-3 flex items-center justify-between">
        <div className="h-full flex items-center justify-center">
          {boardLoadingStatus ? (
            <Skeleton className="h-6 w-40 rounded-sm" />
          ) : (
            <Fragment>
              {!board ? (
                <div className="h-8 w-40 flex items-center justify-center rounded-sm gap-x-2 bg-black">
                  <AlertTriangleIcon className="size-4 text-destructive" />
                  <p className="text-xs text-destructive">Board Error</p>
                </div>
              ) : (
                <h3 className="text-lg font-semibold">{board.title}</h3>
              )}
            </Fragment>
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
              disabled={boardLoadingStatus}
              onClick={() => setIsOpenCreateTaskModal(board.id)}
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
              onClick={() => open(board.id)}
              disabled={boardLoadingStatus}
              className="flex items-center justify-center gap-x-1 bg-primary p-1 rounded-md hover:bg-primary/50 transition"
            >
              <Edit2Icon className="size-5" />
            </button>
          </Hint>
          <Hint label="Delete Board" align="center" side="bottom">
            <button
              disabled={boardLoadingStatus}
              onClick={deleteBoardHandler}
              className="flex items-center justify-center gap-x-1 bg-destructive p-1 rounded-md hover:bg-destructive/50 transition"
            >
              <Trash2Icon className="size-5" />
            </button>
          </Hint>
        </div>
      </nav>
    </Fragment>
  );
};
