"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useMediaQuery } from "usehooks-ts";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

interface Props {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: Props) => {
  const session = useSession();
  const isBreakpoint = useMediaQuery("(max-width:1080px)");

  if (!session || session.status === "unauthenticated") {
    redirect("/api/auth/signin");
  }

  return (
    <div className="h-full flex flex-row items-center justify-center">
      <div
        className={cn(
          "w-1/2 h-full flex flex-col items-center justify-center",
          isBreakpoint && "hidden"
        )}
      >
        <Image
          src="/logo.svg"
          alt="Productivity | SaaS"
          width={300}
          height={300}
        />
        <h1 className="text-5xl font-semibold text-blue-500">Productivity</h1>
        <p className="text-lg text-muted-foreground">Software as a Service</p>
      </div>
      <main
        className={cn(
          "w-1/2 h-full flex items-center justify-center",
          isBreakpoint && "w-full"
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
