"use client";

import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

function isApplePlatform() {
  const platform = (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData?.platform
    ?? navigator.platform;
  return /mac|iphone|ipad/i.test(platform);
}

/** "⌘K" on Apple devices, "Ctrl K" elsewhere (and during SSR). */
export function useShortcutLabel() {
  return useSyncExternalStore(
    subscribe,
    () => (isApplePlatform() ? "⌘K" : "Ctrl K"),
    () => "Ctrl K",
  );
}
