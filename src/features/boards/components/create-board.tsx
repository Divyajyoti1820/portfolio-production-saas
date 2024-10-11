"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { useCreateBoard } from "@/features/boards/api/use-create-board";
import { PlusIcon, Trash2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCreateBoardModal } from "@/features/boards/hooks/use-create-board-modal";

export const CreateBoard = () => {
  const [open, setOpen] = useCreateBoardModal();

  const [title, setTitle] = useState<string>("");
  const [columns, setColumns] = useState<string[]>([""]);

  /* Columns Input Functions */
  const addColumnInputHandler = () => {
    setColumns([...columns, ""]);
  };
  const COLS_LIMIT = columns.length === 5;

  const removeColumnHandler = (index: number) => {
    const newColumns = columns.filter((_, colIdx) => colIdx !== index);
    setColumns(newColumns);
  };

  const columnChangeHandler = (index: number, value: string) => {
    const newColumns = [...columns];
    newColumns[index] = value;
    setColumns(newColumns);
  };
  /* Columns Input Functions */

  /* Create Board Form Handler */
  const mutation = useCreateBoard();
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate(
      { title, columns },

      {
        onSuccess: () => {
          setOpen(false);
        },
        onSettled: () => {
          setTitle("");
          setColumns([""]);
        },
      }
    );
  };
  /* Create Board Form Handler */

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="space-y-3">
        <DialogHeader className="space-y-3">
          <DialogTitle>Create New Board</DialogTitle>
          <DialogDescription>
            Create your new board and add columns in which you want to separate
            your tasks.
            <strong className="text-white"> Max. 5 columns per board.</strong>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmitHandler} className="space-y-4">
          <div className="flex flex-col space-y-2.5">
            <Label htmlFor="title">Title</Label>
            <Input
              disabled={mutation.isPending}
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Developer Board, UI/UX Design, Meetings.."
              required
              minLength={3}
              maxLength={20}
            />
          </div>
          <div className="flex flex-col space-y-2.5">
            <Label htmlFor="title">Columns</Label>
            {columns.map((column, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-x-3"
              >
                <div className="flex flex-col gap-y-1 w-full">
                  <Input
                    disabled={mutation.isPending}
                    value={column}
                    onChange={(e) => columnChangeHandler(index, e.target.value)}
                    placeholder="e.g. Design, Backend, Frontend"
                    required
                    minLength={3}
                    maxLength={16}
                  />
                  {index === 0 && (
                    <p className="text-[10px] w-full text-muted-foreground">
                      Necessary to have 1 column at least.
                    </p>
                  )}
                </div>
                <button
                  onClick={() => removeColumnHandler(index)}
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
            onClick={addColumnInputHandler}
            disabled={COLS_LIMIT || mutation.isPending}
            size="sm"
            className="flex ml-auto items-center justify-center gap-x-2 rounded-xl bg-primary/60 font-semibold"
          >
            <PlusIcon className="size-4" />
            <span>Add new column</span>
          </Button>

          <DialogFooter>
            <DialogClose>
              <Button
                variant="destructive"
                size="lg"
                disabled={mutation.isPending}
              >
                Close
              </Button>
            </DialogClose>
            <Button type="submit" size="lg" disabled={mutation.isPending}>
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
