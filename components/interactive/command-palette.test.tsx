// @vitest-environment jsdom

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CommandPalette } from "@/components/interactive/command-palette";
import { setBatPetHidden } from "@/lib/batpet-store";
import { OPEN_PROJECT_EVENT, openCommandPalette } from "@/lib/portfolio-events";

function getCombobox() {
  return screen.getByRole("combobox", { name: "Buscar seções, projetos e ações" });
}

function getActiveOption() {
  const id = getCombobox().getAttribute("aria-activedescendant");
  return id ? document.getElementById(id) : null;
}

describe("CommandPalette", () => {
  beforeEach(() => {
    setBatPetHidden(false);
    // jsdom has no showModal(); the palette falls back to toggling the open attribute.
  });

  it("abre com Ctrl+K, filtra sem acentos e fecha com o mesmo atalho", async () => {
    const user = userEvent.setup();
    render(<CommandPalette />);

    expect(screen.queryByRole("combobox")).toBeNull();

    await user.keyboard("{Control>}k{/Control}");
    expect(document.activeElement).toBe(getCombobox());

    await user.type(getCombobox(), "curriculo");
    const options = within(screen.getByRole("listbox")).getAllByRole("option");
    expect(options[0].textContent).toContain("Abrir currículo");
    expect(getActiveOption()).toBe(options[0]);

    await user.keyboard("{Control>}k{/Control}");
    expect(screen.queryByRole("combobox")).toBeNull();
  });

  it("navega pelas opções com as setas e dá a volta na lista", async () => {
    const user = userEvent.setup();
    render(<CommandPalette />);

    await user.keyboard("/");
    const options = within(screen.getByRole("listbox")).getAllByRole("option");

    expect(getActiveOption()).toBe(options[0]);
    await user.keyboard("{ArrowDown}");
    expect(getActiveOption()).toBe(options[1]);
    await user.keyboard("{ArrowUp}{ArrowUp}");
    expect(getActiveOption()).toBe(options[options.length - 1]);
  });

  it("abre o estudo de caso de um projeto pelo evento do explorador", async () => {
    const user = userEvent.setup();
    const listener = vi.fn();
    window.addEventListener(OPEN_PROJECT_EVENT, listener);
    render(<CommandPalette />);

    openCommandPalette();
    await user.type(await screen.findByRole("combobox"), "bevy");
    await user.keyboard("{Enter}");

    expect(listener).toHaveBeenCalledTimes(1);
    expect((listener.mock.calls[0][0] as CustomEvent).detail).toEqual({ key: "batpet" });
    window.removeEventListener(OPEN_PROJECT_EVENT, listener);
  });

  it("alterna o BatPet e anuncia o novo estado", async () => {
    const user = userEvent.setup();
    render(<CommandPalette />);

    openCommandPalette();
    await user.type(await screen.findByRole("combobox"), "morcego");
    await user.keyboard("{Enter}");

    expect(screen.getByRole("status").textContent).toContain("O BatPet foi dormir");
    expect(within(screen.getByRole("listbox")).getByRole("option").textContent).toContain("Chamar o BatPet de volta");
  });

  it("mostra uma sugestão quando nada corresponde à busca", async () => {
    const user = userEvent.setup();
    render(<CommandPalette />);

    openCommandPalette();
    await user.type(await screen.findByRole("combobox"), "kubernetes");

    expect(screen.queryAllByRole("option")).toHaveLength(0);
    expect(screen.getByText(/Nada por aqui/)).toBeTruthy();
  });
});
