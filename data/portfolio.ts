import type { NavItem, Project, TechnicalProfileItem } from "@/types/portfolio";

export const NAV_ITEMS = [
  { label: "Projetos", href: "#projetos" },
  { label: "Perfil", href: "#perfil" },
  { label: "Contato", href: "#contato" },
] as const satisfies readonly NavItem[];

export const TECHNICAL_PROFILE = [
  { label: "Formação", value: "ADS · UniFil (2025–2028)" },
  { label: "Direção principal", value: "Java em aprofundamento contínuo" },
  { label: "Uso diário", value: "TypeScript e JavaScript" },
  { label: "Construção", value: "React, Node.js e Electron" },
  { label: "Em desenvolvimento", value: "Python no Inspector · Rust em projetos" },
  { label: "Certificação", value: "Fundamentos do GitHub · DataCamp (2026)" },
] as const satisfies readonly TechnicalProfileItem[];

export const PROJECTS = [
  {
    id: "01",
    key: "studio",
    name: "Nocturne Studio",
    role: "Workspace local-first de engenharia assistida por IA",
    description:
      "Workspace local-first para manter projeto, documentação, conhecimento, arquitetura e conversas conectados enquanto a IA apoia o trabalho de engenharia.",
    tags: ["Electron", "React", "TypeScript", "SQLite"],
    problem:
      "Permitir que ferramentas de IA trabalhem com o contexto do projeto em vez de prompts isolados, mantendo conhecimento, decisões e conversas conectados no workspace.",
    highlights: [
      "Local Second Brain e Awareness System contextual",
      "Review Mode com revisão humana antes da aplicação de alterações",
      "Secure Provider System, Credential Vault e Typed IPC",
      "Arquitetura Electron com isolamento e Provider Abstraction Layer",
      "Packaging Pipeline e validação automatizada por CI",
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
    role: "Análise de arquitetura e documentação",
    description:
      "Ferramenta em Python que gera relatórios determinísticos e baseados em evidências sobre arquitetura e documentação, sem alterar o projeto analisado.",
    tags: ["Python", "CLI", "Textual TUI"],
    problem:
      "Tornar visíveis problemas de documentação e arquitetura antes da implementação, preservando uma análise reproduzível e somente leitura.",
    highlights: [
      "Inspectors especializados em documentação essencial e arquitetura",
      "Relatórios determinísticos com evidências rastreáveis",
      "A análise não modifica o projeto inspecionado",
      "Dashboard TUI opcional, acessível por teclado",
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
    name: "Solaris",
    role: "Estudo experimental de WebGL2 e interação",
    description:
      "Experimento visual de portfólio em que gestos alteram uma faixa procedural, sua iluminação e atmosfera, com controles para mouse e toque.",
    tags: ["React", "WebGL2", "GLSL", "GSAP"],
    image: "/solaris/solaris-ribbon.webp",
    imageAlt: "Render da escultura de fita luminosa criada para a experiência Solaris.",
    problem:
      "Investigar como movimento e interação podem transformar uma composição WebGL2 em uma experiência clara, responsiva e acessível.",
    highlights: [
      "Faixa procedural renderizada em WebGL2 e GLSL",
      "Entrada por mouse e toque, com alternativa 2D quando WebGL2 não está disponível",
      "Quatro paletas visuais e controle de intensidade",
      "Áudio opcional, silencioso por padrão, e suporte a movimento reduzido",
    ],
    links: [
      {
        label: "Ver código-fonte",
        href: "https://github.com/gustavomfg/nocturne-control",
        type: "source",
      },
      {
        label: "Abrir experiência",
        href: "https://gustavomfg.github.io/nocturne-control/",
        type: "demo",
      },
    ],
    icon: "radar",
    accent: "cyan",
  },
  {
    id: "05",
    key: "batpet",
    name: "BatPet",
    role: "Companheiro de desktop em Rust",
    description:
      "Mascote de desktop em pixel-art que reage à atenção e à proximidade do cursor, com um ciclo experimental de voo entre poleiros.",
    image: "/batpet/poses.png",
    imageAlt: "Morcego em pixel-art em estados de repouso, atenção e reação ao cursor.",
    tags: ["Rust", "Bevy", "Desktop"],
    problem:
      "Explorar animação e character acting responsivos em um companheiro de desktop sem perder a identidade visual em pixel-art.",
    highlights: [
      "Olhar e postura reagem à posição e à proximidade do cursor",
      "Ciclo de voo com estados de decolagem, voo, retorno e pouso",
      "Habitat experimental com múltiplos poleiros",
      "Textura original preservada e movimentos quantizados na grade pixel-art",
    ],
    links: [
      {
        label: "Ver código-fonte",
        href: "https://github.com/gustavomfg/My-Bat-Pet",
        type: "source",
      },
    ],
    icon: "radar",
    accent: "violet",
  },
] as const satisfies readonly Project[];

export const NOCTURNE_STUDIO_EVIDENCE = {
  version: "v1.0.1",
  keyEvidence: [
    "Workspace Memory, Local Second Brain e Awareness explicável por execução",
    "Review Mode para arquitetura, segurança, testes, performance, documentação e manutenibilidade",
    "Secure Provider System, Credential Vault e Typed IPC",
    "Secure Electron Architecture com isolamento explícito entre renderer e processo principal",
    "Provider Abstraction Layer, Packaging Pipeline e Automated CI Validation",
  ],
  reviewModeSummary: "As recomendações registram evidência, confiança, origem, responsável, severidade, justificativa e histórico de decisão, sempre sob revisão do desenvolvedor antes de alterações.",
  architectureSummary: "Electron, React, TypeScript e SQLite; IPC tipado; contextIsolation habilitado; nodeIntegration desabilitado; preload/contextBridge como fronteira; comunicação controlada entre renderer e processo principal.",
  providers: [
    "ChatGPT através do Codex CLI",
    "OpenAI API",
    "OpenRouter API",
    "DeepSeek API",
    "Ollama",
    "LM Studio",
    "Endpoints customizados compatíveis com OpenAI",
  ],
  stateSummary: "Recursos avançados de Build Mode e Docs Mode, Workspace Automation e a expansão do ecossistema de providers continuam em desenvolvimento.",
} as const;

export const SYSMON_EVIDENCE = {
  stack: ["Rust", "Ratatui", "Crossterm", "Linux"],
  telemetry: ["CPU", "memória", "GPU", "rede", "armazenamento", "temperaturas", "processos"],
  architecture: [
    "Históricos limitados",
    "Inventário dinâmico de hardware",
    "Separação entre coleta, interpretação e visualização dos dados",
  ],
  healthEngine: "O Health Engine diferencia atividade de pressão do sistema e alimenta o System Pulse, uma representação procedural que reage ao estado agregado da máquina.",
} as const;
