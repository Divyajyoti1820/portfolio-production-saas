"use client";

import { Button } from "@/components/ui/button";
import { PencilIcon, PlusSquareIcon, Trash2Icon } from "lucide-react";
import { Hint } from "@/components/hint";
import { useMedia } from "react-use";

export const Navbar = () => {
  const isSmallScreen = useMedia("(max-width:768px)");

  return (
    <nav className="w-full px-4 h-14 flex items-center justify-between bg-card border-b-2 border-slate-700">
      <div className="max-w-[200px]">
        <h1 className="text-lg font-semibold">Test Title</h1>
      </div>

      <div className="flex flex-row gap-x-2 items-center justify-center">
        <Hint
          hide={isSmallScreen ? false : true}
          label="Create new task"
          side="bottom"
          align="center"
        >
          <Button
            size="sm"
            className="flex items-center justify-center gap-x-2"
          >
            <PlusSquareIcon className="size-5" />
            {!isSmallScreen && <span>Add a new task</span>}
          </Button>
        </Hint>
        <Hint label="Edit board" side="bottom" align="center">
          <Button
            size="sm"
            variant="ghost"
            className="text-primary hover:bg-secondary hover:text-primary"
          >
            <PencilIcon className="size-5" />
          </Button>
        </Hint>
        <Hint label="Delete Board" side="bottom" align="center">
          <Button
            size="sm"
            variant="ghost"
            className="text-destructive hover:text-white hover:bg-destructive"
          >
            <Trash2Icon className="size-5" />
          </Button>
        </Hint>
      </div>
    </nav>
  );
};
