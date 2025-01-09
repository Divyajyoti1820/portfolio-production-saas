/* eslint-disable prefer-const */
"use client";

import { cn } from "@/lib/utils";
import { ColumnItem } from "./column-item";
import { useSidebar } from "@/components/ui/sidebar";

import { Skeleton } from "@/components/ui/skeleton";
import { PlusIcon } from "lucide-react";
import { useCreateColumnModal } from "@/features/columns/store/use-create-column-modal";
import { MAX_COLUMNS } from "@/lib/constants";

import { DragDropContext, type DropResult } from "@hello-pangea/dnd";
import { useEffect, useState } from "react";
import { ColumnWithTasks } from "@/features/columns/types";
import { useBulkUpdateTasks } from "@/features/tasks/api/use-bulk-update-tasks";

import { toast } from "sonner";

type Props = {
  mainData: ColumnWithTasks[];
  mainDataLoadingStatus: boolean;
  boardId: string;
};

function reOrder<T>(list: T[], startIndex: number, endIndex: number) {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
}

export const ColumnContent = ({
  mainData,
  mainDataLoadingStatus,
  boardId,
}: Props) => {
  const { open } = useSidebar();
  const { setIsOpen: setIsCreateColumnModalOpen } = useCreateColumnModal();

  const [data, setData] = useState(mainData);

  const { mutate: bulkUpdate } = useBulkUpdateTasks();

  useEffect(() => {
    setData(mainData);
  }, [mainData]);

  const onDragEnd = (result: DropResult) => {
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
      const reorderedTasks = reOrder(
        sourceList.tasks,
        source.index,
        destination.index
      );

      reorderedTasks.forEach((task, idx) => {
        task.position = idx;
      });

      sourceList.tasks = reorderedTasks;

      const updatePayload: {
        id: string;
        columnId: string;
        position: number;
      }[] = reorderedTasks.map((task) => ({
        id: task.id,
        columnId: task.columnId,
        position: task.position,
      }));

      const isValidPayload = updatePayload.every(
        (task) => task.id && task.columnId && typeof task.position === "number"
      );

      if (isValidPayload) {
        setData(newData);
        bulkUpdate({ json: { boardId, tasks: updatePayload } });
      } else {
        toast.error("Payload error");
      }
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

      const updatePayload: {
        id: string;
        columnId: string;
        position: number;
      }[] = destList.tasks.map((task) => ({
        id: task.id,
        columnId: task.columnId,
        position: task.position,
      }));
      const isValidPayload = updatePayload.every(
        (task) => task.id && task.columnId && typeof task.position === "number"
      );

      if (isValidPayload) {
        setData(newData);
        bulkUpdate({ json: { boardId, tasks: updatePayload } });
      } else {
        toast.error("Payload error");
      }
    }
  };

  if (mainDataLoadingStatus) {
    return (
      <div
        className={cn(
          "w-[calc(100vw-4rem)] h-[calc(100vh-3.5rem)] whitespace-nowrap flex gap-x-3",
          open && "w-[calc(100vw-1rem)]"
        )}
      >
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="w-[260px] h-full bg-black/50" />
        ))}
      </div>
    );
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        className={cn(
          "w-[calc(100vw-4rem)] h-[calc(100vh-3.5rem)] whitespace-nowrap p-1 flex gap-x-3",
          open && "w-[calc(100vw-12rem)]"
        )}
      >
        {mainData.map((item) => (
          <ColumnItem
            key={item.column.id}
            data={item}
            loadingStatus={mainDataLoadingStatus}
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
    </DragDropContext>
  );
};
