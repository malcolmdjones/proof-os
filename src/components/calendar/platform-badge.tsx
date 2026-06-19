import type { Platform } from "@/lib/schemas/calendar";
import { PlatformIcon } from "@/components/icons/platform-icons";
import { platformStyles } from "@/lib/platform-styles";
import { cn } from "@/lib/utils";

type PlatformBadgeProps = {
  platform: Platform;
  className?: string;
};

export function PlatformBadge({ platform, className }: PlatformBadgeProps) {
  const style = platformStyles[platform];

  return (
    <span
      className={cn(
        "flex size-5 items-center justify-center rounded-full p-1 text-white shadow-sm",
        platform === "tiktok" && "bg-black",
        className,
      )}
      style={
        platform !== "tiktok" ? { backgroundColor: style.border } : undefined
      }
      title={platform}
    >
      <PlatformIcon platform={platform} />
    </span>
  );
}
