import { EditIcon, TrashIcon } from "lucide-react";

export const TaskCard = () => {
  return (
    <div className="w-[284px] h-36 bg-card rounded-lg p-2 flex flex-col items-center justify-between cursor-pointer border-2 border-transparent hover:border-primary transition">
      <div className="flex flex-1 w-full gap-y-1.5 flex-col items-start justify-start overflow-hidden">
        <h1 className="text-lg font-semibold text-blue-500 w-full truncate">
          Test Task
        </h1>
        <p className="text-xs text-muted-foreground">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Hic tempore
          totam inventore.
        </p>
        <div className="w-full flex justify-between items-center text-[10px]">
          <p>
            Total Subtask :{" "}
            <span className="text-primary font-semibold text-xs text-blue-500">
              3
            </span>
          </p>
          <p>
            Completed :{" "}
            <span className="text-primary font-semibold text-xs text-blue-500">
              2
            </span>
          </p>
        </div>
      </div>
      <div className="w-full flex item-center justify-between gap-x-4">
        <button className="text-blue-700 p-1 rounded-md hover:bg-blue-700 hover:text-white transition">
          <EditIcon className="size-5" />
        </button>
        <button className="text-destructive p-1 rounded-md hover:bg-destructive hover:text-white transition">
          <TrashIcon className="size-5" />
        </button>
      </div>
    </div>
  );
};
