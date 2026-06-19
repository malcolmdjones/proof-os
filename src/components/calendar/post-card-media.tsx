"use client";

import { ImageIcon, Play } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

import { ContentTypeBadge } from "@/components/calendar/content-type-badge";
import { PlatformBadge } from "@/components/calendar/platform-badge";
import type { CalendarItem } from "@/lib/schemas/calendar";
import { normalizeContentStatus } from "@/lib/content-status";
import { platformStyles } from "@/lib/platform-styles";
import { cn } from "@/lib/utils";

type PostCardMediaProps = {
  item: CalendarItem;
  attention?: boolean;
};

export function PostCardMedia({ item, attention = false }: PostCardMediaProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const platform = item.platform;
  const borderColor = platform ? platformStyles[platform].border : "#D1D5DB";
  const status = normalizeContentStatus(item.status);
  const hasMedia =
    (status === "queued" || status === "posted") && item.mediaUrl;

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      void video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <div
      className="relative overflow-hidden rounded-md"
      style={{ border: `2px solid ${borderColor}` }}
    >
      {hasMedia ? (
        <div className="relative aspect-square w-full bg-black/5">
          {item.mediaType === "video" ? (
            <button
              type="button"
              onClick={togglePlay}
              className="relative block size-full"
              aria-label={playing ? "Pause video" : "Play video"}
            >
              <video
                ref={videoRef}
                src={item.mediaUrl}
                poster={item.mediaPoster}
                className="size-full object-cover"
                muted
                playsInline
                loop
                onEnded={() => setPlaying(false)}
                onPause={() => setPlaying(false)}
                onPlay={() => setPlaying(true)}
              />
              {!playing && (
                <span className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <span className="flex size-8 items-center justify-center rounded-full bg-black/55 text-white">
                    <Play className="ml-0.5 size-4 fill-current" />
                  </span>
                </span>
              )}
            </button>
          ) : (
            <Image
              src={item.mediaUrl!}
              alt={item.title}
              fill
              className="object-cover"
              sizes="120px"
            />
          )}
        </div>
      ) : (
        <div
          className={cn(
            "flex aspect-square w-full flex-col items-center justify-center gap-1 border border-dashed",
            attention
              ? "border-white/20 bg-white/[0.03] dark:border-black/15 dark:bg-black/[0.03]"
              : "border-black/15 bg-black/[0.03] dark:border-white/15 dark:bg-white/[0.03]",
            status === "needs_creation" && "bg-proof-coral/5",
            status === "in_progress" && "bg-proof-yellow/10",
          )}
        >
          <ImageIcon
            className={cn(
              "size-5",
              attention
                ? "text-white/50 dark:text-on-light-muted"
                : "text-muted-foreground",
            )}
            strokeWidth={1.5}
          />
          <span
            className={cn(
              "text-[9px] font-medium",
              attention
                ? "text-white/50 dark:text-on-light-muted"
                : "text-muted-foreground",
            )}
          >
            Needs asset
          </span>
        </div>
      )}

      {platform && (
        <div className="absolute top-1 right-1">
          <PlatformBadge platform={platform} />
        </div>
      )}

      {item.contentFormat && (
        <div className="absolute right-1 bottom-1">
          <ContentTypeBadge format={item.contentFormat} />
        </div>
      )}
    </div>
  );
}
