"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export const ColumnContent = () => {
  const { open } = useSidebar();
  return (
    <ScrollArea
      className={cn(
        "bg-black w-[calc(100vw-4rem)] h-[calc(100vh-3.5rem)] rounded-xl p-1",
        open && "w-[calc(100vw-16rem)] whitespace-nowrap"
      )}
    >
      <div
        className={cn(
          "w-[calc(100vw-4rem)] h-[calc(100vh-4rem)] flex space-x-4",
          open && "w-[calc(100vw-16rem)] whitespace-nowrap"
        )}
      >
        {[...Array(8)].map((_, i) => (
          <ScrollArea
            key={i}
            className="w-[260px] h-full bg-purple-600 rounded-xl shrink-0"
          >
            <div className="h-full w-[260px]"></div>
          </ScrollArea>
        ))}
      </div>
    </ScrollArea>
  );
};
