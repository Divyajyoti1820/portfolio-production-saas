"use client";

import { useState, useCallback } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { PlusIcon, TrashIcon } from "lucide-react";

import { useUpdateTask } from "@/features/tasks/api/use-update-task";

import { create } from "mutative";
import { useUpdateTaskModal } from "@/features/tasks/store/use-update-task-modal";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const MAX_SUBTASKS = 4;

type Props = {
  onCancel: () => void;
  initialData: {
    columnId: string;
    title: string;
    description: string;
    subtasks: {
      title: string;
      isCompleted: boolean;
    }[];
    id: string;
    createdAt: string;
    updatedAt: string | null;
  };
  columns: {
    boardId: string;
    title: string;
    id: string;
    createdAt: string;
    updatedAt: string | null;
  }[];
  boardId: string;
};

export const UpdateTaskForm = ({
  onCancel,
  initialData,
  columns,
  boardId,
}: Props) => {
  const { close } = useUpdateTaskModal();

  const [title, setTitle] = useState<string>(initialData.title);
  const [description, setDescription] = useState<string>(
    initialData.description
  );
  const [columnId, setColumnId] = useState<string>(initialData.columnId);
  const [subtasks, setSubtasks] = useState<
    { title: string; isCompleted: boolean }[]
  >(initialData.subtasks);

  /* Subtask operation handler  */
  const addSubtaskInput = useCallback(() => {
    const mutated_value = create(subtasks, (draft) => {
      draft.push({ title: "", isCompleted: false });
    });
    setSubtasks(mutated_value);
  }, [subtasks]);
  const updateSubtask = useCallback(
    (index: number, value: string) => {
      const updatedSubtasks = create(subtasks, (draft) => {
        draft[index].title = value;
      });
      setSubtasks(updatedSubtasks);
    },
    [subtasks]
  );
  const removeSubtask = useCallback(
    (index: number) => {
      const updatedSubtasks = subtasks.filter((_, i) => i !== index);
      setSubtasks(updatedSubtasks);
    },
    [subtasks]
  );
  /* Subtask operation handler  */

  const handleClose = useCallback(() => {
    setTitle("");
    setDescription("");
    setSubtasks([{ title: "", isCompleted: false }]);
    setColumnId("");
    onCancel?.();
    close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Update Task Handler */
  const mutation = useUpdateTask({ prevColumnId: initialData.columnId });
  const updateTaskHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate(
      {
        param: { id: initialData.id, columnId: initialData.columnId },
        json: { boardId, title, description, newColumnId: columnId, subtasks },
      },
      {
        onSuccess: () => {
          toast.success("Task updated successfully");
          handleClose();
        },
        onError: () => {
          toast.error("Failed to update task");
        },
      }
    );
  };
  /* Update Task Handler */

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Task</CardTitle>
        <CardDescription>
          Update your task you can even change column if you want even add or
          remove subtasks
        </CardDescription>
      </CardHeader>
      <CardContent className="h-full">
        <form onSubmit={updateTaskHandler} className="space-y-3">
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
            {!!subtasks &&
              subtasks?.map((subtask, index) => (
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
              disabled={subtasks?.length === MAX_SUBTASKS}
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
              value={columnId}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choose your specific column....." />
              </SelectTrigger>
              <SelectContent className="w-full">
                {columns?.map((column) => (
                  <SelectItem
                    key={column.id}
                    value={column.id}
                    className="cursor-pointer"
                  >
                    {column.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <CardFooter className="w-full flex flex-row justify-end gap-x-4">
            <Button
              type="button"
              onClick={close}
              disabled={mutation.isPending}
              className="bg-destructive hover:bg-destructive/50 transition"
            >
              Cancel
            </Button>
            <Button
              disabled={mutation.isPending}
              type="submit"
              className="bg-primary hover:bg-primary/50 transition"
            >
              Update
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};
