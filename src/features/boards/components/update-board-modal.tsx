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
import { useUpdateBoardModal } from "@/features/boards/store/use-update-board";

export const UpdateBoardModal = () => {
  const boardId = useGetBoardId();
  const { data: boardData, isLoading: boardDataLoading } = useGetBoard(boardId);
  const [open, setOpen] = useUpdateBoardModal();
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if (boardData) {
      setTitle(boardData.title);
    }
  }, [boardData]);

  const mutation = useUpdateBoard(boardId);

  const updateBoardHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate(
      { title },
      {
        onSuccess: () => {
          toast.success("Board updated successfully");
          setOpen(false);
        },
        onError: () => {
          toast.error("Failed to update board");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Board Title</DialogTitle>
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
              <Button disabled={mutation.isPending} className="bg-destructive">
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
