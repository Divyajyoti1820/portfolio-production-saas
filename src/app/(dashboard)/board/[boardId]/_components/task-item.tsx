/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useDeleteTask } from "@/features/tasks/api/use-delete-task";
import { useUpdateTaskModal } from "@/features/tasks/store/use-update-task.modal";
import { useConfirmModal } from "@/hooks/use-confirm-modal";
import { useGetColumnId } from "@/hooks/use-get-column-id";
import { useGetTaskId } from "@/hooks/use-get-task-id";
import { EditIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";

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
  const [ConfirmationDialog, confirm] = useConfirmModal({
    title: "Are you sure?",
    message:
      "You are going to delete this task. This action cannot be reversed all underlying data will be removed.",
  });
  const [_taskId, setTaskId] = useGetTaskId();
  const [_columnId, setColumnId] = useGetColumnId();

  const removeTask = useDeleteTask(data.id, boardId, data.columnId);
  const { columnId } = data;

  const useRemoveTaskHandler = async () => {
    const ok = await confirm();
    if (!ok) return;

    removeTask.mutate(
      { boardId, columnId },
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

  const [openUpdateTaskModal, setOpenUpdateTaskModal] = useUpdateTaskModal();

  return (
    <>
      <ConfirmationDialog />
      <div className="w-full h-32 flex flex-row items-center justify-start rounded-md cursor-pointer p-3 bg-black/40 hover:bg-black transition">
        <div className="h-full w-[85%] flex flex-1 flex-col gap-y-2 items-start justify-center">
          <p className="text-sm text-indigo-500 font-bold">{data.title}</p>
          <p className="text-[10px] text-wrap text-muted-foreground">
            {data.description.slice(0, 100)}.....
          </p>
          <p className="text-xs">
            0 of {data.subtasks.length}{" "}
            <span className="text-blue-500 font-medium">Subtasks</span>
          </p>
        </div>
        <div className="h-full w-[15%] flex flex-col items-center justify-center gap-y-3">
          <button
            onClick={() => {
              setTaskId(data.id);
              setColumnId(columnId);
              setOpenUpdateTaskModal(!openUpdateTaskModal);
            }}
            className="bg-blue-700 p-1 rounded-md hover:bg-blue-500 transition"
          >
            <EditIcon className="size-4" />
          </button>
          <button
            onClick={useRemoveTaskHandler}
            className="bg-red-800 p-1 rounded-md hover:bg-destructive transition"
          >
            <TrashIcon className="size-4" />
          </button>
        </div>
      </div>
    </>
  );
};
