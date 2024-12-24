"use client";

import { Hint } from "@/components/custom-components/hint";
import { LogOutIcon } from "lucide-react";

import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export const LogoutButton = () => {
  const session = useSession();

  return (
    <Hint label="Logout" side="right" align="center">
      <button
        disabled={!session || session.status === "unauthenticated"}
        onClick={() => signOut()}
        className="w-full flex items-center justify-center bg-destructive text-white  p-1 rounded-md hover:bg-destructive/60"
      >
        <LogOutIcon className="size-6" />
      </button>
    </Hint>
  );
};
