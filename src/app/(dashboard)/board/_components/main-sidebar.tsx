"use client";

import { cn } from "@/lib/utils";

import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { ChevronsLeftIcon, ChevronsRightIcon, SidebarIcon } from "lucide-react";
import { UserInfo } from "./use-info";
import { useGetBoards } from "@/features/boards/api/use-get-boards";

export const MainSidebar = () => {
  const { open, setOpen, isMobile } = useSidebar();
  const {
    data: Boards,
    isLoading: BoardLoading,
    isError: BoardError,
  } = useGetBoards();

  return (
    <Sidebar collapsible="icon" className="flex items-center">
      <SidebarHeader className="border-b-2 border-blue-500 flex flex-row items-center justify-center">
        <div className="size-10 relative">
          <Image
            src="/logo.svg"
            alt="Productivity | Software-as-a-Service"
            fill
          />
        </div>
        <div
          className={cn(
            "flex flex-col flex-1 items-center justify-center",
            !open && "hidden"
          )}
        >
          <p className="text-lg font-semibold">Productivity</p>
          <p className="text-xs text-muted-foreground">Software as a Service</p>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu className="my-2 px-1.5">
          {Boards ? (
            <>
              {Boards.map((board) => (
                <SidebarMenuItem
                  key={board.id}
                  className="bg-primary p-1 rounded-md flex items-center justify-center transition gap-x-2 cursor-pointer hover:bg-primary/50"
                >
                  <SidebarIcon className="size-8" />
                  <p
                    className={cn(
                      "flex-1 text-sm text-center transition",
                      !open && "hidden"
                    )}
                  >
                    {board.title}
                  </p>
                </SidebarMenuItem>
              ))}
            </>
          ) : (
            <></>
          )}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <UserInfo open={open} />
        <button
          disabled={isMobile}
          onClick={() => setOpen(!open)}
          className={cn(
            "w-full flex items-center justify-center bg-black  p-2 rounded-md"
          )}
        >
          <p className={cn("flex-1 transition", !open && "hidden transition")}>
            Hide Sidebar
          </p>
          <>
            {open ? (
              <ChevronsLeftIcon className="size-8 text-blue-500" />
            ) : (
              <ChevronsRightIcon className="size-8 text-blue-500" />
            )}
          </>
        </button>
      </SidebarFooter>
    </Sidebar>
  );
};
