"use client";

import gsap from "gsap";
import { useReducedMotion } from "motion/react";
import type { PointerEvent, ReactNode } from "react";
import { useRef } from "react";

interface SmokedGlassListProps {
  children: ReactNode;
}

function createMaterialMotion(item: HTMLElement) {
  const proxy = { x: 50, y: 50, rotateX: 0, rotateY: 0 };
  const render = () => {
    item.style.setProperty("--glass-reflect-x", `${proxy.x}%`);
    item.style.setProperty("--glass-reflect-y", `${proxy.y}%`);
    item.style.setProperty("--glass-rotate-x", `${proxy.rotateX}deg`);
    item.style.setProperty("--glass-rotate-y", `${proxy.rotateY}deg`);
  };

  render();

  return {
    moveX: gsap.quickTo(proxy, "x", { duration: 0.72, ease: "power3.out", onUpdate: render }),
    moveY: gsap.quickTo(proxy, "y", { duration: 0.72, ease: "power3.out", onUpdate: render }),
    tiltX: gsap.quickTo(proxy, "rotateX", { duration: 0.58, ease: "power3.out", onUpdate: render }),
    tiltY: gsap.quickTo(proxy, "rotateY", { duration: 0.58, ease: "power3.out", onUpdate: render }),
  };
}

function getItem(event: PointerEvent<HTMLDivElement>) {
  return (event.target as HTMLElement).closest<HTMLElement>("[data-smoked-glass-item]");
}

export function SmokedGlassList({ children }: SmokedGlassListProps) {
  const reduceMotion = useReducedMotion();
  const materialMotion = useRef(new WeakMap<HTMLElement, ReturnType<typeof createMaterialMotion>>());

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const item = getItem(event);
    if (!item) return;

    const bounds = item.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const normalizedX = x / bounds.width - 0.5;
    const normalizedY = y / bounds.height - 0.5;
    const motion = materialMotion.current.get(item) ?? createMaterialMotion(item);

    materialMotion.current.set(item, motion);
    motion.moveX(50 + normalizedX * 10);
    motion.moveY(50 + normalizedY * 7);
    motion.tiltX(normalizedY * -0.65);
    motion.tiltY(normalizedX * 0.75);
  };

  const handlePointerOut = (event: PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const item = getItem(event);
    if (!item || (event.relatedTarget instanceof Node && item.contains(event.relatedTarget))) return;
    const motion = materialMotion.current.get(item);
    if (!motion) return;

    motion.moveX(50);
    motion.moveY(50);
    motion.tiltX(0);
    motion.tiltY(0);
  };

  return (
    <div
      className="project-index-list smoked-glass-list"
      onPointerMove={handlePointerMove}
      onPointerOut={handlePointerOut}
    >
      {children}
    </div>
  );
}
