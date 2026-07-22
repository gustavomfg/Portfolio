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
