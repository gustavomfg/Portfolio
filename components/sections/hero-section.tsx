import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import { Reveal } from "@/components/animations/reveal";
import { BrandMark } from "@/components/ui/brand-mark";

export function HeroSection() {
  return (
    <section className="hero section-shell" id="inicio">
      <div className="hero-grid">
        <Reveal className="hero-copy" distance={18}>
          <h1>
            Gustavo Maquias
            <span>Desenvolvedor Full Stack em início de carreira.</span>
          </h1>
          <p className="hero-intro">
            Sou estudante de Análise e Desenvolvimento de Sistemas e aprendo construindo software real. Meu foco é evoluir em arquitetura, backend e aplicações web e desktop com responsabilidade e atenção aos detalhes.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#projeto-studio">
              Ver projeto principal <ArrowDown size={17} aria-hidden="true" />
            </a>
            <a className="button button-ghost" href="#contato">
              Entrar em contato <Mail size={17} aria-hidden="true" />
            </a>
          </div>
          <nav className="hero-links" aria-label="Links profissionais">
            <a href="https://github.com/gustavomfg" target="_blank" rel="noreferrer">
              GitHub <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <a href="https://www.linkedin.com/in/gustavomfg" target="_blank" rel="noreferrer">
              LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
            </a>
            <span className="hero-link-pending" title="O arquivo do currículo ainda não está disponível neste projeto">
              Currículo <small>arquivo pendente</small>
            </span>
          </nav>
          <dl className="hero-facts" aria-label="Resumo profissional">
            <div><dt>Formação</dt><dd>ADS</dd></div>
            <div><dt>Direção</dt><dd>Java</dd></div>
            <div><dt>Construção</dt><dd>Web &amp; desktop</dd></div>
          </dl>
        </Reveal>

        <Reveal className="hero-signature" delay={0.08} distance={12}>
          <div className="hero-signature-orbit" aria-hidden="true" />
          <BrandMark />
          <p>Projetos reais.<br />Aprendizado contínuo.</p>
        </Reveal>
      </div>
    </section>
  );
}
