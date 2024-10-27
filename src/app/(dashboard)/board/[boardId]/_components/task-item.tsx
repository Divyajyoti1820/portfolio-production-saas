import { EditIcon, TrashIcon } from "lucide-react";

export const TaskItem = () => {
  return (
    <div className="w-full h-28 flex flex-row items-center justify-start rounded-md cursor-pointer p-3 bg-black/40 hover:bg-black transition">
      <div className="h-full w-[90%] flex flex-1 flex-col gap-y-2 items-start justify-center">
        <p className="text-sm text-indigo-500 font-bold">Test Task Title</p>
        <p className="text-[10px] text-wrap truncate text-muted-foreground">
          Test task description to maintain lengths.
        </p>
        <p className="text-xs">
          0 of 3 <span className="text-blue-500 font-medium">Subtasks</span>
        </p>
      </div>
      <div className="h-full w-[10%] flex flex-col items-center justify-center gap-y-3">
        <button className="bg-blue-700 p-1 rounded-md hover:bg-blue-500 transition">
          <EditIcon className="size-4" />
        </button>
        <button className="bg-red-800 p-1 rounded-md hover:bg-destructive transition">
          <TrashIcon className="size-4" />
        </button>
      </div>
    </div>
  );
};
