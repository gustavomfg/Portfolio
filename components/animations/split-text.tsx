import type { CSSProperties } from "react";

interface SplitTextProps {
  text: string;
  className?: string;
}

export function SplitText({ text, className = "" }: SplitTextProps) {
  return (
    <span className={`split-text ${className}`.trim()}>
      <span className="sr-only">{text}</span>
      {[...text].map((character, index) => (
        <span
          aria-hidden="true"
          key={`${character}-${index}`}
          style={{ "--split-index": index } as CSSProperties}
        >
          {character === " " ? "\u00a0" : character}
        </span>
      ))}
    </span>
  );
}
