export type ColumnWithTasks = {
  column: {
    boardId: string;
    title: string;
    id: string;
    createdAt: string;
    updatedAt: string | null;
  };
  tasks: {
    title: string;
    id: string;
    description: string;
    createdAt: string;
    updatedAt: string | null;
    columnId: string;
    subtasks: {
      title: string;
      isCompleted: boolean;
    }[];
    position: number;
  }[];
};
