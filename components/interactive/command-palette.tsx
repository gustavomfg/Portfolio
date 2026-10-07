"use client";

import {
  ArrowRight,
  AtSign,
  Code2,
  CornerDownLeft,
  FileText,
  FolderOpen,
  Moon,
  Search,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useCallback, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { PROJECTS } from "@/data/portfolio";
import { setBatPetHidden, useBatPetHidden } from "@/lib/batpet-store";
import { searchCommands, type CommandMatch } from "@/lib/command-search";
import { OPEN_COMMAND_PALETTE_EVENT, requestProjectStudy } from "@/lib/portfolio-events";
import type { Project } from "@/types/portfolio";

const EMAIL = "gustavomfgdev@gmail.com";

type CommandAction =
  | { kind: "anchor"; target: string }
  | { kind: "external"; href: string }
  | { kind: "study"; key: string }
  | { kind: "copy"; value: string; feedback: string }
  | { kind: "batpet" };

type CommandGroup = "Navegar" | "Estudos de caso" | "Código-fonte" | "Contato e ações";

export interface PaletteCommand {
  id: string;
  group: CommandGroup;
  label: string;
  hint?: string;
  keywords?: readonly string[];
  icon: LucideIcon;
  action: CommandAction;
}

const GROUP_ORDER: readonly CommandGroup[] = ["Navegar", "Estudos de caso", "Contato e ações", "Código-fonte"];

function buildCommands(batPetHidden: boolean): PaletteCommand[] {
  const projects: readonly Project[] = PROJECTS;
  const studies = projects.filter((project) => project.key !== "studio");
  const sources = [
    ...projects.flatMap((project) =>
      (project.links ?? [])
        .filter((link) => link.type === "source")
        .map((link) => ({ name: project.name, href: link.href, tags: project.tags })),
    ),
    { name: "SysMon", href: "https://github.com/gustavomfg/sysmon", tags: ["Rust", "Ratatui"] },
  ];

  return [
    { id: "nav-inicio", group: "Navegar", label: "Início", icon: ArrowRight, keywords: ["topo", "home"], action: { kind: "anchor", target: "inicio" } },
    { id: "nav-projetos", group: "Navegar", label: "Projetos", icon: ArrowRight, keywords: ["trabalhos", "portfolio"], action: { kind: "anchor", target: "projetos" } },
    { id: "nav-studio", group: "Navegar", label: "Nocturne Studio", hint: "Projeto principal", icon: ArrowRight, keywords: ["electron", "ia", "ai"], action: { kind: "anchor", target: "projeto-studio" } },
    { id: "nav-sysmon", group: "Navegar", label: "SysMon", hint: "Monitor de sistema em Rust", icon: ArrowRight, keywords: ["rust", "terminal", "tui"], action: { kind: "anchor", target: "sysmon" } },
    { id: "nav-perfil", group: "Navegar", label: "Perfil", icon: ArrowRight, keywords: ["sobre", "formacao", "java"], action: { kind: "anchor", target: "perfil" } },
    { id: "nav-contato", group: "Navegar", label: "Contato", icon: ArrowRight, keywords: ["email", "falar"], action: { kind: "anchor", target: "contato" } },
    ...studies.map((project): PaletteCommand => ({
      id: `study-${project.key}`,
      group: "Estudos de caso",
      label: project.name,
      hint: project.role,
      icon: FolderOpen,
      keywords: [...project.tags, "estudo", "detalhes"],
      action: { kind: "study", key: project.key },
    })),
    { id: "copy-email", group: "Contato e ações", label: "Copiar e-mail", hint: EMAIL, icon: AtSign, keywords: ["email", "contato", "gmail"], action: { kind: "copy", value: EMAIL, feedback: "E-mail copiado" } },
    { id: "open-cv", group: "Contato e ações", label: "Abrir currículo", hint: "PDF", icon: FileText, keywords: ["cv", "resume", "pdf"], action: { kind: "external", href: "/curriculo-gustavo-maquias.pdf" } },
    { id: "open-github", group: "Contato e ações", label: "GitHub", hint: "github.com/gustavomfg", icon: Code2, keywords: ["repositorios", "codigo"], action: { kind: "external", href: "https://github.com/gustavomfg" } },
    { id: "open-linkedin", group: "Contato e ações", label: "LinkedIn", hint: "linkedin.com/in/gustavomfg", icon: AtSign, keywords: ["perfil", "contato"], action: { kind: "external", href: "https://www.linkedin.com/in/gustavomfg" } },
    {
      id: "toggle-batpet",
      group: "Contato e ações",
      label: batPetHidden ? "Chamar o BatPet de volta" : "Deixar o BatPet dormir",
      hint: batPetHidden ? "Ele volta a se pendurar no topo" : "Esconde o mascote do topo",
      icon: batPetHidden ? Sparkles : Moon,
      keywords: ["morcego", "bat", "mascote", "pet"],
      action: { kind: "batpet" },
    },
    ...sources.map((source): PaletteCommand => ({
      id: `source-${source.href}`,
      group: "Código-fonte",
      label: `Código de ${source.name}`,
      hint: source.href.replace("https://", ""),
      icon: Code2,
      keywords: [...source.tags, "github", "repositorio", "source"],
      action: { kind: "external", href: source.href },
    })),
  ];
}

function focusSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });

  if (!target.hasAttribute("tabindex")) {
    target.setAttribute("tabindex", "-1");
    target.addEventListener("blur", () => target.removeAttribute("tabindex"), { once: true });
  }
  target.focus({ preventScroll: true });
}

