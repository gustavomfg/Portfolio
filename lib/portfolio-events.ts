export const OPEN_COMMAND_PALETTE_EVENT = "portfolio:open-command-palette";
export const OPEN_PROJECT_EVENT = "portfolio:open-project";

export interface OpenProjectDetail {
  key: string;
}

export function openCommandPalette() {
  window.dispatchEvent(new Event(OPEN_COMMAND_PALETTE_EVENT));
}

export function requestProjectStudy(key: string) {
  window.dispatchEvent(new CustomEvent<OpenProjectDetail>(OPEN_PROJECT_EVENT, { detail: { key } }));
}
