import type { IntroPhase } from "@/lib/intro-timeline";

interface IntroMark2DProps {
  phase: IntroPhase;
  canvasReady?: boolean;
}

export function IntroMark2D({ phase, canvasReady = false }: IntroMark2DProps) {
  return (
    <div
      className={`intro-mark-2d${canvasReady ? " is-canvas-ready" : ""}`}
      data-phase={phase}
      aria-hidden="true"
    >
      <span className="intro-mark-ring intro-mark-ring-outer" />
      <span className="intro-mark-ring intro-mark-ring-inner" />
      <span className="intro-mark-crescent" />
    </div>
  );
}
