"use client";

import { useGetBoardId } from "@/hooks/use-get-board-id";
import { ShowTaskForm } from "@/features/tasks/components/show-task-form";
import { useGetColumnId } from "@/hooks/use-get-column-id";
import { useGetTask } from "@/features/tasks/api/use-get-task";
import { useGetColumn } from "@/features/columns/api/use-get-column";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card";
import { Loader2Icon } from "lucide-react";

type Props = {
  onCancel: () => void;
  id: string;
};

export const ShowTaskWrapper = ({ onCancel, id }: Props) => {
  const boardId = useGetBoardId();
  const { id: columnId } = useGetColumnId();

  const { data: task, isLoading: taskLoading } = useGetTask({
    boardId,
    columnId,
    taskId: id,
  });

  const { data: column, isLoading: columnLoading } = useGetColumn({
    boardId,
    columnId,
  });

  const isLoading = taskLoading || columnLoading;

  if (isLoading) {
    return (
      <Card className="w-full h-[714px] flex items-center justify-center border-none shadow-none">
        <CardContent>
          <Loader2Icon className="size-5 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (!task || !column) {
    return null;
  }

  const taskData = {
    id: task.id,
    title: task.title,
    description: task.description,
    columnId: task.columnId,
  };

  return (
    <ShowTaskForm
      onCancel={onCancel}
      initialData={task.subtasks}
      boardId={boardId}
      task={taskData}
      columnTitle={column.title}
    />
  );
};
