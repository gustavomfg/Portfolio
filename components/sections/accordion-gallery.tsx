"use client";

import { gsap } from "gsap";
import { useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";

const GALLERY_ITEMS = [
  {
    label: "Workspace",
    detail: "Captura real do workspace ainda pendente nesta base.",
  },
  {
    label: "Review Mode",
    detail: "Captura real do Review Mode ainda pendente nesta base.",
  },
  {
    label: "Awareness / Second Brain",
    detail: "Captura real da memória e da awareness ainda pendente nesta base.",
  },
  {
    label: "Providers",
    detail: "Captura real do sistema de providers ainda pendente nesta base.",
  },
] as const;

export function AccordionGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const panelRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const mediaRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const labelRefs = useRef<Array<HTMLSpanElement | null>>([]);

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setPrefersReducedMotion(mediaQuery.matches);
    syncMotion();
    mediaQuery.addEventListener("change", syncMotion);
    return () => mediaQuery.removeEventListener("change", syncMotion);
  }, []);

  useLayoutEffect(() => {
    const panels = panelRefs.current;
    const timeline = gsap.timeline();
    const activeGrow = GALLERY_ITEMS.length > 1 ? 2.65 : 1;
    const duration = prefersReducedMotion ? 0 : 0.52;

    panels.forEach((panel, index) => {
      if (!panel) return;
      const active = index === activeIndex;
      timeline.to(panel, {
        flexGrow: active ? activeGrow : 1,
        rotateY: active ? 0 : index < activeIndex ? 1.6 : -1.6,
        duration,
        ease: "power3.out",
      }, 0);
      if (mediaRefs.current[index]) {
        timeline.to(mediaRefs.current[index], {
          scale: active ? 1 : 0.985,
          duration,
          ease: "power3.out",
        }, 0);
      }
      if (labelRefs.current[index]) {
        timeline.to(labelRefs.current[index], {
          opacity: active ? 1 : 0.72,
          x: active ? 0 : 0,
          duration,
          ease: "power2.out",
        }, 0);
      }
    });

    return () => {
      timeline.kill();
    };
  }, [activeIndex, prefersReducedMotion]);

  const moveTo = (index: number) => {
    setActiveIndex(index);
    window.requestAnimationFrame(() => panelRefs.current[index]?.focus());
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      moveTo((index + 1) % GALLERY_ITEMS.length);
    }
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      moveTo((index - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length);
    }
    if (event.key === "Home") {
      event.preventDefault();
      moveTo(0);
    }
    if (event.key === "End") {
      event.preventDefault();
      moveTo(GALLERY_ITEMS.length - 1);
    }
  };

  return (
    <div className="accordion-gallery" role="group" aria-label="Evidências visuais do Nocturne Studio">
      {GALLERY_ITEMS.map((item, index) => {
        const active = index === activeIndex;
        return (
          <button
            ref={(element) => {
              panelRefs.current[index] = element;
            }}
            className={`accordion-gallery-panel${active ? " is-active" : ""}`}
            key={item.label}
            type="button"
            tabIndex={0}
            aria-current={active ? "true" : undefined}
            aria-label={`${item.label}: ${item.detail}`}
            onPointerEnter={(event) => {
              if (event.pointerType !== "touch") setActiveIndex(index);
            }}
            onFocus={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(event) => handleKeyDown(index, event)}
          >
            <span
              ref={(element) => {
                mediaRefs.current[index] = element;
              }}
              className="accordion-gallery-panel-stage"
            >
              <span className="gallery-panel-frame" aria-hidden="true">
                <span className="gallery-panel-corner gallery-panel-corner--top" />
                <span className="gallery-panel-corner gallery-panel-corner--bottom" />
                <span className="gallery-panel-label">evidência visual / aguardando fonte</span>
                <span className="gallery-panel-index">{String(index + 1).padStart(2, "0")}</span>
              </span>
              <span className="accordion-gallery-panel-caption">
                <span className="accordion-gallery-panel-index">{String(index + 1).padStart(2, "0")}</span>
                <span
                  ref={(element) => {
                    labelRefs.current[index] = element;
                  }}
                  className="accordion-gallery-panel-label"
                >
                  {item.label}
                </span>
              </span>
              <span className="accordion-gallery-panel-detail">{item.detail}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
