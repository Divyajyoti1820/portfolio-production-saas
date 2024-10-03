"use client";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

import { Logo } from "./logo";

type Props = {
  open: boolean;
};

export const SidebarHeader = ({ open }: Props) => {
  const router = useRouter();
  return (
    <motion.div layout className="mb-3 pb-3 border-b border-muted-foreground">
      <div
        className="flex cursor-pointer items-center justify-center rounded-md transition-colors hover :bg-slate-100"
        onClick={() => router.push("/")}
      >
        <div className="flex items-center justify-center gap-2 ">
          <Logo />
          {open && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.125 }}
              className="flex flex-col items-start justify-center"
            >
              <span className="block text-md text-white font-semibold">
                Productivity
              </span>
              <span className="block text-xs text-muted-foreground">
                Software-as-a-Service
              </span>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};
