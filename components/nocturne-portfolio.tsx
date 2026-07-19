"use client";

import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Braces,
  BrainCircuit,
  Check,
  ChevronRight,
  Code2,
  Layers3,
  Mail,
  Menu,
  Radar,
  ScanSearch,
  TerminalSquare,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Ecossistema", href: "#ecossistema" },
  { label: "Sobre", href: "#sobre" },
  { label: "Jornada", href: "#jornada" },
  { label: "Contato", href: "#contato" },
];

const projects = [
  {
    id: "01",
    key: "inspector",
    name: "Nocturne Inspector",
    role: "Engineering Intelligence",
    description:
      "Observa projetos, reúne evidências e transforma complexidade em inteligência de engenharia confiável.",
    tags: ["Python", "Analysis", "Read-only"],
    icon: ScanSearch,
    accent: "violet",
  },
  {
    id: "02",
    key: "codex",
    name: "Nocturne Codex",
    role: "Engineering Execution",
    description:
      "Organiza contexto, decisões e planos para transformar entendimento em mudanças claras e validadas.",
    tags: ["Electron", "React", "IPC"],
    icon: BrainCircuit,
    accent: "blue",
  },
  {
    id: "03",
    key: "control",
    name: "Nocturne Control",
    role: "Visual Systems",
    description:
      "Explora interfaces, componentes e experiências de controle dentro da identidade visual Nocturne.",
    tags: ["Web", "Interface", "Systems"],
    icon: Radar,
    accent: "cyan",
  },
] as const;

const stack = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Electron",
  "Python",
  "Rust",
  "Tailwind",
];

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span />
      <span />
      <span />
    </span>
  );
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy?: string;
}) {
  return (
    <div className="section-heading">
      <p className="eyebrow"><span>+</span>{eyebrow}</p>
      <h2>{title}</h2>
      {copy && <p className="section-copy">{copy}</p>}
    </div>
  );
}

