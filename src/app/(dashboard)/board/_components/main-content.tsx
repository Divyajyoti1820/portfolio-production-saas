"use client";

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import { PlusCircleIcon, SidebarIcon } from "lucide-react";

import { Hint } from "@/components/custom-components/hint";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

import { getRandomColor } from "@/features/boards/utils";
import { useCreateBoardModal } from "@/features/boards/store/use-create-board-modal";

import { MAX_BOARDS } from "@/lib/constants";

type Props = {
  open: boolean;
  data: {
    id: string;
    title: string;
  }[];
  currentBoardId: string;
  isAuthenticated: boolean;
};

export const MainContent = ({
  open,
  data,
  currentBoardId,
  isAuthenticated,
}: Props) => {
  const router = useRouter();
  const { setIsOpen } = useCreateBoardModal();

  const onClickHandler = (id: string) => {
    router.push(`/board/${id}`);
  };

  const createBoardModalHandler = () => {
    if (!isAuthenticated) {
      return;
    }

    setIsOpen(true);
  };
  return (
    <SidebarMenu className="h-full p-2 flex flex-col gap-y-2 items-center">
      {data.map((board) => {
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
                currentBoardId === board.id && `${color} text-white`
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
          disabled={data.length === MAX_BOARDS}
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
