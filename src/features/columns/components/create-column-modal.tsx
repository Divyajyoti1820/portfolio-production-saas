"use client";

import { useState } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateColumnModal } from "@/features/columns/store/use-create-column-modal";
import { useGetBoardId } from "@/hooks/use-get-board-id";
import { useCreateColumn } from "../api/use-create-column";
import { toast } from "sonner";

export const CreateColumnModal = () => {
  const [open, setOpen] = useCreateColumnModal();
  const boardId = useGetBoardId();
  const [title, setTitle] = useState<string>("");

  const mutation = useCreateColumn(boardId);
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate(
      { title, boardId },
      {
        onSuccess: () => {
          toast.success("Column created successfully");
          setTitle("");
          setOpen(false);
        },
        onError: () => {
          toast.error("Failed to create column");
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Column</DialogTitle>
          <DialogDescription>
            Create new column to stage your task.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmitHandler} className="space-y-3">
          <div className="space-y-2">
            <Label>Column Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Frontend, Backend....."
              required
            />
          </div>
          <DialogFooter className="flex flex-row items-center gap-x-1 justify-end">
            <DialogClose>
              <Button className="bg-destructive hover:bg-destructive/50 transition">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/50 transition"
            >
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
