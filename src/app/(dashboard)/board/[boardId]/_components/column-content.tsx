"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { ColumnItem } from "./column-item";

export const ColumnContent = () => {
  const { open } = useSidebar();
  return (
    <ScrollArea
      className={cn(
        " w-[calc(100vw-4rem)]  h-[calc(100vh-3.5rem)]  p-1 overflow-x-auto",
        open && "w-[calc(100vw-16rem)]"
      )}
    >
      <div className="w-full h-[calc(100vh-4rem)] whitespace-nowrap flex gap-x-3">
        {[...Array(3)].map((_, i) => (
          <ColumnItem key={i} />
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
