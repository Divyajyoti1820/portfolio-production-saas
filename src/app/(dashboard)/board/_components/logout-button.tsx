import { motion } from "framer-motion";

import { Hint } from "@/components/hint";
import { signOut } from "next-auth/react";
import { LogOutIcon } from "lucide-react";

export const LogoutButton = () => {
  return (
    <Hint label="Logout" side="right" align="end">
      <motion.button
        layout
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.125 }}
        className="p-2 flex items-center justify-center  text-destructive rounded-md hover:bg-black/50"
        onClick={() => signOut()}
      >
        <LogOutIcon className="size-6" />
      </motion.button>
    </Hint>
  );
};
