import type { ContentStatus } from "@/lib/schemas/calendar";

export type ContentStatusConfig = {
  id: ContentStatus;
  label: string;
  /** Primary color — used by filters, badges, and checkboxes. */
  color: string;
  badgeClassName: string;
  headerClassName: string;
  progressColor: string;
  /** Planned/Started cards invert by theme — black in light, white in dark. */
  needsAttention: boolean;
  cardClassName: string;
};

export const CONTENT_STATUS_ORDER: ContentStatus[] = [
  "needs_creation",
  "in_progress",
  "queued",
  "posted",
];

export const CONTENT_STATUS_CONFIG: Record<
  ContentStatus,
  ContentStatusConfig
> = {
  needs_creation: {
    id: "needs_creation",
    label: "Planned",
    color: "#F5674D",
    badgeClassName: "bg-[#F5674D] text-white",
    // Opaque match for coral/20 on white — dark variant for dark mode panel
    headerClassName: "bg-attention-planned-header",
    progressColor: "#10B981",
    needsAttention: true,
    cardClassName:
      "bg-proof-black border-white/15 text-white shadow-md dark:bg-white dark:border-border dark:text-on-light dark:shadow-lg dark:shadow-black/20",
  },
  in_progress: {
    id: "in_progress",
    label: "Started",
    color: "#CA8A04",
    badgeClassName: "bg-proof-yellow/40 text-on-light",
    headerClassName: "bg-attention-started-header",
    progressColor: "#10B981",
    needsAttention: true,
    cardClassName:
      "bg-proof-black border-white/15 text-white shadow-md dark:bg-white dark:border-border dark:text-on-light dark:shadow-lg dark:shadow-black/20",
  },
  queued: {
    id: "queued",
    label: "Queued",
    color: "#3B82F6",
    badgeClassName: "bg-blue-500/15 text-blue-700 dark:text-blue-300",
    headerClassName: "bg-blue-500/10 dark:bg-blue-500/15",
    progressColor: "#10B981",
    needsAttention: false,
    cardClassName: "bg-panel border-border shadow-sm",
  },
  posted: {
    id: "posted",
    label: "Posted",
    color: "#1D4ED8",
    badgeClassName: "bg-blue-700 text-white",
    headerClassName: "bg-blue-700/12 dark:bg-blue-600/20",
    progressColor: "#10B981",
    needsAttention: false,
    cardClassName: "bg-panel border-border shadow-sm opacity-95",
  },
};

export function normalizeContentStatus(
  status: ContentStatus | undefined,
): ContentStatus {
  return status ?? "needs_creation";
}

export function getContentStatusConfig(
  status: ContentStatus | undefined,
): ContentStatusConfig {
  return CONTENT_STATUS_CONFIG[normalizeContentStatus(status)];
}

export const ALL_CONTENT_STATUS_IDS = CONTENT_STATUS_ORDER;
