interface Dot {
  x: number;
  y: number;
  size: number;
  opacity: number;
}

const DOTS: readonly (Dot & { glow?: boolean })[] = [
  { x: 8, y: 12, size: 1, opacity: 0.09 },
  { x: 88, y: 8, size: 2, opacity: 0.14 },
  { x: 12, y: 82, size: 1, opacity: 0.07 },
  { x: 85, y: 78, size: 1, opacity: 0.10 },

  { x: 5, y: 48, size: 1, opacity: 0.07 },
  { x: 92, y: 62, size: 1, opacity: 0.08 },
  { x: 72, y: 15, size: 1, opacity: 0.09 },
  { x: 25, y: 25, size: 2, opacity: 0.12 },

  { x: 47, y: 38, size: 3, opacity: 0.20, glow: true },
  { x: 55, y: 35, size: 1, opacity: 0.13 },
  { x: 42, y: 44, size: 1, opacity: 0.11 },
  { x: 68, y: 45, size: 4, opacity: 0.10, glow: true },
];

export function LightField() {
  return (
    <div className="light-field" aria-hidden="true">
      {DOTS.map((dot, index) => (
        <span
          key={index}
          className={`light-dot${dot.glow ? " light-dot--glow" : ""}`}
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            opacity: dot.opacity,
          }}
        />
      ))}
    </div>
  );
}
