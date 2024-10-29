import { Edit2Icon, Trash2Icon } from "lucide-react";

import { TaskList } from "./task-list";
import { useDeleteColumn } from "@/features/columns/api/use-delete-column";
import { toast } from "sonner";
import { useConfirmModal } from "@/hooks/use-confirm-modal";
import { useUpdateColumnModal } from "@/features/columns/store/use-update-column-modal";

type Props = {
  data: { id: string; boardId: string; title: string };
  boardId: string;
};

export const ColumnItem = ({ data, boardId }: Props) => {
  const [ConfirmationDialog, confirm] = useConfirmModal({
    title: "Are you sure?",
    message: "If you delete this column underlying all task will be deleted.",
  });

  const deleteColumn = useDeleteColumn(data.id, boardId);
  const deleteBoardHandler = async () => {
    const ok = await confirm();
    if (!ok) {
      return;
    }

    deleteColumn.mutate(
      { boardId },
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

  const { onOpen } = useUpdateColumnModal((state) => state);

  return (
    <div className="w-[260px] h-full  rounded-md">
      <ConfirmationDialog />
      <div className="w-full px-1.5 h-10 flex items-center justify-between rounded-md mb-4">
        <p className="text-md text-purple-500 font-bold truncate">
          {data.title}
        </p>
        <div className="flex gap-x-1 items-center">
          <button
            onClick={() => onOpen(data.id)}
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
      <TaskList />
    </div>
  );
};
