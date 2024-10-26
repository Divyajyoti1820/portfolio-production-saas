"use client";

import { useGetBoards } from "@/features/boards/api/use-get-boards";
import { Navbar } from "./_components/navbar";
import { redirect } from "next/navigation";

const BoardIdPage = () => {
  const { data: Boards } = useGetBoards();

  if (!Boards || Boards.length === 0) {
    redirect("/");
  }

  return (
    <div className="h-full w-full">
      <Navbar />
      <div className="w-full h-[calc(100vh-56px)] p-2"></div>
    </div>
  );
};

export default BoardIdPage;
