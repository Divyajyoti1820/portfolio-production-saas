"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

import { motion } from "framer-motion";

import { SidebarHeader } from "./sidebar-header";
import { BoardsList } from "./boards-list";
import { UserInfo } from "./user-info";
import { ToggleButton } from "./toggle-button";
import { LogoutButton } from "./logout-button";

export const Sidebar = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <motion.aside
      layout
      className={cn(
        "sticky flex flex-col p-2 top-0 h-screen shrink-0 bg-card shadow-md gap-y-2 border-r-2 border-slate-700 z-[40]",
        open ? "w-[225px]" : "fit-content"
      )}
    >
      <SidebarHeader open={open} />
      <BoardsList open={open} />
      <UserInfo open={open} />
      {!open && <LogoutButton />}
      <ToggleButton open={open} setOpen={setOpen} />
    </motion.aside>
  );
};
