import React from "react";

export const ConfluenceRadar = ({ sources, signal }) => {
  const R = 130;
  const cx = 200;
  const cy = 175;
  const angle = (i) => (Math.PI * 2 * i) / sources.length - Math.PI / 2;
  const pt = (i, r) => [cx + Math.cos(angle(i)) * r, cy + Math.sin(angle(i)) * r];
  const polygon = sources
    .map((s, i) => {
      const [x, y] = pt(i, s.weight * R);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");
  return (
    <div
      data-testid="confluence-radar"
      className="reveal"
      style={{
        width: "100%",
        border: "1px solid var(--rule)",
        background: "rgba(255,255,255,0.4)",
        padding: 22,
        position: "relative",
        fontFamily: "JetBrains Mono, monospace",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 11,
          letterSpacing: "0.08em",
          color: "var(--muted)",
          marginBottom: 8,
        }}
      >
        <span>RADAR · 6 STIMMEN</span>
        <span style={{ color: "var(--rust)" }}>● {signal.label}</span>
      </div>

      <svg viewBox="0 0 400 360" width="100%" height="auto" style={{ display: "block" }}>
        {/* concentric rings */}
        {[0.25, 0.5, 0.75, 1].map((r, i) => (
          <polygon
            key={i}
            points={sources
              .map((_, j) => {
                const [x, y] = pt(j, r * R);
                return `${x.toFixed(1)},${y.toFixed(1)}`;
              })
              .join(" ")}
            fill="none"
            stroke="rgba(13,13,13,0.10)"
            strokeWidth="0.6"
          />
        ))}
        {/* axis spokes */}
        {sources.map((_, i) => {
          const [x, y] = pt(i, R);
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="rgba(13,13,13,0.15)"
              strokeWidth="0.5"
            />
          );
        })}
        {/* threshold ring at 60 % (rust dashed) */}
        <polygon
          points={sources
            .map((_, j) => {
              const [x, y] = pt(j, 0.6 * R);
              return `${x.toFixed(1)},${y.toFixed(1)}`;
            })
            .join(" ")}
          fill="none"
          stroke="var(--rust)"
          strokeWidth="0.9"
          strokeDasharray="4 4"
          opacity="0.6"
        />
        {/* value polygon */}
        <polygon
          points={polygon}
          fill="rgba(196,74,31,0.18)"
          stroke="var(--rust)"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* value dots */}
        {sources.map((s, i) => {
          const [x, y] = pt(i, s.weight * R);
          return <circle key={i} cx={x} cy={y} r="3.4" fill="var(--rust)" />;
        })}

        {/* center score badge */}
        <g>
          <circle cx={cx} cy={cy} r="34" fill="#0d0d0d" />
          <text
            x={cx}
            y={cy - 4}
            textAnchor="middle"
            fill="#fff"
            fontSize="20"
            fontWeight="700"
            fontFamily="Playfair Display"
          >
            {signal.pct}
          </text>
          <text
            x={cx}
            y={cy + 12}
            textAnchor="middle"
            fill="rgba(255,255,255,0.55)"
            fontSize="8"
            letterSpacing="0.12em"
          >
            CONSENSUS
          </text>
        </g>

        {/* axis labels */}
        {sources.map((s, i) => {
          const [x, y] = pt(i, R + 22);
          let anchor = "middle";
          if (x < cx - 10) anchor = "end";
          else if (x > cx + 10) anchor = "start";
          return (
            <text
              key={i}
              x={x}
              y={y + 4}
              textAnchor={anchor}
              fill="rgba(13,13,13,0.7)"
              fontSize="10"
              letterSpacing="0.1em"
              fontFamily="JetBrains Mono"
            >
              {s.code}
            </text>
          );
        })}
      </svg>

      {/* Signal banner */}
      <div
        style={{
          marginTop: 12,
          background: "var(--ink-2)",
          color: "#fff",
          padding: "14px 18px",
          display: "flex",
          alignItems: "center",
          gap: 14,
          flexWrap: "wrap",
        }}
      >
        <span style={{ width: 9, height: 9, borderRadius: 999, background: "#5dba8a", boxShadow: "0 0 0 0 rgba(93,186,138,0.6)", animation: "dotp 1.8s infinite" }} />
        <span className="font-serif" style={{ fontSize: 17, fontWeight: 600 }}>
          {signal.title}
        </span>
        <span className="font-mono" style={{ color: "var(--rust-bright)", fontSize: 13 }}>{signal.pct}</span>
        <span style={{ flex: 1 }} />
        <span className="font-mono" style={{ color: "rgba(255,255,255,0.65)", fontSize: 11, letterSpacing: "0.08em", display: "flex", gap: 10, flexWrap: "wrap" }}>
          {signal.tags.map((tg) => <span key={tg}>{tg}</span>)}
        </span>
      </div>
      <div className="font-mono label" style={{ marginTop: 8, color: "var(--muted)" }}>
        {signal.sub}
      </div>
    </div>
  );
};

export default ConfluenceRadar;
