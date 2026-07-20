"use client";

import { useReducedMotion } from "motion/react";
import { useCallback, type PointerEvent as ReactPointerEvent } from "react";

export function usePointerGlow() {
  const reduceMotion = useReducedMotion();

  return useCallback((event: ReactPointerEvent<HTMLElement>) => {
    if (reduceMotion) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--pointer-x", `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty("--pointer-y", `${event.clientY - bounds.top}px`);
  }, [reduceMotion]);
}
