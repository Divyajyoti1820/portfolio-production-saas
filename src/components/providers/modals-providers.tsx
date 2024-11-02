"use client";

import { useEffect, useState } from "react";

import { CreateBoardModal } from "@/features/boards/components/create-board-modal";
import { UpdateBoardModal } from "@/features/boards/components/update-board-modal";
import { CreateColumnModal } from "@/features/columns/components/create-column-modal";
import { UpdateColumnModal } from "@/features/columns/components/update-column-modal";
import { CreateTaskModal } from "@/features/tasks/components/create-task-modal";
import { UpdateTaskModal } from "@/features/tasks/components/update-task-modal";
import { ShowTaskModal } from "@/features/tasks/components/show-task-modal";

export const ModalsProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateBoardModal />
      <UpdateBoardModal />
      <CreateColumnModal />
      <UpdateColumnModal />
      <CreateTaskModal />
      <UpdateTaskModal />
      <ShowTaskModal />
    </>
  );
};
