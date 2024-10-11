import { motion } from "framer-motion";

import { cn } from "@/lib/utils";
import { ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";
import { Hint } from "@/components/hint";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const ToggleButton = ({ open, setOpen }: Props) => {
  return (
    <Hint
      label="Open sidebar"
      hide={open ? true : false}
      align="center"
      side="right"
    >
      <motion.button
        layout
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center p-2 hover:bg-black/50 rounded-md transition"
        )}
      >
        <motion.div
          layout
          className={cn(
            "size-5 place-content-center flex items-center justify-between w-full",
            !open && "justify-center"
          )}
        >
          {open && (
            <motion.span layout className="text-sm font-medium">
              Hide Sidebar
            </motion.span>
          )}
          {open && (
            <motion.div layout>
              <ChevronsLeftIcon className="text-primary size-6" />
            </motion.div>
          )}
          {!open && (
            <motion.div layout>
              <ChevronsRightIcon className="text-primary size-6" />
            </motion.div>
          )}
        </motion.div>
      </motion.button>
    </Hint>
  );
};
