export type ProjectAccent = "violet" | "blue" | "cyan";
export type ProjectIconKey = "brain-circuit" | "panels-top-left" | "scan-search" | "radar";
export type TimelineIconKey = "code" | "layers" | "terminal" | "file-text";

export interface NavItem {
  label: string;
  href: `#${string}`;
}

export interface Project {
  id: string;
  key: string;
  name: string;
  role: string;
  description: string;
  tags: readonly string[];
  status: string;
  problem: string;
  highlights: readonly string[];
  icon: ProjectIconKey;
  accent: ProjectAccent;
}

export interface Capability {
  number: string;
  title: string;
  description: string;
}

export interface TimelineItem {
  year: string;
  title: string;
  text: string;
  icon: TimelineIconKey;
}
