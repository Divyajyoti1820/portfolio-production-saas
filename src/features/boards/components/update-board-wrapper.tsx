"use client";

import { Loader2Icon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useGetBoard } from "@/features/boards/api/use-get-board";
import { UpdateBoardForm } from "@/features/boards/components/update-board-form";

type Props = {
  id: string;
  onCancel: () => void;
};

export const UpdateBoardWrapper = ({ id, onCancel }: Props) => {
  const { data: initialData, isLoading } = useGetBoard({
    boardId: id,
  });

  if (isLoading) {
    return (
      <Card className="w-full h-[714px] flex items-center justify-center border-none shadow-none">
        <CardContent>
          <Loader2Icon className="size-5 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (!initialData) {
    return null;
  }

  const boardData = {
    id: initialData.id,
    title: initialData.title,
  };

  return <UpdateBoardForm onCancel={onCancel} initialData={boardData} />;
};
