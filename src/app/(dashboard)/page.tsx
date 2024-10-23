"use client";

import { Button } from "@/components/ui/button";
import { UserButton } from "@/features/auth/components/user-button";
import { format } from "date-fns";
import { ArrowRightIcon, SidebarIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Home = () => {
  const { data } = useSession();

  return (
    <div className="w-full h-full bg-black flex flex-col items-center justify-start  border-blue-800 ">
      <div className="w-full flex items-center justify-between p-2 border-b-2 border-blue-500">
        <p className="text-sm font-semibold">{data?.user?.name}</p>
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
          As a <span className="text-blue-500">dedicated developer</span>, I've
          crafted <strong className="text-blue-500">Productivity</strong> to
          streamline your project workflows. This intuitive tool empowers you to
          visualize and organize your tasks efficiently using customizable
          boards and columns. Whether you're tackling a solo endeavor or leading
          a large-scale project, Productivity's user-friendly interface
          simplifies project management.
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
            onClick={() => {}}
          >
            <SidebarIcon />
            Create your first Board
          </Button>
          <Button
            className="w-[50%]"
            variant="secondary"
            size="lg"
            disabled={false}
            onClick={() => {}}
          >
            Continue to your Boards <ArrowRightIcon />
          </Button>
        </div>
      </div>

      <div className="flex-end w-full p-2  flex items-center justify-between border-t-2 border-blue-500">
        <p className="text-xs text-muted-foreground">
          Copyright © 2024 Divyajyoti. All rights reserved.
        </p>
        <Image src="/flag.svg" alt="Republic of India" width={30} height={30} />
      </div>
    </div>
  );
};

export default Home;
