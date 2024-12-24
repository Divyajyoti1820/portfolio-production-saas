"use client";

import { AlertCircleIcon } from "lucide-react";

const MainErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <AlertCircleIcon className="size-10 text-destructive" />
      <p className="text-2xl text-destructive">Something went wrong</p>
    </div>
  );
};

export default MainErrorPage;
