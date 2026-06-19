"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Circle } from "lucide-react";
import { useState } from "react";

import {
  getPostReadiness,
  readinessSummary,
  type ReadinessItem,
} from "@/lib/post-readiness";
import { MOTION_DURATION, motionTransition } from "@/lib/motion";
import { normalizeContentStatus } from "@/lib/content-status";
import type { CalendarItem } from "@/lib/schemas/calendar";
import { cn } from "@/lib/utils";

type PostCardReadinessProps = {
  item: CalendarItem;
  attention?: boolean;
};

function ReadinessCheck({
  state,
  attention,
}: {
  state: ReadinessItem["state"];
  attention?: boolean;
}) {
  return (
    <span
      className={cn(
        "flex size-3.5 shrink-0 items-center justify-center rounded-[3px] border",
        state === "done" &&
          "border-emerald-500/40 bg-emerald-500 text-white",
        state === "draft" &&
          "border-amber-500/50 bg-amber-500/15 text-amber-600",
        state === "needs" &&
          cn(
            "bg-transparent",
            attention
              ? "border-white/20 text-white/30 dark:border-border dark:text-on-light-muted/40"
              : "border-border text-muted-foreground/40",
          ),
      )}
      aria-hidden
    >
      {state === "done" && <Check className="size-2.5" strokeWidth={3} />}
      {state === "draft" && <Circle className="size-1.5 fill-current" />}
    </span>
  );
}

function stateLabel(state: ReadinessItem["state"]) {
  switch (state) {
    case "done":
      return null;
    case "draft":
      return "Draft";
    case "needs":
      return "Needs";
  }
}

function ReadinessRow({
  item,
  attention,
}: {
  item: ReadinessItem;
  attention: boolean;
}) {
  const suffix = stateLabel(item.state);

  return (
    <li className="flex items-center gap-1.5 text-[9px] leading-none">
      <ReadinessCheck state={item.state} attention={attention} />
      <span className="min-w-0 flex-1 truncate text-inherit">{item.label}</span>
      {suffix && (
        <span
          className={cn(
            "shrink-0 text-[8px] font-medium",
            item.state === "needs" ? "text-proof-coral" : "text-amber-600",
          )}
        >
          {suffix}
        </span>
      )}
    </li>
  );
}

export function PostCardReadiness({
  item,
  attention = false,
}: PostCardReadinessProps) {
  const status = normalizeContentStatus(item.status);
  const items = getPostReadiness(item);
  const { done, total } = readinessSummary(items);
  const defaultOpen = status === "needs_creation" || status === "in_progress";
  const [open, setOpen] = useState(defaultOpen);

  if (status === "posted") return null;
  if (status === "queued" && done === total) return null;

  return (
    <div
      className={cn(
        "border-t border-dashed",
        attention ? "border-white/15 dark:border-border" : "border-border",
      )}
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label="Post readiness checklist"
        className={cn(
          "flex w-full items-center justify-between gap-1 px-1.5 py-1",
          attention
            ? "hover:bg-white/[0.04]"
            : "hover:bg-black/[0.02] dark:hover:bg-white/[0.04]",
        )}
      >
        <span className="flex items-center gap-0.5">
          {items.map((row) => (
            <ReadinessCheck key={row.id} state={row.state} attention={attention} />
          ))}
        </span>
        <ChevronDown
          className={cn(
            "size-3 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
            attention
              ? "text-white/50 dark:text-on-light-muted"
              : "text-muted-foreground",
            open && "rotate-180",
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={motionTransition(MOTION_DURATION.normal)}
            className="overflow-hidden"
          >
            <ul className="flex flex-col gap-1 px-1.5 pb-1.5">
              {items.map((row) => (
                <ReadinessRow key={row.id} item={row} attention={attention} />
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
