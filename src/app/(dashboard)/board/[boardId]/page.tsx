"use client";

import { redirect } from "next/navigation";

import { Navbar } from "./_components/navbar";
import { ColumnContent } from "./_components/column-content";
import { useGetBoards } from "@/features/boards/api/use-get-boards";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

const BoardIdPage = () => {
  const { open } = useSidebar();
  const { data: Boards } = useGetBoards();

  if (!Boards || Boards.length === 0) {
    redirect("/");
  }

  return (
    <div
      className={cn(
        "h-full w-[calc(100vw-4rem)]",
        open && "w-[calc(100vw-16rem)]"
      )}
    >
      <Navbar />
      <ColumnContent />
    </div>
  );
};

export default BoardIdPage;
