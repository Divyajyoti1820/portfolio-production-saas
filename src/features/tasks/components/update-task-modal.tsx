"use client";

import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  AlertOctagonIcon,
  Loader2Icon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";

import { useGetBoardId } from "@/hooks/use-get-board-id";
import { useGetColumns } from "@/features/columns/api/use-get-columns";
import { useUpdateTask } from "../api/use-update-task";
import { useGetTask } from "../api/use-get-task";
import { useGetColumnId } from "@/hooks/use-get-column-id";
import { useGetTaskId } from "@/hooks/use-get-task-id";
import { useUpdateTaskModal } from "@/features/tasks/store/use-update-task.modal";

const MAX_SUBTASKS = 4;

export const UpdateTaskModal = () => {
  const [open, setOpen] = useUpdateTaskModal();
  const boardId = useGetBoardId();
  const [presentColumnId, setPresentColumnId] = useGetColumnId();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [taskId, _setTaskId] = useGetTaskId();

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [columnId, setColumnId] = useState<string>("");
  const [subtasks, setSubtasks] = useState<
    { title: string; isCompleted: boolean }[]
  >([{ title: "", isCompleted: false }]);

  /* Fetching Data of the task */
  const {
    data: task,
    isLoading: taskLoading,
    isError: taskError,
  } = useGetTask(boardId, presentColumnId!, taskId!);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setColumnId(task.columnId);
      setSubtasks(task.subtasks);
    }
  }, [task]);
  /* Fetching Data of the task */

  /* Subtask operation handler  */
  const addSubtaskInput = () => {
    setSubtasks([...subtasks, { title: "", isCompleted: false }]);
  };
  const updateSubtask = (index: number, value: string) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index] = { ...updatedSubtasks[index], title: value };
    setSubtasks(updatedSubtasks);
  };
  const removeSubtask = (index: number) => {
    const updatedSubtasks = subtasks.filter((_, i) => i !== index);
    setSubtasks(updatedSubtasks);
  };
  /* Subtask operation handler  */

  const { data: columns, isLoading: columnLoading } = useGetColumns(boardId);

  /* Update Task Handler */
  const mutation = useUpdateTask(boardId, presentColumnId!, columnId, taskId!);

  const createTaskHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(
      { boardId, title, description, newColumnId: columnId, subtasks },
      {
        onSuccess: () => {
          toast.success("Task updated successfully");
          setTitle("");
          setDescription("");

          setSubtasks([{ title: "", isCompleted: false }]);
          setPresentColumnId("");
          setOpen(false);
        },
        onError: () => {
          toast.error("Failed to create task");
        },
      }
    );
  };
  /* Update Task Handler */

  if (taskLoading) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Task</DialogTitle>
            <DialogDescription>
              Update your task you can even change column if you want even add
              or remove subtasks
            </DialogDescription>
          </DialogHeader>
          <div className="h-40 flex items-center justify-center">
            <Loader2Icon className="size-8 animate-spin" />
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (taskError) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Task</DialogTitle>
            <DialogDescription>
              Update your task you can even change column if you want even add
              or remove subtasks
            </DialogDescription>
          </DialogHeader>
          <div className="h-40 flex flex-col gap-y-4 items-center justify-center">
            <AlertOctagonIcon className="size-8 text-destructive" />
            <p className="text-lg text-destructive font-semibold">
              Something went wrong
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Task</DialogTitle>
          <DialogDescription>
            Update your task you can even change column if you want even add or
            remove subtasks
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={createTaskHandler} className="space-y-3">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input
              value={title}
              disabled={mutation.isPending}
              required
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Create a demo task"
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
              disabled={mutation.isPending}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe your task in your own words...."
            />
          </div>
          <div className="space-y-2">
            <Label>Subtasks</Label>
            {subtasks.map((subtask, index) => (
              <div
                key={index}
                className="flex flex-row items-center justify-center gap-x-2"
              >
                <Input
                  disabled={mutation.isPending}
                  value={subtask.title}
                  onChange={(e) => updateSubtask(index, e.target.value)}
                  required
                  placeholder="Subtask name..."
                />
                {index !== 0 && (
                  <button
                    disabled={mutation.isPending}
                    onClick={() => removeSubtask(index)}
                    className="p-2 bg-destructive  rounded-xl disabled:bg-destructive/40 hover:bg-destructive/40 transition"
                  >
                    <TrashIcon className="size-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addSubtaskInput || mutation.isPending}
              disabled={subtasks.length === MAX_SUBTASKS}
              className="flex ml-auto items-center justify-center gap-x-1 text-xs bg-blue-700 p-1.5 rounded-md disabled:bg-blue-900 hover:bg-blue-900 transition"
            >
              <PlusIcon className="size-4" />
              Add Subtasks
            </button>
          </div>
          <div className="space-y-2">
            <Label>Column</Label>
            <Select
              disabled={mutation.isPending}
              onValueChange={(value) => setColumnId(value)}
              defaultValue={columnId}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose your specific column....." />
              </SelectTrigger>
              <SelectContent className="w-full">
                {columnLoading ? (
                  <div className="w-full h-6 flex items-center justify-center">
                    <Loader2Icon className="size-4 animated-spin" />
                  </div>
                ) : (
                  <>
                    {columns?.map((column) => (
                      <SelectItem
                        key={column.id}
                        value={column.id}
                        className="cursor-pointer"
                      >
                        {column.title}
                      </SelectItem>
                    ))}
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button
                disabled={mutation.isPending}
                className="bg-destructive hover:bg-destructive/50 transition"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              disabled={mutation.isPending}
              type="submit"
              className="bg-primary hover:bg-primary/50 transition"
            >
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
