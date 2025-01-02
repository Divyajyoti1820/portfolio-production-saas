"use client";

import { ResponsiveModal } from "@/components/custom-components/responsive-modal";
import { useShowTaskModal } from "@/features/tasks/store/use-show-task-modal";
import { ShowTaskWrapper } from "@/features/tasks/components/show-task-wrapper";

export const ShowTaskModal = () => {
  const { id: taskId, close } = useShowTaskModal();

  return (
    <ResponsiveModal open={!!taskId} onOpenChange={close}>
      {taskId && <ShowTaskWrapper onCancel={close} id={taskId} />}
    </ResponsiveModal>
  );
};
