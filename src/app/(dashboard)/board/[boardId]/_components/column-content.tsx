/* eslint-disable prefer-const */
"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ColumnItem } from "./column-item";

import { Skeleton } from "@/components/ui/skeleton";
import { AlertOctagonIcon, PlusIcon } from "lucide-react";
import { useCreateColumnModal } from "@/features/columns/store/use-create-column-modal";
import { MAX_COLUMNS } from "@/lib/constants";
import { useGetColumnsWithTasks } from "@/features/columns/api/use-get-columns-with-tasks";
import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import { useCallback, useEffect, useState } from "react";

type Props = {
  boardId: string;
};

function reOrder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export const ColumnContent = ({ boardId }: Props) => {
  const { open } = useSidebar();
  const { setIsOpen: setIsCreateColumnModalOpen } = useCreateColumnModal();

  const { data: mainData, isLoading: mainDataLoading } = useGetColumnsWithTasks(
    { boardId: boardId }
  );

  const [data, setData] = useState(mainData);

  useEffect(() => {
    setData(mainData);
  }, [mainData]);

  const onDragEnd = useCallback((result: DropResult) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (!data) {
      return;
    }

    let newData = [...data];

    const sourceList = newData.find(
      (list) => list.column.id === source.droppableId
    );
    const destList = newData.find(
      (list) => list.column.id === destination.droppableId
    );

    if (!sourceList || !destList) {
      return;
    }

    if (!sourceList.tasks) {
      sourceList.tasks = [];
    }

    if (!destList.tasks) {
      destList.tasks = [];
    }

    if (source.droppableId === destination.droppableId) {
      const reorderedTask = reOrder(
        sourceList.tasks,
        source.index,
        destination.index
      );

      reorderedTask.forEach((task, idx) => {
        task.position = idx;
      });

      sourceList.tasks = reorderedTask;
      setData(newData);

      //Trigger Mutation to update tasks
    } else {
      const [movedTask] = sourceList.tasks.splice(source.index, 1);
      movedTask.columnId = destination.droppableId;

      destList.tasks.splice(destination.index, 0, movedTask);

      sourceList.tasks.forEach((task, idx) => {
        task.position = idx;
      });

      destList.tasks.forEach((task, idx) => {
        task.position = idx;
      });

      setData(newData);
      //Trigger mutation of API
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (mainDataLoading) {
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
  if (!mainData) {
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
    <DragDropContext onDragEnd={onDragEnd}>
      <ScrollArea
        className={cn(
          " w-[calc(100vw-4rem)]  h-[calc(100vh-3.5rem)]  p-1 overflow-x-auto",
          open && "w-[calc(100vw-16rem)]"
        )}
      >
        <div className="w-full h-[calc(100vh-4rem)] whitespace-nowrap flex gap-x-3">
          {mainData.map((item) => (
            <ColumnItem
              key={item.column.id}
              data={item}
              loadingStatus={mainDataLoading}
            />
          ))}
          {mainData.length !== MAX_COLUMNS && (
            <div
              onClick={() => setIsCreateColumnModalOpen(true)}
              className="w-[180px] h-full ml-auto flex flex-col items-center justify-center bg-black/60 rounded-md hover:bg-black transition text-blue-500 cursor-pointer"
            >
              <PlusIcon className="size-8" />
              <p className="text-md font-semibold">Add New Column</p>
            </div>
          )}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </DragDropContext>
  );
};
