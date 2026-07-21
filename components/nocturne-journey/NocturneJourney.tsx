"use client";

import { useRef } from "react";

import { useScrollJourney } from "@/hooks/use-scroll-journey";
import { EclipseVisual } from "./EclipseVisual";

export function NocturneJourney() {
    const sectionRef = useRef<HTMLElement | null>(null);

    useScrollJourney({ sectionRef });

    return (
        <section
            ref={sectionRef}
            className="journey"
            aria-label="Introdução ao portfólio"
        >
            <div className="journey-stage">
                <div
                    className="journey-atmosphere"
                    aria-hidden="true"
                />

                <div className="journey-eclipse-container">
                    <EclipseVisual />
                </div>

                <div className="journey-welcome">
                    <p className="journey-welcome__eyebrow">
                        Nocturne
                    </p>

                    <h1 className="journey-welcome__title">
                        Bem-vindo.
                    </h1>

                    <p className="journey-welcome__instruction">
                        Role para entrar
                    </p>
                </div>
            </div>
        </section>
    );
}