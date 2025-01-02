"use client";

import { ResponsiveModal } from "@/components/custom-components/responsive-modal";
import { useUpdateColumnModal } from "@/features/columns/store/use-update-column-modal";
import { UpdateColumnWrapper } from "@/features/columns/components/update-column-wrapper";

export const UpdateColumnModal = () => {
  const { id, close } = useUpdateColumnModal();

  return (
    <ResponsiveModal open={!!id} onOpenChange={close}>
      {id && <UpdateColumnWrapper id={id} onCancel={close} />}
    </ResponsiveModal>
  );
};
