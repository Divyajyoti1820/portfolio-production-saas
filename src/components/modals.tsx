"use client";

import { useState, useEffect } from "react";

import { CreateBoard } from "@/features/boards/components/create-board";
import { EditBoard } from "@/features/boards/components/edit-board";

export const Modals = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <CreateBoard />
      <EditBoard />
    </>
  );
};
