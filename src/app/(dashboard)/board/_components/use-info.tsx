"use client";

import { useSession } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
};

export const UserInfo = ({ open }: Props) => {
  const session = useSession();

  if (session.status === "loading") {
    return <div className="w-full flex items-center justify-center p-2"></div>;
  }

  if (session.status === "unauthenticated") {
    return;
  }

  const name = session.data?.user?.name;
  const imageUrl = session.data?.user?.image;
  const fallback = name?.charAt(0).toUpperCase();

  return (
    <div
      className={cn(
        "w-full flex items-center justify-center p-0.5 bg-black rounded-lg",
        !open && "bg-transparent"
      )}
    >
      <Avatar className="flex items-center justify-center">
        <AvatarImage
          src={imageUrl || ""}
          alt={name || "User"}
          className="size-10 border-2 border-blue-500"
        />
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
      <div
        className={cn(
          "flex-1 flex flex-col items-center justify-center transition",
          !open && "hidden"
        )}
      >
        <p className="text-md font-medium text-blue-500">{name}</p>
        <p className="text-[10px] text-muted-foreground">
          {session.data?.user?.email}
        </p>
      </div>
    </div>
  );
};
