"use client";

import { CreateTaskForm } from "@/features/tasks/components/create-task-form";

import { useGetColumns } from "@/features/columns/api/use-get-columns";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2Icon } from "lucide-react";

type Props = {
  id: string;
  onCancel: () => void;
};

export const CreateTaskWrapper = ({ id: boardId, onCancel }: Props) => {
  const { data: columns, isLoading: columnLoading } = useGetColumns({
    boardId,
  });

  if (columnLoading) {
    return (
      <Card className="w-full h-[714px] flex items-center justify-center border-none shadow-none">
        <CardContent>
          <Loader2Icon className="size-5 animate-spin text-primary" />
        </CardContent>
      </Card>
    );
  }

  if (!columns) {
    return null;
  }

  return (
    <CreateTaskForm boardId={boardId} columns={columns} onCancel={onCancel} />
  );
};
