import type { LucideIcon } from "lucide-react";

export type ProjectAccent = "violet" | "blue" | "cyan";

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
  icon: LucideIcon;
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
  icon: LucideIcon;
}
