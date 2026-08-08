"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

interface ScrollStackItem {
  eyebrow: string;
  title: string;
  text: string;
}

interface ScrollStackProps {
  items: readonly ScrollStackItem[];
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

export function ScrollStack({ items }: ScrollStackProps) {
  const stackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const reduceMotion = useReducedMotion();
  const [simpleMode, setSimpleMode] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 700px), (pointer: coarse)");
    const sync = () => setSimpleMode(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  const staticMode = reduceMotion || simpleMode;

  useEffect(() => {
    const stack = stackRef.current;
    const simpleViewport = window.matchMedia("(max-width: 700px), (pointer: coarse)").matches;
    if (!stack || staticMode || simpleViewport) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const viewportHeight = window.innerHeight;
      const stackTop = stack.getBoundingClientRect().top + window.scrollY;
      const stackBottom = stackTop + stack.offsetHeight;

      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const cardTop = card.getBoundingClientRect().top + window.scrollY;
        const stackPosition = viewportHeight * 0.16;
        const stackDistance = 22;
        const triggerStart = cardTop - stackPosition - stackDistance * index;
        const triggerEnd = cardTop - viewportHeight * 0.1;
        const progress = clamp((window.scrollY - triggerStart) / Math.max(1, triggerEnd - triggerStart), 0, 1);
        const pinEnd = stackBottom - viewportHeight * 0.52;
        const isPinned = window.scrollY >= triggerStart && window.scrollY <= pinEnd;
        const translateY = isPinned
          ? window.scrollY - cardTop + stackPosition + stackDistance * index
          : window.scrollY > pinEnd
            ? pinEnd - cardTop + stackPosition + stackDistance * index
            : 0;
        const scale = 1 - progress * 0.045;
        const rotation = index === 0 ? 0 : (index % 2 === 0 ? 1 : -1) * progress * 0.8;
        card.style.transform = `translate3d(0, ${Math.round(translateY * 100) / 100}px, 0) scale(${scale}) rotate(${rotation}deg)`;
        card.style.zIndex = String(index + 1);
      });
    };

    const schedule = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [items, staticMode]);

  return (
    <div ref={stackRef} className={`scroll-stack${staticMode ? " is-static" : ""}`} aria-label="Arquitetura do SysMon em etapas">
      {items.map((item, index) => (
        <article
          className="scroll-stack-card"
          key={item.title}
          ref={(element) => {
            cardRefs.current[index] = element;
          }}
        >
          <span className="scroll-stack-index">{String(index + 1).padStart(2, "0")}</span>
          <div>
            <p className="project-role">{item.eyebrow}</p>
            <h5>{item.title}</h5>
            <p>{item.text}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
