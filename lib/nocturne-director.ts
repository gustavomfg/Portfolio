import {
    easeInOutCubic,
    mapRange,
} from "@/lib/nocturne-journey";

export interface NocturneJourneyFrame {
    welcomeOpacity: number;
    welcomeTranslateY: number;
}

export function getNocturneJourneyFrame(
    progress: number,
): NocturneJourneyFrame {
    const welcomeExitProgress = mapRange(
        progress,
        0.16,
        0.34,
        0,
        1,
    );

    const easedWelcomeExit =
        easeInOutCubic(welcomeExitProgress);

    return {
        welcomeOpacity: 1 - easedWelcomeExit,

        welcomeTranslateY: mapRange(
            easedWelcomeExit,
            0,
            1,
            0,
            -24,
        ),
    };
}