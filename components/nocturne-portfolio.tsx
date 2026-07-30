import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";
import { HeroSection } from "@/components/sections/hero-section";
import { JourneySection } from "@/components/sections/journey-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { StackMarquee } from "@/components/sections/stack-marquee";
import { CAPABILITIES, NAV_ITEMS, PROJECTS, STACK, TIMELINE } from "@/data/portfolio";

export function NocturnePortfolio() {
  return (
    <main id="conteudo">
      <a className="skip-link" href="#ecossistema">Pular para o conteúdo</a>

      <Navbar items={NAV_ITEMS} />
      <HeroSection projects={PROJECTS} />
      <ProjectsSection projects={PROJECTS} />
      <AboutSection capabilities={CAPABILITIES} />
      <StackMarquee technologies={STACK} />
      <JourneySection items={TIMELINE} />
      <ContactSection />
      <Footer />
    </main>
  );
}
