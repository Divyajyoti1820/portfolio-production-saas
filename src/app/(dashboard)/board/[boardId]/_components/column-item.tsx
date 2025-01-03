import { AlertOctagonIcon, Edit2Icon, Trash2Icon } from "lucide-react";

import { TaskList } from "./task-list";
import { useDeleteColumn } from "@/features/columns/api/use-delete-column";
import { toast } from "sonner";
import { useConfirmModal } from "@/hooks/use-confirm-modal";
import { useUpdateColumnModal } from "@/features/columns/store/use-update-column-modal";
import { useGetTasks } from "@/features/tasks/api/use-get-tasks";
import { ScrollBar } from "@/components/ui/scroll-area";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  data: { id: string; boardId: string; title: string };
};

export const ColumnItem = ({ data }: Props) => {
  const { data: tasks, isLoading: tasksLoading } = useGetTasks({
    boardId: data.boardId,
    columnId: data.id,
  });

  const [ConfirmationDialog, confirm] = useConfirmModal({
    title: "Are you sure?",
    message: "If you delete this column underlying all task will be deleted.",
  });

  const deleteColumn = useDeleteColumn();
  const deleteBoardHandler = async () => {
    const ok = await confirm();
    if (!ok) {
      return;
    }

    deleteColumn.mutate(
      { param: { id: data.id }, json: { boardId: data.boardId } },
      {
        onSuccess: () => {
          toast.success("Column removed successfully");
        },
        onError: () => {
          toast.error("Failed to remove column");
        },
      }
    );
  };

  const { open: setOpenColumnUpdateModal } = useUpdateColumnModal();

  return (
    <div className="w-[260px] h-full  rounded-md">
      <ConfirmationDialog />
      <div className="w-full px-1.5 h-10 flex items-center justify-between rounded-md mb-4">
        <p className="text-md text-purple-500 font-bold truncate">
          {data.title}
        </p>
        <div className="flex gap-x-1 items-center">
          <button
            onClick={() => setOpenColumnUpdateModal(data.id)}
            className="text-white hover:text-primary disabled:text-primary/50 transition"
          >
            <Edit2Icon className="size-4" />
          </button>
          <button
            className="text-white hover:text-destructive disabled:text-destructive/50 transition"
            onClick={deleteBoardHandler}
          >
            <Trash2Icon className="size-4" />
          </button>
        </div>
      </div>

      {tasksLoading && (
        <ScrollArea className="w-[260px] h-[calc(100%-56px)] rounded-md">
          <div className="h-full w-[260px] flex flex-col gap-y-3 items-start justify-start">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="w-[260px] h-full bg-black/40" />
            ))}
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      )}

      {!tasksLoading && !tasks && (
        <ScrollArea className="w-[260px] h-[calc(100%-56px)] rounded-md">
          <div className="h-full w-[260px] flex flex-col gap-y-3 items-center justify-center bg-black/20">
            <AlertOctagonIcon className="text-destructive" />
            <p className="text-destructive text-sm">Something went wrong</p>
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      )}

      {tasks && <TaskList data={tasks} boardId={data.boardId} />}
    </div>
  );
};
