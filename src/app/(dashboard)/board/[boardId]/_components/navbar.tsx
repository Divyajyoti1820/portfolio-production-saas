"use client";

import { Edit2Icon, PlusSquareIcon, Trash2Icon, TrashIcon } from "lucide-react";
import { useMediaQuery } from "usehooks-ts";
import { Hint } from "@/components/hint";

export const Navbar = () => {
  const isBreakpoint = useMediaQuery("(max-width:1080px)");

  return (
    <nav className="bg-card h-14 w-full px-3 flex items-center justify-between">
      <div className="h-full flex items-center justify-center">
        <h1 className="text-lg font-semibold">Test Board</h1>
      </div>
      <div className="flex flex-row items-center justify-center gap-x-2">
        <Hint
          hide={!isBreakpoint}
          label="Create new task"
          align="center"
          side="bottom"
        >
          <button className="flex items-center justify-center gap-x-1 bg-teal-500 p-1 rounded-md hover:bg-teal-500/50 transition">
            <PlusSquareIcon className="size-5" />
            {!isBreakpoint && (
              <p className="text-xs font-semibold">Create new task</p>
            )}
          </button>
        </Hint>
        <Hint label="Delete Board" align="center" side="bottom">
          <button className="flex items-center justify-center gap-x-1 bg-destructive p-1 rounded-md hover:bg-destructive/50 transition">
            <Trash2Icon className="size-5" />
          </button>
        </Hint>
        <Hint label="Edit Board" align="center" side="bottom">
          <button className="flex items-center justify-center gap-x-1 bg-primary p-1 rounded-md hover:bg-primary/50 transition">
            <Edit2Icon className="size-5" />
          </button>
        </Hint>
      </div>
    </nav>
  );
};
