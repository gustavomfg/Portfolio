export type ProjectAccent = "violet" | "blue" | "cyan";
export type ProjectIconKey = "brain-circuit" | "panels-top-left" | "scan-search" | "radar";

export interface NavItem {
  label: string;
  href: `#${string}`;
}

export interface Project {
  id: string;
  key: string;
  image?: string | null;
  name: string;
  role: string;
  description: string;
  tags: readonly string[];
  problem: string;
  highlights: readonly string[];
  links?: readonly ProjectLink[];
  icon: ProjectIconKey;
  accent: ProjectAccent;
}

export interface ProjectLink {
  label: string;
  href: `https://${string}`;
  type: "source" | "demo";
}

export interface TechnicalProfileItem {
  label: string;
  value: string;
}
