"use client";

import { useState, useCallback } from "react";

import { create } from "mutative";

import { MAX_SUBTASKS } from "@/lib/constants";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { PlusIcon, TrashIcon } from "lucide-react";

import { useCreateTaskModal } from "@/features/tasks/store/use-create-task-modal";
import { useCreateTask } from "@/features/tasks/api/use-create-task";

type Props = {
  boardId: string;
  columns: { id: string; title: string }[];
  onCancel: () => void;
};

export const CreateTaskForm = ({ boardId, columns, onCancel }: Props) => {
  const { close } = useCreateTaskModal();
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [columnId, setColumnId] = useState<string>("");
  const [subtasks, setSubtasks] = useState<
    { title: string; isCompleted: boolean }[]
  >([{ title: "", isCompleted: false }]);

  /* Subtask operation handler  */
  const addSubtaskInput = useCallback(() => {
    const mutative_data = create(subtasks, (instance) => {
      instance.push({ title: "", isCompleted: false });
    });
    setSubtasks(mutative_data);
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
    setColumnId("");
    setSubtasks([{ title: "", isCompleted: false }]);
    onCancel?.();
    close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Create Task Handler */
  const mutation = useCreateTask();
  const createTaskHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(
      { param: { boardId }, json: { title, description, columnId, subtasks } },
      {
        onSuccess: () => {
          toast.success("Task create successfully");
          handleClose();
        },
        onError: () => {
          toast.error("Failed to create task");
        },
      }
    );
  };
  /* Create Task Handler */

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create New Task</CardTitle>
        <CardDescription>
          Curate your new task give brief description so your team can
          understand and assign to specific column.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
          <CardFooter className="w-full flex items-center justify-end gap-x-4">
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
              Create
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};
