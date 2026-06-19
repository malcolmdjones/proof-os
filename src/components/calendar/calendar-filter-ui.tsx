"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";

import type { CalendarLabel } from "@/lib/schemas/calendar";
import { PlatformIcon, isPlatformId } from "@/components/icons/platform-icons";
import { MOTION_DURATION, motionTransition } from "@/lib/motion";
import { cn } from "@/lib/utils";

type GoogleStyleCheckboxProps = {
  checked: boolean;
  color: string;
  onChange: () => void;
  label: string;
};

export function GoogleStyleCheckbox({
  checked,
  color,
  onChange,
  label,
}: GoogleStyleCheckboxProps) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      className={cn(
        "flex size-[18px] shrink-0 items-center justify-center rounded-[3px] border-2 transition-colors",
        !checked && "bg-transparent",
      )}
      style={{
        borderColor: color,
        backgroundColor: checked ? color : "transparent",
      }}
    >
      {checked && <Check className="size-3 text-white" strokeWidth={3} />}
    </button>
  );
}

type CollapsibleSectionProps = {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
};

export function CollapsibleSection({
  title,
  defaultOpen = true,
  children,
}: CollapsibleSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-sidebar-border">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-3 py-2.5 text-left text-[13px] font-medium hover:bg-sidebar-accent/50"
      >
        {title}
        <ChevronDown
          className={cn(
            "size-4 text-muted-foreground transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]",
            open && "rotate-180",
          )}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={motionTransition(MOTION_DURATION.normal)}
            className="overflow-hidden"
          >
            <div className="pb-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

type StatusFilterListProps = {
  items: { id: string; label: string; color: string }[];
  counts: Record<string, number>;
  isChecked: (id: string) => boolean;
  onToggle: (id: string) => void;
};

export function StatusFilterList({
  items,
  counts,
  isChecked,
  onToggle,
}: StatusFilterListProps) {
  return (
    <ul className="flex flex-col gap-0.5 px-2">
      {items.map((item) => (
        <li key={item.id}>
          <label className="flex cursor-pointer items-center gap-2.5 rounded-md px-1 py-1.5 text-[13px] hover:bg-sidebar-accent">
            <GoogleStyleCheckbox
              checked={isChecked(item.id)}
              color={item.color}
              label={item.label}
              onChange={() => onToggle(item.id)}
            />
            <span className="min-w-0 flex-1 truncate">{item.label}</span>
            <span className="text-[11px] text-muted-foreground tabular-nums">
              {counts[item.id] ?? 0}
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
}

type FilterListProps = {
  labels: CalendarLabel[];
  counts: Record<string, number>;
  isLabelChecked: (id: string) => boolean;
  onToggle: (id: string) => void;
};

export function FilterList({
  labels,
  counts,
  isLabelChecked,
  onToggle,
}: FilterListProps) {
  return (
    <ul className="flex flex-col gap-0.5 px-2">
      {labels.map((label) => (
        <li key={label.id}>
          <label className="flex cursor-pointer items-center gap-2.5 rounded-md px-1 py-1.5 text-[13px] hover:bg-sidebar-accent">
            <GoogleStyleCheckbox
              checked={isLabelChecked(label.id)}
              color={label.color}
              label={label.name}
              onChange={() => onToggle(label.id)}
            />
            {isPlatformId(label.id) && (
              <span
                className="flex size-4 shrink-0 items-center justify-center"
                style={{ color: label.color }}
              >
                <PlatformIcon platform={label.id} />
              </span>
            )}
            <span className="min-w-0 flex-1 truncate">{label.name}</span>
            <span className="text-[11px] text-muted-foreground tabular-nums">
              {counts[label.id] ?? 0}
            </span>
          </label>
        </li>
      ))}
    </ul>
  );
}
