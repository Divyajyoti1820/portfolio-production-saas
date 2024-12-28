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
import { toast } from "sonner";
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

  useEffect(() => {
    if (isOpen && !boardDataLoading && boardData) {
      setTitle(boardData.title);
    }
  }, [isOpen, boardData, boardDataLoading]);

  const removeHandler = () => {
    setIsOpen(false);
    setTitle(boardData?.title ?? "");
  };

  const mutation = useUpdateBoard();
  const updateBoardHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.trim().length < 3) {
      toast.error("Board title must be at least 3 characters long");
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
