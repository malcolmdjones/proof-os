import type { CalendarItem, Platform } from "@/lib/schemas/calendar";

/** Count posts per platform for a day (all formats, including stories). */
export function countPostsByPlatform(
  posts: CalendarItem[],
): Partial<Record<Platform, number>> {
  const counts: Partial<Record<Platform, number>> = {};

  for (const post of posts) {
    if (!post.platform) continue;
    counts[post.platform] = (counts[post.platform] ?? 0) + 1;
  }

  return counts;
}

export function formatPostCount(count: number): string {
  return count > 9 ? "9+" : String(count);
}
