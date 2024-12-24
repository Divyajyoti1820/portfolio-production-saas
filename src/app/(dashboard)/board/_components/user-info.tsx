"use client";

import { useSession } from "next-auth/react";

import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertOctagonIcon } from "lucide-react";
import { Hint } from "@/components/custom-components/hint";

type Props = {
  open: boolean;
};

export const UserInfo = ({ open }: Props) => {
  const session = useSession();

  if (session.status === "loading") {
    return (
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
    );
  }

  if (session.status === "unauthenticated") {
    return (
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
    );
  }

  const name = session.data?.user?.name;
  const imageUrl = session.data?.user?.image;
  const fallback = name?.charAt(0).toUpperCase();

  return (
    <Hint hide={open} label={name || "User"} side="right" align="center">
      <div
        className={cn(
          "w-full flex items-center justify-center p-1 bg-black rounded-lg",
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
          <p className="text-sm font-medium text-blue-500">{name}</p>
          <p className="text-[10px] text-muted-foreground">
            {session.data?.user?.email}
          </p>
        </div>
      </div>
    </Hint>
  );
};
