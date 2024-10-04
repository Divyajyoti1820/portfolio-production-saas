"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import { useSession, signOut } from "next-auth/react";

import { AlertCircleIcon, LogOutIcon } from "lucide-react";

import { Hint } from "@/components/hint";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  open: boolean;
};

export const UserInfo = ({ open }: Props) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <>
        {open && (
          <div className="flex items-center justify-center bg-background px-1 py-2 gap-x-2 rounded-md">
            <Skeleton className="size-7 bg-black/50" />
            <div className="flex flex-col items-start justify-center gap-y-1">
              <Skeleton className="w-20 h-3 bg-black/50" />
              <Skeleton className="w-20 h-3 bg-black/50" />
            </div>
            <Skeleton className="size-7 bg-black/50" />
          </div>
        )}
        {!open && (
          <div className="flex items-center justify-center px-1 py-2 gap-x-2 rounded-md">
            <Skeleton className="size-9 bg-black/50" />
          </div>
        )}
      </>
    );
  }

  if (!session) {
    return (
      <motion.div
        layout
        className="flex items-center justify-center px-1 py-2 gap-x-2 rounded-md bg-black"
      >
        <AlertCircleIcon className="text-destructive" />
        {open && (
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.125 }}
            className="text-xs text-destructive"
          >
            Something went wrong
          </motion.span>
        )}
      </motion.div>
    );
  }

  const name = session.user?.name;
  const imageUrl = session.user?.image;
  const fallback = name?.charAt(0).toUpperCase();

  return (
    <motion.div
      layout
      className={cn(
        "flex items-center justify-center bg-background px-1 py-2 gap-x-2 rounded-md",
        !open && "bg-transparent"
      )}
    >
      <motion.div layout>
        <Hint label={name || "User"} align="end" side="right">
          <Avatar
            className={cn(
              "cursor-pointer size-7 hover:opacity-75 transition rounded-md",
              !open && "border-primary border-2 size-9"
            )}
          >
            <AvatarImage src={imageUrl || ""} alt={name || ""} />
            <AvatarFallback className="rounded-md flex items-center justify-center bg-black font-medium text-lg text-primary">
              {fallback}
            </AvatarFallback>
          </Avatar>
        </Hint>
      </motion.div>
      {open && (
        <>
          <motion.div
            layout
            className="flex flex-col items-start justify-center gap-y-1"
          >
            <motion.span
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
              className="text-xs text-primary font-semibold"
            >
              {session?.user?.name}
            </motion.span>
            <motion.span
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
              className="text-[10px] text-muted-foreground"
            >
              {session?.user?.email}
            </motion.span>
          </motion.div>
          <Hint label="Logout" side="right" align="end">
            <motion.button
              layout
              className="p-1 text-destructive rounded-md hover:bg-black/50"
              onClick={() => signOut()}
            >
              <LogOutIcon className="size-4" />
            </motion.button>
          </Hint>
        </>
      )}
    </motion.div>
  );
};
