import Image from "next/image";

import { EventMeta } from "@/components/calendar/event-meta";
import type { CalendarEvent } from "@/lib/schemas/calendar";
import { formatRsvpLabel } from "@/lib/event-utils";
import { cn } from "@/lib/utils";

type EventBlockProps = {
  event: CalendarEvent;
  className?: string;
  compact?: boolean;
};

export function EventBlock({ event, className, compact }: EventBlockProps) {
  const footer =
    event.rsvpCount !== undefined
      ? `Event · ${formatRsvpLabel(event.rsvpCount)}`
      : "Event";

  return (
    <button
      type="button"
      className={cn(
        "flex h-full w-full min-w-0 flex-col overflow-hidden rounded-md border border-proof-black/15 bg-proof-yellow p-1.5 text-left shadow-sm transition-opacity hover:opacity-95 dark:border-proof-black/25",
        className,
      )}
      title={event.title}
      aria-label={`Event: ${event.title}`}
    >
      <div className="flex items-start gap-1.5">
        {event.thumbnailUrl && (
          <span
            className={cn(
              "relative shrink-0 overflow-hidden rounded-sm border border-proof-black/10",
              compact ? "size-7" : "size-10",
            )}
          >
            <Image
              src={event.thumbnailUrl}
              alt=""
              fill
              className="object-cover"
              sizes={compact ? "28px" : "40px"}
            />
          </span>
        )}
        <div className="min-w-0 flex-1 overflow-hidden">
          <p
            className={cn(
              "line-clamp-2 font-semibold leading-snug text-on-light",
              compact ? "text-[9px]" : "text-[11px]",
            )}
          >
            {event.title}
          </p>
          <EventMeta event={event} showRsvp={false} className="mt-0.5" />
        </div>
      </div>
      <p className="mt-auto shrink-0 truncate pt-1 text-[8px] font-medium uppercase tracking-wide text-on-light-muted">
        {footer}
      </p>
    </button>
  );
}
