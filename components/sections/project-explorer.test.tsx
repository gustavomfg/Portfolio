// @vitest-environment jsdom

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import {
  ProjectExplorer,
  ProjectTrigger,
} from "@/components/sections/project-explorer";
import { PROJECTS } from "@/data/portfolio";

vi.mock("motion/react", () => ({
  AnimatePresence: ({ children }: { children: ReactNode }) => children,
  motion: {
    div: forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
      function MockMotionDiv(props, ref) {
        return <div {...props} ref={ref} />;
      },
    ),
    section: forwardRef<HTMLElement, HTMLAttributes<HTMLElement>>(
      function MockMotionSection(props, ref) {
        return <section {...props} ref={ref} />;
      },
    ),
  },
  useReducedMotion: () => false,
}));

function DialogFixture() {
  return (
    <main id="conteudo">
      <ProjectExplorer projects={PROJECTS}>
        <ProjectTrigger index={0} name={PROJECTS[0].name} />
      </ProjectExplorer>
    </main>
  );
}

describe("ProjectExplorer", () => {
  it("abre o diálogo, isola o fundo e fecha com Escape restaurando o foco", async () => {
    const user = userEvent.setup();
    render(<DialogFixture />);

    const trigger = screen.getByRole("button", {
      name: `Abrir detalhes de ${PROJECTS[0].name}`,
    });
    await user.click(trigger);

    const dialog = screen.getByRole("dialog", { name: PROJECTS[0].name });
    const closeButton = screen.getByRole("button", { name: "Fechar detalhes do projeto" });
    const content = document.getElementById("conteudo");

    expect(dialog.getAttribute("aria-modal")).toBe("true");
    expect(content?.hasAttribute("inert")).toBe(true);
    expect(content?.contains(dialog)).toBe(false);
    expect(document.body.classList.contains("dialog-open")).toBe(true);
    expect(document.activeElement).toBe(closeButton);

    await user.tab();
    expect(document.activeElement).toBe(closeButton);
    await user.tab({ shift: true });
    expect(document.activeElement).toBe(closeButton);

    await user.keyboard("{Escape}");

    expect(screen.queryByRole("dialog")).toBeNull();
    expect(content?.hasAttribute("inert")).toBe(false);
    expect(document.body.classList.contains("dialog-open")).toBe(false);
    expect(document.activeElement).toBe(trigger);
  });

  it("fecha ao clicar no backdrop", async () => {
    const user = userEvent.setup();
    render(<DialogFixture />);

    await user.click(screen.getByRole("button", {
      name: `Abrir detalhes de ${PROJECTS[0].name}`,
    }));
    const dialog = screen.getByRole("dialog");
    const backdrop = dialog.parentElement;

    expect(backdrop).not.toBeNull();
    await user.click(backdrop!);

    expect(screen.queryByRole("dialog")).toBeNull();
  });
});
