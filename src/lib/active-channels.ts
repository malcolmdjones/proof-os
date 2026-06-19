import type { Platform } from "@/lib/schemas/calendar";

/** Default until a settings panel persists user choices. */
export const DEFAULT_ACTIVE_PLATFORMS: Platform[] = [
  "instagram",
  "tiktok",
  "twitter",
  "linkedin",
  "youtube",
];

const STORAGE_KEY = "proof-active-channels";

export function readStoredActivePlatforms(): Platform[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return null;
    return parsed.filter(isPlatformString) as Platform[];
  } catch {
    return null;
  }
}

export function storeActivePlatforms(platforms: Platform[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(platforms));
}

function isPlatformString(value: unknown): value is Platform {
  return (
    typeof value === "string" &&
    (DEFAULT_ACTIVE_PLATFORMS as string[]).includes(value)
  );
}
