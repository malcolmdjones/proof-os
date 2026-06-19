import type { CalendarLabel } from "@/lib/schemas/calendar";

export const calendarLabels: CalendarLabel[] = [
  { id: "event-announcement", name: "Event Announcement", color: "#F5674D", category: "category" },
  { id: "event-reminder", name: "Event Reminder", color: "#FF8C42", category: "category" },
  { id: "reel", name: "Reel", color: "#9333EA", category: "format" },
  { id: "static", name: "Static", color: "#3B82F6", category: "format" },
  { id: "carousel", name: "Carousel", color: "#EC4899", category: "format" },
  { id: "story", name: "Story", color: "#14B8A6", category: "format" },
  { id: "viral", name: "Viral", color: "#FFF800", category: "goal" },
  { id: "nurturing", name: "Nurturing", color: "#22C55E", category: "goal" },
  { id: "educational", name: "Educational", color: "#6366F1", category: "goal" },
  { id: "instagram", name: "Instagram", color: "#E1306C", category: "platform" },
  { id: "tiktok", name: "TikTok", color: "#000000", category: "platform" },
  { id: "linkedin", name: "LinkedIn", color: "#0A66C2", category: "platform" },
  { id: "twitter", name: "X", color: "#14171A", category: "platform" },
  { id: "youtube", name: "YouTube", color: "#FF0000", category: "platform" },
];
