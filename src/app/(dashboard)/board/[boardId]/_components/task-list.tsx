import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useGetTasks } from "@/features/tasks/api/use-get-tasks";
import { TaskItem } from "./task-item";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertOctagonIcon } from "lucide-react";

type Props = {
  boardId: string;
  columnId: string;
};

export const TaskList = ({ boardId, columnId }: Props) => {
  const { data: tasks, isLoading, isError } = useGetTasks(boardId, columnId);

  if (isLoading) {
    return (
      <ScrollArea className="w-[260px] h-[calc(100%-56px)] rounded-md">
        <div className="h-full w-[260px] flex flex-col gap-y-3 items-start justify-start">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="w-[260px] h-full bg-black/40" />
          ))}
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    );
  }
  if (!tasks || isError) {
    return (
      <ScrollArea className="w-[260px] h-[calc(100%-56px)] rounded-md">
        <div className="h-full w-[260px] flex flex-col gap-y-3 items-center justify-center bg-black/20">
          <AlertOctagonIcon className="text-destructive" />
          <p className="text-destructive text-sm">Something went wrong</p>
        </div>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    );
  }

  return (
    <ScrollArea className="w-[260px] h-[calc(100%-56px)] rounded-md">
      <div className="h-full w-[260px] flex flex-col gap-y-3 items-start justify-start">
        {tasks.map((task) => (
          <TaskItem key={task.id} data={task} boardId={boardId} />
        ))}
      </div>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
};
