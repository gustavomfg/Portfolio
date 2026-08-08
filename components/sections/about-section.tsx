import { Reveal } from "@/components/animations/reveal";
import type { TechnicalProfileItem } from "@/types/portfolio";

interface AboutSectionProps {
  profile: readonly TechnicalProfileItem[];
}

export function AboutSection({ profile }: AboutSectionProps) {
  return (
    <section className="profile-section section-shell" id="perfil">
      <Reveal className="profile-heading" distance={18}>
        <h2>Perfil técnico em construção contínua.</h2>
        <p>
          Registro o que estou construindo, o que já consigo demonstrar e o que ainda precisa evoluir.
        </p>
      </Reveal>

      <div className="profile-grid">
        <Reveal className="profile-copy" distance={18}>
          <p>
            Aprendo por meio de projetos reais, com atenção às decisões de engenharia, à manutenção e à documentação.
          </p>
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
