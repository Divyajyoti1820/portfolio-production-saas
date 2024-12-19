import "server-only";

import { redirect } from "next/navigation";

import { auth } from "@/auth";

export const ProtectServer = async () => {
  const session = await auth();
  if (!session) {
    redirect("/api/auth/signin");
  }
};
