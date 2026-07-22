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
          eyebrow="Jornada"
          title="Até aqui."
          copy="Uma linha simples do que venho estudando, construindo e conectando ao longo do caminho."
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
