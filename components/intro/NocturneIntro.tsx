"use client";

import { useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { IntroMark2D } from "@/components/intro/IntroMark2D";
import { IntroOverlay } from "@/components/intro/IntroOverlay";
import { useIntroSession } from "@/hooks/use-intro-session";
import { getIntroPhase, type IntroPhase } from "@/lib/intro-timeline";

export function NocturneIntro() {
  const { sessionState, completeIntro } = useIntroSession();
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<IntroPhase>("dark");
  const skipRequested = useRef(false);
  const shouldPlay = sessionState === "play" && !reduceMotion;

  useEffect(() => {
    if (!shouldPlay) return;

    const portfolio = document.getElementById("conteudo");
    document.body.classList.add("intro-active");
    portfolio?.setAttribute("inert", "");

    return () => {
      document.body.classList.remove("intro-active");
      portfolio?.removeAttribute("inert");
    };
  }, [shouldPlay]);

  useEffect(() => {
    if (!shouldPlay) return;

    let animationFrame = 0;
    let elapsedMs = 0;
    let previousTime = performance.now();
    let currentPhase: IntroPhase = "dark";

    const handleVisibility = () => {
      previousTime = performance.now();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") skipRequested.current = true;
    };

    const tick = (time: number) => {
      const delta = Math.min(time - previousTime, 64);
      previousTime = time;

      if (!document.hidden) elapsedMs += delta;
      if (skipRequested.current) elapsedMs = Math.max(elapsedMs, 4_350);

      const nextPhase = getIntroPhase(elapsedMs);
      if (nextPhase !== currentPhase) {
        currentPhase = nextPhase;
        setPhase(nextPhase);
      }

      if (nextPhase === "complete") {
        completeIntro();
        return;
      }

      animationFrame = window.requestAnimationFrame(tick);
    };

    document.addEventListener("visibilitychange", handleVisibility);
    document.addEventListener("keydown", handleKeyDown);
    animationFrame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      document.removeEventListener("visibilitychange", handleVisibility);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [completeIntro, shouldPlay]);

  if (sessionState === "checking") {
    return <div className="nocturne-intro intro-gate" aria-hidden="true" />;
  }

  if (!shouldPlay) return null;

  return (
    <div className="nocturne-intro" data-phase={phase}>
      <div className="intro-veil" aria-hidden="true" />
      <IntroMark2D phase={phase} />
      <IntroOverlay phase={phase} />
    </div>
  );
}
