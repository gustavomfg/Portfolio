"use client";

import { useEffect, useState } from "react";
import type { NavItem } from "@/types/portfolio";

export function usePortfolioNavigation(navItems: readonly NavItem[]) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(navItems[0]?.href ?? "#inicio");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [headerCompact, setHeaderCompact] = useState(false);

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    const handleScroll = () => {
      const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0);
      setHeaderCompact(window.scrollY > 32);
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    const sections = navItems
      .map((item) => document.querySelector(item.href))
      .filter((section): section is Element => section !== null);
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleSection = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visibleSection) setActiveSection(`#${visibleSection.target.id}` as NavItem["href"]);
      },
      { rootMargin: "-28% 0px -58%", threshold: [0, 0.2, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    handleScroll();
    window.addEventListener("resize", closeMenu);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", closeMenu);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navItems]);

  return {
    menuOpen,
    activeSection,
    scrollProgress,
    headerCompact,
    toggleMenu: () => setMenuOpen((current) => !current),
    closeMenu: () => setMenuOpen(false),
  };
}
