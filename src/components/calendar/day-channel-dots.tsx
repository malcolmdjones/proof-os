import { PlatformIcon } from "@/components/icons/platform-icons";
import { formatPostCount } from "@/lib/platform-post-counts";
import { platformStyles } from "@/lib/platform-styles";
import type { Platform } from "@/lib/schemas/calendar";
import { cn } from "@/lib/utils";

type DayChannelDotsProps = {
  activePlatforms: Platform[];
  counts: Partial<Record<Platform, number>>;
  className?: string;
};

export function DayChannelDots({
  activePlatforms,
  counts,
  className,
}: DayChannelDotsProps) {
  if (activePlatforms.length === 0) return null;

  return (
    <div
      className={cn("flex items-center justify-center gap-1", className)}
      aria-label="Channel coverage for this day"
    >
      {activePlatforms.map((platform) => {
        const count = counts[platform] ?? 0;
        const style = platformStyles[platform];
        const filled = count > 0;

        return (
          <div
            key={platform}
            className="relative"
            title={
              filled
                ? `${style.label}: ${count} post${count === 1 ? "" : "s"}`
                : `${style.label}: no posts`
            }
          >
            <span
              className={cn(
                "flex size-5 items-center justify-center rounded-full p-1",
                filled
                  ? cn(
                      "text-white shadow-sm",
                      platform === "tiktok" ? "bg-black" : "",
                    )
                  : "border border-border bg-muted/40 text-muted-foreground/35",
              )}
              style={
                filled && platform !== "tiktok"
                  ? { backgroundColor: style.border }
                  : undefined
              }
            >
              <PlatformIcon platform={platform} />
            </span>
            {filled && (
              <span className="absolute -top-1 -right-1 flex size-3.5 min-w-3.5 items-center justify-center rounded-full bg-proof-black px-0.5 text-[7px] font-bold leading-none text-white">
                {formatPostCount(count)}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
