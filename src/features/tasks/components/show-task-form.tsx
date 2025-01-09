"use client";

import React, { useState } from "react";

import { useShowTaskModal } from "@/features/tasks/store/use-show-task-modal";

import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUpdateSubtask } from "@/features/tasks/api/use-update-subtask";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { create } from "mutative";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  onCancel: () => void;
  initialData: {
    title: string;
    isCompleted: boolean;
  }[];
  boardId: string;
  task: {
    id: string;
    title: string;
    description: string;
    columnId: string;
  };
  columnTitle: string;
};

export const ShowTaskForm = ({
  onCancel,
  initialData,
  boardId,
  task,
  columnTitle,
}: Props) => {
  const { close } = useShowTaskModal();

  const [subtasks, setSubtasks] =
    useState<{ title: string; isCompleted: boolean }[]>(initialData);

  const updateSubtaskStatus = (index: number, isCompleted: boolean) => {
    const updatedSubtasks = create(subtasks, (draft) => {
      draft[index].isCompleted = isCompleted;
    });
    setSubtasks(updatedSubtasks);
  };

  const handleClose = () => {
    setSubtasks([]);
    onCancel?.();
    close();
  };

  const mutation = useUpdateSubtask();
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate(
      {
        param: { id: task.id, columnId: task.columnId },
        json: { boardId, subtasks },
      },
      {
        onSuccess: () => {
          toast.success("Progress updated successfully");
          handleClose();
        },
        onError: () => {
          toast.error("Failed to update progress");
        },
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
        <CardDescription>{task.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-y-2">
          <Label>Column</Label>
          <Input value={columnTitle} disabled className="bg-black" />
        </div>
      </CardContent>
      <CardContent>
        <form onSubmit={onSubmitHandler} className="space-y-3">
          <Label>Subtasks</Label>
          {subtasks?.map((subtask, index) => (
            <div
              key={index}
              className={cn(
                "w-full flex items-center justify-between flex-row bg-black/30 hover:bg-black p-2 rounded-md transition",
                subtask.isCompleted && "bg-black"
              )}
            >
              <Label
                htmlFor={subtask.title}
                className={cn(
                  "text-sm flex-1 cursor-pointer",
                  subtask.isCompleted && "line-through"
                )}
              >
                {subtask.title}
              </Label>
              <Checkbox
                id={subtask.title}
                defaultChecked={subtask.isCompleted}
                onCheckedChange={(checked: boolean) =>
                  updateSubtaskStatus(index, checked)
                }
              />
            </div>
          ))}
          <CardFooter className="w-full flex items-center justify-end gap-x-2">
            <Button
              onClick={close}
              type="button"
              className="bg-destructive hover:bg-destructive/50 transition"
            >
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};