function isTypingTarget(target: EventTarget | null) {
  return target instanceof HTMLElement
    && (target.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName));
}

function HighlightedLabel({ label, matches }: { label: string; matches: readonly number[] }) {
  if (!matches.length) return <>{label}</>;

  const matched = new Set(matches);
  return (
    <>
      {Array.from(label).map((character, index) =>
        matched.has(index) ? <mark key={index}>{character}</mark> : <span key={index}>{character}</span>,
      )}
    </>
  );
}

export function CommandPalette() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [status, setStatus] = useState("");
  const batPetHidden = useBatPetHidden();
  const listboxId = useId();
  const statusId = useId();

  const commands = useMemo(() => buildCommands(batPetHidden), [batPetHidden]);
  const results = useMemo(() => searchCommands(query, commands), [query, commands]);
  const grouped = useMemo(() => {
    if (query.trim()) return [{ group: null, items: results }];

    return GROUP_ORDER.map((group) => ({
      group,
      items: results.filter((result) => result.command.group === group),
    })).filter((section) => section.items.length > 0);
  }, [query, results]);
  const ordered = useMemo(() => grouped.flatMap((section) => section.items), [grouped]);
  const orderById = useMemo(
    () => new Map(ordered.map((result, index) => [result.command.id, index])),
    [ordered],
  );
  const activeCommand = ordered[activeIndex]?.command;

  const show = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open || document.body.classList.contains("dialog-open")) return;

    setQuery("");
    setActiveIndex(0);
    setStatus("");
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    setOpen(true);
  }, []);

  const hide = useCallback(() => {
    const dialog = dialogRef.current;
    if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    closeTimer.current = null;
    if (!dialog?.open) return;

    if (typeof dialog.close === "function") dialog.close();
    else dialog.removeAttribute("open");
    setOpen(false);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      const isShortcut = event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey) && !event.altKey;
      const isSlash = event.key === "/" && !event.metaKey && !event.ctrlKey && !isTypingTarget(event.target);

      if (!isShortcut && !isSlash) return;

      event.preventDefault();
      if (dialogRef.current?.open) hide();
      else show();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener(OPEN_COMMAND_PALETTE_EVENT, show);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener(OPEN_COMMAND_PALETTE_EVENT, show);
      if (closeTimer.current !== null) window.clearTimeout(closeTimer.current);
    };
  }, [hide, show]);

  useEffect(() => {
    console.info(
      "%cGF%c Oi, dev curioso! O código deste portfólio é aberto: https://github.com/gustavomfg/Portfolio\nAperte Ctrl+K (ou ⌘K) para navegar pelo teclado.",
      "background:#9167ff;color:#fff;padding:2px 6px;border-radius:4px;font-weight:700",
      "color:#c6b3ff",
    );
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const active = listRef.current?.querySelector<HTMLElement>('[aria-selected="true"]');
    active?.scrollIntoView?.({ block: "nearest" });
  }, [activeIndex, open, query]);

  const run = useCallback((command: PaletteCommand) => {
    const { action } = command;

    switch (action.kind) {
      case "anchor":
        hide();
        window.requestAnimationFrame(() => focusSection(action.target));
        break;
      case "study":
        hide();
        window.requestAnimationFrame(() => requestProjectStudy(action.key));
        break;
      case "external":
        hide();
        window.open(action.href, "_blank", "noopener,noreferrer");
        break;
      case "batpet":
        setBatPetHidden(!batPetHidden);
        setStatus(batPetHidden ? "O BatPet voltou para o topo da página." : "O BatPet foi dormir. Boa noite!");
        break;
      case "copy": {
        const fallback = `Não foi possível copiar. Endereço: ${action.value}`;

        if (!navigator.clipboard) {
          setStatus(fallback);
          break;
        }

        navigator.clipboard.writeText(action.value)
          .then(() => {
            setStatus(`${action.feedback}: ${action.value}`);
            closeTimer.current = window.setTimeout(hide, 1400);
          })
          .catch(() => setStatus(fallback));
        break;
      }
    }
  }, [batPetHidden, hide]);

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const count = ordered.length;

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!count) return;
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActiveIndex((index) => (index + step + count) % count);
    } else if (event.key === "Home" && count) {
      event.preventDefault();
      setActiveIndex(0);
    } else if (event.key === "End" && count) {
      event.preventDefault();
      setActiveIndex(count - 1);
    } else if (event.key === "Enter" && activeCommand) {
      event.preventDefault();
      run(activeCommand);
    }
  };

  const optionId = (command: PaletteCommand) => `${listboxId}-${command.id}`;

  const renderOption = ({ command, matches }: CommandMatch<PaletteCommand>) => {
    const index = orderById.get(command.id) ?? -1;
    const Icon = command.icon;
    const selected = index === activeIndex;

    return (
      <div
        key={command.id}
        id={optionId(command)}
        role="option"
        aria-selected={selected}
        className="command-option"
        onPointerMove={() => {
          if (!selected) setActiveIndex(index);
        }}
        onClick={() => run(command)}
      >
        <span className="command-option-icon" aria-hidden="true"><Icon size={15} /></span>
        <span className="command-option-copy">
          <span className="command-option-label"><HighlightedLabel label={command.label} matches={matches} /></span>
          {command.hint ? <span className="command-option-hint">{command.hint}</span> : null}
        </span>
        <CornerDownLeft className="command-option-enter" size={14} aria-hidden="true" />
      </div>
    );
  };

  return (
    <dialog
      ref={dialogRef}
      className="command-palette"
      aria-label="Paleta de comandos"
      onClose={() => setOpen(false)}
      onClick={(event) => {
        if (event.target === event.currentTarget) hide();
      }}
    >
      {open ? (
        <div className="command-palette-panel">
          <div className="command-palette-search">
            <Search size={17} aria-hidden="true" />
            <input
              ref={inputRef}
              type="text"
              role="combobox"
              aria-label="Buscar seções, projetos e ações"
              aria-expanded="true"
              aria-controls={listboxId}
              aria-autocomplete="list"
              aria-activedescendant={activeCommand ? optionId(activeCommand) : undefined}
              aria-describedby={statusId}
              autoComplete="off"
              spellCheck={false}
              placeholder="Para onde vamos?"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveIndex(0);
                setStatus("");
              }}
              onKeyDown={handleInputKeyDown}
            />
            <kbd>esc</kbd>
          </div>

          <div ref={listRef} className="command-palette-list" id={listboxId} role="listbox" aria-label="Resultados">
            {grouped.map(({ group, items }) =>
              group ? (
                <div className="command-group" role="group" aria-label={group} key={group}>
                  <div className="command-group-label" aria-hidden="true">{group}</div>
                  {items.map(renderOption)}
                </div>
              ) : (
                items.map(renderOption)
              ),
            )}
            {!ordered.length ? (
              <p className="command-empty">
                Nada por aqui para “{query.trim()}”. Tente <b>rust</b>, <b>currículo</b> ou <b>contato</b>.
              </p>
            ) : null}
          </div>

          <div className="command-palette-footer">
            <p id={statusId} className="command-status" role="status" aria-live="polite">{status}</p>
            <span className="command-keys" aria-hidden="true">
              <kbd>↑</kbd><kbd>↓</kbd> navegar <kbd>↵</kbd> abrir
            </span>
          </div>
        </div>
      ) : null}
    </dialog>
  );
}
