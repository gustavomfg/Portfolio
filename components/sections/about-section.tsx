import { Reveal } from "@/components/animations/reveal";
import type { TechnicalProfileItem } from "@/types/portfolio";

interface AboutSectionProps {
  profile: readonly TechnicalProfileItem[];
}

const principles = [
  "Construir software com propósito",
  "Arquitetura antes da complexidade",
  "Documentação como parte do produto",
  "Segurança desde o início",
] as const;

export function AboutSection({ profile }: AboutSectionProps) {
  return (
    <section className="profile-section section-shell" id="perfil">
      <Reveal className="profile-heading" distance={18}>
        <h2>Perfil técnico em construção contínua.</h2>
        <p>
          Aprendo construindo, revisando decisões e registrando o que ainda precisa evoluir. O objetivo é transformar cada projeto em prática verificável, não em uma lista de promessas.
        </p>
      </Reveal>

      <div className="profile-grid">
        <Reveal className="profile-copy" distance={18}>
          <p>
            Desenvolver software vai além de escrever código. Procuro entender como cada solução é pensada, quais restrições existem e o que precisa ficar claro para quem vai mantê-la depois.
          </p>
          <p>
            Meus projetos pessoais são o principal espaço para fortalecer fundamentos, experimentar tecnologias e evoluir na forma como planejo, organizo, documento e mantenho software ao longo do tempo.
          </p>
          <ul className="profile-principles" aria-label="Princípios de trabalho">
            {principles.map((principle) => <li key={principle}>{principle}</li>)}
          </ul>
        </Reveal>
        <Reveal className="profile-record" delay={0.06} distance={18}>
          <h3>Onde estou agora</h3>
          <dl>
            {profile.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
