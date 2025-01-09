"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  useSidebar,
} from "@/components/ui/sidebar";

import {
  AlertCircleIcon,
  AlertOctagonIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";

import { UserInfo } from "./user-info";
import { MainContent } from "./main-content";
import { LogoutButton } from "./logout-button";
import { Hint } from "@/components/custom-components/hint";
import { useGetBoards } from "@/features/boards/api/use-get-boards";
import { useGetBoardId } from "@/hooks/use-get-board-id";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";

export const MainSidebar = () => {
  const router = useRouter();
  const { status, data: user } = useSession();
  const { open, setOpen, isMobile } = useSidebar();

  const currentBoardId = useGetBoardId();
  const { data: boards, isLoading: boardsLoading } = useGetBoards();

  if (status === "unauthenticated") {
    router.push("/sign-in");
    return;
  }

  return (
    <Sidebar collapsible="icon" className="flex h-full items-center">
      <SidebarHeader className="border-b-2 border-blue-500 flex flex-row items-center justify-center">
        <div
          onClick={() => router.push("/")}
          className="size-10 relative cursor-pointer"
        >
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
      <SidebarContent className="py-3">
        {boardsLoading && (
          <SidebarMenu className="p-2 h-full flex items-center">
            {[...Array(5)].map((_, i) => (
              <Skeleton
                key={i}
                className={cn("bg-black w-full h-10", !open && "size-10")}
              />
            ))}
          </SidebarMenu>
        )}
        {!boardsLoading && boards && (
          <MainContent
            open={open}
            data={boards}
            currentBoardId={currentBoardId}
            isAuthenticated={status === "authenticated"}
          />
        )}
        {!boardsLoading && !boards && (
          <SidebarMenu className="h-full flex flex-col items-center justify-center">
            <AlertCircleIcon className="size-8 text-destructive" />
            {open && (
              <p className="font-semibold text-destructive">
                Something went wrong
              </p>
            )}
          </SidebarMenu>
        )}
      </SidebarContent>
      <SidebarFooter>
        {status === "loading" && (
          <div className="w-full flex items-center justify-center p-1 bg-black rounded-lg">
            <Skeleton className="size-10" />
            <div
              className={cn(
                "flex-1 flex flex-col gap-y-2.5 items-center justify-center transition",
                !open && "hidden"
              )}
            >
              <Skeleton className="w-32 h-2" />
              <Skeleton className="w-36 h-2" />
            </div>
          </div>
        )}
        {status !== "authenticated" && !user && (
          <div className="w-full flex items-center justify-center p-1 bg-black rounded-lg">
            <div className="size-10 flex items-center justify-center">
              <AlertOctagonIcon className="text-destructive" />
            </div>
            <div
              className={cn(
                "flex-1 flex flex-col gap-y-2.5 items-center justify-center transition",
                !open && "hidden"
              )}
            >
              <p className="text-xs text-destructive">Something went wrong</p>
            </div>
          </div>
        )}
        {user && <UserInfo open={open} data={user} />}

        {!open && <LogoutButton />}
        <Hint hide={open} label="Open Sidebar" align="center" side="right">
          <button
            disabled={isMobile}
            onClick={() => setOpen(!open)}
            className={cn(
              "w-full flex items-center justify-center bg-black  p-1 rounded-md"
            )}
          >
            <p
              className={cn(
                "flex-1 transition text-[14px]",
                !open && "hidden transition"
              )}
            >
              Hide Sidebar
            </p>
            <>
              {open ? (
                <ChevronsLeftIcon className="size-8 text-blue-500 " />
              ) : (
                <ChevronsRightIcon className="size-8 text-blue-500" />
              )}
            </>
          </button>
        </Hint>
      </SidebarFooter>
    </Sidebar>
  );
};
