"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";

import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { useGetBoards } from "@/features/boards/api/use-get-boards";
import { AlertCircleIcon, PlusCircleIcon, SidebarIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useCreateBoardModal } from "@/features/boards/store/use-create-board-modal";
import { useGetBoardId } from "@/hooks/use-get-board-id";
import { getRandomColor } from "@/features/boards/utils";
import { Hint } from "@/components/hint";

type Props = {
  open: boolean;
};

export const MainContent = ({ open }: Props) => {
  const router = useRouter();
  const session = useSession();
  const boardId = useGetBoardId();
  const [createBoardModal, setCreateBoardModal] = useCreateBoardModal();

  const {
    data: Boards,
    isLoading: BoardsLoading,
    isError: BoardsError,
  } = useGetBoards();

  if (BoardsLoading) {
    return (
      <SidebarMenu className="p-2 h-full flex items-center">
        {[...Array(5)].map((_, i) => (
          <Skeleton
            key={i}
            className={cn("bg-black w-full h-10", !open && "size-10")}
          />
        ))}
      </SidebarMenu>
    );
  }

  if (BoardsError || !Boards) {
    return (
      <SidebarMenu className="h-full flex flex-col items-center justify-center">
        <AlertCircleIcon className="size-8 text-destructive" />
        {open && (
          <p className="font-semibold text-destructive">Something went wrong</p>
        )}
      </SidebarMenu>
    );
  }

  const onClickHandler = (id: string) => {
    router.push(`/board/${id}`);
  };

  const createBoardModalHandler = () => {
    if (!session || session.status === "unauthenticated") {
      return;
    }

    setCreateBoardModal(!createBoardModal);
  };
  return (
    <SidebarMenu className="h-full p-2 flex flex-col gap-y-2 items-center">
      {Boards.map((board) => {
        const color = getRandomColor();

        return (
          <Hint
            key={board.id}
            label={board.title}
            hide={open}
            align="center"
            side="right"
            color={color}
          >
            <SidebarMenuItem
              key={board.id}
              onClick={() => onClickHandler(board.id)}
              className={cn(
                `bg-black p-1 w-full flex items-center justify-center rounded-sm  text-primary cursor-pointer transition`,
                boardId === board.id && `${color} text-white`
              )}
            >
              <SidebarIcon className="size-6" />
              <p
                className={cn(
                  "flex-1 text-center text-sm font-semibold",
                  !open && "hidden"
                )}
              >
                {board.title}
              </p>
            </SidebarMenuItem>
          </Hint>
        );
      })}
      <Hint hide={open} label="Add New Board" align="center" side="right">
        <button
          disabled={Boards.length === 5}
          onClick={createBoardModalHandler}
          className={cn(
            "flex w-full items-center justify-center p-2 mt-3 text-blue-500 bg-black rounded-xl hover:bg-black/50 transition"
          )}
        >
          <PlusCircleIcon className="size-6" />
          <p
            className={cn(
              "flex-1 text-center text-sm font-semibold",
              !open && "hidden"
            )}
          >
            Add New Board
          </p>
        </button>
      </Hint>
    </SidebarMenu>
  );
};
