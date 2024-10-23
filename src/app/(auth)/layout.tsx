"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";

import { useMediaQuery } from "usehooks-ts";

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  const isBreakpoint = useMediaQuery("(max-width:1080px)");

  return (
    <div className="h-full flex items-center justify-center">
      <div
        className={cn(
          "h-full w-1/2 flex bg-black flex-col items-center justify-center",
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
          "h-full w-1/2 flex items-center justify-center",
          isBreakpoint && "w-full"
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
