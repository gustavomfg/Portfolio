"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Reveal } from "@/components/animations/reveal";
import { useHydrated } from "@/hooks/use-hydrated";
import type { TechnicalProfileItem } from "@/types/portfolio";

interface AboutSectionProps {
  profile: readonly TechnicalProfileItem[];
}

export function AboutSection({ profile }: AboutSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hydrated = useHydrated();
  const reduceMotion = useReducedMotion();
  const activeIndexRef = useRef(0);
  const railShellRef = useRef<HTMLDivElement | null>(null);
  const nodeRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const cursorRef = useRef<HTMLSpanElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const geometryRef = useRef({ firstNodeY: 0, lastNodeY: 0, nodeCenters: [] as number[], dirty: true });

  useEffect(() => {
    const railShell = railShellRef.current;
    const cursor = cursorRef.current;
    if (!railShell || !cursor) return;

    const measureGeometry = () => {
      const railRect = railShell.getBoundingClientRect();
      const nodeCenters = nodeRefs.current
        .filter((node): node is HTMLSpanElement => Boolean(node))
        .map((node) => {
          const nodeRect = node.getBoundingClientRect();
          return nodeRect.top + nodeRect.height / 2 - railRect.top;
        });

      if (nodeCenters.length < 2) return;

      geometryRef.current = {
        firstNodeY: nodeCenters[0],
        lastNodeY: nodeCenters[nodeCenters.length - 1],
        nodeCenters,
        dirty: false,
      };
    };

    const updateCursor = () => {
      if (geometryRef.current.dirty) measureGeometry();

      const { firstNodeY, lastNodeY, nodeCenters } = geometryRef.current;
      if (nodeCenters.length < 2) return;

      const railTop = railShell.getBoundingClientRect().top;
      const focusY = Math.min(window.innerHeight * 0.46, window.innerHeight - 96);
      const travel = lastNodeY - firstNodeY;
      const progress = Math.min(Math.max((focusY - railTop - firstNodeY) / travel, 0), 1);
      const cursorY = firstNodeY + progress * travel;

      cursor.style.transform = `translate3d(0, ${cursorY - cursor.offsetHeight / 2}px, 0)`;

      const nearestIndex = nodeCenters.reduce(
        (closest, nodeY, index) =>
          Math.abs(nodeY - cursorY) < Math.abs(nodeCenters[closest] - cursorY) ? index : closest,
        0,
      );

      if (nearestIndex !== activeIndexRef.current) {
        activeIndexRef.current = nearestIndex;
        setActiveIndex(nearestIndex);
      }
    };

    const scheduleUpdate = () => {
      if (frameRef.current !== null) return;

      frameRef.current = window.requestAnimationFrame(() => {
        frameRef.current = null;
        updateCursor();
      });
    };

    const invalidateGeometry = () => {
      geometryRef.current.dirty = true;
      scheduleUpdate();
    };

    measureGeometry();
    updateCursor();

    const resizeObserver = "ResizeObserver" in window ? new ResizeObserver(invalidateGeometry) : null;
    resizeObserver?.observe(railShell);
    nodeRefs.current.forEach((node) => node && resizeObserver?.observe(node));
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", invalidateGeometry);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", invalidateGeometry);
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    };
  }, [profile.length, hydrated, reduceMotion]);

  return (
    <section className="profile-section section-shell" id="perfil" aria-labelledby="profile-title">
      <div className="profile-layout">
        <Reveal className="profile-statement" distance={18}>
          <h2 id="profile-title">Aprendizado em prática.</h2>
          <p className="profile-lede">
            Registro o que estou construindo, o que já consigo demonstrar e o que ainda precisa evoluir.
          </p>
          <p className="profile-body">
            Aprendo por meio de projetos reais, com atenção às decisões de engenharia, à manutenção e à documentação.
          </p>

        </Reveal>

        <Reveal className="profile-evolution" delay={0.06} distance={18}>
          <div className="profile-rail-heading">
            <span>Onde estou agora</span>
            <span>{String(profile.length).padStart(2, "0")} registros</span>
          </div>
          <div className="profile-rail-shell" ref={railShellRef}>
            <ol className="profile-rail" aria-label="Evolução técnica">
              {profile.map((item, index) => (
                <li
                  key={item.label}
                  className={`profile-chapter ${
                    activeIndex === index ? "is-active" : index < activeIndex ? "is-reached" : "is-future"
                  }`}
                  aria-current={activeIndex === index ? "step" : undefined}
                >
                  <span className="profile-chapter-index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="profile-chapter-content">
                    <p className="profile-chapter-label">{item.label}</p>
                    <h3>{item.value}</h3>
                  </div>
                  <span
                    ref={(node) => {
                      nodeRefs.current[index] = node;
                    }}
                    className="profile-chapter-mark"
                    aria-hidden="true"
                  />
                </li>
              ))}
            </ol>
            <span
              className="profile-rail-cursor"
              aria-hidden="true"
              ref={cursorRef}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
