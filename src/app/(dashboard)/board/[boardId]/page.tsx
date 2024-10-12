import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Column } from "./_components/column";

const BoardIdPage = () => {
  return (
    <div className="flex w-full h-[calc(100vh-56px)] p-2">
      <ScrollArea className="flex-1 w-[calc(100vw-225px)] h-[calc(100vh-64px)] ">
        <div className="flex gap-x-4 z-0">
          <Column />
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

export default BoardIdPage;
