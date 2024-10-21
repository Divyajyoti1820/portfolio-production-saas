"use client";

import { useMediaQuery } from "usehooks-ts";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: Props) => {
  const isMobile = useMediaQuery("(max-width:1080px)");

  return (
    <div className="h-full flex items-center justify-center">
      <div
        className={cn(
          "h-full w-[50%] bg-card flex flex-col items-center justify-center gap-y-2",
          isMobile && "hidden"
        )}
      >
        <Image
          src="/logo.svg"
          alt="Productivity | SaaS"
          width={300}
          height={300}
        />
        <h1 className="text-4xl font-semibold">Productivity</h1>
        <p className="text-sm text-muted-foreground">Software-as-a-Service</p>
      </div>
      <main
        className={cn(
          "h-full w-[50%] flex items-center justify-center",
          isMobile && "w-full"
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
