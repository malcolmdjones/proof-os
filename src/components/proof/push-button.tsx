"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

import { brutalMotionShadow } from "@/lib/brutal-shadow";
import { cn } from "@/lib/utils";

type PushButtonProps = HTMLMotionProps<"button"> & {
  variant?: "primary" | "secondary" | "ghost";
  size?: "default" | "sm" | "lg";
};

const variantStyles = {
  primary: "bg-proof-yellow text-proof-black",
  secondary: "bg-panel text-foreground",
  ghost: "bg-transparent text-foreground border-transparent shadow-none",
};

const sizeStyles = {
  default: "h-10 px-4 text-sm",
  sm: "h-8 px-3 text-xs",
  lg: "h-12 px-6 text-base",
};

export function PushButton({
  className,
  variant = "primary",
  size = "default",
  children,
  disabled,
  ...props
}: PushButtonProps) {
  return (
    <motion.button
      type="button"
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg border-2 border-brutal font-body font-medium shadow-brutal transition-colors outline-none focus-visible:ring-2 focus-visible:ring-proof-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 dark:shadow-none",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      whileHover={
        disabled ? undefined : { x: 2, y: 2, boxShadow: brutalMotionShadow.rest }
      }
      whileTap={
        disabled ? undefined : { x: 4, y: 4, boxShadow: brutalMotionShadow.pressed }
      }
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
