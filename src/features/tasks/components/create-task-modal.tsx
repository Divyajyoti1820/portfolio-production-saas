"use client";

import { ResponsiveModal } from "@/components/custom-components/responsive-modal";
import { useCreateTaskModal } from "@/features/tasks/store/use-create-task-modal";
import { CreateTaskWrapper } from "./create-task-wrapper";

export const CreateTaskModal = () => {
  const { id: boardId, close } = useCreateTaskModal();

  return (
    <ResponsiveModal open={!!boardId} onOpenChange={close}>
      {boardId && <CreateTaskWrapper onCancel={close} id={boardId} />}
    </ResponsiveModal>
  );
};
