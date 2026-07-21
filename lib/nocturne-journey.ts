export function clamp(
    value: number,
    minimum = 0,
    maximum = 1,
): number {
    return Math.min(maximum, Math.max(minimum, value));
}

export function mapRange(
    value: number,
    inputStart: number,
    inputEnd: number,
    outputStart: number,
    outputEnd: number,
): number {
    if (inputStart === inputEnd) {
        return outputEnd;
    }

    const normalized = clamp(
        (value - inputStart) / (inputEnd - inputStart),
    );

    return (
        outputStart +
        normalized * (outputEnd - outputStart)
    );
}

export function easeInOutCubic(value: number): number {
    const progress = clamp(value);

    return progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
}

export const nocturneJourneyTimeline = {
    welcome: {
        enterStart: 0,
        enterEnd: 0.08,
        exitStart: 0.16,
        exitEnd: 0.3,
    },

    eclipse: {
        approachStart: 0.08,
        approachEnd: 0.65,
        initialScale: 0.75,
        finalScale: 1.3,
        fadeStart: 0.65,
        fadeEnd: 0.9,
    },

    nocturneTitle: {
        enterStart: 0.34,
        enterEnd: 0.5,
        exitStart: 0.68,
        exitEnd: 0.82,
    },

    hero: {
        enterStart: 0.78,
        enterEnd: 0.96,
    },
} as const;