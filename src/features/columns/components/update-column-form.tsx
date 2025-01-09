"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useUpdateColumn } from "@/features/columns/api/use-update-column";

import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useUpdateColumnModal } from "@/features/columns/store/use-update-column-modal";

type Props = {
  initialData: {
    id: string;
    title: string;
    boardId: string;
  };
  onCancel: () => void;
};

export const UpdateColumnForm = ({ initialData, onCancel }: Props) => {
  const { close } = useUpdateColumnModal();
  const [title, setTitle] = useState<string>(initialData.title);

  const handleClose = () => {
    setTitle("");
    onCancel?.();
  };

  const mutation = useUpdateColumn();
  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutation.mutate(
      {
        param: { id: initialData.id },
        json: { title, boardId: initialData.boardId },
      },
      {
        onSuccess: () => {
          toast.success("Column updated successfully");
          handleClose();
        },
        onError: () => {
          toast.error("Failed to update column");
        },
      }
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Column</CardTitle>
        <CardDescription>Update the column title.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmitHandler} className="space-y-3">
          <div className="space-y-2">
            <Label>Column Title</Label>
            <Input
              disabled={mutation.isPending}
              value={title}
              placeholder="Frontend, Backend....."
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <CardFooter className="w-full flex flex-row items-center gap-x-2 justify-end">
            <Button
              type="button"
              disabled={mutation.isPending}
              onClick={close}
              className="bg-destructive hover:bg-destructive/50"
            >
              Cancel
            </Button>

            <Button disabled={mutation.isPending} type="submit">
              Save
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
};
