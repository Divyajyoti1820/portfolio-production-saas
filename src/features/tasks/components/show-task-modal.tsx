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

export const ShowTaskModal = () => {
  const [open, setOpen] = useShowTaskModal();
  const boardId = useGetBoardId();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [columnId, _setColumnId] = useGetColumnId();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [taskId, _setTaskId] = useGetTaskId();

  const [subtasks, setSubtasks] = useState<
    { title: string; isCompleted: boolean }[]
  >([]);

  const addSubtaskInput = () => {
    setSubtasks([...subtasks, { title: "", isCompleted: false }]);
  };

  const updateSubtaskStatus = (index: number, isCompleted: boolean) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index] = { ...updatedSubtasks[index], isCompleted };
    setSubtasks(updatedSubtasks);
  };

  const removeSubtask = (index: number) => {
    const updatedSubtasks = subtasks.filter((_, i) => i !== index);
    setSubtasks(updatedSubtasks);
  };

  const {
    data: task,
    isLoading: taskLoading,
    isError: taskError,
  } = useGetTask(boardId, columnId!, taskId!);

  useEffect(() => {
    if (task) {
      setSubtasks(task.subtasks);
    }
  }, [task]);

  if (taskLoading) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
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

  if (!task || taskError) {
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
        <form onSubmit={() => {}} className="space-y-2">
          <Label>Subtasks</Label>
          {subtasks.map((subtask, index) => (
            <div
              key={index}
              className="w-full flex items-center justify-between flex-row bg-black/60 p-2"
            >
              <p className="text-sm flex-1">{subtask.title}</p>
              <input type="checkbox" className="" />
            </div>
          ))}
        </form>
      </DialogContent>
    </Dialog>
  );
};
