"use client";

import React from "react";
import { motion } from "framer-motion";
import { useGetBoards } from "@/features/boards/api/use-get-boards";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { AlertOctagonIcon, PlusIcon, SidebarIcon } from "lucide-react";
import { Hint } from "@/components/hint";
import { extractAlphabets } from "@/features/boards/util";
import { useCreateBoardModal } from "@/features/boards/hooks/use-create-board-modal";

type Props = {
  open: boolean;
};

export const BoardsList = ({ open }: Props) => {
  const router = useRouter();
  const { data, isLoading, isError } = useGetBoards();
  const [openBoardModal, setOpenBoardModal] = useCreateBoardModal();

  if (isLoading) {
    return (
      <>
        {!open && (
          <ul className="flex-1 flex items-center justify-start flex-col space-y-4 w-full">
            <Skeleton className="size-10 bg-black/50" />
            <Skeleton className="size-10 bg-black/50" />
            <Skeleton className="size-10 bg-black/50" />
            <Skeleton className="size-10 bg-black/50" />
            <Skeleton className="size-10 bg-black/50" />
          </ul>
        )}
        {open && (
          <ul className="flex-1 flex items-center justify-start flex-col space-y-4 w-full">
            <Skeleton className="w-full h-10 bg-black/50" />
            <Skeleton className="w-full h-10 bg-black/50" />
            <Skeleton className="w-full h-10 bg-black/50" />
            <Skeleton className="w-full h-10 bg-black/50" />
            <Skeleton className="w-full h-10 bg-black/50" />
          </ul>
        )}
      </>
    );
  }

  if (isError && !data) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-y-1 w-full">
        <Hint
          hide={open}
          label="Something went wrong"
          side="right"
          align="center"
        >
          <motion.div
            layout
            className="flex flex-col items-center border-2 border-transparent justify-center gap-y-2 p-2 rounded-md text-destructive hover:bg-black transitions"
          >
            <motion.div layout className="size-6">
              <AlertOctagonIcon />
            </motion.div>
            {open && (
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.125 }}
                className="font-medium text-sm"
              >
                Something went wrong
              </motion.span>
            )}
          </motion.div>
        </Hint>
      </div>
    );
  }

  return (
    <motion.ul className="flex-1 flex flex-col gap-y-1 w-full">
      {data &&
        data.map((board) => {
          return (
            <motion.li
              layout
              key={board.id}
              onClick={() => router.push(`/board/${board.id}`)}
              className="cursor-pointer"
            >
              {open && (
                <>
                  <motion.div
                    layout
                    className="flex items-center border-2 border-transparent justify-center gap-x-2 bg-background p-2 rounded-md hover:bg-black text-teal-500 hover:border-teal-500 transitions"
                  >
                    <motion.div layout>
                      <SidebarIcon className="size-6" />
                    </motion.div>
                    <motion.span
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.125 }}
                      className="text-md font-medium"
                    >
                      {board.title}
                    </motion.span>
                  </motion.div>
                </>
              )}
              {!open && (
                <Hint label={board.title} side="right" align="center">
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.125 }}
                    className="size-10 flex items-center justify-center bg-background border-2 border-transparent rounded-md text-lg font-semibold text-teal-500 hover:bg-black hover:border-teal-500 transition"
                  >
                    {extractAlphabets(board.title)}
                  </motion.div>
                </Hint>
              )}
            </motion.li>
          );
        })}
      <Hint hide={open} label="Add new board" side="right" align="center">
        <motion.li
          layout
          className="flex flex-row mt-4 items-center border-2 border-transparent justify-center gap-x-2 bg-black p-2 rounded-md  text-primary hover:border-primary transitions cursor-pointer"
          onClick={() => setOpenBoardModal(!openBoardModal)}
        >
          <motion.div layout>
            <PlusIcon className="size-6 font-bold" />
          </motion.div>
          {open && (
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
              className="font-semibold"
            >
              Add new board
            </motion.span>
          )}
        </motion.li>
      </Hint>
    </motion.ul>
  );
};
