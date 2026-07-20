"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { IntroFallback } from "@/components/intro/IntroFallback";
import { IntroOverlay } from "@/components/intro/IntroOverlay";
import { useIntroSession } from "@/hooks/use-intro-session";
import { useWebGLSupport } from "@/hooks/use-webgl-support";
import { getIntroPhase, type IntroPhase } from "@/lib/intro-timeline";

const NocturneScene = dynamic(() => import("@/components/intro/NocturneScene"), {
  ssr: false,
  loading: () => null,
});

export function NocturneIntro() {
  const { sessionState, completeIntro } = useIntroSession();
  const webGLSupported = useWebGLSupport();
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<IntroPhase>("core");
  const [pageVisible, setPageVisible] = useState(true);
  const skipRequested = useRef(false);
  const shouldPlay = sessionState === "play" && !reduceMotion;

  const requestSkip = useCallback(() => {
    skipRequested.current = true;
  }, []);

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
    let currentPhase: IntroPhase = "core";

    const handleVisibility = () => {
      previousTime = performance.now();
      setPageVisible(!document.hidden);
    };

    const tick = (time: number) => {
      const delta = Math.min(time - previousTime, 64);
      previousTime = time;

      if (!document.hidden) elapsedMs += delta;
      if (skipRequested.current) elapsedMs = Math.max(elapsedMs, 3_500);

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
    animationFrame = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [completeIntro, shouldPlay]);

  if (sessionState === "checking") {
    return <div className="nocturne-intro intro-gate" aria-hidden="true" />;
  }

  if (!shouldPlay) return null;

  return (
    <motion.div className="nocturne-intro" data-phase={phase} initial={false}>
      <motion.div
        className="intro-veil"
        initial={false}
        animate={{ opacity: phase === "reveal" || phase === "complete" ? 0 : 1 }}
        transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      />
      {webGLSupported === true ? (
        <NocturneScene phase={phase} active={pageVisible} />
      ) : (
        <IntroFallback phase={phase} />
      )}
      <IntroOverlay phase={phase} onSkip={requestSkip} />
    </motion.div>
  );
}
