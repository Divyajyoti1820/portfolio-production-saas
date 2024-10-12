import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { TaskCard } from "./task-card";

export const Column = () => {
  return (
    <div className="w-72 h-[calc(100vh-64px)] rounded-xl">
      {/* Column Header */}
      <div className="w-full h-10 flex items-center justify-between px-2 py-3">
        <div className="flex items-center gap-x-1 justify-center text-sm font-semibold">
          {/* The bg-color should be random */}
          <div className="size-4 bg-orange-500 rounded-md" />
          <h3>Test column</h3>
        </div>
        <div className="flex flex-row gap-x-1 items-center">
          <button className="hover:bg-black p-1.5 rounded-md text-primary">
            <Edit2Icon className="size-4" />
          </button>
          <button className="hover:bg-black p-1.5 rounded-md text-destructive">
            <Trash2Icon className="size-4" />
          </button>
        </div>
      </div>
      {/* Column Header */}

      {/* Task Cards Sections */}
      <ScrollArea className="w-72 h-[calc(100vh-104px)] ">
        <div className="h-full w-full flex flex-col items-center p-1 gap-y-2">
          <TaskCard />
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
      {/* Task Cards Sections */}
    </div>
  );
};
