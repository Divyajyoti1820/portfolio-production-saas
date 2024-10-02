"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SidebarHeader } from "./sidebar-header";
import { BoardsList } from "./boards-list";
import { UserInfo } from "./user-info";

export const Sidebar = () => {
  const [open, setOpen] = useState<boolean>(true);
  return (
    <aside
      className={cn(
        "sticky flex flex-col p-2 top-0 h-screen shrink-0 bg-card shadow-md",
        open ? "w-[225px]" : "fit-content"
      )}
    >
      <SidebarHeader open={open} />
      <BoardsList open={open} />
      <UserInfo open={open} />
    </aside>
  );
};
