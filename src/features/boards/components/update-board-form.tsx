"use client";

import { useState } from "react";

import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useUpdateBoard } from "@/features/boards/api/use-update-board";
import { useUpdateBoardModal } from "@/features/boards/store/use-update-board-modal";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Props = {
  onCancel: () => void;
  initialData: {
    id: string;
    title: string;
  };
};

export const UpdateBoardForm = ({ onCancel, initialData }: Props) => {
  const { close } = useUpdateBoardModal();
  const [title, setTitle] = useState<string>(initialData.title);

  const removeHandler = () => {
    onCancel?.();
    close();
    setTitle("");
  };

  const mutation = useUpdateBoard();
  const updateBoardHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.trim().length < 3) {
      toast.error("Board title must be at least 3 characters long");
      return;
    }

    mutation.mutate(
      { param: { id: initialData.id }, json: { title } },
      {
        onSuccess: () => {
          removeHandler();
        },
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Board</CardTitle>
        <CardDescription className="text-xs">
          Change your board title
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={updateBoardHandler} className="space-y-3">
          <div className="space-y-1">
            <Label>Board Title</Label>
            <Input
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
              disabled={mutation.isPending}
              placeholder="Production Board"
            />
          </div>
          <CardFooter className="flex flex-row items-center gap-x-1 justify-end">
            <Button
              type="button"
              onClick={close}
              disabled={mutation.isPending}
              className="bg-destructive"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={mutation.isPending}>
              Save
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};
