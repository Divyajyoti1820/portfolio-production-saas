"use client";

import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useGetBoardId } from "@/hooks/use-get-board-id";
import { useGetColumnId } from "@/hooks/use-get-column-id";
import { useGetTaskId } from "@/hooks/use-get-task-id";
import { useGetTask } from "@/features/tasks/api/use-get-task";
import { useShowTaskModal } from "@/features/tasks/store/use-show-task-modal";
import { Separator } from "@/components/ui/separator";
import { AlertOctagonIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUpdateSubtask } from "../api/use-update-subtask";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { useGetColumn } from "@/features/columns/api/use-get-column";
import { Skeleton } from "@/components/ui/skeleton";
import { create } from "mutative";

export const ShowTaskModal = () => {
  const [open, setOpen] = useShowTaskModal();
  const boardId = useGetBoardId();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [columnId, setColumnId] = useGetColumnId();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [taskId, setTaskId] = useGetTaskId();
  const [subtasks, setSubtasks] = useState<
    { title: string; isCompleted: boolean }[]
  >([]);

  const {
    data: task,
    isLoading: taskLoading,
    isError: taskError,
  } = useGetTask(boardId, columnId!, taskId!);

  const {
    data: column,
    isLoading: columnIsLoading,
    isError: columnError,
  } = useGetColumn(boardId, columnId!);

  useEffect(() => {
    if (task) {
      setSubtasks(task.subtasks);
    }
  }, [task]);

  const updateSubtaskStatus = (index: number, isCompleted: boolean) => {
    const updatedSubtasks = create(subtasks, (draft) => {
      draft[index].isCompleted = isCompleted;
    });
    setSubtasks(updatedSubtasks);
  };

  const mutation = useUpdateSubtask(boardId, columnId!, taskId!);
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate(
      { boardId, subtasks },
      {
        onSuccess: () => {
          toast.success("Progress updated successfully");
          setSubtasks([]);
          setColumnId("");
          setTaskId("");
          setOpen(false);
        },
        onError: () => {
          toast.error("Failed to update progress");
        },
      }
    );
  };

  const handleClose = () => {
    setSubtasks([]);
    setOpen(false);
  };

  if (taskLoading) {
    return (
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <Separator className="h-6 w-[400px] rounded-sm bg-black/70" />
            <Separator className="h-6 w-[460px] rounded-sm bg-black/70" />
          </DialogHeader>
          <div className="h-[400px]">
            <Separator className="h-[320px] w-[460px] rounded-sm bg-black/70" />
            <DialogFooter className="w-full h-[80px]  flex items-center justify-center p-2">
              <Separator className="h-10 w-[160px] rounded-sm bg-black/70" />
              <Separator className="h-10 w-[160px] rounded-sm bg-black/70" />
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (!task || taskError || columnError) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <Separator className="h-6 w-[400px] rounded-sm bg-destructive" />
            <Separator className="h-6 w-[460px] rounded-sm bg-destructive" />
          </DialogHeader>
          <div className="h-[400px] flex flex-col gap-y-4 items-center justify-center text-destructive">
            <AlertOctagonIcon className="size-10" />
            <p className="text-xl font-semibold">Something went wrong</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task?.title}</DialogTitle>
          <DialogDescription>{task?.description}</DialogDescription>
        </DialogHeader>
        {columnIsLoading ? (
          <div className="flex flex-col gap-y-2">
            <Label>Column</Label>
            <Skeleton className="w-full h-8 rounded-md" />
          </div>
        ) : (
          <div className="flex flex-col gap-y-2">
            <Label>Column</Label>
            <Input value={column?.title} disabled className="bg-black" />
          </div>
        )}

        <form onSubmit={onSubmitHandler} className="space-y-2">
          <Label>Subtasks</Label>
          {subtasks.map((subtask, index) => (
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
          <DialogFooter>
            <DialogClose>
              <Button className="bg-destructive hover:bg-destructive/50 transition">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">Update Subtask</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
