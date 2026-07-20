export function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 36 36" focusable="false">
        <circle className="brand-mark__frame" cx="18" cy="18" r="15.5" />
        <path className="brand-mark__moon" d="M15 6a9 9 0 0 0 13.5 13.5A13.5 13.5 0 1 1 15 6Z" />
        <ellipse
          className="brand-mark__orbit"
          cx="18"
          cy="18"
          rx="15"
          ry="7.2"
          transform="rotate(-28 18 18)"
        />
        <circle className="brand-mark__satellite" cx="30.7" cy="10.1" r="1.6" />
      </svg>
    </span>
  );
}
