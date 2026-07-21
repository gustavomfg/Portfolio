interface Dot {
  x: number;
  y: number;
  size: number;
  opacity: number;
}

const DOTS: readonly Dot[] = [
  { x: 48, y: 36, size: 1, opacity: 0.07 },
  { x: 52, y: 32, size: 1, opacity: 0.05 },
  { x: 45, y: 40, size: 2, opacity: 0.04 },
  { x: 55, y: 38, size: 1, opacity: 0.06 },
  { x: 43, y: 34, size: 1, opacity: 0.04 },
  { x: 50, y: 44, size: 1, opacity: 0.04 },
  { x: 35, y: 30, size: 1, opacity: 0.03 },
  { x: 62, y: 28, size: 1, opacity: 0.04 },
];

export function LightField() {
  return (
    <div className="light-field" aria-hidden="true">
      {DOTS.map((dot, index) => (
        <span
          key={index}
          className="light-dot"
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
