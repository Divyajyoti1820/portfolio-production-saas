"use client";

import { useUpdateBoardModal } from "@/features/boards/store/use-update-board-modal";
import { ResponsiveModal } from "@/components/custom-components/responsive-modal";
import { UpdateBoardWrapper } from "@/features/boards/components/update-board-wrapper";

export const UpdateBoardModal = () => {
  const { id, close } = useUpdateBoardModal();

  return (
    <ResponsiveModal open={!!id} onOpenChange={close}>
      {id && <UpdateBoardWrapper id={id} onCancel={close} />}
    </ResponsiveModal>
  );
};
