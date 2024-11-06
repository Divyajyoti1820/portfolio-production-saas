"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useCreateBoardModal } from "@/features/boards/store/use-create-board-modal";
import { useCreateBoard } from "../api/use-create-board";
import { PlusIcon, TrashIcon } from "lucide-react";
import { toast } from "sonner";

const MAX_COLS = 5;

export const CreateBoardModal = () => {
  const router = useRouter();
  const [open, setOpen] = useCreateBoardModal();
  const mutation = useCreateBoard();

  const [title, setTitle] = useState<string>("");
  const [columns, setColumns] = useState<string[]>([""]);

  /* Columns Input Handling Mechanism */
  const addColumnInput = () => setColumns([...columns, ""]);
  const updateColumn = (index: number, value: string) => {
    const updatedColumns = [...columns];
    updatedColumns[index] = value;
    setColumns(updatedColumns);
  };
  const removeColumn = (index: number) => {
    const updatedColumns = columns.filter((_, i) => i !== index);
    setColumns(updatedColumns);
  };
  /* Columns Input Handling Mechanism */

  /* Create board Form Handler */
  const createBoardFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate(
      { title, columns: [...columns] },
      {
        onSuccess: ({ data }) => {
          toast.success(`New Board "${data.title}"`);
          setTitle("");
          setColumns([""]);
          setOpen(false);
          router.push(`/board/${data.id}`);
        },
        onError: () => {
          toast.error("Failed to create board");
        },
      }
    );
  };
  /* Create board Form Handler */

  const removeHandler = () => {
    setTitle("");
    setColumns([""]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={removeHandler}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Board</DialogTitle>
          <DialogDescription>
            Create a new board and create subsequent columns in your board{" "}
            <span className="text-blue-500 font-semibold">Max 5 columns</span>{" "}
            permitted.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={createBoardFormHandler} className="space-y-4">
          <div className="w-full space-y-1">
            <Label>Title</Label>
            <Input
              disabled={mutation.isPending}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Production..."
            />
          </div>
          <div className="w-full flex flex-col space-y-2">
            <Label>Columns</Label>
            {columns.map((column, index) => (
              <div
                key={index}
                className="flex flex-row items-center justify-center gap-x-2"
              >
                <Input
                  disabled={mutation.isPending}
                  value={column}
                  onChange={(e) => updateColumn(index, e.target.value)}
                  required
                  placeholder="Column name..."
                />
                {index !== 0 && (
                  <button
                    disabled={mutation.isPending}
                    onClick={() => removeColumn(index)}
                    className="p-2 bg-destructive  rounded-xl disabled:bg-destructive/40 hover:bg-destructive/40 transition"
                  >
                    <TrashIcon className="size-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addColumnInput}
              disabled={columns.length === MAX_COLS || mutation.isPending}
              className="flex ml-auto items-center justify-center gap-x-1 text-xs bg-blue-700 p-1.5 rounded-md disabled:bg-blue-900 hover:bg-blue-900 transition"
            >
              <PlusIcon className="size-4" />
              Add Columns
            </button>
          </div>
          <DialogFooter className="flex flex-col gap-y-2">
            <DialogClose>
              <Button
                disabled={mutation.isPending}
                variant="destructive"
                className="w-full"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={mutation.isPending}>
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
