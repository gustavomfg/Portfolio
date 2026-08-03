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
        <SectionHeading eyebrow="Sobre mim" title="Formação técnica guiada pela prática." />
      </Reveal>
      <div className="about-grid">
        <Reveal className="about-statement" distance={18}>
          <p>
            Acredito que desenvolver software vai além de escrever código. Por isso, procuro entender <em>como cada solução é pensada</em> antes de implementá-la.
          </p>
          <p>
            Uso projetos pessoais para fortalecer meus fundamentos, experimentar tecnologias e evoluir na forma como planejo, organizo, documento e mantenho software ao longo do tempo.
          </p>
          <a href="#jornada">Conhecer minha trajetória <ArrowRight size={17} /></a>
        </Reveal>
        <Reveal className="principles-panel" delay={0.06} distance={18}>
          <div className="panel-top"><span>ENGENHARIA / PRINCÍPIOS</span><Braces size={17} /></div>
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
