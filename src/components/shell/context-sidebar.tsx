"use client";

import { AnimatePresence, motion } from "framer-motion";
import { PanelLeftClose } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

import { CalendarContextPanel } from "@/components/calendar/calendar-context-panel";
import { Logo } from "@/components/proof/logo";
import { useSidebar } from "@/hooks/use-sidebar";
import { MOTION_DURATION, MOTION_EASE } from "@/lib/motion";
import { getSectionLabel } from "@/lib/section-labels";

const EXPANDED_WIDTH = 260;
const COLLAPSED_WIDTH = 52;

export function ContextSidebar() {
  const pathname = usePathname();
  const { contextCollapsed, toggleContextCollapsed } = useSidebar();
  const sectionLabel = getSectionLabel(pathname);
  const isCalendar = pathname.startsWith("/calendar");

  return (
    <motion.aside
      className="relative flex h-full shrink-0 flex-col overflow-hidden border-l border-sidebar-border bg-sidebar"
      initial={false}
      animate={{ width: contextCollapsed ? COLLAPSED_WIDTH : EXPANDED_WIDTH }}
      transition={{ duration: MOTION_DURATION.slow, ease: MOTION_EASE }}
    >
      <AnimatePresence>
        {contextCollapsed && (
          <motion.div
            key="collapsed"
            className="absolute inset-x-0 top-0 flex justify-center py-4"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.88 }}
            transition={{ duration: MOTION_DURATION.fast, ease: MOTION_EASE, delay: 0.08 }}
          >
            <button
              type="button"
              onClick={toggleContextCollapsed}
              aria-label="Expand sidebar"
              className="flex items-center justify-center rounded-lg p-1 transition-opacity hover:opacity-80"
            >
              <Logo variant="icon" width={28} height={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="flex h-full min-w-[260px] flex-col"
        initial={false}
        animate={{
          opacity: contextCollapsed ? 0 : 1,
          x: contextCollapsed ? -16 : 0,
        }}
        transition={{
          duration: contextCollapsed ? MOTION_DURATION.fast : MOTION_DURATION.normal,
          ease: MOTION_EASE,
          delay: contextCollapsed ? 0 : 0.06,
        }}
        style={{ pointerEvents: contextCollapsed ? "none" : "auto" }}
        aria-hidden={contextCollapsed}
      >
        <div className="flex shrink-0 items-center gap-2 border-b border-sidebar-border px-3 py-4">
          <button
            type="button"
            onClick={toggleContextCollapsed}
            aria-label="Collapse sidebar"
            className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground"
          >
            <PanelLeftClose className="size-4" />
          </button>

          <Link
            href="/calendar"
            className="flex min-w-0 flex-1 items-center gap-2"
          >
            <Logo variant="wordmark" width={72} height={22} />
            <span className="text-[13px] font-semibold tracking-tight">
              {sectionLabel}
            </span>
          </Link>
        </div>

        {isCalendar && (
          <div className="flex min-h-0 flex-1 flex-col">
            <Suspense fallback={null}>
              <CalendarContextPanel />
            </Suspense>
          </div>
        )}
      </motion.div>
    </motion.aside>
  );
}
