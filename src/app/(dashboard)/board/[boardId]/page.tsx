"use client";

import { redirect } from "next/navigation";

import { Navbar } from "./_components/navbar";
import { ColumnContent } from "./_components/column-content";
import { useGetBoards } from "@/features/boards/api/use-get-boards";

const BoardIdPage = () => {
  const { data: Boards } = useGetBoards();

  if (!Boards || Boards.length === 0) {
    redirect("/");
  }

  return (
    <div className="h-full w-full">
      <Navbar />
      <ColumnContent />
    </div>
  );
};

export default BoardIdPage;
