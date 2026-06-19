import { parse } from "date-fns";

import { formatTimeLabel } from "@/lib/calendar-utils";
import type { CalendarEvent } from "@/lib/schemas/calendar";

export function formatEventTimeRange(event: CalendarEvent): string | null {
  if (!event.startTime) return null;

  const start = formatTimeLabel(event.startTime);

  if (!event.endTime) return start;

  const end = formatTimeLabel(event.endTime);
  return `${start} – ${end}`;
}

export function formatRsvpLabel(count: number): string {
  return `${count.toLocaleString()} people RSVP'd`;
}

export function getEventLayout(
  event: CalendarEvent,
  hourHeight: number,
): { top: number; height: number } | null {
  if (!event.startTime) return null;

  const start = parse(event.startTime, "HH:mm", new Date());
  const startMinutes = start.getHours() * 60 + start.getMinutes();
  const top = (startMinutes / 60) * hourHeight;

  let durationMinutes = 60;
  if (event.endTime) {
    const end = parse(event.endTime, "HH:mm", new Date());
    const endMinutes = end.getHours() * 60 + end.getMinutes();
    durationMinutes = Math.max(endMinutes - startMinutes, 30);
  }

  const height = (durationMinutes / 60) * hourHeight;
  return { top, height };
}

export function isTimedEvent(event: CalendarEvent): boolean {
  return Boolean(event.startTime);
}
