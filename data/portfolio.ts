import {
  BrainCircuit,
  Code2,
  FileText,
  Layers3,
  PanelsTopLeft,
  Radar,
  ScanSearch,
  TerminalSquare,
} from "lucide-react";
import type { Capability, NavItem, Project, TimelineItem } from "@/types/portfolio";

export const NAV_ITEMS = [
  { label: "Ecossistema", href: "#ecossistema" },
  { label: "Sobre", href: "#sobre" },
  { label: "Jornada", href: "#jornada" },
  { label: "Contato", href: "#contato" },
] as const satisfies readonly NavItem[];

export const PROJECTS = [
  {
    id: "01",
    key: "studio",
    name: "Nocturne Studio",
    role: "AI Engineering Workspace",
    description:
      "Um workspace de engenharia de software com inteligência artificial, organizado ao redor de projetos em vez de prompts isolados.",
    tags: ["Electron", "React", "AI"],
    status: "Em desenvolvimento",
    problem:
      "Manter memória, contexto e decisões de engenharia conectados ao projeto durante todo o processo de desenvolvimento.",
    highlights: [
      "Memória de workspace e Second Brain",
      "Review Mode e suporte a múltiplos provedores",
      "Arquitetura Electron segura e documentação contínua",
    ],
    icon: BrainCircuit,
    accent: "violet",
  },
  {
    id: "02",
    key: "portfolio",
    name: "Nocturne Portfolio",
    role: "Professional Identity",
    description:
      "Este portfólio: um espaço para reunir projetos, documentação e minha identidade profissional em evolução.",
    tags: ["Next.js", "React", "TypeScript"],
    status: "Em evolução contínua",
    problem:
      "Apresentar o que estou construindo e aprendendo de forma clara, honesta e consistente com a identidade do ecossistema.",
    highlights: [
      "Interface responsiva e acessível",
      "Conteúdo centralizado e fácil de atualizar",
      "Identidade visual compartilhada com o Nocturne",
    ],
    icon: PanelsTopLeft,
    accent: "blue",
  },
  {
    id: "03",
    key: "inspector",
    name: "Nocturne Inspector",
    role: "Monitoring & Diagnostics",
    description:
      "Aplicação desktop criada para explorar monitoramento, diagnóstico e conceitos de engenharia de software.",
    tags: ["Desktop", "Diagnostics", "Engineering"],
    status: "Em desenvolvimento",
    problem:
      "Transformar conceitos de monitoramento e diagnóstico em uma ferramenta prática para aprofundar conhecimentos de engenharia.",
    highlights: [
      "Exploração de monitoramento de software",
      "Diagnósticos apresentados com clareza",
      "Aprendizado orientado por uma aplicação real",
    ],
    icon: ScanSearch,
    accent: "violet",
  },
  {
    id: "04",
    key: "control",
    name: "Nocturne Control",
    role: "Ecosystem Hub",
    description:
      "Aplicação web que centraliza os serviços e as ferramentas que fazem parte do ecossistema Nocturne.",
    tags: ["Web", "React", "Services"],
    status: "Em evolução",
    problem:
      "Oferecer um ponto central para acessar e acompanhar ferramentas do ecossistema sem perder clareza ou consistência.",
    highlights: [
      "Centralização dos serviços Nocturne",
      "Experiência web consistente",
      "Interface alinhada ao restante do ecossistema",
    ],
    icon: Radar,
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
    title: "Desenvolvimento Full Stack",
    description: "Aplicações modernas com React, TypeScript, JavaScript e Node.js, conectando interface e lógica.",
  },
  {
    number: "02",
    title: "Arquitetura e desktop",
    description: "Exploração de arquitetura de software e aplicações Electron com atenção à segurança e à manutenção.",
  },
  {
    number: "03",
    title: "Experiência de desenvolvimento",
    description: "Documentação, UI/UX, desempenho e ferramentas pensadas para tornar o software agradável de usar e evoluir.",
  },
] as const satisfies readonly Capability[];

export const TIMELINE = [
  {
    year: "BASE",
    title: "Fundamentos",
    text: "Java como linguagem principal e uma base construída com lógica, web e engenharia de software.",
    icon: Code2,
  },
  {
    year: "PRÁTICA",
    title: "Projetos reais",
    text: "React, TypeScript, Node.js e Electron aplicados em experiências web e desktop.",
    icon: Layers3,
  },
  {
    year: "AGORA",
    title: "Ecossistema Nocturne",
    text: "Projetos conectados por arquitetura, documentação, inteligência artificial e uma identidade comum.",
    icon: TerminalSquare,
  },
  {
    year: "CONTÍNUO",
    title: "Evolução",
    text: "Aprofundar Full Stack, Rust e Python enquanto contribuo para software aberto, seguro e bem construído.",
    icon: FileText,
  },
] as const satisfies readonly TimelineItem[];
