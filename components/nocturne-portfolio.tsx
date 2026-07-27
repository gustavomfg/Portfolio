"use client";

import { useState } from "react";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { JourneySection } from "@/components/sections/journey-section";
import { ProjectDialog } from "@/components/sections/project-dialog";
import { ProjectsSection } from "@/components/sections/projects-section";
import { StackMarquee } from "@/components/sections/stack-marquee";
import { CAPABILITIES, NAV_ITEMS, PROJECTS, STACK, TIMELINE } from "@/data/portfolio";
import { usePortfolioNavigation } from "@/hooks/use-portfolio-navigation";
import { useProjectDialog } from "@/hooks/use-project-dialog";

export function NocturnePortfolio() {
  const [activeProject, setActiveProject] = useState(0);
  const navigation = usePortfolioNavigation(NAV_ITEMS);
  const projectDialog = useProjectDialog();
  const selectedProject = projectDialog.selectedProject === null
    ? null
    : PROJECTS[projectDialog.selectedProject] ?? null;

  return (
    <>
      <main id="conteudo">
        <a className="skip-link" href="#ecossistema">Pular para o conteúdo</a>

        <Navbar
          items={NAV_ITEMS}
          activeSection={navigation.activeSection}
          menuOpen={navigation.menuOpen}
          onToggleMenu={navigation.toggleMenu}
          onCloseMenu={navigation.closeMenu}
        />
        <HeroSection
          projects={PROJECTS}
          activeProject={activeProject}
          onSelectProject={setActiveProject}
        />
        <ProjectsSection projects={PROJECTS} onOpenProject={projectDialog.openProject} />
        <AboutSection capabilities={CAPABILITIES} />
        <StackMarquee technologies={STACK} />
        <JourneySection items={TIMELINE} />
        <ContactSection />
        <Footer />
      </main>
      <ProjectDialog project={selectedProject} onClose={projectDialog.closeProject} dialogRef={projectDialog.dialogRef} />
    </>
  );
}
