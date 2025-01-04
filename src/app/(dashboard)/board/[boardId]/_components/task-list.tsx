import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TaskItem } from "./task-item";
import { Droppable } from "@hello-pangea/dnd";

//Drop-Down under construction

type Props = {
  data: {
    columnId: string;
    title: string;
    id: string;
    description: string;
    createdAt: string;
    updatedAt: string | null;
    position: number;
    subtasks: {
      title: string;
      isCompleted: boolean;
    }[];
  }[];
  columnId: string;
  boardId: string;
};

export const TaskList = ({ data: tasks, boardId, columnId }: Props) => {
  return (
    <ScrollArea className="w-[260px] h-[calc(100%-56px)] rounded-md">
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="h-full w-[260px] flex flex-col gap-y-3 items-start justify-start"
          >
            {tasks.map((task) => (
              <TaskItem key={task.id} data={task} boardId={boardId} />
              // We have change database and get tasks schema to add 1 more column of index
            ))}
          </div>
        )}
      </Droppable>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
};