export function NocturnePortfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(1);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener("resize", closeMenu);
    return () => window.removeEventListener("resize", closeMenu);
  }, []);

  return (
    <main>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="Nocturne, voltar ao início">
          <BrandMark />
          <span className="brand-copy">
            <strong>NOCTURNE</strong>
            <small>FULL STACK DEVELOPER</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>{item.label}</a>
          ))}
        </nav>

        <a className="availability" href="#contato">
          <span className="availability-dot" />
          Disponível para conversar
          <ArrowUpRight size={15} />
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              className="mobile-nav"
              aria-label="Navegação móvel"
              initial={reduceMotion ? false : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {navItems.map((item) => (
                <a href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>
                  {item.label}<ArrowUpRight size={17} />
                </a>
              ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <section className="hero section-shell" id="inicio">
        <div className="hero-grid">
          <motion.div
            className="hero-copy"
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="hero-kicker"><span className="prompt-sign">~/</span> portfólio / 2026</p>
            <h1>
              Desenvolvedor Full Stack.
              <span>Criando o ecossistema Nocturne.</span>
            </h1>
            <p className="hero-intro">
              Trabalho com TypeScript, React, Electron, Python e Rust. Aqui reúno os projetos, as decisões e o que aprendi construindo cada um.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#ecossistema">
                Explorar ecossistema <ArrowDown size={17} />
              </a>
              <a className="button button-ghost" href="#sobre">
                Conhecer meu trabalho <ArrowRight size={17} />
              </a>
            </div>
            <div className="hero-meta" aria-label="Resumo profissional">
              <div><strong>03</strong><span>produtos Nocturne</span></div>
              <div><strong>Full Stack</strong><span>software e interface</span></div>
              <div><strong>BR / remoto</strong><span>base de trabalho</span></div>
            </div>
          </motion.div>

          <motion.div
            className="system-visual"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.18, duration: 0.9 }}
            aria-label="Fluxo do ecossistema Nocturne"
          >
            <div className="visual-grid" />
            <div className="visual-orbit orbit-one" />
            <div className="visual-orbit orbit-two" />
            <div className="core-mark"><BrandMark /></div>
            <div className="signal-line signal-one" />
            <div className="signal-line signal-two" />
            <div className="signal-line signal-three" />
            {projects.map((project, index) => {
              const Icon = project.icon;
              return (
                <button
                  className={`system-node node-${index + 1} ${activeProject === index ? "is-active" : ""}`}
                  key={project.key}
                  type="button"
                  onClick={() => setActiveProject(index)}
                  aria-label={`Destacar ${project.name}`}
                >
                  <span className="node-icon"><Icon size={18} /></span>
                  <span><small>0{index + 1}</small>{project.name.replace("Nocturne ", "")}</span>
                </button>
              );
            })}
            <div className="system-status"><span /> SYSTEMS CONNECTED</div>
          </motion.div>
        </div>

        <div className="featured-rail" aria-label="Projetos em destaque">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <button
                type="button"
                key={project.key}
                className={`featured-mini ${activeProject === index ? "is-active" : ""}`}
                onClick={() => setActiveProject(index)}
              >
                <span className="featured-number">{project.id}</span>
                <Icon size={19} />
                <span><small>{project.role}</small><strong>{project.name}</strong></span>
                <ChevronRight className="featured-arrow" size={18} />
              </button>
            );
          })}
        </div>
      </section>

      <section className="ecosystem section-shell" id="ecossistema">
        <Reveal>
          <SectionHeading
            eyebrow="Ecossistema Nocturne"
            title="O núcleo do Nocturne."
            copy="Três projetos independentes que compartilham contexto, princípios de engenharia e uma mesma identidade."
          />
        </Reveal>

        <div className="project-list">
          {projects.map((project, index) => {
            const Icon = project.icon;
            return (
              <Reveal key={project.key}>
                <article className={`project-card project-${project.accent}`}>
                  <div className="project-index">{project.id}<span>/03</span></div>
                  <div className="project-icon"><Icon size={28} strokeWidth={1.6} /></div>
                  <div className="project-content">
                    <p>{project.role}</p>
                    <h3>{project.name}</h3>
                    <span>{project.description}</span>
                  </div>
                  <div className="project-tags">
                    {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                  </div>
                  <button className="project-link" type="button" aria-label={`Ver detalhes de ${project.name}`}>
                    <ArrowUpRight size={21} />
                  </button>
                  {index < projects.length - 1 && (
                    <div className="flow-label"><span />{index === 0 ? "INFORMS" : "EXPRESSES"}<span /></div>
                  )}
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="about section-shell" id="sobre">
        <Reveal className="about-intro">
          <SectionHeading eyebrow="Sobre mim" title="Construir é a minha forma de aprender." />
        </Reveal>
        <div className="about-grid">
          <Reveal className="about-statement">
            <p>
              Gosto de entender <em>por que</em> sistemas funcionam antes de decidir <em>como</em> construí-los.
            </p>
            <p>
              Minha prática combina engenharia, design de interfaces e pensamento de produto para criar soluções coerentes — por dentro e por fora.
            </p>
            <a href="#contato">Mais sobre minha trajetória <ArrowRight size={17} /></a>
          </Reveal>
          <Reveal className="principles-panel">
            <div className="panel-top"><span>NOCTURNE / PRINCIPLES</span><Braces size={17} /></div>
            {[
              ["01", "Entender antes de construir"],
              ["02", "Evidência antes de suposição"],
              ["03", "Clareza antes de complexidade"],
              ["04", "Identidade em cada detalhe"],
            ].map(([number, principle]) => (
              <div className="principle" key={number}>
                <span>{number}</span><p>{principle}</p><Check size={16} />
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="stack-section" aria-label="Tecnologias">
        <div className="stack-track">
          {[...stack, ...stack].map((item, index) => (
            <span key={`${item}-${index}`}><i />{item}</span>
          ))}
        </div>
      </section>

      <section className="journey section-shell" id="jornada">
        <Reveal>
          <SectionHeading
            eyebrow="Jornada"
            title="Até aqui."
            copy="Uma linha simples do que venho estudando, construindo e conectando ao longo do caminho."
          />
        </Reveal>
        <div className="timeline">
          {[
            { year: "BASE", title: "Fundamentos", text: "Web, lógica e a curiosidade de construir ferramentas próprias.", icon: Code2 },
            { year: "EXPAND", title: "Sistemas", text: "Aplicações desktop, Rust, Python e novas camadas de complexidade.", icon: Layers3 },
            { year: "NOW", title: "Nocturne", text: "Um ecossistema que reúne inteligência, execução e experiência visual.", icon: TerminalSquare },
            { year: "NEXT", title: "Próximo capítulo", text: "Produtos mais maduros, colaboração e impacto em problemas reais.", icon: ArrowUpRight },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal className="timeline-item" key={item.year}>
                <span className="timeline-marker"><Icon size={18} /></span>
                <small>{item.year} / 0{index + 1}</small>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="contact section-shell" id="contato">
        <Reveal className="contact-card">
          <div className="contact-glow" />
          <p className="eyebrow"><span>+</span>Vamos conversar</p>
          <h2>Quer conversar sobre<br /><em>algum projeto?</em></h2>
          <p className="contact-copy">Estou aberto a oportunidades e conversas sobre software, produto e tecnologia.</p>
          <div className="contact-actions">
            <a className="button button-light" href="mailto:contato@exemplo.com">Enviar uma mensagem <Mail size={17} /></a>
            <div className="social-links">
              <a href="#" aria-label="GitHub"><span aria-hidden="true">GH</span></a>
              <a href="#" aria-label="LinkedIn"><span aria-hidden="true">in</span></a>
            </div>
          </div>
        </Reveal>
      </section>

      <footer className="site-footer section-shell">
        <div className="footer-brand"><BrandMark /><span>NOCTURNE</span></div>
        <p>Projetado e construído com intenção.</p>
        <a href="#inicio">Voltar ao topo <ArrowUpRight size={15} /></a>
      </footer>
    </main>
  );
}
