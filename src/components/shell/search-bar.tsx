"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";

import { brutalMotionShadow } from "@/lib/brutal-shadow";
import { cn } from "@/lib/utils";

type SearchBarProps = {
  onClick?: () => void;
  className?: string;
};

export function SearchBar({ onClick, className }: SearchBarProps) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-10 w-full items-center gap-3 rounded-xl border-2 border-brutal bg-panel px-3.5 text-left text-sm text-muted-foreground shadow-brutal-sm dark:shadow-none",
        className,
      )}
      whileHover={{ x: 1, y: 1, boxShadow: brutalMotionShadow.hover }}
      whileTap={{ x: 2, y: 2, boxShadow: brutalMotionShadow.pressed }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    >
      <Search className="size-4 shrink-0 text-foreground" />
      <span className="flex-1 truncate">Search content, events, brand assets…</span>
      <kbd className="hidden shrink-0 rounded-md border border-border bg-kbd-bg px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground md:inline-block">
        ⌘K
      </kbd>
    </motion.button>
  );
}
