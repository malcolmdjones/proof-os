export type TimezoneOption = {
  id: string;
  label: string;
};

export const COMMON_TIMEZONES: TimezoneOption[] = [
  { id: "America/New_York", label: "Eastern Time" },
  { id: "America/Chicago", label: "Central Time" },
  { id: "America/Denver", label: "Mountain Time" },
  { id: "America/Phoenix", label: "Arizona" },
  { id: "America/Los_Angeles", label: "Pacific Time" },
  { id: "America/Anchorage", label: "Alaska" },
  { id: "Pacific/Honolulu", label: "Hawaii" },
  { id: "Europe/London", label: "London" },
  { id: "Europe/Paris", label: "Paris / CET" },
  { id: "Asia/Dubai", label: "Dubai" },
  { id: "Asia/Kolkata", label: "India" },
  { id: "Asia/Tokyo", label: "Tokyo" },
  { id: "Australia/Sydney", label: "Sydney" },
  { id: "Pacific/Auckland", label: "Auckland" },
  { id: "UTC", label: "UTC" },
];

const STORAGE_KEY = "proof-timezone";

export function detectTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return "America/New_York";
  }
}

export function readStoredTimezone(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_KEY);
}

export function storeTimezone(timezone: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, timezone);
}

/** Short offset label, e.g. "GMT-4". DST handled by IANA zone via Intl. */
export function formatTimezoneOffset(timezone: string, date = new Date()): string {
  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      timeZoneName: "shortOffset",
    }).formatToParts(date);
    return parts.find((p) => p.type === "timeZoneName")?.value ?? timezone;
  } catch {
    return timezone;
  }
}

export function formatTimezoneLabel(timezone: string): string {
  const match = COMMON_TIMEZONES.find((tz) => tz.id === timezone);
  if (match) return match.label;

  try {
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      timeZoneName: "longGeneric",
    }).formatToParts(new Date());
    return parts.find((p) => p.type === "timeZoneName")?.value ?? timezone;
  } catch {
    return timezone.replace(/_/g, " ");
  }
}
