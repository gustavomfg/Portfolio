"use client";

import { gsap } from "gsap";
import { useCallback, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";

export interface NocturneGalleryItem {
  id: string;
  label: string;
  slot: string;
  detail: string;
  alt: string;
  image: string | null;
}

/**
 * Local evidence slots. Replace `image: null` only with screenshots supplied by the project.
 * Keeping the source data here makes the gallery ready for real artifacts without inventing UI.
 */
export const NOCTURNE_GALLERY_ITEMS: readonly NocturneGalleryItem[] = [
  {
    id: "workspace",
    label: "Workspace",
    slot: "nocturne/workspace",
    detail: "Captura real do workspace ainda pendente nesta base.",
    alt: "Screenshot do workspace do Nocturne Studio, aguardando fonte local",
    image: null,
  },
  {
    id: "review-mode",
    label: "Review Mode",
    slot: "nocturne/review-mode",
    detail: "Captura real do Review Mode ainda pendente nesta base.",
    alt: "Screenshot do Review Mode do Nocturne Studio, aguardando fonte local",
    image: null,
  },
  {
    id: "awareness",
    label: "Awareness / Second Brain",
    slot: "nocturne/awareness-second-brain",
    detail: "Captura real da memória e da awareness ainda pendente nesta base.",
    alt: "Screenshot da Awareness e Second Brain do Nocturne Studio, aguardando fonte local",
    image: null,
  },
  {
    id: "providers",
    label: "Providers",
    slot: "nocturne/providers",
    detail: "Captura real do sistema de providers ainda pendente nesta base.",
    alt: "Screenshot do sistema de providers do Nocturne Studio, aguardando fonte local",
    image: null,
  },
] as const;

const ACTIVE_GROW = 5.5;

export function AccordionGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const mediaRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const labelRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const firstRunRef = useRef(true);

  useLayoutEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setPrefersReducedMotion(mediaQuery.matches);
    syncMotion();
    mediaQuery.addEventListener("change", syncMotion);
    return () => mediaQuery.removeEventListener("change", syncMotion);
  }, []);

  const applyLayout = useCallback((animate: boolean) => {
    const panels = panelRefs.current;
    if (!panels.length) return;

    timelineRef.current?.kill();
    const duration = animate && !prefersReducedMotion ? 0.52 : 0;
    const timeline = gsap.timeline();

    panels.forEach((panel, index) => {
      if (!panel) return;
      const active = index === activeIndex;
      const tilt = active ? 0 : index < activeIndex ? 5 : -5;
      const media = mediaRefs.current[index];
      const label = labelRefs.current[index];
      const drift = Math.max(-1.5, Math.min(1.5, activeIndex - index));

      timeline.to(panel, {
        flexGrow: active ? ACTIVE_GROW : 1,
        rotateY: tilt,
        duration,
        ease: "power3.out",
      }, 0);

      if (media) {
        timeline.to(media, {
          x: active ? 0 : drift * 10,
          scale: active ? 1 : 0.97,
          opacity: active ? 1 : 0.62,
          duration,
          ease: "power3.out",
        }, 0);
      }

      if (label) {
        timeline.to(label, {
          opacity: active ? 1 : 0.72,
          x: active ? 0 : -3,
          duration: duration * 0.75,
          ease: "power2.out",
        }, 0);
      }
    });

    timelineRef.current = timeline;
  }, [activeIndex, prefersReducedMotion]);

  useLayoutEffect(() => {
    const firstRun = firstRunRef.current;
    applyLayout(!firstRun);
    firstRunRef.current = false;
    const root = rootRef.current;
    if (!root || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(() => applyLayout(false));
    observer.observe(root);
    return () => observer.disconnect();
  }, [applyLayout]);

  const moveTo = (index: number) => {
    setActiveIndex(index);
    window.requestAnimationFrame(() => panelRefs.current[index]?.focus());
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      moveTo((index + 1) % NOCTURNE_GALLERY_ITEMS.length);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      moveTo((index - 1 + NOCTURNE_GALLERY_ITEMS.length) % NOCTURNE_GALLERY_ITEMS.length);
    } else if (event.key === "Home") {
      event.preventDefault();
      moveTo(0);
    } else if (event.key === "End") {
      event.preventDefault();
      moveTo(NOCTURNE_GALLERY_ITEMS.length - 1);
    }
  };

  const rootStyle = {
    "--accordion-count": NOCTURNE_GALLERY_ITEMS.length,
  } as CSSProperties;

  return (
    <div
      ref={rootRef}
      className="accordion-gallery"
      style={rootStyle}
      role="tablist"
      aria-label="Evidências visuais do Nocturne Studio"
      aria-orientation="horizontal"
    >
      {NOCTURNE_GALLERY_ITEMS.map((item, index) => {
        const active = index === activeIndex;
        return (
          <button
            ref={(element) => {
              panelRefs.current[index] = element;
            }}
            className={`accordion-gallery-panel${active ? " is-active" : ""}`}
            key={item.id}
            type="button"
            role="tab"
            aria-selected={active}
            aria-controls={`nocturne-gallery-panel-${item.id}`}
            aria-label={`${item.label}: ${item.detail}`}
            tabIndex={active ? 0 : -1}
            onPointerEnter={(event) => {
              if (event.pointerType !== "touch") setActiveIndex(index);
            }}
            onFocus={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
            onKeyDown={(event) => handleKeyDown(index, event)}
          >
            <span ref={(element) => { mediaRefs.current[index] = element; }} className="accordion-gallery-panel-stage" id={`nocturne-gallery-panel-${item.id}`}>
              <span className="gallery-panel-frame">
                {item.image ? (
                  <img className="gallery-panel-image" src={item.image} alt={item.alt} draggable={false} />
                ) : (
                  <span className="gallery-panel-pending">
                    <span className="gallery-panel-pending-kicker">Evidência visual</span>
                    <strong>Screenshot pendente</strong>
                    <span>{item.slot}</span>
                  </span>
                )}
                <span className="gallery-panel-corner gallery-panel-corner--top" aria-hidden="true" />
                <span className="gallery-panel-corner gallery-panel-corner--bottom" aria-hidden="true" />
                <span className="gallery-panel-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              </span>
              <span className="accordion-gallery-panel-caption" aria-hidden="true">
                <span className="accordion-gallery-panel-index">{String(index + 1).padStart(2, "0")}</span>
                <span ref={(element) => { labelRefs.current[index] = element; }} className="accordion-gallery-panel-label">{item.label}</span>
              </span>
              <span className="accordion-gallery-panel-detail">{item.detail}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
