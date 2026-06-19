"use client";

import { WeekGrid } from "@/components/calendar/week-grid";
import { useCalendarState } from "@/hooks/use-calendar-state";
import { getWeekRange } from "@/lib/calendar-utils";
import { calendarEvents } from "@/mocks/fixtures/calendar-events";
import { mockCalendarItems } from "@/mocks/fixtures/calendar-items";

export function CalendarView() {
  const {
    view,
    dayCount,
    enabledLabelIds,
    enabledStatusIds,
    showCaptions,
    anchorDate,
    weekStartsOn,
  } = useCalendarState();

  const startDate =
    view === "day"
      ? anchorDate
      : getWeekRange(anchorDate, weekStartsOn).start;

  if (view !== "week" && view !== "day") {
    return (
      <div className="flex h-full min-h-[400px] items-center justify-center text-sm text-muted-foreground">
        {view} view coming soon
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 flex-col">
      <WeekGrid
      startDate={startDate}
      dayCount={view === "day" ? 1 : dayCount}
      items={mockCalendarItems}
      events={calendarEvents}
      enabledLabelIds={enabledLabelIds}
      enabledStatusIds={enabledStatusIds}
      showCaptions={showCaptions}
    />
    </div>
  );
}
