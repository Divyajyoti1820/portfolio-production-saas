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
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useCreateColumnModal } from "@/features/columns/store/use-create-column-modal";
import { useGetBoardId } from "@/hooks/use-get-board-id";
import { useCreateColumn } from "@/features/columns/api/use-create-column";

export const CreateColumnModal = () => {
  const { isOpen, setIsOpen } = useCreateColumnModal();
  const boardId = useGetBoardId();
  const [title, setTitle] = useState<string>("");

  const handleClose = () => {
    setTitle("");
    setIsOpen(false);
  };

  const mutation = useCreateColumn();
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate(
      { json: { boardId, title } },
      {
        onSuccess: () => {
          toast.success("Column created successfully");
          handleClose();
        },
        onError: () => {
          toast.error("Failed to create column");
        },
      }
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
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
              <Button
                type="button"
                className="bg-destructive hover:bg-destructive/50 transition"
              >
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
