import {
  addDays,
  endOfWeek,
  format,
  parse,
  startOfWeek,
} from "date-fns";

import type { CalendarItem, ContentStatus } from "@/lib/schemas/calendar";
import { normalizeContentStatus } from "@/lib/content-status";

export function parseItemDateTime(item: CalendarItem): Date | null {
  if (!item.time) return null;
  return parse(`${item.date} ${item.time}`, "yyyy-MM-dd HH:mm", new Date());
}

export function getItemsInRange(
  items: CalendarItem[],
  start: Date,
  end: Date,
): CalendarItem[] {
  return items.filter((item) => {
    const d = parse(item.date, "yyyy-MM-dd", new Date());
    return d >= start && d <= end;
  });
}

export function getItemsForDate(items: CalendarItem[], date: string) {
  return items.filter((item) => item.date === date);
}

export function getEventsForDate(items: CalendarItem[], date: string) {
  return getItemsForDate(items, date).filter((item) => item.type === "event");
}

export function getPostsForDate(items: CalendarItem[], date: string) {
  return getItemsForDate(items, date).filter(
    (item) => item.type === "content" || item.type === "planned",
  );
}

export type WeekStartsOn = 0 | 1;

export function getWeekRange(anchor: Date, weekStartsOn: WeekStartsOn = 0) {
  const start = startOfWeek(anchor, { weekStartsOn });
  const end = endOfWeek(anchor, { weekStartsOn });
  return { start, end };
}

export function getDaysInRange(start: Date, count: number) {
  return Array.from({ length: count }, (_, i) => addDays(start, i));
}

export function formatTimeLabel(time: string) {
  const parsed = parse(time, "HH:mm", new Date());
  return format(parsed, "h:mm a");
}

export function countItemsWithTag(
  items: CalendarItem[],
  tagId: string,
  start: Date,
  end: Date,
) {
  return getItemsInRange(items, start, end).filter(
    (item) =>
      item.tagIds.includes(tagId) &&
      (item.type === "content" || item.type === "planned"),
  ).length;
}

export function countItemsWithStatus(
  items: CalendarItem[],
  status: ContentStatus,
  start: Date,
  end: Date,
) {
  return getItemsInRange(items, start, end).filter(
    (item) =>
      (item.type === "content" || item.type === "planned") &&
      normalizeContentStatus(item.status) === status,
  ).length;
}
