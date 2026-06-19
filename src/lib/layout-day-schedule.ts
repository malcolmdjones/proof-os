import type { CalendarEvent, CalendarItem } from "@/lib/schemas/calendar";
import { parseItemDateTime } from "@/lib/calendar-utils";
import { getEventLayout } from "@/lib/event-utils";

export type ScheduleLayout =
  | {
      kind: "post";
      post: CalendarItem;
      top: number;
      height: number;
      column: number;
      totalColumns: number;
    }
  | {
      kind: "event";
      event: CalendarEvent;
      top: number;
      height: number;
      column: number;
      totalColumns: number;
    };

const DEFAULT_POST_DURATION_MIN = 60;
/** Compact post card height — used to detect layout overlap with blocks below. */
const ESTIMATED_POST_HEIGHT_PX = 150;
const MAX_COLUMNS = 4;

type TimedEntry = {
  kind: "post" | "event";
  id: string;
  start: number;
  /** Time range used for column overlap detection. */
  overlapEnd: number;
  post?: CalendarItem;
  event?: CalendarEvent;
};

function postOverlapEnd(
  start: number,
  durationMin: number,
  hourHeight: number,
): number {
  const timeEnd = start + durationMin;
  const visualEnd = start + (ESTIMATED_POST_HEIGHT_PX / hourHeight) * 60;
  return Math.max(timeEnd, visualEnd);
}

function postLayoutHeight(
  post: CalendarItem,
  hourHeight: number,
): { start: number; height: number; overlapEnd: number } | null {
  const start = toMinutes(post);
  if (start === null) return null;
  const durationMin = post.duration ?? DEFAULT_POST_DURATION_MIN;
  return {
    start,
    height: (durationMin / 60) * hourHeight,
    overlapEnd: postOverlapEnd(start, durationMin, hourHeight),
  };
}

function eventLayout(
  event: CalendarEvent,
  hourHeight: number,
): { start: number; end: number; height: number } | null {
  const layout = getEventLayout(event, hourHeight);
  if (!layout) return null;

  const start = parseTimeMinutes(event.startTime!);
  const end = event.endTime
    ? parseTimeMinutes(event.endTime)
    : start + DEFAULT_POST_DURATION_MIN;

  return { start, end, height: layout.height };
}

function parseTimeMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
}

function toMinutes(item: CalendarItem): number | null {
  const dt = parseItemDateTime(item);
  if (!dt) return null;
  return dt.getHours() * 60 + dt.getMinutes();
}

/**
 * Google Calendar-style side-by-side columns (up to 4) when time ranges overlap.
 * Posts use a visual footprint so tall cards split with events below instead of covering them.
 */
export function layoutDaySchedule(
  posts: CalendarItem[],
  events: CalendarEvent[],
  hourHeight: number,
): ScheduleLayout[] {
  const timed: TimedEntry[] = [];

  for (const post of posts) {
    const window = postLayoutHeight(post, hourHeight);
    if (!window) continue;
    timed.push({
      kind: "post",
      id: post.id,
      start: window.start,
      overlapEnd: window.overlapEnd,
      post,
    });
  }

  for (const event of events) {
    const window = eventLayout(event, hourHeight);
    if (!window) continue;
    timed.push({
      kind: "event",
      id: event.id,
      start: window.start,
      overlapEnd: window.end,
      event,
    });
  }

  timed.sort(
    (a, b) => a.start - b.start || a.id.localeCompare(b.id),
  );

  if (timed.length === 0) return [];

  const clusters: TimedEntry[][] = [];
  let cluster: TimedEntry[] = [];
  let clusterEnd = -1;

  for (const item of timed) {
    if (cluster.length === 0 || item.start < clusterEnd) {
      cluster.push(item);
      clusterEnd = Math.max(clusterEnd, item.overlapEnd);
    } else {
      clusters.push(cluster);
      cluster = [item];
      clusterEnd = item.overlapEnd;
    }
  }
  if (cluster.length > 0) clusters.push(cluster);

  const layouts: ScheduleLayout[] = [];

  for (const group of clusters) {
    const columnEnds: number[] = [];
    const groupLayouts: ScheduleLayout[] = [];

    for (const item of group) {
      let column = columnEnds.findIndex((end) => end <= item.start);
      if (column === -1) {
        if (columnEnds.length >= MAX_COLUMNS) {
          column = columnEnds.indexOf(Math.min(...columnEnds));
        } else {
          column = columnEnds.length;
          columnEnds.push(0);
        }
      }
      columnEnds[column] = item.overlapEnd;

      const top = (item.start / 60) * hourHeight;

      if (item.kind === "post") {
        const window = postLayoutHeight(item.post!, hourHeight)!;
        groupLayouts.push({
          kind: "post",
          post: item.post!,
          top,
          height: window.height,
          column,
          totalColumns: 0,
        });
      } else {
        const window = eventLayout(item.event!, hourHeight)!;
        groupLayouts.push({
          kind: "event",
          event: item.event!,
          top,
          height: window.height,
          column,
          totalColumns: 0,
        });
      }
    }

    const totalColumns = Math.min(columnEnds.length, MAX_COLUMNS);
    for (const layout of groupLayouts) {
      layout.totalColumns = totalColumns;
      layouts.push(layout);
    }
  }

  return layouts;
}
