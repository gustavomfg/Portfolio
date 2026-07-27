import { Code2, FileText, Layers3, TerminalSquare } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { TimelineIconKey, TimelineItem } from "@/types/portfolio";

const TIMELINE_ICONS = {
  code: Code2,
  layers: Layers3,
  terminal: TerminalSquare,
  "file-text": FileText,
} satisfies Record<TimelineIconKey, typeof Code2>;

interface JourneySectionProps {
  items: readonly TimelineItem[];
}

export function JourneySection({ items }: JourneySectionProps) {
  return (
    <section className="timeline-section section-shell" id="jornada">
      <Reveal>
        <SectionHeading
          eyebrow="Como eu aprendo"
          title="Evoluir através da prática."
          copy="Em vez de estudar tecnologias de forma isolada, prefiro criar aplicações que me desafiem a compreender arquitetura, fluxos de trabalho e decisões de engenharia."
        />
      </Reveal>
      <div className="timeline">
        {items.map((item, index) => {
          const Icon = TIMELINE_ICONS[item.icon];
          return (
            <Reveal className="timeline-item" delay={index * 0.05} distance={16} key={item.year}>
              <span className="timeline-marker"><Icon size={18} /></span>
              <small>{item.year} / 0{index + 1}</small>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
