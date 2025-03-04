"use client";

import { useState, useCallback } from "react";

import { create } from "mutative";

import { MAX_COLUMNS } from "@/lib/constants";

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
import { useCreateBoard } from "@/features/boards/api/use-create-board";

import { Loader2Icon, PlusIcon, TrashIcon } from "lucide-react";

export const CreateBoardModal = () => {
  const { isOpen, setIsOpen } = useCreateBoardModal();

  const [title, setTitle] = useState<string>("");
  const [columns, setColumns] = useState<string[]>([""]);

  /* Columns Input Handling Mechanism */
  const addColumnInput = useCallback(() => {
    const mutate_data = create(columns, (instance) => {
      instance.push("");
    });
    setColumns(mutate_data);
  }, [columns]);
  const updateColumn = useCallback(
    (index: number, value: string) => {
      const updatedColumns = create(columns, (draft) => {
        draft[index] = value;
      });
      setColumns(updatedColumns);
    },
    [columns]
  );
  const removeColumn = useCallback(
    (index: number) => {
      const updatedColumns = columns.filter((_, i) => i !== index);
      setColumns(updatedColumns);
    },
    [columns]
  );
  /* Columns Input Handling Mechanism */

  const removeHandler = useCallback(() => {
    setTitle("");
    setColumns([""]);
    setIsOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Create board Form Handler */
  const { mutate: CreateBoard, isPending: pendingCreateBoard } =
    useCreateBoard();
  const createBoardFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    CreateBoard(
      { json: { title, columns } },
      {
        onSuccess: () => {
          removeHandler();
        },
      }
    );
  };
  /* Create board Form Handler */

  return (
    <Dialog open={isOpen} onOpenChange={removeHandler}>
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
              disabled={pendingCreateBoard}
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
                  disabled={pendingCreateBoard}
                  value={column}
                  onChange={(e) => updateColumn(index, e.target.value)}
                  required
                  placeholder="Column name..."
                />
                {index !== 0 && (
                  <button
                    disabled={pendingCreateBoard}
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
              disabled={columns.length === MAX_COLUMNS || pendingCreateBoard}
              className="flex ml-auto items-center justify-center gap-x-1 text-xs bg-blue-700 p-1.5 rounded-md disabled:bg-blue-900 hover:bg-blue-900 transition"
            >
              <PlusIcon className="size-4" />
              Add Columns
            </button>
          </div>
          <DialogFooter className="flex flex-col gap-y-2">
            <DialogClose>
              <Button
                type="button"
                disabled={pendingCreateBoard}
                variant="destructive"
                className="w-full"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={pendingCreateBoard}>
              {pendingCreateBoard ? (
                <Loader2Icon className="size-4 animate-spin" />
              ) : (
                <span>Create Board</span>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
