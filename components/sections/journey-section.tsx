import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { TimelineItem } from "@/types/portfolio";

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
          const Icon = item.icon;
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
