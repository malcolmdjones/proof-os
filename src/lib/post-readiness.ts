import type { CalendarItem } from "@/lib/schemas/calendar";
import { normalizeContentStatus } from "@/lib/content-status";

export type ReadinessItem = {
  id: string;
  label: string;
  state: "done" | "needs" | "draft";
};

export function getPostReadiness(item: CalendarItem): ReadinessItem[] {
  const status = normalizeContentStatus(item.status);
  const hasAsset = Boolean(item.mediaUrl);
  const hasCaption = Boolean(item.caption?.trim());

  const asset: ReadinessItem = {
    id: "asset",
    label: "Asset",
    state: hasAsset ? "done" : "needs",
  };

  let caption: ReadinessItem;
  if (!hasCaption) {
    caption = { id: "caption", label: "Caption", state: "needs" };
  } else if (status === "queued" || status === "posted") {
    caption = { id: "caption", label: "Caption", state: "done" };
  } else {
    caption = { id: "caption", label: "Caption", state: "draft" };
  }

  const scheduled: ReadinessItem = {
    id: "scheduled",
    label: "Queued",
    state:
      (status === "queued" || status === "posted") && item.time
        ? "done"
        : "needs",
  };

  return [asset, caption, scheduled];
}

export function readinessSummary(items: ReadinessItem[]) {
  const done = items.filter((i) => i.state === "done").length;
  return { done, total: items.length };
}
