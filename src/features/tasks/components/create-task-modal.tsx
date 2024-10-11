import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import { Loader2Icon, Trash2Icon, PlusIcon } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { useBoardId } from "@/hooks/use-board-id";
import { useCreateTaskModal } from "@/features/tasks/hooks/use-create-task-modal";
import { useGetBoard } from "@/features/boards/api/use-get-board";
import { useCreateTask } from "@/features/tasks/api/use-create-task";

export const CreateTaskModal = () => {
  const [open, setOpen] = useCreateTaskModal();
  const boardId = useBoardId();
  const { data: boardData, isLoading: boardDataLoading } = useGetBoard(boardId);

  /* Info Data */
  const [boardTitle, setBoardTitle] = useState("");
  const [boardColumns, setBoardColumns] = useState<string[]>([]);
  /* Info Data */

  /* Form Fields */
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [subTasks, setSubTasks] = useState<
    { title: string; completed?: boolean }[]
  >([{ title: "", completed: false }]);
  const [column, setColumn] = useState("");
  /* Form Fields */

  /* Subtasks Input Functions */
  const SUBTASKS_LIMIT = subTasks.length === 5;

  const addSubTasksInputHandler = () => {
    setSubTasks([...subTasks, { title: "", completed: false }]);
  };

  const removeSubTasksHandler = (index: number) => {
    const newSubtasks = subTasks.filter((_, subIdx) => subIdx !== index);
    setSubTasks(newSubtasks);
  };

  const subTasksChangeHandler = (
    index: number,
    field: string,
    value: string | boolean | undefined
  ) => {
    setSubTasks(
      subTasks.map((subtask, i) =>
        i === index ? { ...subtask, [field]: value } : subtask
      )
    );
  };
  /* Subtasks Input Functions */

  /* Create Task Handler */
  const mutation = useCreateTask();

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!boardId) return null;

    mutation.mutate(
      {
        title,
        description,
        boardId,
        column,
        subtasks: [...subTasks],
      },
      {
        onSuccess: () => {
          setOpen(false);
        },
        onSettled: () => {
          setTitle("");
          setDescription("");
          setColumn("");
          setSubTasks([{ title: "", completed: false }]);
        },
      }
    );
  };
  /* Create Task Handler */

  useEffect(() => {
    if (boardData?.title) {
      setBoardTitle(boardData.title);
    }
    if (boardData?.columns) {
      setBoardColumns(boardData.columns);
    }
  }, [boardData]);

  if (!boardId) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader className="space-y-2.5">
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>
            Create task with 5 subtasks&nbsp;&nbsp;
            <strong className="text-white">(Max 5. per task)</strong>
            &nbsp;&nbsp;and it is necessary to add to a particular&nbsp;&nbsp;
            <strong className="text-white">column</strong>&nbsp;&nbsp;of the
            board.
          </DialogDescription>
          <div className="text-xs font-semibold text-primary p-1.5 bg-white w-[150px] flex items-center justify-center border rounded-lg">
            {boardDataLoading ? (
              <Loader2Icon className="size-4 animate-spin" />
            ) : (
              <p>{boardTitle}</p>
            )}
          </div>
        </DialogHeader>
        <form onSubmit={onSubmitHandler} className="space-y-3.5">
          <div className="flex flex-col space-y-2.5">
            <Label htmlFor="title">Title</Label>
            <Input
              disabled={mutation.isPending}
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Figma Prototype, Wireframe Animation...."
              required
              minLength={3}
              maxLength={20}
            />
          </div>
          <div className="flex flex-col space-y-2.5">
            <Label htmlFor="description">Description</Label>
            <Input
              disabled={mutation.isPending}
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Developer Board, UI/UX Design, Meetings.."
              required
              minLength={3}
            />
          </div>
          <div className="flex flex-col space-y-2.5">
            <Label>Columns</Label>
            <Select
              required
              disabled={mutation.isPending}
              value={column}
              onValueChange={(value) => setColumn(value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose column" />
              </SelectTrigger>
              <SelectContent>
                {boardDataLoading ? (
                  <div className="w-full p-2 h-full flex items-center justify-center">
                    <Loader2Icon className="text-muted-foreground size-4 animate-spin" />
                  </div>
                ) : (
                  <>
                    {boardColumns.map((boardColumn, index) => (
                      <SelectItem
                        key={index}
                        value={boardColumn}
                        className="cursor-pointer"
                      >
                        {boardColumn}
                      </SelectItem>
                    ))}
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col space-y-2.5">
            <Label htmlFor="title">Subtasks</Label>
            {subTasks.map((subtask, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-x-3"
              >
                <div className="flex flex-col gap-y-1 w-full">
                  <Input
                    disabled={mutation.isPending}
                    value={subtask.title}
                    onChange={(e) =>
                      subTasksChangeHandler(index, "title", e.target.value)
                    }
                    placeholder="Segregate your task into smaller fragments"
                    required
                    minLength={3}
                    maxLength={16}
                  />
                  {index === 0 && (
                    <p className="text-[10px] w-full text-muted-foreground">
                      Necessary to have 1 subtask.
                    </p>
                  )}
                </div>
                <button
                  onClick={() => removeSubTasksHandler(index)}
                  disabled={mutation.isPending}
                  className={cn(
                    "p-2 bg-destructive disabled:bg-destructive/60 text-white shrink-0 rounded-xl",
                    index === 0 && "hidden"
                  )}
                >
                  <Trash2Icon className="size-4" />
                </button>
              </div>
            ))}
          </div>
          <Button
            onClick={addSubTasksInputHandler}
            disabled={SUBTASKS_LIMIT || mutation.isPending}
            size="sm"
            className="flex ml-auto items-center justify-center gap-x-2 rounded-xl bg-primary/60 font-semibold"
          >
            <PlusIcon className="size-4" />
            <span>Add subtasks</span>
          </Button>

          <DialogFooter>
            <DialogClose>
              <Button disabled={mutation.isPending} variant="destructive">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={mutation.isPending} type="submit">
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
