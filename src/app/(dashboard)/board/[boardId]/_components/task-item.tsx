/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useConfirmModal } from "@/hooks/use-confirm-modal";
import { useGetColumnId } from "@/hooks/use-get-column-id";
import { useGetTaskId } from "@/hooks/use-get-task-id";

import { useCopyTask } from "@/features/tasks/api/use-copy-task";
import { useRemoveTask } from "@/features/tasks/api/use-remove-task";
import { useUpdateTaskModal } from "@/features/tasks/store/use-update-task-modal";
import { useShowTaskModal } from "@/features/tasks/store/use-show-task-modal";

import {
  GetRandomBorderColor,
  CapitalizeFirstLetter,
} from "@/features/tasks/utils";

import { CopyIcon, EditIcon, TrashIcon } from "lucide-react";

import { toast } from "sonner";
import { cn } from "@/lib/utils";

type Props = {
  data: {
    id: string;
    title: string;
    description: string;
    columnId: string;
    subtasks: {
      title: string;
      isCompleted: boolean;
    }[];
  };
  boardId: string;
};

export const TaskItem = ({ data, boardId }: Props) => {
  const { id: taskId } = useGetTaskId();
  const { id: columnId, setId: setColumnId } = useGetColumnId();

  const { open: setIsOpenUpdateTaskModal } = useUpdateTaskModal();
  const { open: setIsOpenShowTaskModal } = useShowTaskModal();
  const [ConfirmationDialog, confirm] = useConfirmModal({
    title: "Are you sure?",
    message:
      "You are going to delete this task. This action cannot be reversed all underlying data will be removed.",
  });

  /* Remove Task Handler */
  const removeTask = useRemoveTask();
  const removeTaskHandler = async () => {
    const ok = await confirm();
    if (!ok) return;

    removeTask.mutate(
      { param: { id: taskId }, json: { boardId, columnId } },
      {
        onSuccess: () => {
          toast.success("Removed task successfully");
        },

        onError: () => {
          toast.error("Failed to remove task");
        },
      }
    );
  };
  /* Remove Task Handler */

  /* Copy Task Handler */
  const copyTask = useCopyTask();
  const copyTaskHandler = () => {
    copyTask.mutate(
      { param: { id: data.id, columnId: data.columnId }, json: { boardId } },
      {
        onSuccess: () => {
          toast.success("Task copied successfully");
        },
        onError: () => {
          toast.error("Failed to copy task");
        },
      }
    );
  };
  /* Copy Task Handler */

  /* No. of completed Subtask */
  const completedSubtaskCount = data.subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;
  /* No. of completed Subtask */

  const borderColor = GetRandomBorderColor();

  return (
    <div
      className={cn(
        "w-full h-32 flex flex-row items-center justify-start rounded-md  bg-black/40  border-b-2",
        borderColor
      )}
    >
      <ConfirmationDialog />
      <div
        onClick={() => {
          setColumnId(data.columnId);
          setIsOpenShowTaskModal(data.id);
        }}
        className="h-full w-[85%] flex flex-1 flex-col gap-y-2 items-start justify-center p-2 hover:bg-black transition cursor-pointer"
      >
        <p className="text-sm text-indigo-500 font-bold">
          {data.title.length > 25
            ? `${CapitalizeFirstLetter(data.title.slice(0, 24))}...`
            : `${CapitalizeFirstLetter(data.title)}`}
        </p>
        <p className="text-[10px] text-wrap text-muted-foreground">
          {CapitalizeFirstLetter(data.description.slice(0, 100))}.....
        </p>
        <p className="text-xs">
          {completedSubtaskCount} of {data.subtasks.length}{" "}
          <span className="text-blue-500 font-medium">Subtasks</span>
        </p>
      </div>
      <div className="h-full w-[15%] flex flex-col items-center justify-center gap-y-3">
        <button
          disabled={copyTask.isPending}
          onClick={copyTaskHandler}
          className="bg-green-500 p-1 rounded-md hover:bg-green-500/50 transition"
        >
          <CopyIcon className="size-4" />
        </button>
        <button
          onClick={() => {
            setColumnId(data.columnId);
            setIsOpenUpdateTaskModal(data.id);
          }}
          className="bg-blue-700 p-1 rounded-md hover:bg-blue-500 transition"
        >
          <EditIcon className="size-4" />
        </button>
        <button
          onClick={removeTaskHandler}
          className="bg-red-800 p-1 rounded-md hover:bg-destructive transition"
        >
          <TrashIcon className="size-4" />
        </button>
      </div>
    </div>
  );
};
