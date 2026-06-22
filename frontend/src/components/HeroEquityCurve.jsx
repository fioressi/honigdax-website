import React, { useMemo } from "react";

/**
 * HeroEquityCurve — slim editorial track-record sparkline for the Hero.
 *
 * Built from the public `perfRows` audit data (2020 → YTD).
 * Style: cream paper, black ink line, rust accent for the latest dot.
 * No SaaS gradients, no glow — pure technical drawing.
 */

// Yearly net returns (chronological), aligned with #track-record perfRows.
// 2020, 2021, 2022, 2023, 2024, 2025, 2026 YTD
const YEARS = ["2020", "2021", "2022", "2023", "2024", "2025", "2026"];
const RET = [0.337, 0.412, 0.094, 0.225, 0.278, 0.341, 0.184];

function cumulative(retArr) {
  let v = 1;
  return retArr.map((r) => {
    v = v * (1 + r);
    return v;
  });
}

export const HeroEquityCurve = ({
  labelTrack = "TRACK · LIVE",
  labelYtd = "YTD 2026",
  labelSeven = "7Y NET",
  ytdValue = "+18.4 %",
  netLabel = "+574 %",
  testid = "hero-equity-curve",
}) => {
  const { pts, finalPoint, baseline } = useMemo(() => {
    const W = 520;
    const H = 56;
    const padX = 6;
    const padY = 6;

    const equity = cumulative(RET); // starts >1
    // Include the starting "1.0" baseline as an implicit first point so the
    // line visibly grows from origin.
    const series = [1, ...equity];
    const min = Math.min(...series);
    const max = Math.max(...series);
    const step = (W - padX * 2) / (series.length - 1);

    const pts = series.map((v, i) => {
      const x = padX + i * step;
      const y = padY + (1 - (v - min) / (max - min)) * (H - padY * 2);
      return [x, y];
    });

    const baselineY = padY + (1 - (1 - min) / (max - min)) * (H - padY * 2);
    return { pts, finalPoint: pts[pts.length - 1], baseline: baselineY };
  }, []);

  const path = pts.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(" ");

  return (
    <div
      data-testid={testid}
      className="reveal"
      style={{
        marginTop: 28,
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        alignItems: "center",
        gap: 22,
        padding: "16px 18px",
        border: "1px solid var(--rule)",
        background: "rgba(255,255,255,0.42)",
        maxWidth: 880,
      }}
    >
      {/* Left meta */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4, minWidth: 120 }}>
        <div className="font-mono" style={{ fontSize: 10.5, letterSpacing: "0.14em", color: "var(--muted)" }}>
          {labelTrack}
        </div>
        <div className="font-serif" style={{ fontSize: 22, fontWeight: 500, lineHeight: 1 }}>
          <span style={{ color: "var(--rust)" }}>{netLabel}</span>
          <span className="font-mono" style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--muted)", marginLeft: 8 }}>
            {labelSeven}
          </span>
        </div>
      </div>

      {/* SVG curve */}
      <svg
        viewBox="0 0 520 56"
        preserveAspectRatio="none"
        width="100%"
        height="56"
        aria-hidden
        style={{ display: "block" }}
      >
        {/* zero / baseline */}
        <line x1="6" y1={baseline} x2="514" y2={baseline} stroke="rgba(13,13,13,0.18)" strokeDasharray="2 3" strokeWidth="0.7" />
        {/* year ticks */}
        {pts.slice(1).map((p, i) => (
          <line key={`t-${i}`} x1={p[0]} y1={baseline - 2} x2={p[0]} y2={baseline + 2} stroke="rgba(13,13,13,0.35)" strokeWidth="0.6" />
        ))}
        {/* equity line */}
        <path d={path} fill="none" stroke="var(--ink)" strokeWidth="1.3" />
        {/* final accent dot */}
        <circle cx={finalPoint[0]} cy={finalPoint[1]} r="3" fill="var(--rust)" />
        <circle cx={finalPoint[0]} cy={finalPoint[1]} r="6" fill="none" stroke="var(--rust)" strokeOpacity="0.4" strokeWidth="0.8" />
      </svg>

      {/* Right value */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4, textAlign: "right", minWidth: 96 }}>
        <div className="font-mono" style={{ fontSize: 10.5, letterSpacing: "0.14em", color: "var(--muted)" }}>
          {labelYtd}
        </div>
        <div className="font-serif" style={{ fontSize: 22, fontWeight: 500, lineHeight: 1, color: "var(--rust)" }}>
          {ytdValue}
        </div>
      </div>

      {/* Year axis (full width row beneath) */}
      <div
        className="font-mono"
        style={{
          gridColumn: "1 / -1",
          display: "grid",
          gridTemplateColumns: `120px 1fr 96px`,
          alignItems: "center",
          gap: 22,
          marginTop: 4,
        }}
      >
        <span />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9.5, letterSpacing: "0.14em", color: "var(--muted-2)" }}>
          {YEARS.map((y) => (
            <span key={y}>{y}</span>
          ))}
        </div>
        <span />
      </div>
    </div>
  );
};

export default HeroEquityCurve;
