import type { Capability, NavItem, Project, TechnicalProfileItem, TimelineItem } from "@/types/portfolio";

export const NAV_ITEMS = [
  { label: "Projetos", href: "#projetos" },
  { label: "Perfil", href: "#perfil" },
  { label: "Contato", href: "#contato" },
] as const satisfies readonly NavItem[];

export const TECHNICAL_PROFILE = [
  { label: "Formação", value: "Análise e Desenvolvimento de Sistemas" },
  { label: "Direção principal", value: "Java em aprofundamento contínuo" },
  { label: "Uso diário", value: "TypeScript e JavaScript" },
  { label: "Construção", value: "React, Node.js e Electron" },
  { label: "Aprendendo", value: "Python e Rust" },
] as const satisfies readonly TechnicalProfileItem[];

export const PROJECTS = [
  {
    id: "01",
    key: "studio",
    name: "Nocturne Studio",
    role: "Workspace local-first de engenharia assistida por IA",
    description:
      "Workspace local-first de engenharia de software assistida por IA. O workspace é o produto; a IA é uma capacidade para manter projeto, documentação, conhecimento, arquitetura e conversas conectados.",
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
    role: "Inspeção e validação de projetos",
    description:
      "Projeto de engenharia voltado à inspeção de projetos, validação de arquitetura e criação de ferramentas para desenvolvedores.",
    tags: ["Desktop", "Diagnostics", "Engineering"],
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

export const NOCTURNE_STUDIO_EVIDENCE = {
  version: "v0.9.5-beta",
  principle: "O workspace é o produto; IA é uma capacidade do workspace, não o produto em si.",
  implemented: [
    "Review Mode",
    "Workspace Memory",
    "Second Brain",
    "Awareness explicável por execução",
    "Secure Provider System",
    "Credential Vault",
    "Typed IPC",
    "Secure Electron Architecture",
    "Provider Abstraction Layer",
    "Packaging Pipeline",
    "Automated CI Validation",
  ],
  reviewMode: {
    dimensions: ["arquitetura", "segurança", "testes", "performance", "documentação", "manutenibilidade"],
    recommendationFields: ["evidência", "confiança", "origem", "responsável", "severidade", "justificativa", "histórico de decisão"],
    note: "As sugestões permanecem sob revisão do desenvolvedor antes de alterações serem aplicadas.",
  },
  architecture: [
    "Electron, React, TypeScript e SQLite",
    "IPC tipado entre renderer e processo principal",
    "contextIsolation habilitado e nodeIntegration desabilitado",
    "preload/contextBridge como fronteira explícita",
    "Comunicação controlada entre renderer e processo principal",
    "Abstração entre workspace e provedores de IA",
  ],
  providers: [
    "ChatGPT através do Codex CLI",
    "OpenAI API",
    "OpenRouter API",
    "DeepSeek API",
    "Ollama",
    "LM Studio",
    "Endpoints customizados compatíveis com OpenAI",
  ],
  inDevelopment: [
    "Recursos avançados de Build Mode",
    "Recursos avançados de Docs Mode",
    "Workspace Automation",
    "Expansão das capacidades dos providers",
  ],
  limitations: [
    "O projeto ainda está em beta.",
    "A versão atual é v0.9.5-beta.",
    "Build Mode e Docs Mode ainda possuem recursos avançados em desenvolvimento.",
    "Workspace Automation ainda está em desenvolvimento.",
    "O ecossistema de providers ainda está sendo expandido.",
  ],
} as const;

export const SYSMON_EVIDENCE = {
  definition: "Monitor de sistema desenvolvido em Rust.",
  stack: ["Rust", "Ratatui", "Crossterm", "Linux"],
  telemetry: ["CPU", "memória", "GPU", "rede", "armazenamento", "temperaturas", "processos"],
  architecture: [
    "Históricos limitados",
    "Inventário dinâmico de hardware",
    "Separação entre coleta, interpretação e visualização dos dados",
  ],
  healthEngine: "O Health Engine diferencia atividade de pressão do sistema e alimenta o System Pulse, uma representação procedural que reage ao estado agregado da máquina.",
} as const;

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
