"use client";

import { useRouter } from "next/navigation";
import { useGetBoardCount } from "@/features/boards/api/use-get-board-count";
import { Loader2Icon } from "lucide-react";
import { PageError } from "@/components/custom-components/page-error";

export const DashboardClient = () => {
  const router = useRouter();
  const { data, isLoading } = useGetBoardCount();

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center gap-y-2 justify-center">
        <Loader2Icon className="size-10 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading Boards</p>
      </div>
    );
  }

  if (!data) {
    return <PageError />;
  }

  if (data.count === 0 && data.id === null) {
    router.push("/create");
  }

  if (data.id !== null) {
    router.push(`/board/${data.id}`);
  }

  return null;
};
