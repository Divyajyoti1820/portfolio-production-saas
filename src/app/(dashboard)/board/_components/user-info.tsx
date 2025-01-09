"use client";

import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Hint } from "@/components/custom-components/hint";
import { type Session } from "next-auth";

type Props = {
  open: boolean;
  data: Session;
};

export const UserInfo = ({ open, data }: Props) => {
  if (!data || !data.user) {
    return null;
  }

  const name = data.user.name || data.user.email || "User";
  const imageUrl = data.user.image;
  const fallback = name.charAt(0).toUpperCase();

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
            className="size-8 border-2 border-blue-500"
          />
          <AvatarFallback>{fallback}</AvatarFallback>
        </Avatar>
        <div
          className={cn(
            "flex-1 flex flex-col items-center justify-center transition",
            !open && "hidden"
          )}
        >
          <p className="text-sm font-medium text-[12px] text-blue-500">
            {name}
          </p>
          <p className="text-[10px] text-muted-foreground">
            {data.user.email || "No email"}
          </p>
        </div>
      </div>
    </Hint>
  );
};
