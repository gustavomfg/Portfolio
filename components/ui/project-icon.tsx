import {
  BrainCircuit,
  PanelsTopLeft,
  Radar,
  ScanSearch,
  type LucideProps,
} from "lucide-react";
import type { ComponentType } from "react";
import type { ProjectIconKey } from "@/types/portfolio";

const PROJECT_ICONS = {
  "brain-circuit": BrainCircuit,
  "panels-top-left": PanelsTopLeft,
  "scan-search": ScanSearch,
  radar: Radar,
} satisfies Record<ProjectIconKey, ComponentType<LucideProps>>;

interface ProjectIconProps extends LucideProps {
  icon: ProjectIconKey;
}

export function ProjectIcon({ icon, ...props }: ProjectIconProps) {
  const Icon = PROJECT_ICONS[icon];

  return <Icon {...props} />;
}
