import { z } from "zod";

export const contentStatusSchema = z.enum([
  "needs_creation",
  "in_progress",
  "queued",
  "posted",
]);

export const calendarItemTypeSchema = z.enum(["event", "content", "planned"]);

export const platformSchema = z.enum([
  "instagram",
  "tiktok",
  "twitter",
  "linkedin",
  "youtube",
]);

export const contentFormatSchema = z.enum([
  "reel",
  "static",
  "carousel",
  "story",
  "video",
  "email",
  "sms",
]);

export const contentGoalSchema = z.enum([
  "viral",
  "nurturing",
  "educational",
]);

export const postCategorySchema = z.enum([
  "evergreen",
  "event_announcement",
  "event_reminder",
  "general",
]);

export const calendarViewSchema = z.enum([
  "day",
  "week",
  "month",
  "platform",
]);

export const labelCategorySchema = z.enum([
  "format",
  "goal",
  "category",
  "platform",
]);

export const calendarItemSchema = z.object({
  id: z.string(),
  type: calendarItemTypeSchema,
  title: z.string(),
  caption: z.string().optional(),
  date: z.string(),
  time: z.string().optional(),
  duration: z.number().optional(),
  platform: platformSchema.optional(),
  status: contentStatusSchema.optional(),
  progress: z.number().min(0).max(100).optional(),
  mediaUrl: z.string().optional(),
  mediaPoster: z.string().optional(),
  mediaType: z.enum(["image", "video"]).optional(),
  contentFormat: contentFormatSchema.optional(),
  contentGoal: contentGoalSchema.optional(),
  postCategory: postCategorySchema.optional(),
  linkedEventId: z.string().optional(),
  tagIds: z.array(z.string()).default([]),
});

export const calendarEventSchema = z.object({
  id: z.string(),
  title: z.string(),
  date: z.string(),
  endDate: z.string().optional(),
  /** HH:mm — when set, event renders on the time grid. */
  startTime: z.string().optional(),
  endTime: z.string().optional(),
  rsvpCount: z.number().optional(),
  color: z.string().optional(),
  thumbnailUrl: z.string().optional(),
  expectedPlatforms: z.array(platformSchema),
});

export const calendarLabelSchema = z.object({
  id: z.string(),
  name: z.string(),
  color: z.string(),
  category: labelCategorySchema,
});

export type CalendarItem = z.infer<typeof calendarItemSchema>;
export type CalendarEvent = z.infer<typeof calendarEventSchema>;
export type CalendarLabel = z.infer<typeof calendarLabelSchema>;
export type ContentStatus = z.infer<typeof contentStatusSchema>;
export type Platform = z.infer<typeof platformSchema>;
export type ContentFormat = z.infer<typeof contentFormatSchema>;
export type CalendarView = z.infer<typeof calendarViewSchema>;
