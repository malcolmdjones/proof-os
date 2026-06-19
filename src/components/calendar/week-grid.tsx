"use client";

import { format, isToday, parse } from "date-fns";
import { useEffect, useMemo, useRef, useState } from "react";

import { DayColumnHeader } from "@/components/calendar/day-column-header";
import { EventBlock } from "@/components/calendar/event-block";
import { PostCard } from "@/components/calendar/post-card";
import { TimezoneSelector } from "@/components/calendar/timezone-selector";
import { isItemVisible, isStatusVisible } from "@/hooks/use-calendar-state";
import { useActiveChannels } from "@/hooks/use-active-channels";
import {
  getDaysInRange,
  getPostsForDate,
} from "@/lib/calendar-utils";
import { getEventLayout } from "@/lib/event-utils";
import { layoutDaySchedule } from "@/lib/layout-day-schedule";
import type { CalendarEvent, CalendarItem } from "@/lib/schemas/calendar";
import { cn } from "@/lib/utils";

const HOURS = Array.from({ length: 24 }, (_, i) => i);
const HOUR_HEIGHT = 56;
const TIME_COL = "3.5rem";
const DEFAULT_SCROLL_HOUR = 6;

function gridTemplateColumns(dayCount: number) {
  return `${TIME_COL} repeat(${dayCount}, minmax(0, 1fr))`;
}

type WeekGridProps = {
  startDate: Date;
  dayCount: number;
  items: CalendarItem[];
  events: CalendarEvent[];
  enabledLabelIds: Set<string> | null;
  enabledStatusIds: Set<string> | null;
  showCaptions: boolean;
};

function getEventsForDay(events: CalendarEvent[], dateKey: string) {
  return events.filter((e) => e.date === dateKey);
}

function filterPosts(
  posts: CalendarItem[],
  enabledLabelIds: Set<string> | null,
  enabledStatusIds: Set<string> | null,
) {
  return posts.filter(
    (p) =>
      isItemVisible(p.tagIds, enabledLabelIds) &&
      isStatusVisible(p.status, enabledStatusIds),
  );
}

function getNowLineTop(now: Date) {
  const hour = now.getHours();
  const minute = now.getMinutes();
  return hour * HOUR_HEIGHT + (minute / 60) * HOUR_HEIGHT;
}

export function WeekGrid({
  startDate,
  dayCount,
  items,
  events,
  enabledLabelIds,
  enabledStatusIds,
  showCaptions,
}: WeekGridProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [now, setNow] = useState(() => new Date());
  const { platforms: activePlatforms } = useActiveChannels();
  const days = getDaysInRange(startDate, dayCount);
  const columns = useMemo(() => gridTemplateColumns(dayCount), [dayCount]);
  const gridHeight = HOURS.length * HOUR_HEIGHT;
  const nowTop = getNowLineTop(now);

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = DEFAULT_SCROLL_HOUR * HOUR_HEIGHT;
  }, [dayCount, startDate]);

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div
        ref={scrollRef}
        className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden"
      >
        <div
          className="sticky top-0 z-10 grid border-b border-border bg-panel"
          style={{ gridTemplateColumns: columns }}
        >
          <div className="flex min-h-[72px] items-start border-r border-border pt-2">
            <TimezoneSelector />
          </div>

          {days.map((day) => {
            const dateKey = format(day, "yyyy-MM-dd");
            const dayEvents = getEventsForDay(events, dateKey);
            const dayPosts = filterPosts(
              getPostsForDate(items, dateKey),
              enabledLabelIds,
              enabledStatusIds,
            );

            return (
              <DayColumnHeader
                key={dateKey}
                day={day}
                events={dayEvents}
                posts={dayPosts}
                activePlatforms={activePlatforms}
              />
            );
          })}
        </div>

        <div
          className="relative grid"
          style={{ gridTemplateColumns: columns, minHeight: gridHeight }}
        >
          <div
            className="relative border-r border-border"
            style={{ gridRow: `1 / span ${HOURS.length}` }}
          >
            {HOURS.map((hour) => (
              <div
                key={hour}
                className="border-b border-border pr-1 text-right text-[10px] text-muted-foreground"
                style={{ height: HOUR_HEIGHT }}
              >
                {hour > 0 && (
                  <span className="relative -top-2">
                    {format(parse(String(hour), "H", new Date()), "ha")}
                  </span>
                )}
              </div>
            ))}
          </div>

          {days.map((day, dayIndex) => {
            const dateKey = format(day, "yyyy-MM-dd");
            const posts = filterPosts(
              getPostsForDate(items, dateKey),
              enabledLabelIds,
              enabledStatusIds,
            );
            const dayEvents = getEventsForDay(events, dateKey);
            const today = isToday(day);

            return (
              <div
                key={dateKey}
                className="relative border-r border-border last:border-r-0"
                style={{
                  gridColumn: dayIndex + 2,
                  gridRow: `1 / span ${HOURS.length}`,
                }}
              >
                {HOURS.map((hour) => (
                  <div
                    key={hour}
                    className="border-b border-border/70"
                    style={{ height: HOUR_HEIGHT }}
                  />
                ))}

                {layoutDaySchedule(posts, dayEvents, HOUR_HEIGHT).map((item) => {
                  const sharedColumns =
                    item.totalColumns > 1
                      ? {
                          left: `${(item.column / item.totalColumns) * 100}%`,
                          width: `${100 / item.totalColumns}%`,
                        }
                      : null;

                  if (item.kind === "event") {
                    return (
                      <div
                        key={item.event.id}
                        className={cn(
                          "absolute z-[1] px-0.5",
                          item.totalColumns === 1 && "left-1 right-1 px-0",
                        )}
                        style={{
                          top: item.top,
                          height: item.height,
                          ...(sharedColumns ?? {}),
                        }}
                      >
                        <EventBlock
                          event={item.event}
                          compact={item.totalColumns > 1}
                        />
                      </div>
                    );
                  }

                  return (
                    <div
                      key={item.post.id}
                      className={cn(
                        "absolute z-[1]",
                        item.totalColumns === 1 ? "left-1" : "px-0.5",
                      )}
                      style={{
                        top: item.top,
                        ...(sharedColumns ?? {}),
                      }}
                      title={item.post.title}
                    >
                      <PostCard
                        item={item.post}
                        showCaption={showCaptions}
                        compact
                        fluid={item.totalColumns > 1}
                      />
                    </div>
                  );
                })}

                {today && (
                  <div
                    className="pointer-events-none absolute right-0 left-0 z-20"
                    style={{ top: nowTop }}
                  >
                    <div className="absolute -left-[5px] top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-red-500" />
                    <div className="h-0.5 bg-red-500" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
