"use client";

import { motion } from "framer-motion";

import { brutalMotionShadow } from "@/lib/brutal-shadow";
import { cn } from "@/lib/utils";

type ProfileButtonProps = {
  className?: string;
};

export function ProfileButton({ className }: ProfileButtonProps) {
  return (
    <motion.button
      type="button"
      aria-label="Profile"
      className={cn(
        "flex size-9 items-center justify-center rounded-full border-2 border-brutal bg-proof-yellow text-xs font-semibold text-proof-black shadow-brutal-sm dark:shadow-none",
        className,
      )}
      whileHover={{ x: 1, y: 1, boxShadow: brutalMotionShadow.hover }}
      whileTap={{ x: 2, y: 2, boxShadow: brutalMotionShadow.pressed }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      P
    </motion.button>
  );
}
