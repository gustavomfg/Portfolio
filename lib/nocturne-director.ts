import {
    easeInOutCubic,
    mapRange,
} from "@/lib/nocturne-journey";

export interface NocturneJourneyFrame {
    welcomeOpacity: number;
    welcomeTranslateY: number;

    eclipseOpacity: number;

    identityOpacity: number;
    identityTranslateY: number;
    identityClip: number;
    identityGlow: number;
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

    const identityEnterProgress = mapRange(
        progress,
        0.43,
        0.61,
        0,
        1,
    );

    const easedIdentityEnter =
        easeInOutCubic(identityEnterProgress);

    const easedWelcomeExit =
        easeInOutCubic(welcomeExitProgress);

    const eclipseFadeProgress = mapRange(
        progress,
        0.65,
        0.9,
        0,
        1,
    );

    return {
        welcomeOpacity: 1 - easedWelcomeExit,

        eclipseOpacity: 1 - easeInOutCubic(eclipseFadeProgress),

        welcomeTranslateY: mapRange(
            easedWelcomeExit,
            0,
            1,
            0,
            -24,
        ),

        identityOpacity: easedIdentityEnter,

        identityTranslateY: mapRange(
            easedIdentityEnter,
            0,
            1,
            32,
            0,
        ),

        identityClip: mapRange(
            easedIdentityEnter,
            0,
            1,
            100,
            0,
        ),

        identityGlow:
            identityEnterProgress > 0 && identityEnterProgress < 1
                ? Math.sin(identityEnterProgress * Math.PI)
                : 0,
    };
}