import Image from "next/image";
import type { IntroPhase } from "@/lib/intro-timeline";

interface IntroMark2DProps {
  phase: IntroPhase;
}

export function IntroMark2D({ phase }: IntroMark2DProps) {
  return (
    <div className="intro-eclipse" data-phase={phase} aria-hidden="true">
      <span className="intro-eclipse-aura" />
      <Image
        className="intro-eclipse-moon"
        src="/nocturne-eclipse.svg"
        alt=""
        width={512}
        height={512}
        priority
      />
    </div>
  );
}
