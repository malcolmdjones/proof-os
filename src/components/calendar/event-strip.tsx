import Image from "next/image";

import { EventMeta } from "@/components/calendar/event-meta";
import type { CalendarEvent } from "@/lib/schemas/calendar";
import { cn } from "@/lib/utils";

type EventStripProps = {
  event: CalendarEvent;
  className?: string;
};

export function EventStrip({ event, className }: EventStripProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex w-full min-w-0 items-center gap-1.5 overflow-hidden rounded-md border border-proof-black/10 bg-proof-yellow px-1 py-1 text-left shadow-sm transition-opacity hover:opacity-90 dark:border-proof-black/20",
        className,
      )}
      title={event.title}
      aria-label={`Event: ${event.title}`}
    >
      {event.thumbnailUrl && (
        <span className="relative size-8 shrink-0 overflow-hidden rounded-sm border border-proof-black/10">
          <Image
            src={event.thumbnailUrl}
            alt=""
            fill
            className="object-cover"
            sizes="32px"
          />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[10px] font-semibold text-on-light">
          {event.title}
        </span>
        <EventMeta event={event} compact />
      </span>
    </button>
  );
}
