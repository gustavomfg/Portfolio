"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { BrandMark } from "@/components/ui/brand-mark";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import type { NavItem } from "@/types/portfolio";

interface NavbarProps {
  items: readonly NavItem[];
  activeSection: string;
  menuOpen: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
}

export function Navbar({
  items,
  activeSection,
  menuOpen,
  onToggleMenu,
  onCloseMenu,
}: NavbarProps) {
  const reduceMotion = useReducedMotion();
  const { headerRef, progressRef } = useScrollProgress();

  return (
    <header className="site-header" ref={headerRef}>
      <span className="scroll-progress" aria-hidden="true">
        <span ref={progressRef} />
      </span>
      <a className="brand" href="#inicio" aria-label="Nocturne, voltar ao início">
        <BrandMark />
        <span className="brand-copy">
          <strong>NOCTURNE</strong>
          <small>ADS • FULL STACK</small>
        </span>
      </a>

      <nav className="desktop-nav" aria-label="Navegação principal">
        {items.map((item) => (
          <a
            className={activeSection === item.href ? "is-active" : ""}
            href={item.href}
            key={item.href}
            aria-current={activeSection === item.href ? "location" : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <a className="availability" href="#contato">
        <span className="availability-dot" />
        Disponível para conversar
        <ArrowUpRight size={15} />
      </a>

      <button
        className="menu-button"
        type="button"
        aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={menuOpen}
        aria-controls="menu-mobile"
        onClick={onToggleMenu}
      >
        {menuOpen ? <X /> : <Menu />}
      </button>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            className="mobile-nav"
            id="menu-mobile"
            aria-label="Navegação móvel"
            initial={reduceMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {items.map((item) => (
              <a
                className={activeSection === item.href ? "is-active" : ""}
                href={item.href}
                key={item.href}
                onClick={onCloseMenu}
                aria-current={activeSection === item.href ? "location" : undefined}
              >
                {item.label}<ArrowUpRight size={17} />
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
