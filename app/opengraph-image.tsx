import { ImageResponse } from "next/og";

export const alt = "Gustavo Maquias — Nocturne Portfolio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "radial-gradient(circle at 72% 28%, #2a1854 0%, #0b0814 48%, #050408 100%)",
          color: "#f5f1ff",
          display: "flex",
          fontFamily: "monospace",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          width: "100%",
        }}
      >
        <div
          style={{
            border: "1px solid rgba(174, 135, 255, 0.35)",
            display: "flex",
            flexDirection: "column",
            height: "100%",
            justifyContent: "space-between",
            padding: "56px",
            width: "100%",
          }}
        >
          <div style={{ color: "#ae87ff", display: "flex", fontSize: 24, letterSpacing: "0.28em" }}>
            NOCTURNE PORTFOLIO
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", fontSize: 72, fontWeight: 700, letterSpacing: "-0.05em" }}>
              Gustavo Maquias
            </div>
            <div style={{ color: "#b9b2c7", display: "flex", fontSize: 30 }}>
              Software, arquitetura e ecossistema Nocturne.
            </div>
          </div>
          <div style={{ color: "#777083", display: "flex", fontSize: 20 }}>
            Análise e Desenvolvimento de Sistemas
          </div>
        </div>
      </div>
    ),
    size,
  );
}
