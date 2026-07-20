import type { IntroPhase } from "@/lib/intro-timeline";

interface IntroOverlayProps {
  phase: IntroPhase;
}

export function IntroOverlay({ phase }: IntroOverlayProps) {
  return (
    <div className="intro-overlay" data-phase={phase}>
      <p className="intro-welcome" aria-live="polite">
        Bem-vindo
      </p>
    </div>
  );
}
