"use client";

import { useRef } from "react";

import { useScrollJourney } from "@/hooks/use-scroll-journey";

import { JourneyProgress } from "./JourneyProgress";

export function NocturneJourney() {
    const sectionRef = useRef<HTMLElement | null>(null);

    useScrollJourney({
        sectionRef,
    });

    return (
        <section
            ref={sectionRef}
            className="journey"
        >
            <div className="journey-stage">
                <JourneyProgress sectionRef={sectionRef} />
            </div>
        </section>
    );
}