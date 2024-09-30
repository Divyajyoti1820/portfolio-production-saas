"use client";

import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { useCreateBoard } from "@/features/boards/api/use-create-board";

export const CreateBoard = () => {
  const [title, setTitle] = useState<string>("");

  /* Create Board Form Handler */
  const mutation = useCreateBoard();
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  /* Create Board Form Handler */

  return (
    <Dialog open={true}>
      <DialogContent className="space-y-3">
        <DialogHeader className="space-y-3">
          <DialogTitle>Create New Board</DialogTitle>
          <DialogDescription>
            Create your new board and add columns in which you want to separate
            your tasks.
            <strong className="text-white"> Max. 6 columns per board.</strong>
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmitHandler} className="space-y-2.5">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Developer Board, UI/UX Design, Meetings.."
            required
            minLength={3}
            maxLength={16}
          />

          <DialogFooter>
            <DialogClose>
              <Button variant="destructive" size="lg">
                Close
              </Button>
            </DialogClose>
            <Button type="submit" size="lg">
              Create
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
