import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Edit2Icon, Trash2Icon } from "lucide-react";
import { TaskItem } from "./task-item";

export const ColumnItem = () => {
  return (
    <div className="w-[260px] h-full  rounded-md">
      <div className="w-full px-1.5 h-10 flex items-center justify-between rounded-md mb-4">
        <p className="text-md text-purple-500 font-bold ">Column Title</p>
        <div className="flex gap-x-1 items-center">
          <button className="text-white hover:text-primary disabled:text-primary/50 transition">
            <Edit2Icon className="size-4" />
          </button>
          <button className="text-white hover:text-destructive disabled:text-destructive/50 transition">
            <Trash2Icon className="size-4" />
          </button>
        </div>
      </div>
      <ScrollArea className="w-[260px] h-[calc(100%-56px)] rounded-md">
        <div className="h-full w-[260px] flex flex-col gap-y-3 items-start justify-start">
          {[...Array(4)].map((_, i) => (
            <TaskItem key={i} />
          ))}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
};
