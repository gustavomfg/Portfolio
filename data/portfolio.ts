import {
  ArrowUpRight,
  BrainCircuit,
  Code2,
  Layers3,
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
    key: "inspector",
    name: "Nocturne Inspector",
    role: "Engineering Intelligence",
    description:
      "Observa projetos, reúne evidências e transforma complexidade em inteligência de engenharia confiável.",
    tags: ["Python", "Analysis", "Read-only"],
    status: "v0.1 em desenvolvimento",
    problem:
      "Analisar um projeto antes da implementação, separando observação, evidência e recomendação sem alterar o workspace inspecionado.",
    highlights: [
      "Scanner determinístico de workspace",
      "Relatório JSON versionado",
      "Arquitetura de inspetores independentes",
    ],
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
    status: "Em desenvolvimento",
    problem:
      "Manter conhecimento, decisões técnicas e contexto de desenvolvimento acessíveis durante todo o ciclo de uma mudança.",
    highlights: [
      "Aplicação desktop com Electron e React",
      "Renderer isolado de recursos nativos",
      "Fronteira IPC controlada",
    ],
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
    status: "Em evolução",
    problem:
      "Explorar como ferramentas técnicas podem oferecer controle e densidade de informação sem sacrificar clareza visual.",
    highlights: [
      "Sistema visual dark próprio",
      "Experimentos de interface e controle",
      "Biblioteca de padrões do ecossistema",
    ],
    icon: Radar,
    accent: "cyan",
  },
] as const satisfies readonly Project[];

export const STACK = [
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Electron",
  "Python",
  "Rust",
  "Tailwind",
] as const;

export const CAPABILITIES = [
  {
    number: "01",
    title: "Interfaces web",
    description: "React, Next.js, TypeScript e experiências responsivas com atenção aos detalhes.",
  },
  {
    number: "02",
    title: "Aplicações desktop",
    description: "Electron, integração com recursos nativos e comunicação IPC com fronteiras claras.",
  },
  {
    number: "03",
    title: "Ferramentas de engenharia",
    description: "Python, Rust e automações criadas para compreender e resolver problemas reais.",
  },
] as const satisfies readonly Capability[];

export const TIMELINE = [
  {
    year: "BASE",
    title: "Fundamentos",
    text: "Web, lógica e a curiosidade de construir ferramentas próprias.",
    icon: Code2,
  },
  {
    year: "EXPAND",
    title: "Sistemas",
    text: "Aplicações desktop, Rust, Python e novas camadas de complexidade.",
    icon: Layers3,
  },
  {
    year: "NOW",
    title: "Nocturne",
    text: "Um ecossistema que reúne inteligência, execução e experiência visual.",
    icon: TerminalSquare,
  },
  {
    year: "NEXT",
    title: "Próximo capítulo",
    text: "Produtos mais maduros, colaboração e impacto em problemas reais.",
    icon: ArrowUpRight,
  },
] as const satisfies readonly TimelineItem[];
