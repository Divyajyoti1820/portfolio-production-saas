import { AlertOctagonIcon, Edit2Icon, Trash2Icon } from "lucide-react";

import { TaskList } from "./task-list";
import { useDeleteColumn } from "@/features/columns/api/use-delete-column";
import { toast } from "sonner";
import { useConfirmModal } from "@/hooks/use-confirm-modal";
import { useUpdateColumnModal } from "@/features/columns/store/use-update-column-modal";
import { ColumnWithTasks } from "@/features/columns/types";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  data: ColumnWithTasks;
  loadingStatus: boolean;
};

export const ColumnItem = ({ data, loadingStatus }: Props) => {
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
      { param: { id: data.column.id }, json: { boardId: data.column.boardId } },
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
    <div className="w-[260px] h-[calc(100vh-3.5rem)]  rounded-md">
      <ConfirmationDialog />
      <div className="w-full px-1.5 h-10 flex items-center justify-between rounded-md mb-4">
        <p className="text-md text-purple-500 font-bold truncate">
          {data.column.title}
        </p>
        <div className="flex gap-x-1 items-center">
          <button
            onClick={() => setOpenColumnUpdateModal(data.column.id)}
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

      {loadingStatus && (
        <div className="h-[calc(100%-3.5rem)] w-[260px] flex flex-col gap-y-3 items-start justify-start">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="w-[260px] h-full bg-black/40" />
          ))}
        </div>
      )}

      {!loadingStatus && !data && (
        <div className="h-[calc(100%-3.5rem)] w-[260px] flex flex-col gap-y-3 items-center justify-center bg-black/20">
          <AlertOctagonIcon className="text-destructive" />
          <p className="text-destructive text-sm">Something went wrong</p>
        </div>
      )}

      {data && <TaskList data={data} />}
    </div>
  );
};
