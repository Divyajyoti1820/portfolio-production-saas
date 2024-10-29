import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
// import { TaskItem } from "./task-item";

export const TaskList = () => {
  return (
    <ScrollArea className="w-[260px] h-[calc(100%-56px)] rounded-md">
      <div className="h-full w-[260px] flex flex-col gap-y-3 items-start justify-start">
        {/* {[...Array(4)].map((_, i) => (
          <TaskItem key={i} />
        ))} */}
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
};
