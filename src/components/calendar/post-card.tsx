import type { CalendarItem } from "@/lib/schemas/calendar";
import { getContentStatusConfig, normalizeContentStatus } from "@/lib/content-status";
import { formatTimeLabel } from "@/lib/calendar-utils";
import { cn } from "@/lib/utils";

import { PostCardMedia } from "./post-card-media";
import { PostCardReadiness } from "./post-card-readiness";

type PostCardProps = {
  item: CalendarItem;
  showCaption?: boolean;
  compact?: boolean;
  /** Shrink to fit when multiple posts share a time slot. */
  fluid?: boolean;
};

export function PostCard({ item, showCaption = true, compact, fluid }: PostCardProps) {
  const status = normalizeContentStatus(item.status);
  const config = getContentStatusConfig(status);
  const isEventLinked = Boolean(item.linkedEventId);
  const showProgress = status === "in_progress" && item.progress !== undefined;
  const attention = config.needsAttention;

  return (
    <article
      className={cn(
        "overflow-hidden rounded-lg border",
        config.cardClassName,
        compact ? (fluid ? "w-full min-w-0" : "w-[108px]") : "w-[120px]",
        isEventLinked && "ring-1 ring-proof-coral/40",
      )}
    >
      <header
        className={cn(
          "flex items-center justify-between gap-1 border-b border-dashed px-1.5 py-1",
          attention ? "border-white/15 dark:border-border" : "border-border",
          config.headerClassName,
        )}
      >
        <span
          className={cn(
            "text-[10px] font-medium",
            attention ? "text-on-light-muted" : "text-muted-foreground",
          )}
        >
          {item.time ? formatTimeLabel(item.time) : "All day"}
        </span>
        <span
          className={cn(
            "rounded px-1 py-0.5 text-[9px] font-semibold",
            config.badgeClassName,
          )}
        >
          {config.label}
        </span>
      </header>

      {showProgress && (
        <div
          className={cn(
            "h-1",
            attention ? "bg-white/10 dark:bg-foreground/[0.06]" : "bg-foreground/[0.06]",
          )}
        >
          <div
            className="h-full transition-[width]"
            style={{
              width: `${item.progress}%`,
              backgroundColor: config.progressColor,
            }}
          />
        </div>
      )}

      <div className="p-1">
        <PostCardMedia item={item} attention={attention} />
      </div>

      {showCaption && item.caption && (
        <p
          className={cn(
            "line-clamp-2 px-1.5 text-[10px] leading-tight",
            attention ? "text-inherit" : "text-foreground",
          )}
        >
          {item.caption}
        </p>
      )}

      <PostCardReadiness item={item} attention={attention} />
    </article>
  );
}
