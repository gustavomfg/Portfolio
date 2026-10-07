import { describe, expect, it } from "vitest";
import { normalizeSearchText, searchCommands } from "@/lib/command-search";

const COMMANDS = [
  { label: "Ir para Projetos", keywords: ["trabalhos"] },
  { label: "Baixar currículo", keywords: ["cv", "pdf"] },
  { label: "Copiar e-mail", keywords: ["contato"] },
  { label: "Estudo de caso: BatPet", keywords: ["rust", "bevy"] },
] as const;

describe("searchCommands", () => {
  it("mantém a ordem original quando a busca está vazia", () => {
    expect(searchCommands("  ", COMMANDS).map((match) => match.command.label)).toEqual(
      COMMANDS.map((command) => command.label),
    );
  });

  it("ignora acentos e caixa ao comparar o rótulo", () => {
    const [first] = searchCommands("CURRICULO", COMMANDS);

    expect(first.command.label).toBe("Baixar currículo");
    expect(first.matches).toEqual([7, 8, 9, 10, 11, 12, 13, 14, 15]);
  });

  it("aceita busca por subsequência e prioriza correspondências contíguas", () => {
    const results = searchCommands("bp", COMMANDS).map((match) => match.command.label);

    expect(results[0]).toBe("Estudo de caso: BatPet");
  });

  it("usa palavras-chave como alternativa sem realçar o rótulo", () => {
    const [first] = searchCommands("rust", COMMANDS);

    expect(first.command.label).toBe("Estudo de caso: BatPet");
    expect(first.matches).toEqual([]);
  });

  it("descarta comandos sem correspondência", () => {
    expect(searchCommands("kubernetes", COMMANDS)).toEqual([]);
  });
});

describe("normalizeSearchText", () => {
  it("remove diacríticos e espaços laterais", () => {
    expect(normalizeSearchText("  Ação Rápida ")).toBe("acao rapida");
  });
});
