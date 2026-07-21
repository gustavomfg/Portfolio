interface Dot {
  x: number;
  y: number;
  size: number;
  opacity: number;
}

const DOTS: readonly (Dot & { glow?: boolean })[] = [
  { x: 48, y: 36, size: 2, opacity: 0.22 },
  { x: 53, y: 32, size: 1, opacity: 0.16 },
  { x: 44, y: 39, size: 3, opacity: 0.18, glow: true },
  { x: 56, y: 37, size: 1, opacity: 0.14 },

  { x: 42, y: 33, size: 1, opacity: 0.10 },
  { x: 50, y: 44, size: 1, opacity: 0.12 },
  { x: 37, y: 28, size: 1, opacity: 0.08 },
  { x: 62, y: 27, size: 2, opacity: 0.14 },

  { x: 30, y: 44, size: 1, opacity: 0.07 },
  { x: 66, y: 41, size: 1, opacity: 0.09 },
  { x: 40, y: 20, size: 1, opacity: 0.07 },
  { x: 58, y: 48, size: 4, opacity: 0.10, glow: true },
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
