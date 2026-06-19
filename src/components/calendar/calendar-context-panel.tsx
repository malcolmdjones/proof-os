"use client";

import { useMemo } from "react";

import {
  CollapsibleSection,
  FilterList,
  StatusFilterList,
} from "@/components/calendar/calendar-filter-ui";
import {
  ContentInsights,
  MiniMonth,
} from "@/components/calendar/calendar-sidebar-panels";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useCalendarState } from "@/hooks/use-calendar-state";
import {
  countItemsWithStatus,
  countItemsWithTag,
  getDaysInRange,
  getWeekRange,
} from "@/lib/calendar-utils";
import {
  CONTENT_STATUS_CONFIG,
  CONTENT_STATUS_ORDER,
} from "@/lib/content-status";
import { calendarLabels } from "@/mocks/fixtures/calendar-labels";
import { mockCalendarItems } from "@/mocks/fixtures/calendar-items";

export function CalendarContextPanel() {
  const {
    anchorDate,
    setAnchorDate,
    dayCount,
    toggleLabel,
    isLabelChecked,
    toggleStatus,
    isStatusChecked,
    weekStartsOn,
  } = useCalendarState();

  const { start, end } = getWeekRange(anchorDate, weekStartsOn);
  const visibleDays = getDaysInRange(start, dayCount);
  const rangeEnd = visibleDays[visibleDays.length - 1] ?? end;

  const counts = useMemo(() => {
    const result: Record<string, number> = {};
    for (const label of calendarLabels) {
      result[label.id] = countItemsWithTag(
        mockCalendarItems,
        label.id,
        start,
        rangeEnd,
      );
    }
    return result;
  }, [start, rangeEnd, dayCount]);

  const statusCounts = useMemo(() => {
    const result: Record<string, number> = {};
    for (const status of CONTENT_STATUS_ORDER) {
      result[status] = countItemsWithStatus(
        mockCalendarItems,
        status,
        start,
        rangeEnd,
      );
    }
    return result;
  }, [start, rangeEnd, dayCount]);

  const statusFilters = useMemo(
    () =>
      CONTENT_STATUS_ORDER.map((id) => ({
        id,
        label: CONTENT_STATUS_CONFIG[id].label,
        color: CONTENT_STATUS_CONFIG[id].color,
      })),
    [],
  );

  const socialLabels = useMemo(
    () => calendarLabels.filter((l) => l.category === "platform"),
    [],
  );

  const tagLabels = useMemo(
    () =>
      calendarLabels.filter((l) =>
        ["format", "goal", "category"].includes(l.category),
      ),
    [],
  );

  const formatBreakdown = useMemo(() => {
    const formats = calendarLabels.filter((l) => l.category === "format");
    return formats.map((f) => ({
      label: f.name,
      count: counts[f.id] ?? 0,
      color: f.color,
    }));
  }, [counts]);

  const goalBreakdown = useMemo(() => {
    const goals = calendarLabels.filter((l) => l.category === "goal");
    return goals.map((g) => ({
      label: g.name,
      count: counts[g.id] ?? 0,
      color: g.color,
    }));
  }, [counts]);

  return (
    <ScrollArea className="h-full min-h-0 flex-1">
      <MiniMonth
        anchorDate={anchorDate}
        onDateSelect={setAnchorDate}
        weekStartsOn={weekStartsOn}
      />

      <div id="calendar-filters">
        <CollapsibleSection title="Status">
          <StatusFilterList
            items={statusFilters}
            counts={statusCounts}
            isChecked={isStatusChecked}
            onToggle={toggleStatus}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Social media">
          <FilterList
            labels={socialLabels}
            counts={counts}
            isLabelChecked={isLabelChecked}
            onToggle={toggleLabel}
          />
        </CollapsibleSection>

        <CollapsibleSection title="Tags">
          <FilterList
            labels={tagLabels}
            counts={counts}
            isLabelChecked={isLabelChecked}
            onToggle={toggleLabel}
          />
        </CollapsibleSection>
      </div>

      <CollapsibleSection title="Content insights">
        <ContentInsights
          formatBreakdown={formatBreakdown}
          goalBreakdown={goalBreakdown}
        />
      </CollapsibleSection>
    </ScrollArea>
  );
}
