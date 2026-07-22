import { ArrowRight, Braces, Check } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Capability } from "@/types/portfolio";

interface AboutSectionProps {
  capabilities: readonly Capability[];
}

const principles = [
  ["01", "Entender antes de construir"],
  ["02", "Evidência antes de suposição"],
  ["03", "Clareza antes de complexidade"],
  ["04", "Identidade em cada detalhe"],
] as const;

export function AboutSection({ capabilities }: AboutSectionProps) {
  return (
    <section className="about section-shell" id="sobre">
      <Reveal className="about-intro">
        <SectionHeading eyebrow="Sobre mim" title="Construir é a minha forma de aprender." />
      </Reveal>
      <div className="about-grid">
        <Reveal className="about-statement" distance={18}>
          <p>
            Gosto de entender <em>por que</em> sistemas funcionam antes de decidir <em>como</em> construí-los.
          </p>
          <p>
            Minha prática combina engenharia, design de interfaces e pensamento de produto para criar soluções coerentes — por dentro e por fora.
          </p>
          <a href="#contato">Mais sobre minha trajetória <ArrowRight size={17} /></a>
        </Reveal>
        <Reveal className="principles-panel" delay={0.06} distance={18}>
          <div className="panel-top"><span>NOCTURNE / PRINCIPLES</span><Braces size={17} /></div>
          {principles.map(([number, principle]) => (
            <div className="principle" key={number}>
              <span>{number}</span><p>{principle}</p><Check size={16} />
            </div>
          ))}
        </Reveal>
      </div>
      <div className="capabilities-grid" aria-label="Áreas de atuação">
        {capabilities.map((capability, index) => (
          <Reveal className="capability-card" delay={index * 0.04} distance={16} key={capability.number}>
            <span>{capability.number}</span>
            <h3>{capability.title}</h3>
            <p>{capability.description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
