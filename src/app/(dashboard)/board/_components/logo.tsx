import { motion } from "framer-motion";
import Image from "next/image";

export const Logo = () => {
  return (
    <motion.div
      layout
      className="grid size-10 shrink-0 place-content-center rounded-md"
    >
      <Image
        src="/logo.svg"
        alt="Productivity | SaaS"
        width={120}
        height={120}
        className="object-cover"
      />
    </motion.div>
  );
};
