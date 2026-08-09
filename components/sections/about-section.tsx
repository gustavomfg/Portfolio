"use client";

import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/animations/reveal";
import type { TechnicalProfileItem } from "@/types/portfolio";

interface AboutSectionProps {
  profile: readonly TechnicalProfileItem[];
}

export function AboutSection({ profile }: AboutSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const chapterRefs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;

    const chapters = chapterRefs.current.filter((chapter): chapter is HTMLElement => Boolean(chapter));
    if (!chapters.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          const nextIndex = chapters.indexOf(visible.target as HTMLElement);
          if (nextIndex >= 0) setActiveIndex(nextIndex);
        }
      },
      { rootMargin: "-38% 0px -44%", threshold: [0.15, 0.35, 0.65, 0.9] },
    );

    chapters.forEach((chapter) => observer.observe(chapter));
    return () => observer.disconnect();
  }, [profile.length]);

  return (
    <section className="profile-section section-shell" id="perfil" aria-labelledby="profile-title">
      <div className="profile-layout">
        <Reveal className="profile-statement" distance={18}>
          <h2 id="profile-title">Perfil técnico em construção contínua.</h2>
          <p className="profile-lede">
            Registro o que estou construindo, o que já consigo demonstrar e o que ainda precisa evoluir.
          </p>
          <p className="profile-body">
            Aprendo por meio de projetos reais, com atenção às decisões de engenharia, à manutenção e à documentação.
          </p>
          <div className="profile-signature" aria-label="Resumo do registro técnico">
            <span>ENTRADAS ATUAIS</span>
            <strong>{String(profile.length).padStart(2, "0")} / EVOLUÇÃO</strong>
          </div>
        </Reveal>

        <Reveal className="profile-evolution" delay={0.06} distance={18}>
          <div className="profile-rail-heading">
            <span>Onde estou agora</span>
            <span>{String(profile.length).padStart(2, "0")} registros</span>
          </div>
          <ol className="profile-rail" aria-label="Evolução técnica">
            {profile.map((item, index) => (
              <li
                key={item.label}
                ref={(node) => {
                  chapterRefs.current[index] = node;
                }}
                className={`profile-chapter${activeIndex === index ? " is-active" : ""}`}
                aria-current={activeIndex === index ? "step" : undefined}
              >
                <span className="profile-chapter-index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="profile-chapter-content">
                  <p className="profile-chapter-label">{item.label}</p>
                  <h3>{item.value}</h3>
                </div>
                <span className="profile-chapter-mark" aria-hidden="true" />
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </section>
  );
}
