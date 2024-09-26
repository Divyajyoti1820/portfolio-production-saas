"use client";

import { useSession, signOut } from "next-auth/react";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2Icon, LogOutIcon } from "lucide-react";

export const UserButton = () => {
  const session = useSession();

  if (session.status === "loading") {
    return (
      <Loader2Icon className="size-4 animate-spin text-muted-foreground" />
    );
  }

  if (session.status === "unauthenticated" || !session.data) {
    return null;
  }

  const name = session.data?.user?.name;
  const imageUrl = session.data.user?.name;
  const fallback = name?.charAt(0).toUpperCase();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild className="outline-none relative">
        <Avatar className="cursor-pointer size-10 hover:opacity-75 transition">
          <AvatarImage src={imageUrl || ""} alt={name || ""} />
          <AvatarFallback className="flex items-center justify-center bg-black font-medium text-primary">
            {fallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-50">
        <DropdownMenuItem
          className="h-10 cursor-pointer text-destructive font-semibold"
          disabled={false}
          onClick={() => signOut()}
        >
          <LogOutIcon className="size-4 mr-2" />
          <p>Logout</p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
