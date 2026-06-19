import type { CalendarEvent } from "@/lib/schemas/calendar";

const eventThumb = "/mock-post-images/event-thumbnail-example.jpg";

export const calendarEvents: CalendarEvent[] = [
  {
    id: "evt-meetup",
    title: "Cursor Philly Meetup & Community Night",
    date: "2026-06-30",
    startTime: "18:00",
    endTime: "21:00",
    rsvpCount: 120,
    thumbnailUrl: eventThumb,
    expectedPlatforms: ["instagram", "linkedin", "twitter", "tiktok"],
  },
  {
    id: "evt-shoot",
    title: "Content shoot",
    date: "2026-06-22",
    startTime: "10:00",
    endTime: "14:00",
    thumbnailUrl: eventThumb,
    expectedPlatforms: ["instagram", "tiktok"],
  },
  {
    id: "evt-review",
    title: "Content review",
    date: "2026-06-25",
    startTime: "15:00",
    endTime: "16:00",
    expectedPlatforms: [],
  },
  {
    id: "evt-meetup-prep",
    title: "Cursor Philly Meetup & Community Night",
    date: "2026-06-20",
    startTime: "18:00",
    endTime: "21:00",
    rsvpCount: 85,
    thumbnailUrl: eventThumb,
    expectedPlatforms: ["instagram", "linkedin", "twitter", "tiktok"],
  },
];
