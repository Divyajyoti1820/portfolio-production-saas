/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useGetTask } from "@/features/tasks/api/use-get-task";
import { useGetBoardId } from "@/hooks/use-get-board-id";
import { useGetColumnId } from "@/hooks/use-get-column-id";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2Icon } from "lucide-react";
import { UpdateTaskForm } from "@/features/tasks/components/update-task-form";
import { useGetColumns } from "@/features/columns/api/use-get-columns";

type Props = {
  onCancel: () => void;
  id: string;
};

export const UpdateTaskWrapper = ({ onCancel, id }: Props) => {
  const boardId = useGetBoardId();

  const { id: columnId } = useGetColumnId();

  const { data: initialData, isLoading: initialDataLoading } = useGetTask({
    boardId,
    columnId,
    taskId: id,
  });
  const { data: columns, isLoading: columnLoading } = useGetColumns({
    boardId,
  });

  const isLoading = initialDataLoading || columnLoading;

  if (isLoading) {
    return (
      <Card className="w-full h-[714px] flex items-center justify-center border-none shadow-none">
        <CardContent>
          <Loader2Icon className="size-5 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (!initialData || !columns) {
    return null;
  }

  return (
    <UpdateTaskForm
      onCancel={onCancel}
      initialData={initialData}
      columns={columns}
      boardId={boardId}
    />
  );
};
