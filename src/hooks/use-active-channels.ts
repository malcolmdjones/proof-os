"use client";

import { useCallback, useEffect, useState } from "react";

import {
  DEFAULT_ACTIVE_PLATFORMS,
  readStoredActivePlatforms,
  storeActivePlatforms,
} from "@/lib/active-channels";
import type { Platform } from "@/lib/schemas/calendar";

export function useActiveChannels() {
  const [platforms, setPlatformsState] = useState<Platform[]>(
    DEFAULT_ACTIVE_PLATFORMS,
  );
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readStoredActivePlatforms();
    if (stored && stored.length > 0) {
      setPlatformsState(stored);
    }
    setReady(true);
  }, []);

  const setPlatforms = useCallback((next: Platform[]) => {
    setPlatformsState(next);
    storeActivePlatforms(next);
  }, []);

  return { platforms, setPlatforms, ready };
}
