"use client";

import { UpdateColumnForm } from "@/features/columns/components/update-column-form";
import { useGetBoardId } from "@/hooks/use-get-board-id";
import { useGetColumn } from "@/features/columns/api/use-get-column";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2Icon } from "lucide-react";

type Props = {
  id: string;
  onCancel: () => void;
};

export const UpdateColumnWrapper = ({ id, onCancel }: Props) => {
  const boardId = useGetBoardId();

  const { data, isLoading } = useGetColumn({ boardId, columnId: id });

  if (isLoading) {
    return (
      <Card className="w-full h-[714px] flex items-center justify-center border-none shadow-none">
        <CardContent>
          <Loader2Icon className="size-5 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return null;
  }

  const initialData = {
    id: data.id,
    title: data.title,
    boardId: data.boardId,
  };

  return <UpdateColumnForm initialData={initialData} onCancel={onCancel} />;
};
