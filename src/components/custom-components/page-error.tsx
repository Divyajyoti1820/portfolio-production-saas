"use client";

import Link from "next/link";

import { AlertTriangleIcon, HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PageError = () => {
  return (
    <div className="min-h-screen w-full flex flex-col gap-y-4 items-center justify-center">
      <AlertTriangleIcon className="size-5" />
      <h1>Something went wrong</h1>

      <Button variant="destructive" size="lg" asChild>
        <Link href="/">
          <HomeIcon className="size-4 mr-2" />
          <span>Back to Home</span>
        </Link>
      </Button>
    </div>
  );
};
