"use client";

import { useRouter } from "next/navigation";
import { useGetBoardCount } from "@/features/boards/api/use-get-board-count";
import { Loader2Icon } from "lucide-react";
import { PageError } from "@/components/custom-components/page-error";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useIsMobile } from "@/hooks/use-mobile";

export const DashboardClient = () => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const { data, isLoading } = useGetBoardCount();

  if (isLoading) {
    return (
      <div className="w-full h-full flex flex-col items-center gap-y-2 justify-center">
        <Loader2Icon className="size-10 animate-spin text-primary" />
        <p className="text-sm text-muted-foreground">Loading Boards</p>
      </div>
    );
  }

  if (!isLoading && !data) {
    return <PageError />;
  }

  if (!isLoading && data?.count === 0 && data?.id === null) {
    router.push("/create");
    return null;
  }

  if (data?.id !== null) {
    router.push(`/board/${data?.id}`);
    return null;
  }

  if (isMobile) {
    return (
      <AlertDialog
        open={isMobile}
        onOpenChange={() => (!isMobile ? true : false)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Mobile Device Detected</AlertDialogTitle>
            <AlertDialogDescription>
              For the best experience, please use a desktop device to access
              this web application. While basic functionality is available on
              mobile, certain features may be limited or not optimized for
              smaller screens.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return null;
};
