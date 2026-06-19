"use client";

import { useCallback, useEffect, useState } from "react";

import {
  detectTimezone,
  formatTimezoneOffset,
  readStoredTimezone,
  storeTimezone,
} from "@/lib/timezone";

export function useTimezone() {
  const [timezone, setTimezoneState] = useState(() => detectTimezone());
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readStoredTimezone();
    if (stored) {
      setTimezoneState(stored);
    } else {
      const detected = detectTimezone();
      storeTimezone(detected);
      setTimezoneState(detected);
    }
    setReady(true);
  }, []);

  const setTimezone = useCallback((next: string) => {
    setTimezoneState(next);
    storeTimezone(next);
  }, []);

  return {
    timezone,
    setTimezone,
    offsetLabel: formatTimezoneOffset(timezone),
    ready,
  };
}
