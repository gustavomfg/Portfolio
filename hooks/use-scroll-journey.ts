"use client";

import { type RefObject, useEffect } from "react";

interface UseScrollJourneyOptions {
    sectionRef: RefObject<HTMLElement | null>;
}

import { getNocturneJourneyFrame, } from "@/lib/nocturne-director";

export function useScrollJourney({
                                     sectionRef,
                                 }: UseScrollJourneyOptions): void {
    useEffect(() => {
        const section = sectionRef.current;

        if (!section) {
            return;
        }

        let animationFrameId: number | null = null;

        const updateProgress = () => {
            animationFrameId = null;

            const sectionRect = section.getBoundingClientRect();
            const scrollableDistance =
                section.offsetHeight - window.innerHeight;

            const progress =
                scrollableDistance <= 0
                    ? 0
                    : Math.min(
                        1,
                        Math.max(
                            0,
                            -sectionRect.top / scrollableDistance,
                        ),
                    );

            const frame =
                getNocturneJourneyFrame(progress);

            section.style.setProperty(
                "--journey-progress",
                progress.toString(),
            );

            section.style.setProperty(
                "--welcome-opacity",
                frame.welcomeOpacity.toString(),
            );

            section.style.setProperty(
                "--welcome-translate-y",
                `${frame.welcomeTranslateY}px`,
            );

            section.dispatchEvent(
                new CustomEvent<number>(
                    "nocturne-journey-progress",
                    {
                        detail: progress,
                    },
                ),
            );
        };

        const scheduleUpdate = () => {
            if (animationFrameId !== null) {
                return;
            }

            animationFrameId =
                window.requestAnimationFrame(updateProgress);
        };

        updateProgress();

        window.addEventListener("scroll", scheduleUpdate, {
            passive: true,
        });

        window.addEventListener("resize", scheduleUpdate);

        return () => {
            window.removeEventListener(
                "scroll",
                scheduleUpdate,
            );

            window.removeEventListener(
                "resize",
                scheduleUpdate,
            );

            if (animationFrameId !== null) {
                window.cancelAnimationFrame(animationFrameId);
            }
        };
    }, [sectionRef]);
}