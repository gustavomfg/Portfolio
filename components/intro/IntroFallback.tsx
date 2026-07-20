import { BrandMark } from "@/components/ui/brand-mark";
import type { IntroPhase } from "@/lib/intro-timeline";

interface IntroFallbackProps {
  phase: IntroPhase;
}

export function IntroFallback({ phase }: IntroFallbackProps) {
  return (
    <div className="intro-fallback" data-phase={phase} aria-hidden="true">
      <span className="intro-fallback-ring fallback-ring-one" />
      <span className="intro-fallback-ring fallback-ring-two" />
      <span className="intro-fallback-ring fallback-ring-three" />
      <span className="intro-fallback-core"><BrandMark /></span>
      <span className="intro-fallback-pulse" />
    </div>
  );
}
