"use client";

import { TaskItem } from "./task-item";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { ColumnWithTasks } from "@/features/columns/types";

type Props = {
  data: ColumnWithTasks;
};

export const TaskList = ({ data }: Props) => {
  return (
    <Droppable droppableId={data.column.id}>
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          className="w-[260px] h-[calc(100%-3.5rem)] flex flex-col gap-y-3 items-start justify-start"
        >
          {data.tasks.map((task, index) => (
            <Draggable key={task.id} draggableId={task.id} index={index}>
              {(provides) => (
                <div
                  {...provides.draggableProps}
                  {...provides.dragHandleProps}
                  ref={provides.innerRef}
                >
                  <TaskItem
                    key={task.id}
                    data={task}
                    boardId={data.column.boardId}
                  />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};
