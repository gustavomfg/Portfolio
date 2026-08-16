import type { CSSProperties } from "react";

interface SplitTextProps {
  text: string;
  className?: string;
}

export function SplitText({ text, className = "" }: SplitTextProps) {
  return (
    <span className={`split-text ${className}`.trim()}>
      <span className="sr-only">{text}</span>
      {text.split(" ").map((word, wordIndex) => (
        <span className="split-word" aria-hidden="true" key={`${word}-${wordIndex}`}>
          {[...word].map((character, characterIndex) => (
            <span
              key={`${character}-${characterIndex}`}
              style={
                {
                  "--split-index": wordIndex * 20 + characterIndex,
                  "--split-word-index": wordIndex,
                  "--split-character-index": characterIndex,
                } as CSSProperties
              }
            >
              {character}
            </span>
          ))}
        </span>
      ))}
    </span>
  );
}
