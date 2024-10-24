"use client";

import { CreateBoardModal } from "@/features/boards/components/create-board-modal";
import { useEffect, useState } from "react";

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
    </>
  );
};
