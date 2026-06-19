"use client";

import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  isToday,
  startOfMonth,
  startOfWeek,
} from "date-fns";

import type { WeekStartsOn } from "@/lib/calendar-utils";
import { cn } from "@/lib/utils";

const WEEKDAY_LABELS: Record<WeekStartsOn, string[]> = {
  0: ["S", "M", "T", "W", "T", "F", "S"],
  1: ["M", "T", "W", "T", "F", "S", "S"],
};

type MiniMonthProps = {
  anchorDate: Date;
  onDateSelect: (date: Date) => void;
  weekStartsOn?: WeekStartsOn;
};

export function MiniMonth({
  anchorDate,
  onDateSelect,
  weekStartsOn = 0,
}: MiniMonthProps) {
  const monthStart = startOfMonth(anchorDate);
  const monthEnd = endOfMonth(anchorDate);
  const gridStart = startOfWeek(monthStart, { weekStartsOn });
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn });
  const days = eachDayOfInterval({ start: gridStart, end: gridEnd });

  return (
    <div className="px-3 py-2">
      <p className="mb-2 text-xs font-semibold">
        {format(anchorDate, "MMMM yyyy")}
      </p>
      <div className="grid grid-cols-7 gap-0.5">
        {WEEKDAY_LABELS[weekStartsOn].map((d, i) => (
          <span
            key={`${d}-${i}`}
            className="text-center text-[10px] text-muted-foreground"
          >
            {d}
          </span>
        ))}
        {days.map((day) => {
          const inMonth = isSameMonth(day, anchorDate);
          const selected = isSameDay(day, anchorDate);
          const today = isToday(day);

          return (
            <button
              key={day.toISOString()}
              type="button"
              onClick={() => onDateSelect(day)}
              className={cn(
                "flex size-7 items-center justify-center rounded-full text-[11px] transition-colors",
                !inMonth && "text-muted-foreground/50",
                selected && "bg-proof-yellow font-semibold text-proof-black",
                !selected && today && "bg-sidebar-accent font-medium",
                !selected && !today && "hover:bg-sidebar-accent",
              )}
            >
              {format(day, "d")}
            </button>
          );
        })}
      </div>
    </div>
  );
}

type BreakdownItem = { label: string; count: number; color: string };

function BreakdownSection({
  title,
  items,
}: {
  title: string;
  items: BreakdownItem[];
}) {
  const active = items.filter((i) => i.count > 0);
  const total = active.reduce((s, i) => s + i.count, 0) || 1;

  return (
    <div className="mb-3 last:mb-0">
      <p className="mb-1 text-[11px] font-medium text-muted-foreground">
        {title}
      </p>
      {active.length > 0 ? (
        <>
          <div className="mb-1.5 flex h-2 overflow-hidden rounded-full bg-sidebar-accent">
            {active.map((item) => (
              <div
                key={item.label}
                style={{
                  width: `${(item.count / total) * 100}%`,
                  backgroundColor: item.color,
                }}
                title={`${item.label}: ${item.count}`}
              />
            ))}
          </div>
          <ul className="flex flex-col gap-1">
            {active.map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-1.5 text-[10px] leading-none"
              >
                <span
                  className="size-2 shrink-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="min-w-0 flex-1 truncate">{item.label}</span>
                <span className="shrink-0 text-muted-foreground tabular-nums">
                  {item.count}
                  <span className="text-muted-foreground/70">
                    {" "}
                    · {Math.round((item.count / total) * 100)}%
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-[10px] text-muted-foreground">No posts in range</p>
      )}
    </div>
  );
}

type ContentInsightsProps = {
  formatBreakdown: BreakdownItem[];
  goalBreakdown: BreakdownItem[];
};

export function ContentInsights({
  formatBreakdown,
  goalBreakdown,
}: ContentInsightsProps) {
  return (
    <div className="px-3 pb-2">
      <BreakdownSection title="Format" items={formatBreakdown} />
      <BreakdownSection title="Goal" items={goalBreakdown} />
    </div>
  );
}
