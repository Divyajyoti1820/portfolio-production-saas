"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ColumnItem } from "./column-item";
import { useGetBoardId } from "@/hooks/use-get-board-id";
import { useGetColumns } from "@/features/columns/api/use-get-columns";

import { Skeleton } from "@/components/ui/skeleton";
import { AlertOctagonIcon, PlusIcon } from "lucide-react";
import { useCreateColumnModal } from "@/features/columns/store/use-create-column-modal";
import { MAX_COLUMNS } from "@/lib/constants";

export const ColumnContent = () => {
  const { open } = useSidebar();
  const boardId = useGetBoardId();
  const [openCreateColumnModal, setCreateColumnModal] = useCreateColumnModal();

  const {
    data: ColumnData,
    isLoading: ColumnLoading,
    isError: ColumnError,
  } = useGetColumns(boardId);

  if (ColumnLoading) {
    return (
      <ScrollArea
        className={cn(
          " w-[calc(100vw-4rem)]  h-[calc(100vh-3.5rem)]  p-1 overflow-x-auto",
          open && "w-[calc(100vw-16rem)]"
        )}
      >
        <div className="w-full h-[calc(100vh-4rem)] whitespace-nowrap flex gap-x-3">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="w-[260px] h-full bg-black/50" />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    );
  }
  if (!ColumnData || ColumnError) {
    return (
      <ScrollArea
        className={cn(
          " w-[calc(100vw-4rem)]  h-[calc(100vh-3.5rem)]  p-1 overflow-x-auto",
          open && "w-[calc(100vw-16rem)]"
        )}
      >
        <div className="w-full h-[calc(100vh-4rem)] whitespace-nowrap flex flex-col items-center justify-center gap-x-3 text-destructive">
          <AlertOctagonIcon className="size-10" />
          <p className="text-2xl">Something went wrong</p>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    );
  }

  return (
    <ScrollArea
      className={cn(
        " w-[calc(100vw-4rem)]  h-[calc(100vh-3.5rem)]  p-1 overflow-x-auto",
        open && "w-[calc(100vw-16rem)]"
      )}
    >
      <div className="w-full h-[calc(100vh-4rem)] whitespace-nowrap flex gap-x-3">
        {ColumnData.map((column) => (
          <ColumnItem key={column.id} data={column} boardId={boardId} />
        ))}
        {ColumnData.length !== MAX_COLUMNS && (
          <div
            onClick={() => setCreateColumnModal(!openCreateColumnModal)}
            className="w-[180px] h-full ml-auto flex flex-col items-center justify-center bg-black/60 rounded-md hover:bg-black transition text-blue-500 cursor-pointer"
          >
            <PlusIcon className="size-8" />
            <p className="text-md font-semibold">Add New Column</p>
          </div>
        )}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
