import type { Platform } from "@/lib/schemas/calendar";

export const platformStyles: Record<
  Platform,
  { label: string; border: string; bg: string; text: string }
> = {
  instagram: {
    label: "IG",
    border: "#E1306C",
    bg: "#FDF2F8",
    text: "#E1306C",
  },
  tiktok: {
    label: "TT",
    border: "#000000",
    bg: "#F5F5F5",
    text: "#000000",
  },
  twitter: {
    label: "X",
    border: "#14171A",
    bg: "#F7F7F7",
    text: "#14171A",
  },
  linkedin: {
    label: "LI",
    border: "#0A66C2",
    bg: "#EFF6FF",
    text: "#0A66C2",
  },
  youtube: {
    label: "YT",
    border: "#FF0000",
    bg: "#FEF2F2",
    text: "#FF0000",
  },
};
