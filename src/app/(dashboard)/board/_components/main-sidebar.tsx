"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";

import { ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";

import { UserInfo } from "./user-info";
import { MainContent } from "./main-content";
import { LogoutButton } from "./logout-button";
import { Hint } from "@/components/custom-components/hint";

export const MainSidebar = () => {
  const router = useRouter();
  const { open, setOpen, isMobile } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="flex items-center">
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
        <MainContent open={open} />
      </SidebarContent>
      <SidebarFooter>
        <UserInfo open={open} />
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
              className={cn("flex-1 transition", !open && "hidden transition")}
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
