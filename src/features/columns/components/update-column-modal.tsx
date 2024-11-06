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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateColumnModal } from "@/features/columns/store/use-update-column-modal";
import { useGetColumn } from "@/features/columns/api/use-get-column";
import { useGetBoardId } from "@/hooks/use-get-board-id";
import { useUpdateColumn } from "../api/use-update-column";
import { toast } from "sonner";
import { AlertOctagonIcon } from "lucide-react";
import { useGetColumnId } from "@/hooks/use-get-column-id";

export const UpdateColumnModal = () => {
  const [open, setOpen] = useUpdateColumnModal();

  const boardId = useGetBoardId();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [id, _setId] = useGetColumnId();

  const [title, setTitle] = useState<string>("");

  const { data, isLoading, isError } = useGetColumn(boardId, id!);

  useEffect(() => {
    if (data) {
      setTitle(data?.title);
    }
  }, [data]);

  const mutation = useUpdateColumn(id!, boardId);
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate(
      { title, boardId },
      {
        onSuccess: () => {
          toast.success("Column updated successfully");
          setTitle("");
          setOpen(false);
        },
        onError: () => {
          toast.error("Failed to update column");
        },
      }
    );
  };

  const handleClose = () => {
    setTitle("");
    setOpen(false);
  };

  if (isError) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex items-center justify-center">
          <AlertOctagonIcon className="size-8 text-destructive" />
          <p className="text-lg font-semibold text-destructive">
            Something went wrong
          </p>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Column</DialogTitle>
          <DialogDescription>Update the column title.</DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmitHandler} className="space-y-3">
          <div className="space-y-2">
            <Label>Column Title</Label>
            <Input
              disabled={isLoading || mutation.isPending}
              value={title}
              placeholder="Frontend, Backend....."
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <DialogFooter className="flex flex-row items-center gap-x-1 justify-end">
            <DialogClose>
              <Button
                disabled={mutation.isPending}
                onClick={() => setOpen(false)}
                className="bg-destructive hover:bg-destructive/50"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isLoading || mutation.isPending} type="submit">
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
