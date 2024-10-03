"use client";

import React from "react";
import { motion } from "framer-motion";
import { useGetBoards } from "@/features/boards/api/use-get-boards";
import { Skeleton } from "@/components/ui/skeleton";
import { useRouter } from "next/navigation";
import { SidebarIcon } from "lucide-react";
import { Hint } from "@/components/hint";
import { extractAlphabets } from "@/features/boards/util";

type Props = {
  open: boolean;
};

export const BoardsList = ({ open }: Props) => {
  const router = useRouter();
  const { data, isLoading, isError } = useGetBoards();

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
    return;
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
                <Hint label={board.title} side="right" align="end">
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
    </motion.ul>
  );
};
