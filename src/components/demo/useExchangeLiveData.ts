"use client";

import { useEffect, useMemo, useState } from "react";
import {
  buildLiveExchangeSlice,
  type LiveExchangeSlice,
} from "@/lib/mock/exchangeDataFlow";

const LIVE_MODULES = new Set([
  "dispatch",
  "vehicle",
  "inspection",
  "loading",
  "processing",
]);
const PUSH_INTERVAL_MS = 5000;

export function useExchangeLiveData(moduleKey: string, streamKey?: string) {
  const enabled = LIVE_MODULES.has(moduleKey);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!enabled) return undefined;
    const timer = window.setInterval(() => {
      setTick((value) => value + 1);
    }, PUSH_INTERVAL_MS);
    return () => window.clearInterval(timer);
  }, [enabled]);

  const live = useMemo(
    () =>
      enabled ? buildLiveExchangeSlice(moduleKey, tick, streamKey) : null,
    [enabled, moduleKey, tick, streamKey],
  );

  return {
    enabled,
    tick,
    live,
    pushLabel: enabled ? `模拟推送 · ${PUSH_INTERVAL_MS / 1000}s` : undefined,
  };
}

export type { LiveExchangeSlice };
