"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { UserButton } from "@/features/auth/components/user-button";
import { useGetBoards } from "@/features/boards/api/use-get-boards";
import { useCreateBoardModal } from "@/features/boards/store/use-create-board-modal";
import { useMediaQuery } from "usehooks-ts";

import { LoaderCircleIcon, SidebarIcon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { format } from "date-fns/format";

const DashboardClient = () => {
  const { data: User } = useSession();
  const router = useRouter();

  const isBreakpoint = useMediaQuery("(max-width:1024px)");
  const [smallScreenAlert, setSmallScreenAlert] = useState<boolean>(false);

  const { setIsOpen } = useCreateBoardModal();
  const {
    data: Boards,
    isLoading: BoardLoading,
    isError: BoardError,
  } = useGetBoards();

  useEffect(() => {
    if (isBreakpoint) {
      setSmallScreenAlert(true);
    }
  }, [isBreakpoint]);

  const createBoardHandler = () => {
    if (!User) {
      return;
    }

    setIsOpen(true);
  };

  if (BoardLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoaderCircleIcon className="size-10 text-primary animate-spin" />
      </div>
    );
  }

  if (!Boards || BoardError) {
    throw new Error("Error fetching Boards");
  }

  if (Boards.length !== 0) {
    router.push(`board/${Boards[0].id}`);
  }

  return (
    <div className="h-full w-full flex items-center justify-center">
      <SmallScreenAlertDialog
        open={smallScreenAlert}
        setOpen={setSmallScreenAlert}
      />
      <div
        className={cn(
          "w-1/2 flex flex-col items-center gap-y-3 justify-center",
          isBreakpoint && "hidden"
        )}
      >
        <Image
          src="/logo.svg"
          alt="Productivity | Software-as-a-Service"
          width={350}
          height={350}
        />
        <div className="w-full flex flex-col items-center justify-center">
          <h1 className="text-6xl font-bold text-blue-500">Productivity</h1>
          <p className="text-lg text-muted-foreground">Software as a Service</p>
        </div>
      </div>
      <div
        className={cn(
          "w-1/2 h-full bg-black flex flex-col items-center justify-start  border-blue-800 rounded-l-lg",
          isBreakpoint && "w-full"
        )}
      >
        <div className="w-full flex items-center justify-between p-2 border-b-2 border-blue-500">
          <p className="text-sm font-semibold">{User?.user?.name}</p>
          <p className="text-xs font-semibold text-primary">
            {format(Date.now(), "dd MMM y | EEEE")}
          </p>
          <UserButton />
        </div>
        <div className="w-full flex-1 p-2 gap-y-8 flex flex-col items-center justify-center">
          <p className="text-primary text-lg font-semibold">
            Introducing Productivity: Your Ultimate Project Management Tool
          </p>
          <p className="text-sm text-center">
            As a <span className="text-blue-500">dedicated developer</span>,
            I&apos;ve crafted{" "}
            <strong className="text-blue-500">Productivity</strong> to
            streamline your project workflows. This intuitive tool empowers you
            to visualize and organize your tasks efficiently using customizable
            boards and columns. Whether you&apos;re tackling a solo endeavor or
            leading a large-scale project, Productivity&apos;s user-friendly
            interface simplifies project management.
          </p>
          <p className="text-sm text-center">
            Break down complex tasks into manageable subtasks, track progress
            seamlessly, and collaborate effortlessly. Experience the future of
            project management with Productivity.
          </p>

          <p className="text-2xl font-bold text-blue-500">Be Productive!</p>

          <div className="flex w-full flex-col gap-y-3 items-center justify-center">
            <Button
              className="w-[50%]"
              size="lg"
              disabled={false}
              onClick={createBoardHandler}
            >
              <SidebarIcon />
              Create your first Board
            </Button>
          </div>
        </div>

        <div className="flex-end w-full p-2  flex items-center justify-between border-t-2 border-blue-500">
          <p className="text-xs text-muted-foreground">
            Copyright © 2024 Divyajyoti. All rights reserved.
          </p>
          <Image
            src="/flag.svg"
            alt="Republic of India"
            width={30}
            height={30}
          />
        </div>
      </div>
    </div>
  );
};

/* Small Screen Alert Dialog Component if any one */
const SmallScreenAlertDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  return (
    <AlertDialog open={open} onOpenChange={() => setOpen(false)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Best viewed on tablet or desktop</AlertDialogTitle>
          <AlertDialogDescription>
            For an optimal user experience, this web app is best viewed on a
            tablet or desktop device.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DashboardClient;
