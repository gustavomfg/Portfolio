"use client";

import {
    type RefObject,
    useEffect,
    useState,
} from "react";

interface JourneyProgressProps {
    sectionRef: RefObject<HTMLElement | null>;
}

export function JourneyProgress({
                                    sectionRef,
                                }: JourneyProgressProps) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const section = sectionRef.current;

        if (!section) {
            return;
        }

        const handleProgress = (event: Event) => {
            const customEvent = event as CustomEvent<number>;

            setProgress(customEvent.detail);
        };

        section.addEventListener(
            "nocturne-journey-progress",
            handleProgress,
        );

        return () => {
            section.removeEventListener(
                "nocturne-journey-progress",
                handleProgress,
            );
        };
    }, [sectionRef]);

    return (
        <div className="journey-progress">
            <span>Progress</span>

            <strong>{progress.toFixed(2)}</strong>
        </div>
    );
}