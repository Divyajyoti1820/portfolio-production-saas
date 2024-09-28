import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { UserButton } from "@/features/auth/components/user-button";
import { ArrowRightIcon, SidebarIcon } from "lucide-react";
import Image from "next/image";

const Home = async () => {
  const session = await auth();

  /* Creating Date */
  const today = new Date();
  const instance = {
    day: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear(),
    hours: today.getHours(),
    mins: today.getMinutes(),
  };
  /* Creating Date */

  return (
    <div className="h-full flex flex-row gap-y-2 items-center justify-center">
      <div className="hidden lg:w-1/2 h-full lg:flex flex-col gap-y-4 items-center justify-center">
        <Image
          src="/logo.svg"
          alt="Productivity | Software as a Service"
          width={220}
          height={100}
        />
        <h1 className="text-5xl w-full text-center font-semibold">
          Productivity
        </h1>
        <p className="text-muted-foreground text-lg">Software-as-a-Service</p>
      </div>

      <Separator orientation="vertical" className="hidden lg:block" />

      <div className="w-full h-full lg:w-1/2 flex flex-col items-center">
        <nav className="px-3 py-2  w-full flex items-center justify-between  border-b border-slate-700">
          <p className="text-lg font-medium">{session?.user?.name}</p>
          <p className="text-sm text-muted-foreground">{`${instance.day}/${instance.month}/${instance.year} ${instance.hours}:${instance.mins}`}</p>
          <UserButton />
        </nav>
        <div className="flex-1 w-full flex flex-col gap-y-6 items-center justify-center h-full">
          <p className="w-[80%]  text-center text-md font-normal text-muted-foreground">
            Welcome to{" "}
            <strong className="text-2xl text-primary">Productivity</strong>! Our
            user-friendly software is designed to boost your efficiency and
            streamline work management. Whether you&apos;re handling large-scale
            projects or smaller tasks, our platform offers a visual and
            interactive approach to help you stay organized and productive.
          </p>

          <div className="flex items-center justify-center gapy-6"></div>
          <Button
            disabled={false}
            className="flex w-[420px] items-center justify-center gap-x-3"
            size="lg"
          >
            <SidebarIcon />
            Create your first board
          </Button>
          <Button
            disabled={false}
            className="w-[420px] flex items-center gap-x-3"
            variant="outline"
          >
            Visit your boards
            <ArrowRightIcon className="size-4" />
          </Button>
        </div>
        <div className="w-full flex items-center justify-center px-3 py-2 border-t border-slate-700">
          <p className="w-full text-center text-xs text-muted-foreground">
            © 2024 Deck Corp. All rights reserved. This website and its content
            are protected by copyright laws.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
