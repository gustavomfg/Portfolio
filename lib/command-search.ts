export interface SearchableCommand {
  label: string;
  keywords?: readonly string[];
}

export interface CommandMatch<T extends SearchableCommand> {
  command: T;
  score: number;
  /** Indices of `command.label` characters that matched the query. */
  matches: readonly number[];
}

interface NormalizedText {
  text: string;
  /** Maps each normalized character back to its index in the original string. */
  sourceIndex: number[];
}

function normalizeWithMap(value: string): NormalizedText {
  let text = "";
  const sourceIndex: number[] = [];

  Array.from(value).forEach((character, index) => {
    const normalized = character.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

    for (const part of normalized) {
      text += part;
      sourceIndex.push(index);
    }
  });

  return { text, sourceIndex };
}

export function normalizeSearchText(value: string) {
  return normalizeWithMap(value).text.trim();
}

function isWordStart(text: string, index: number) {
  return index === 0 || /[\s\-_/.:·]/.test(text[index - 1]);
}

function matchLabel(query: string, label: string): Omit<CommandMatch<SearchableCommand>, "command"> | null {
  const { text, sourceIndex } = normalizeWithMap(label);
  const substringIndex = text.indexOf(query);

  if (substringIndex !== -1) {
    const matches = Array.from({ length: query.length }, (_, offset) => sourceIndex[substringIndex + offset]);
    const startBonus = substringIndex === 0 ? 40 : isWordStart(text, substringIndex) ? 25 : 0;

    return { score: 100 + startBonus - substringIndex * 0.5, matches };
  }

  const matches: number[] = [];
  let score = 0;
  let cursor = 0;
  let previous = -2;

  for (const character of query) {
    if (character === " ") continue;

    const found = text.indexOf(character, cursor);
    if (found === -1) return null;

    score += found === previous + 1 ? 6 : isWordStart(text, found) ? 4 : 1;
    matches.push(sourceIndex[found]);
    previous = found;
    cursor = found + 1;
  }

  return { score, matches };
}

/**
 * Ranks commands by how well their label (or, as a fallback, their keywords)
 * matches the query. Accents and case are ignored so "curriculo" finds "Currículo".
 */
export function searchCommands<T extends SearchableCommand>(query: string, commands: readonly T[]): CommandMatch<T>[] {
  const normalizedQuery = normalizeSearchText(query);

  if (!normalizedQuery) {
    return commands.map((command) => ({ command, score: 0, matches: [] }));
  }

  const results: CommandMatch<T>[] = [];

  commands.forEach((command) => {
    const labelMatch = matchLabel(normalizedQuery, command.label);
    const keywordHit = command.keywords?.some((keyword) => normalizeSearchText(keyword).includes(normalizedQuery));

    if (labelMatch) {
      results.push({ command, score: labelMatch.score + (keywordHit ? 5 : 0), matches: labelMatch.matches });
    } else if (keywordHit) {
      results.push({ command, score: 20, matches: [] });
    }
  });

  return results
    .map((result, order) => ({ result, order }))
    .sort((a, b) => b.result.score - a.result.score || a.order - b.order)
    .map(({ result }) => result);
}
