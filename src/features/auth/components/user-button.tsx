"use client";

import { useSession, signOut } from "next-auth/react";

import { LogOutIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const UserButton = () => {
  const session = useSession();
  if (session.status === "loading") {
  }

  if (session.status === "unauthenticated" || !session.data) {
    return null;
  }

  const name = session.data?.user?.name;
  const imageUrl = session.data.user?.image;
  const fallback = name?.charAt(0).toUpperCase();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none">
        <Avatar className="cursor-pointer">
          <AvatarImage
            alt={name || "User"}
            src={imageUrl || ""}
            className="hover:opacity-75 transition"
          />
          <AvatarFallback className="flex items-center justify-center">
            {fallback || "T"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="start"
        side="bottom"
        alignOffset={20}
        className="w-20"
      >
        <DropdownMenuItem
          className="h-6 cursor-pointer"
          disabled={false}
          onClick={() => signOut()}
        >
          <LogOutIcon className="size-4 mr-2 text-destructive" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
