"use client";

import { parseAsArrayOf, parseAsInteger, parseAsString, useQueryState } from "nuqs";
import { useCallback, useMemo, useState } from "react";

import type { CalendarView } from "@/lib/schemas/calendar";
import type { WeekStartsOn } from "@/lib/calendar-utils";
import { calendarLabels } from "@/mocks/fixtures/calendar-labels";
import { ALL_CONTENT_STATUS_IDS } from "@/lib/content-status";

const ALL_LABEL_IDS = calendarLabels.map((l) => l.id);

export function useCalendarState() {
  const [view, setView] = useQueryState(
    "view",
    parseAsString.withDefault("week"),
  );
  const [dayCount, setDayCount] = useQueryState(
    "days",
    parseAsInteger.withDefault(7),
  );
  const [activeLabels, setActiveLabels] = useQueryState(
    "labels",
    parseAsArrayOf(parseAsString).withDefault([]),
  );
  const [activeStatuses, setActiveStatuses] = useQueryState(
    "statuses",
    parseAsArrayOf(parseAsString).withDefault([]),
  );
  const [showCaptions, setShowCaptions] = useQueryState(
    "captions",
    parseAsString.withDefault("true"),
  );
  const [weekStartRaw, setWeekStartRaw] = useQueryState(
    "weekStart",
    parseAsInteger.withDefault(0),
  );
  const [anchorDate, setAnchorDate] = useState(() => new Date(2026, 5, 19));

  const calendarView = (view ?? "week") as CalendarView;
  const captionsVisible = showCaptions !== "false";
  const numDays = dayCount ?? 7;
  const weekStartsOn = (weekStartRaw === 1 ? 1 : 0) as WeekStartsOn;

  const enabledLabelIds = useMemo(() => {
    if (!activeLabels || activeLabels.length === 0) return null;
    if (activeLabels.includes("__none__")) return new Set(["__none__"]);
    return new Set(activeLabels);
  }, [activeLabels]);

  const enabledStatusIds = useMemo(() => {
    if (!activeStatuses || activeStatuses.length === 0) return null;
    if (activeStatuses.includes("__none__")) return new Set(["__none__"]);
    return new Set(activeStatuses);
  }, [activeStatuses]);

  const toggleLabel = useCallback(
    (id: string) => {
      setActiveLabels((prev) => {
        const current = prev ?? [];
        const enabled = new Set(
          current.length === 0 ? ALL_LABEL_IDS : current,
        );
        if (enabled.has(id)) enabled.delete(id);
        else enabled.add(id);
        if (enabled.size === ALL_LABEL_IDS.length) return [];
        return Array.from(enabled);
      });
    },
    [setActiveLabels],
  );

  const selectAllLabels = useCallback(() => {
    setActiveLabels([]);
  }, [setActiveLabels]);

  const clearLabels = useCallback(() => {
    setActiveLabels(["__none__"]);
  }, [setActiveLabels]);

  const isLabelChecked = useCallback(
    (id: string) => {
      if (!activeLabels || activeLabels.length === 0) return true;
      if (activeLabels.includes("__none__")) return false;
      return activeLabels.includes(id);
    },
    [activeLabels],
  );

  const toggleStatus = useCallback(
    (id: string) => {
      setActiveStatuses((prev) => {
        const current = prev ?? [];
        const enabled = new Set(
          current.length === 0 ? ALL_CONTENT_STATUS_IDS : current,
        );
        if (enabled.has(id)) enabled.delete(id);
        else enabled.add(id);
        if (enabled.size === ALL_CONTENT_STATUS_IDS.length) return [];
        return Array.from(enabled);
      });
    },
    [setActiveStatuses],
  );

  const isStatusChecked = useCallback(
    (id: string) => {
      if (!activeStatuses || activeStatuses.length === 0) return true;
      if (activeStatuses.includes("__none__")) return false;
      return activeStatuses.includes(id);
    },
    [activeStatuses],
  );

  return {
    view: calendarView,
    setView,
    dayCount: numDays,
    setDayCount,
    activeLabels: activeLabels ?? [],
    enabledLabelIds,
    toggleLabel,
    selectAllLabels,
    clearLabels,
    isLabelChecked,
    activeStatuses: activeStatuses ?? [],
    enabledStatusIds,
    toggleStatus,
    isStatusChecked,
    showCaptions: captionsVisible,
    setShowCaptions: (v: boolean) => setShowCaptions(v ? "true" : "false"),
    weekStartsOn,
    setWeekStartsOn: (v: WeekStartsOn) => setWeekStartRaw(v),
    anchorDate,
    setAnchorDate,
  };
}

export function isItemVisible(
  tagIds: string[],
  enabledLabelIds: Set<string> | null,
) {
  if (enabledLabelIds?.has("__none__")) return false;
  if (!enabledLabelIds) return true;
  if (tagIds.length === 0) return true;
  return tagIds.some((t) => enabledLabelIds.has(t));
}

export function isStatusVisible(
  status: string | undefined,
  enabledStatusIds: Set<string> | null,
) {
  if (enabledStatusIds?.has("__none__")) return false;
  if (!enabledStatusIds) return true;
  const normalized = status ?? "needs_creation";
  return enabledStatusIds.has(normalized);
}
