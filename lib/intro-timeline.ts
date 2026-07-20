export const INTRO_SESSION_KEY = "nocturne-intro-viewed";
export const INTRO_DURATION_MS = 5_200;

export type IntroPhase = "dark" | "eclipse" | "welcome" | "hold" | "depart" | "reveal" | "complete";

const INTRO_STAGES: ReadonlyArray<{ phase: IntroPhase; startsAt: number }> = [
  { phase: "dark", startsAt: 0 },
  { phase: "eclipse", startsAt: 520 },
  { phase: "welcome", startsAt: 1_850 },
  { phase: "hold", startsAt: 2_850 },
  { phase: "depart", startsAt: 4_100 },
  { phase: "reveal", startsAt: 4_650 },
  { phase: "complete", startsAt: INTRO_DURATION_MS },
];

export function getIntroPhase(elapsedMs: number): IntroPhase {
  for (let index = INTRO_STAGES.length - 1; index >= 0; index -= 1) {
    const stage = INTRO_STAGES[index];
    if (stage && elapsedMs >= stage.startsAt) return stage.phase;
  }

  return "dark";
}
