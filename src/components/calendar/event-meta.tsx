import type { CalendarEvent } from "@/lib/schemas/calendar";
import { formatEventTimeRange, formatRsvpLabel } from "@/lib/event-utils";
import { cn } from "@/lib/utils";

type EventMetaProps = {
  event: CalendarEvent;
  className?: string;
  compact?: boolean;
  /** Grid blocks show RSVP in the footer instead. */
  showRsvp?: boolean;
};

export function EventMeta({
  event,
  className,
  compact,
  showRsvp = true,
}: EventMetaProps) {
  const timeRange = formatEventTimeRange(event);
  const parts = [
    timeRange,
    showRsvp && event.rsvpCount !== undefined
      ? formatRsvpLabel(event.rsvpCount)
      : null,
  ].filter(Boolean);

  if (parts.length === 0) return null;

  return (
    <p
      className={cn(
        "truncate whitespace-nowrap text-on-light-muted",
        compact ? "text-[8px] leading-tight" : "text-[9px] leading-tight",
        className,
      )}
    >
      {parts.join(" · ")}
    </p>
  );
}
