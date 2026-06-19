"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

import { brutalMotionShadow } from "@/lib/brutal-shadow";
import { cn } from "@/lib/utils";

type BrutalCardProps = HTMLMotionProps<"div"> & {
  interactive?: boolean;
};

export function BrutalCard({
  className,
  interactive = false,
  children,
  ...props
}: BrutalCardProps) {
  return (
    <motion.div
      className={cn(
        "rounded-xl border-2 border-brutal bg-panel shadow-brutal dark:shadow-none",
        interactive && "cursor-pointer",
        className,
      )}
      whileHover={
        interactive
          ? { x: 2, y: 2, boxShadow: brutalMotionShadow.rest }
          : undefined
      }
      whileTap={
        interactive
          ? { x: 4, y: 4, boxShadow: brutalMotionShadow.pressed }
          : undefined
      }
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
