"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { TaskItem } from "./task-item";
import { Droppable } from "@hello-pangea/dnd";
import { ColumnWithTasks } from "@/features/columns/types";

type Props = {
  data: ColumnWithTasks;
};

export const TaskList = ({ data }: Props) => {
  return (
    <Droppable droppableId={data.column.id}>
      {(provided) => (
        <ScrollArea className="w-[260px] h-[calc(100%-56px)] rounded-md">
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="h-full w-[260px] flex flex-col gap-y-3 items-start justify-start"
          >
            {data.tasks.map((task, index) => (
              <TaskItem
                key={task.id}
                data={task}
                boardId={data.column.boardId}
                index={index}
              />
            ))}
          </div>
          {provided.placeholder}
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      )}
    </Droppable>
  );
};
