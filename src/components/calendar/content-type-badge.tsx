import { Layers, Play } from "lucide-react";

import type { ContentFormat } from "@/lib/schemas/calendar";
import { cn } from "@/lib/utils";

type ContentTypeBadgeProps = {
  format?: ContentFormat;
  className?: string;
};

export function StoryBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex size-5 items-center justify-center rounded-full bg-panel/90 shadow-sm dark:bg-panel/80",
        className,
      )}
      title="Story"
    >
      <span className="size-3.5 rounded-full border-[2px] border-proof-coral border-dashed" />
    </span>
  );
}

export function ContentTypeBadge({ format, className }: ContentTypeBadgeProps) {
  if (!format || format === "static" || format === "email" || format === "sms") {
    return null;
  }

  if (format === "story") {
    return <StoryBadge className={className} />;
  }

  if (format === "carousel") {
    return (
      <span
        className={cn(
          "flex size-5 items-center justify-center rounded bg-panel/90 shadow-sm dark:bg-panel/80",
          className,
        )}
        title="Carousel"
      >
        <Layers className="size-3 text-foreground" strokeWidth={2.5} />
      </span>
    );
  }

  if (format === "reel" || format === "video") {
    return (
      <span
        className={cn(
          "flex size-5 items-center justify-center rounded bg-panel/90 shadow-sm dark:bg-panel/80",
          className,
        )}
        title="Video"
      >
        <Play className="size-3 fill-foreground text-foreground" />
      </span>
    );
  }

  return null;
}
