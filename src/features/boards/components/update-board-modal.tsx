"use client";

import { useEffect, useState } from "react";

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

import { useUpdateBoard } from "@/features/boards/api/use-update-board";
import { useGetBoard } from "@/features/boards/api/use-get-board";
import { useGetBoardId } from "@/hooks/use-get-board-id";
import { useUpdateBoardModal } from "@/features/boards/store/use-update-board-modal";

export const UpdateBoardModal = () => {
  const boardId = useGetBoardId();
  const { data: boardData, isLoading: boardDataLoading } = useGetBoard(boardId);
  const { isOpen, setIsOpen } = useUpdateBoardModal();
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (boardData) {
      setTitle(boardData.title);
      setError("");
    }
  }, [boardData]);

  const removeHandler = () => {
    setTitle("");
    setIsOpen(false);
  };

  const mutation = useUpdateBoard();
  const updateBoardHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.trim().length < 3) {
      setError("Title must be at least 3 characters long");
      return;
    }

    mutation.mutate(
      { param: { id: boardId }, json: { title } },
      {
        onSuccess: () => {
          removeHandler();
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={removeHandler}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Board</DialogTitle>
          <DialogDescription className="text-xs">
            Change your board title
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={updateBoardHandler} className="space-y-3">
          {!!error && <p className="text-sm text-destructive mt-1">{error}</p>}
          <div className="space-y-1">
            <Label>Board Title</Label>
            <Input
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              disabled={boardDataLoading || mutation.isPending}
              placeholder="Production Board"
            />
          </div>
          <DialogFooter className="flex flex-row items-center gap-x-1 justify-end">
            <DialogClose>
              <Button
                type="button"
                disabled={mutation.isPending}
                className="bg-destructive"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={mutation.isPending}>
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
