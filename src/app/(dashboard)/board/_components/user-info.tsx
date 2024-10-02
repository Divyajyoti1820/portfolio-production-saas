"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertCircleIcon, LogOutIcon } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import React from "react";

type Props = {
  open: boolean;
};

export const UserInfo = ({ open }: Props) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div className=""></div>;
  }

  if (!session) {
    return (
      <div className="">
        <AlertCircleIcon />
      </div>
    );
  }

  const name = session.user?.name;
  const imageUrl = session.user?.image;
  const fallback = name?.charAt(0).toUpperCase();

  return (
    <div className="flex items-center justify-center bg-background px-1 py-2 gap-x-2 rounded-md">
      <div>
        <Avatar className="cursor-pointer size-7 hover:opacity-75 transition rounded-md">
          <AvatarImage src={imageUrl || ""} alt={name || ""} />
          <AvatarFallback className="rounded-md flex items-center justify-center bg-black font-medium text-lg text-primary">
            {fallback}
          </AvatarFallback>
        </Avatar>
      </div>
      {open && (
        <>
          <div className="flex flex-col items-start justify-center">
            <span className="text-xs text-primary font-semibold">
              {session?.user?.name}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {session?.user?.email}
            </span>
          </div>
          <button
            className="p-1 text-destructive rounded-md hover:bg-black/50"
            onClick={() => signOut()}
          >
            <LogOutIcon className="size-4" />
          </button>
        </>
      )}
    </div>
  );
};
