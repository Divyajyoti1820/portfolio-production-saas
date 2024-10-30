import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { useGetBoardId } from "@/hooks/use-get-board-id";
import { useGetColumns } from "@/features/columns/api/use-get-columns";
import { useCreateTaskModal } from "@/features/tasks/store/use-create-task-modal";
import { Loader2Icon, PlusIcon, TrashIcon } from "lucide-react";

const MAX_SUBTASKS = 4;

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
  };

  const removeSubtask = (index: number) => {
    const updatedSubtasks = subtasks.filter((_, i) => i !== index);
    setSubtasks(updatedSubtasks);
  };
  /* Subtask operation handler  */

  const { data: columns, isLoading: columnLoading } = useGetColumns(boardId);

  const createTaskHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <Dialog open={open || true} onOpenChange={setOpen}>
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
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Create a demo task"
            />
          </div>
          <div className="space-y-2">
            <Label>Description</Label>
            <Textarea
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
                  disabled={false}
                  value={subtask.title}
                  onChange={(e) => updateSubtask(index, e.target.value)}
                  required
                  placeholder="Subtask name..."
                />
                {index !== 0 && (
                  <button
                    disabled={false}
                    onClick={() => removeSubtask(index)}
                    className="p-2 bg-destructive  rounded-xl disabled:bg-destructive/40 hover:bg-destructive/40 transition"
                  >
                    <TrashIcon className="size-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addSubtaskInput}
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
        </form>
      </DialogContent>
    </Dialog>
  );
};
