import type { Capability, NavItem, Project, TimelineItem } from "@/types/portfolio";

export const NAV_ITEMS = [
  { label: "Projetos", href: "#ecossistema" },
  { label: "Sobre", href: "#sobre" },
  { label: "Jornada", href: "#jornada" },
  { label: "Contato", href: "#contato" },
] as const satisfies readonly NavItem[];

export const PROJECTS = [
  {
    id: "01",
    key: "studio",
    name: "Nocturne Studio",
    role: "Engenharia de software com IA",
    description:
      "Projeto desktop em que exploro inteligência artificial aplicada a fluxos de engenharia orientados pelo contexto de cada workspace.",
    tags: ["Electron", "React", "AI"],
    status: "Em desenvolvimento",
    problem:
      "Investigar como memória, contexto e decisões técnicas podem permanecer conectados durante o desenvolvimento de um projeto.",
    highlights: [
      "Memória de workspace e Second Brain",
      "Review Mode e suporte a múltiplos provedores",
      "Arquitetura Electron segura e documentação contínua",
    ],
    links: [
      {
        label: "Ver código-fonte",
        href: "https://github.com/gustavomfg/nocturne-studio",
        type: "source",
      },
    ],
    icon: "brain-circuit",
    accent: "violet",
  },
  {
    id: "02",
    key: "portfolio",
    name: "Portfolio",
    role: "Portfólio profissional",
    description:
      "Meu portfólio pessoal, criado para apresentar minha trajetória, minhas competências e a evolução dos projetos que desenvolvo.",
    tags: ["Next.js", "React", "TypeScript"],
    status: "Em evolução contínua",
    problem:
      "Comunicar quem sou como desenvolvedor e demonstrar, com clareza, o conhecimento técnico que venho construindo na prática.",
    highlights: [
      "Interface responsiva e acessível",
      "Conteúdo centralizado e fácil de atualizar",
      "Conteúdo orientado à minha identidade profissional",
    ],
    links: [
      {
        label: "Ver código-fonte",
        href: "https://github.com/gustavomfg/Portfolio",
        type: "source",
      },
    ],
    icon: "panels-top-left",
    accent: "blue",
  },
  {
    id: "03",
    key: "inspector",
    name: "Nocturne Inspector",
    role: "Inspeção e validação de projetos",
    description:
      "Projeto de engenharia voltado à inspeção de projetos, validação de arquitetura e criação de ferramentas para desenvolvedores.",
    tags: ["Desktop", "Diagnostics", "Engineering"],
    status: "Em desenvolvimento",
    problem:
      "Transformar análises de estrutura e arquitetura em informações úteis para compreender e aprimorar projetos de software.",
    highlights: [
      "Pipeline modular de inspeção",
      "Análises técnicas apresentadas com clareza",
      "Arquitetura preparada para evolução contínua",
    ],
    links: [
      {
        label: "Ver código-fonte",
        href: "https://github.com/gustavomfg/nocturne-inspector",
        type: "source",
      },
    ],
    icon: "scan-search",
    accent: "violet",
  },
  {
    id: "04",
    key: "control",
    name: "Nocturne Control",
    role: "Aplicação web e integração",
    description:
      "Aplicação web em que exploro a centralização de utilitários e serviços por meio de uma interface moderna e responsiva.",
    tags: ["Web", "React", "Services"],
    status: "Em evolução",
    problem:
      "Organizar diferentes utilitários e serviços em uma experiência centralizada, clara e consistente em diferentes dispositivos.",
    highlights: [
      "Arquitetura frontend responsiva",
      "Integração de serviços em uma única interface",
      "Atenção à usabilidade e à consistência visual",
    ],
    links: [
      {
        label: "Ver código-fonte",
        href: "https://github.com/gustavomfg/nocturne-control",
        type: "source",
      },
    ],
    icon: "radar",
    accent: "cyan",
  },
] as const satisfies readonly Project[];

export const STACK = [
  "Java",
  "TypeScript",
  "JavaScript",
  "React",
  "Node.js",
  "Electron",
  "HTML",
  "CSS",
  "Python",
  "Rust",
] as const;

export const CAPABILITIES = [
  {
    number: "01",
    title: "Interfaces web",
    description: "Desenvolvimento de interfaces responsivas e componentizadas com React, TypeScript, JavaScript, HTML e CSS.",
  },
  {
    number: "02",
    title: "Backend e arquitetura",
    description: "Construção de APIs e lógica de aplicação com Node.js, priorizando organização, manutenção e decisões arquiteturais claras.",
  },
  {
    number: "03",
    title: "Aplicações desktop",
    description: "Criação de aplicações multiplataforma com Electron, considerando segurança, persistência e experiência de uso desde o início.",
  },
] as const satisfies readonly Capability[];

export const TIMELINE = [
  {
    year: "BASE",
    title: "Fundamentos",
    text: "Formação em Análise e Desenvolvimento de Sistemas, com Java como principal linguagem acadêmica e uma base em lógica, web e engenharia de software.",
    icon: "code",
  },
  {
    year: "PRÁTICA",
    title: "Aprendizado aplicado",
    text: "React, TypeScript, Node.js e Electron aplicados na criação de projetos completos para web e desktop.",
    icon: "layers",
  },
  {
    year: "AGORA",
    title: "Evolução técnica",
    text: "Aprofundamento em arquitetura, backend, inteligência artificial, documentação e práticas que tornam o software mais seguro e sustentável.",
    icon: "terminal",
  },
  {
    year: "CONTÍNUO",
    title: "Próximos passos",
    text: "Iniciar minha carreira como desenvolvedor Full Stack, continuar estudando Python e Rust e contribuir para software útil e bem construído.",
    icon: "file-text",
  },
] as const satisfies readonly TimelineItem[];
