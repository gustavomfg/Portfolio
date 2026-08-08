"use client";

import type { PointerEvent, ReactNode } from "react";
import { useReducedMotion } from "motion/react";

interface SpotlightListProps {
  children: ReactNode;
}

export function SpotlightList({ children }: SpotlightListProps) {
  const reduceMotion = useReducedMotion();

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const item = (event.target as HTMLElement).closest<HTMLElement>("[data-spotlight-item]");
    if (!item) return;
    const bounds = item.getBoundingClientRect();
    item.style.setProperty("--spotlight-x", `${event.clientX - bounds.left}px`);
    item.style.setProperty("--spotlight-y", `${event.clientY - bounds.top}px`);
  };

  return (
    <div className="project-index-list spotlight-list" onPointerMove={handlePointerMove}>
      {children}
    </div>
  );
}
