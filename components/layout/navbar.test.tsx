// @vitest-environment jsdom

import { act, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Navbar } from "@/components/layout/navbar";
import { NAV_ITEMS } from "@/data/portfolio";

const motionState = vi.hoisted(() => ({ reduced: false }));

vi.mock("motion/react", () => ({
  AnimatePresence: ({ children }: { children: ReactNode }) => children,
  motion: {
    nav: forwardRef<HTMLElement, HTMLAttributes<HTMLElement> & { initial?: unknown }>(
      function MockMotionNav({ initial, ...props }, ref) {
        return (
          <nav
            {...props}
            ref={ref}
            data-motion-initial={initial === false ? "false" : JSON.stringify(initial)}
          />
        );
      },
    ),
  },
  useReducedMotion: () => motionState.reduced,
}));

interface ObserverRecord {
  callback: IntersectionObserverCallback;
  observed: Element[];
  disconnect: ReturnType<typeof vi.fn>;
}

function installIntersectionObserver() {
  const records: ObserverRecord[] = [];

  class TestIntersectionObserver implements IntersectionObserver {
    readonly root = null;
    readonly rootMargin = "-28% 0px -58%";
    readonly thresholds = [0, 0.2, 0.5];
    readonly observed: Element[] = [];
    readonly disconnect = vi.fn();
    readonly scrollMargin = "0px";

    constructor(readonly callback: IntersectionObserverCallback) {
      records.push(this);
    }

    observe = (element: Element) => this.observed.push(element);
    takeRecords = () => [];
    unobserve = vi.fn();
  }

  vi.stubGlobal("IntersectionObserver", TestIntersectionObserver);
  return records;
}

function renderNavbar() {
  return render(
    <>
      <Navbar items={NAV_ITEMS} />
      {NAV_ITEMS.map((item) => (
        <section id={item.href.slice(1)} key={item.href} />
      ))}
    </>,
  );
}

describe("Navbar", () => {
  beforeEach(() => {
    motionState.reduced = false;
  });

  it("abre o menu móvel, preserva os links e fecha com Escape restaurando o foco", async () => {
    const user = userEvent.setup();
    renderNavbar();

    const menuButton = screen.getByRole("button", { name: "Abrir menu" });
    await user.click(menuButton);

    const mobileNav = screen.getByRole("navigation", { name: "Navegação móvel" });
    expect(menuButton.getAttribute("aria-expanded")).toBe("true");
    expect(within(mobileNav).getAllByRole("link").map((link) => link.getAttribute("href")))
      .toEqual(NAV_ITEMS.map((item) => item.href));
    expect(document.activeElement).toBe(within(mobileNav).getAllByRole("link")[0]);

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("navigation", { name: "Navegação móvel" })).toBeNull();
    expect(document.activeElement).toBe(menuButton);
  });

  it("não marca uma seção como ativa antes de ela ficar visível", () => {
    renderNavbar();

    const desktopNav = screen.getByRole("navigation", { name: "Navegação principal" });

    for (const link of within(desktopNav).getAllByRole("link")) {
      expect(link.getAttribute("aria-current")).toBeNull();
    }
  });

  it("atualiza aria-current pela seção mais visível e encerra o observer", () => {
    const observers = installIntersectionObserver();
    const { unmount } = renderNavbar();
    const observer = observers[0];
    const projectsSection = document.getElementById("projetos");
    const profileSection = document.getElementById("perfil");

    expect(observer.observed).toHaveLength(NAV_ITEMS.length);

    act(() => {
      observer.callback(
        [
          { target: profileSection, isIntersecting: true, intersectionRatio: 0.25 },
          { target: projectsSection, isIntersecting: true, intersectionRatio: 0.8 },
        ] as unknown as IntersectionObserverEntry[],
        observer as unknown as IntersectionObserver,
      );
    });

    const desktopNav = screen.getByRole("navigation", { name: "Navegação principal" });
    expect(within(desktopNav).getByRole("link", { name: "Projetos" }).getAttribute("aria-current"))
      .toBe("location");

    unmount();
    expect(observer.disconnect).toHaveBeenCalledOnce();
  });

  it("remove a animação de entrada do menu quando reduced motion está ativo", async () => {
    motionState.reduced = true;
    const user = userEvent.setup();
    renderNavbar();

    await user.click(screen.getByRole("button", { name: "Abrir menu" }));

    expect(
      screen.getByRole("navigation", { name: "Navegação móvel" })
      .getAttribute("data-motion-initial"),
    ).toBe("false");
  });

  it("move o foco para a seção escolhida no menu móvel", async () => {
    const user = userEvent.setup();
    renderNavbar();

    await user.click(screen.getByRole("button", { name: "Abrir menu" }));
    const mobileNav = screen.getByRole("navigation", { name: "Navegação móvel" });
    await user.click(within(mobileNav).getByRole("link", { name: "Perfil" }));

    await act(async () => {
      await new Promise((resolve) => window.requestAnimationFrame(resolve));
    });

    const target = document.getElementById("perfil");
    expect(document.activeElement).toBe(target);
    expect(target?.getAttribute("tabindex")).toBe("-1");
  });
});
