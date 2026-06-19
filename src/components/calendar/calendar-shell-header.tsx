"use client";

import { CalendarToolbar } from "@/components/calendar/calendar-toolbar";
import { useCalendarState } from "@/hooks/use-calendar-state";

export function CalendarShellHeader() {
  const {
    view,
    setView,
    dayCount,
    setDayCount,
    showCaptions,
    setShowCaptions,
    weekStartsOn,
    setWeekStartsOn,
    anchorDate,
    setAnchorDate,
  } = useCalendarState();

  return (
    <CalendarToolbar
      anchorDate={anchorDate}
      onAnchorChange={setAnchorDate}
      view={view}
      onViewChange={setView}
      dayCount={dayCount}
      onDayCountChange={setDayCount}
      showCaptions={showCaptions}
      onShowCaptionsChange={setShowCaptions}
      weekStartsOn={weekStartsOn}
      onWeekStartsOnChange={setWeekStartsOn}
      onFilterClick={() => {
        document
          .getElementById("calendar-filters")
          ?.scrollIntoView({ behavior: "smooth" });
      }}
    />
  );
}
