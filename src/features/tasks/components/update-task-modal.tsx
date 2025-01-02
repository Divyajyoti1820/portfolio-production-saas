"use client";

import { useUpdateTaskModal } from "@/features/tasks/store/use-update-task-modal";
import { ResponsiveModal } from "@/components/custom-components/responsive-modal";
import { UpdateTaskWrapper } from "@/features/tasks/components/update-task-wrapper";

export const UpdateTaskModal = () => {
  const { taskId, close } = useUpdateTaskModal();

  return (
    <ResponsiveModal open={!!taskId} onOpenChange={close}>
      {taskId && <UpdateTaskWrapper onCancel={close} id={taskId} />}
    </ResponsiveModal>
  );
};
