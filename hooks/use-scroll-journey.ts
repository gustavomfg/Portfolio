"use client";

import { type RefObject, useEffect } from "react";

import { getNocturneJourneyFrame } from "@/lib/nocturne-director";

interface UseScrollJourneyOptions {
  sectionRef: RefObject<HTMLElement | null>;
}

export function useScrollJourney({
  sectionRef,
}: UseScrollJourneyOptions): void {
  useEffect(() => {
    const section = sectionRef.current;

    if (!section) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let animationFrameId: number | null = null;
    let isJourneyVisible = true;

    const updateProgress = () => {
      animationFrameId = null;

      const sectionRect = section.getBoundingClientRect();
      const scrollableDistance = section.offsetHeight - window.innerHeight;
      const progress = scrollableDistance <= 0
        ? 0
        : Math.min(1, Math.max(0, -sectionRect.top / scrollableDistance));
      const frame = getNocturneJourneyFrame(progress);

      section.style.setProperty("--journey-progress", progress.toString());
      section.style.setProperty("--eclipse-opacity", frame.eclipseOpacity.toString());
      section.style.setProperty("--eclipse-approach", frame.eclipseApproach.toString());
      section.style.setProperty("--orbit-opacity", frame.orbitOpacity.toString());
      section.style.setProperty("--welcome-opacity", frame.welcomeOpacity.toString());
      section.style.setProperty("--welcome-translate-y", `${frame.welcomeTranslateY}px`);
      section.style.setProperty("--identity-opacity", frame.identityOpacity.toString());
      section.style.setProperty("--identity-translate-y", `${frame.identityTranslateY}px`);
      section.style.setProperty("--identity-clip", `${frame.identityClip}%`);
      section.style.setProperty("--identity-glow", frame.identityGlow.toString());
      section.style.setProperty("--journey-bridge-opacity", frame.journeyBridgeOpacity.toString());
    };

    const scheduleUpdate = () => {
      if (!isJourneyVisible || animationFrameId !== null) {
        return;
      }

      animationFrameId = window.requestAnimationFrame(updateProgress);
    };

    const observer = new IntersectionObserver(([entry]) => {
      isJourneyVisible = entry.isIntersecting;
      section.dataset.journeyActive = isJourneyVisible.toString();

      if (isJourneyVisible) {
        scheduleUpdate();
      }
    });

    updateProgress();
    observer.observe(section);

    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      observer.disconnect();
      delete section.dataset.journeyActive;
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);

      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [sectionRef]);
}
