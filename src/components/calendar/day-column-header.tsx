import { format, isToday } from "date-fns";

import { DayChannelDots } from "@/components/calendar/day-channel-dots";
import { EventStrip } from "@/components/calendar/event-strip";
import { countPostsByPlatform } from "@/lib/platform-post-counts";
import type { CalendarEvent, CalendarItem, Platform } from "@/lib/schemas/calendar";
import { cn } from "@/lib/utils";

type DayColumnHeaderProps = {
  day: Date;
  events: CalendarEvent[];
  posts: CalendarItem[];
  activePlatforms: Platform[];
};

export function DayColumnHeader({
  day,
  events,
  posts,
  activePlatforms,
}: DayColumnHeaderProps) {
  const counts = countPostsByPlatform(posts);

  return (
    <div className="flex min-h-[72px] flex-col border-r border-border px-1 py-2 last:border-r-0">
      <div className="flex items-center justify-center gap-1.5">
        <span
          className={cn(
            "flex size-7 items-center justify-center rounded-full text-xs font-semibold",
            isToday(day) && "bg-proof-yellow text-proof-black",
          )}
        >
          {format(day, "d")}
        </span>
        <span className="text-[11px] text-muted-foreground">
          {format(day, "EEE")}
        </span>
      </div>

      <DayChannelDots
        activePlatforms={activePlatforms}
        counts={counts}
        className="mt-1.5 min-h-5"
      />

      <div className="mt-1 flex min-h-[36px] flex-col justify-start gap-0.5">
        {events.map((event) => (
          <EventStrip key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
