import type { CalendarItem } from "@/lib/schemas/calendar";
import { parseItemDateTime } from "@/lib/calendar-utils";

export type PostLayout = {
  post: CalendarItem;
  top: number;
  column: number;
  totalColumns: number;
};

const DEFAULT_DURATION_MIN = 60;

function toMinutes(item: CalendarItem): number | null {
  const dt = parseItemDateTime(item);
  if (!dt) return null;
  return dt.getHours() * 60 + dt.getMinutes();
}

/**
 * Assigns side-by-side columns for posts that overlap in time (Google Calendar style).
 */
export function layoutDayPosts(
  posts: CalendarItem[],
  hourHeight: number,
): PostLayout[] {
  const timed = posts
    .map((post) => {
      const start = toMinutes(post);
      if (start === null) return null;
      const duration = post.duration ?? DEFAULT_DURATION_MIN;
      return { post, start, end: start + duration };
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)
    .sort((a, b) => a.start - b.start || a.post.id.localeCompare(b.post.id));

  if (timed.length === 0) return [];

  const clusters: (typeof timed)[] = [];
  let cluster: typeof timed = [];
  let clusterEnd = -1;

  for (const item of timed) {
    if (cluster.length === 0 || item.start < clusterEnd) {
      cluster.push(item);
      clusterEnd = Math.max(clusterEnd, item.end);
    } else {
      clusters.push(cluster);
      cluster = [item];
      clusterEnd = item.end;
    }
  }
  if (cluster.length > 0) clusters.push(cluster);

  const layouts: PostLayout[] = [];

  for (const group of clusters) {
    const columnEnds: number[] = [];
    const groupLayouts: PostLayout[] = [];

    for (const item of group) {
      let column = columnEnds.findIndex((end) => end <= item.start);
      if (column === -1) {
        column = columnEnds.length;
        columnEnds.push(0);
      }
      columnEnds[column] = item.end;
      groupLayouts.push({
        post: item.post,
        top: (item.start / 60) * hourHeight,
        column,
        totalColumns: 0,
      });
    }

    const totalColumns = columnEnds.length;
    for (const layout of groupLayouts) {
      layout.totalColumns = totalColumns;
      layouts.push(layout);
    }
  }

  return layouts;
}
