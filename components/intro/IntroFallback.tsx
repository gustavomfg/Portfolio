import { IntroMark2D } from "@/components/intro/IntroMark2D";
import type { IntroPhase } from "@/lib/intro-timeline";

interface IntroFallbackProps {
  phase: IntroPhase;
}

export function IntroFallback({ phase }: IntroFallbackProps) {
  return <IntroMark2D phase={phase} />;
}
