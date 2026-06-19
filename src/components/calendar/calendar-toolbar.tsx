"use client";

import {
  addDays,
  format,
  startOfWeek,
} from "date-fns";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { CalendarView } from "@/lib/schemas/calendar";
import type { WeekStartsOn } from "@/lib/calendar-utils";
import { cn } from "@/lib/utils";

const VIEW_LABELS: Record<CalendarView, string> = {
  day: "Day",
  week: "Week",
  month: "Month",
  platform: "Platform",
};

const DAY_OPTIONS = [
  { value: 2, label: "2 days" },
  { value: 3, label: "3 days" },
  { value: 4, label: "4 days" },
  { value: 5, label: "5 days (hide weekends)" },
  { value: 6, label: "6 days (hide Sunday)" },
  { value: 7, label: "7 days" },
];

type CalendarToolbarProps = {
  anchorDate: Date;
  onAnchorChange: (date: Date) => void;
  view: CalendarView;
  onViewChange: (view: CalendarView) => void;
  dayCount: number;
  onDayCountChange: (count: number) => void;
  showCaptions: boolean;
  onShowCaptionsChange: (show: boolean) => void;
  weekStartsOn: WeekStartsOn;
  onWeekStartsOnChange: (start: WeekStartsOn) => void;
  onFilterClick?: () => void;
};

export function CalendarToolbar({
  anchorDate,
  onAnchorChange,
  view,
  onViewChange,
  dayCount,
  onDayCountChange,
  showCaptions,
  onShowCaptionsChange,
  weekStartsOn,
  onWeekStartsOnChange,
  onFilterClick,
}: CalendarToolbarProps) {
  const weekStart = startOfWeek(anchorDate, { weekStartsOn });
  const weekEnd = addDays(weekStart, dayCount - 1);
  const dateLabel =
    dayCount === 1
      ? format(anchorDate, "MMM d, yyyy")
      : `${format(weekStart, "MMM d")} – ${format(weekEnd, "MMM d, yyyy")}`;

  const navigate = (direction: -1 | 1) => {
    const step = view === "day" ? 1 : dayCount;
    onAnchorChange(addDays(anchorDate, direction * step));
  };

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-2">
        <h1 className="text-base font-semibold tracking-tight">{dateLabel}</h1>
        <button
          type="button"
          onClick={() => onAnchorChange(new Date())}
          className="rounded-md border border-border px-2.5 py-1 text-xs font-medium transition-colors hover:bg-sidebar-accent"
        >
          Today
        </button>
        <div className="flex items-center">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex size-8 items-center justify-center rounded-lg hover:bg-sidebar-accent"
            aria-label="Previous"
          >
            <ChevronLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => navigate(1)}
            className="flex size-8 items-center justify-center rounded-lg hover:bg-sidebar-accent"
            aria-label="Next"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onFilterClick}
          className="rounded-md border border-border px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-sidebar-accent"
        >
          Filter
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-1 rounded-md border border-border px-2.5 py-1.5 text-xs font-medium transition-colors hover:bg-sidebar-accent"
            >
              {VIEW_LABELS[view]}
              <ChevronDown className="size-3.5 opacity-60" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuLabel>View</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={view}
              onValueChange={(v) => onViewChange(v as CalendarView)}
            >
              {(["day", "week", "month", "platform"] as const).map((v) => (
                <DropdownMenuRadioItem key={v} value={v} disabled={v === "platform" || v === "month"}>
                  {VIEW_LABELS[v]}
                  {(v === "platform" || v === "month") && (
                    <span className="ml-auto text-[10px] text-muted-foreground">
                      Soon
                    </span>
                  )}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>

            <DropdownMenuSeparator />

            <DropdownMenuSub>
              <DropdownMenuSubTrigger>Number of days</DropdownMenuSubTrigger>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={String(dayCount)}
                  onValueChange={(v) => onDayCountChange(Number(v))}
                >
                  {DAY_OPTIONS.map((opt) => (
                    <DropdownMenuRadioItem
                      key={opt.value}
                      value={String(opt.value)}
                    >
                      {opt.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            <DropdownMenuSeparator />

            <DropdownMenuCheckboxItem
              checked={showCaptions}
              onCheckedChange={onShowCaptionsChange}
            >
              Show captions
            </DropdownMenuCheckboxItem>

            <DropdownMenuSeparator />

            <DropdownMenuLabel>Week starts on</DropdownMenuLabel>
            <DropdownMenuRadioGroup
              value={String(weekStartsOn)}
              onValueChange={(v) =>
                onWeekStartsOnChange(Number(v) as WeekStartsOn)
              }
            >
              <DropdownMenuRadioItem value="0">Sunday</DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="1">Monday</DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
