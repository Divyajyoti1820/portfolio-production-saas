"use client";

import { useState } from "react";

import { MAX_COLUMNS } from "@/lib/constants";

import { create } from "mutative";
import { useCreateBoard } from "@/features/boards/api/use-create-board";

import { Loader2Icon, PlusIcon, TrashIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const CreateClient = () => {
  const [title, setTitle] = useState<string>("");
  const [columns, setColumns] = useState<string[]>([""]);

  /* Columns Input Handling Mechanism */
  const addColumnInput = () => {
    const mutate_data = create(columns, (instance) => {
      instance.push("");
    });
    setColumns(mutate_data);
  };
  const updateColumn = (index: number, value: string) => {
    const updatedColumns = create(columns, (draft) => {
      draft[index] = value;
    });
    setColumns(updatedColumns);
  };
  const removeColumn = (index: number) => {
    const updatedColumns = columns.filter((_, i) => i !== index);
    setColumns(updatedColumns);
  };
  /* Columns Input Handling Mechanism */

  const { mutate: createBoard, isPending: pendingCreateBoard } =
    useCreateBoard();

  const createBoardFormHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createBoard(
      { json: { title, columns } },
      {
        onSuccess: () => {
          setTitle("");
          setColumns([""]);
        },
      }
    );
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Create Board</CardTitle>
          <CardDescription>
            Create a new board and create subsequent columns in your board{" "}
            <span className="text-blue-500 font-semibold">Max 5 columns</span>{" "}
            permitted.
          </CardDescription>
        </CardHeader>
        <CardContent>
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
            <CardFooter className="w-full mt-2 flex justify-center items-center">
              <Button
                type="submit"
                disabled={pendingCreateBoard}
                className="w-[300px]"
              >
                {pendingCreateBoard ? (
                  <Loader2Icon className="size-4 animate-spin" />
                ) : (
                  <span>Create</span>
                )}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
