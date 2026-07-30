import { ArrowRight, Braces, Check } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Capability } from "@/types/portfolio";

interface AboutSectionProps {
  capabilities: readonly Capability[];
}

const principles = [
  ["01", "Construir software com propósito"],
  ["02", "Arquitetura antes da complexidade"],
  ["03", "Documentação como parte do produto"],
  ["04", "Segurança desde o início"],
] as const;

export function AboutSection({ capabilities }: AboutSectionProps) {
  return (
    <section className="about section-shell" id="sobre">
      <Reveal className="about-intro">
        <SectionHeading eyebrow="Sobre mim" title="Aprendo construindo projetos reais." />
      </Reveal>
      <div className="about-grid">
        <Reveal className="about-statement" distance={18}>
          <p>
            Gosto de entender <em>como o software é pensado</em> antes de partir para a implementação.
          </p>
          <p>
            Em cada projeto, exploro arquitetura, aplicações desktop, ferramentas para desenvolvedores e tecnologias web enquanto fortaleço meus fundamentos de engenharia.
          </p>
          <a href="#jornada">Conhecer minha trajetória <ArrowRight size={17} /></a>
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
