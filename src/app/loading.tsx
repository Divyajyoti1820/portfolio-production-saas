"use client";

import { Loader2Icon } from "lucide-react";

const MainLoadingPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <Loader2Icon className="size-10 animate-spin text-primary" />
    </div>
  );
};

export default MainLoadingPage;
