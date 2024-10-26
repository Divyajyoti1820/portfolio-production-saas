"use client";

import { useEffect, useState } from "react";

import { CreateBoardModal } from "@/features/boards/components/create-board-modal";
import { UpdateBoardModal } from "@/features/boards/components/update-board-modal";

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
    </>
  );
};
