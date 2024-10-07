import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";

import { useEditBoardModal } from "@/features/boards/hooks/use-edit-board-modal";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useBoardId } from "@/hooks/use-board-id";
import { useGetBoard } from "@/features/boards/api/use-get-board";
import { useUpdateBoard } from "@/features/boards/api/use-update-board";

export const EditBoard = () => {
  const boardId = useBoardId();

  const { data: boardData } = useGetBoard(boardId);

  const [open, setOpen] = useEditBoardModal();
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    if (boardData?.title) {
      setTitle(boardData.title);
    }
  }, [boardData]);

  /* Board Update Handler */
  const mutation = useUpdateBoard(boardId);
  const updateBoarHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(
      { title },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  };
  /* Board Update Handler */

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit board</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={updateBoarHandler} className="space-y-3">
          <Input
            value={title}
            disabled={mutation.isPending}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Board Title"
            required
            minLength={3}
            maxLength={20}
          />
          <DialogFooter>
            <DialogClose>
              <Button disabled={mutation.isPending} variant="destructive">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={mutation.isPending} type="submit">
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
