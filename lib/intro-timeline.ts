export const INTRO_SESSION_KEY = "nocturne-intro-viewed";
export const INTRO_DURATION_MS = 4_500;

export type IntroPhase =
  | "core"
  | "orbit"
  | "identity"
  | "initialized"
  | "settle"
  | "collapse"
  | "text-exit"
  | "veil"
  | "reveal"
  | "complete";

const INTRO_STAGES: ReadonlyArray<{ phase: IntroPhase; startsAt: number }> = [
  { phase: "core", startsAt: 0 },
  { phase: "orbit", startsAt: 650 },
  { phase: "identity", startsAt: 1_500 },
  { phase: "initialized", startsAt: 2_500 },
  { phase: "settle", startsAt: 3_250 },
  { phase: "collapse", startsAt: 3_500 },
  { phase: "text-exit", startsAt: 3_820 },
  { phase: "veil", startsAt: 4_050 },
  { phase: "reveal", startsAt: 4_150 },
  { phase: "complete", startsAt: INTRO_DURATION_MS },
];

export function getIntroPhase(elapsedMs: number): IntroPhase {
  for (let index = INTRO_STAGES.length - 1; index >= 0; index -= 1) {
    const stage = INTRO_STAGES[index];
    if (stage && elapsedMs >= stage.startsAt) return stage.phase;
  }

  return "core";
}
