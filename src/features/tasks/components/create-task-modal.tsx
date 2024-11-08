"use client";

import { useState } from "react";

import { MAX_SUBTASKS } from "@/lib/constants";

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

import { Loader2Icon, PlusIcon, TrashIcon } from "lucide-react";

import { useGetBoardId } from "@/hooks/use-get-board-id";
import { useGetColumns } from "@/features/columns/api/use-get-columns";
import { useCreateTaskModal } from "@/features/tasks/store/use-create-task-modal";
import { useCreateTask } from "../api/use-create-task";

export const CreateTaskModal = () => {
  const boardId = useGetBoardId();
  const [open, setOpen] = useCreateTaskModal();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [columnId, setColumnId] = useState<string>("");
  const [subtasks, setSubtasks] = useState<
    { title: string; isCompleted: boolean }[]
  >([{ title: "", isCompleted: false }]);

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

  /* Create Task Handler */
  const mutation = useCreateTask(boardId, columnId);
  const createTaskHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(
      { title, description, columnId, subtasks },
      {
        onSuccess: () => {
          toast.success("Task create successfully");
          setTitle("");
          setDescription("");
          setColumnId("");
          setSubtasks([{ title: "", isCompleted: false }]);
          setOpen(false);
        },
        onError: () => {
          toast.error("Failed to create task");
        },
      }
    );
  };
  /* Create Task Handler */

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setColumnId("");
    setSubtasks([{ title: "", isCompleted: false }]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>
            Curate your new task give brief description so your team can
            understand and assign to specific column.
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
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
