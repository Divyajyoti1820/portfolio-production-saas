import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TaskItem } from "./task-item";

type Props = {
  data: {
    columnId: string;
    title: string;
    id: string;
    description: string;
    createdAt: string;
    updatedAt: string | null;
    subtasks: {
      title: string;
      isCompleted: boolean;
    }[];
  }[];

  boardId: string;
};

export const TaskList = ({
  data: tasks,

  boardId,
}: Props) => {
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
