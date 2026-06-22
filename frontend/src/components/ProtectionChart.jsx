import React from "react";

export const ProtectionChart = ({ labels }) => (
  <div
    data-testid="protection-chart"
    className="reveal"
    style={{
      width: "100%",
      maxWidth: 540,
      fontFamily: "JetBrains Mono, monospace",
      position: "relative",
      border: "1px solid rgba(13,13,13,0.18)",
      background: "rgba(255,255,255,0.4)",
      padding: 18,
    }}
  >
    <span style={{ position: "absolute", top: 4, left: 6, fontSize: 11, color: "var(--muted)" }}>+</span>
    <span style={{ position: "absolute", top: 4, right: 6, fontSize: 11, color: "var(--muted)" }}>+</span>
    <span style={{ position: "absolute", bottom: 4, left: 6, fontSize: 11, color: "var(--muted)" }}>+</span>
    <span style={{ position: "absolute", bottom: 4, right: 6, fontSize: 11, color: "var(--muted)" }}>+</span>

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: 10,
        color: "var(--muted)",
        letterSpacing: "0.06em",
        marginBottom: 10,
      }}
    >
      <span>REF · STOP-DOM v4</span>
      <span>LIVE · TRAILING</span>
    </div>

    <svg viewBox="0 0 520 320" width="100%" height="auto" style={{ display: "block" }}>
      <defs>
        <linearGradient id="profitFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(196,74,31,0.18)" />
          <stop offset="1" stopColor="rgba(196,74,31,0)" />
        </linearGradient>
      </defs>

      {/* grid */}
      <g stroke="rgba(13,13,13,0.08)" strokeWidth="0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={`h${i}`} x1="30" y1={60 + i * 50} x2="500" y2={60 + i * 50} />
        ))}
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={30 + i * 58} y1="30" x2={30 + i * 58} y2="290" />
        ))}
      </g>

      {/* zero line */}
      <line x1="30" y1="240" x2="500" y2="240" stroke="rgba(13,13,13,0.2)" strokeWidth="0.6" />

      {/* profit area under price */}
      <path
        d="M40 240 L100 240 L100 220 L160 220 L160 200 L220 200 L220 170 L280 170 L280 140 L340 140 L340 115 L400 115 L400 95 L460 95 L460 80 L490 80 L490 240 Z"
        fill="url(#profitFill)"
        opacity="0.9"
      />

      {/* price line (step / candles) */}
      <path
        d="M40 240 L100 240 L100 220 L160 220 L160 200 L220 200 L220 170 L280 170 L280 140 L340 140 L340 115 L400 115 L400 95 L460 95 L460 80 L490 80"
        fill="none"
        stroke="#0d0d0d"
        strokeWidth="2"
        strokeLinejoin="miter"
        strokeLinecap="square"
      />

      {/* trailing stop — dashed rust line that climbs but stays below price */}
      <path
        d="M40 268 L100 268 L100 250 L160 250 L160 232 L220 232 L220 210 L280 210 L280 188 L340 188 L340 160 L400 160 L400 138 L460 138 L460 120 L490 120"
        fill="none"
        stroke="var(--rust)"
        strokeWidth="1.8"
        strokeDasharray="6 5"
        strokeLinecap="round"
      />

      {/* FILLED marker (entry) */}
      <line x1="40" y1="240" x2="40" y2="298" stroke="rgba(13,13,13,0.45)" strokeWidth="0.7" strokeDasharray="2 3" />
      <circle cx="40" cy="240" r="4" fill="#0d0d0d" />
      <text x="46" y="304" fill="rgba(13,13,13,0.6)" fontSize="9.5" fontFamily="JetBrains Mono" letterSpacing="0.08em">
        {labels.filledAt}
      </text>

      {/* NOW marker (price tip) */}
      <circle cx="490" cy="80" r="4.5" fill="var(--rust)" />
      <line x1="490" y1="80" x2="490" y2="120" stroke="rgba(196,74,31,0.5)" strokeWidth="0.6" />
      <text x="498" y="76" fill="var(--rust)" fontSize="9.5" fontFamily="JetBrains Mono" letterSpacing="0.08em" textAnchor="end" dx="-2">
        {labels.now}
      </text>
      {/* NOW marker (trailing stop tip) */}
      <circle cx="490" cy="120" r="3.5" fill="none" stroke="var(--rust)" strokeWidth="1.4" />

      {/* legend */}
      <g fontFamily="JetBrains Mono" fontSize="10" letterSpacing="0.06em">
        <line x1="38" y1="44" x2="64" y2="44" stroke="#0d0d0d" strokeWidth="2" />
        <text x="70" y="47" fill="rgba(13,13,13,0.75)">{labels.price}</text>

        <line x1="200" y1="44" x2="226" y2="44" stroke="var(--rust)" strokeWidth="2" strokeDasharray="5 4" />
        <text x="232" y="47" fill="rgba(196,74,31,0.95)">{labels.brokerStop}</text>

        <circle cx="40" cy="62" r="3" fill="none" stroke="rgba(13,13,13,0.55)" strokeDasharray="1 2" />
        <text x="50" y="65" fill="rgba(13,13,13,0.6)">{labels.smartExit} · client-side</text>
      </g>

      {/* smart-exit markers: small hollow dots above the price at hesitation points */}
      <g fill="none" stroke="rgba(13,13,13,0.55)" strokeDasharray="1 2">
        <circle cx="220" cy="186" r="3.2" />
        <circle cx="340" cy="126" r="3.2" />
        <circle cx="460" cy="84" r="3.2" />
      </g>
    </svg>

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
        fontSize: 10,
        color: "var(--muted)",
        letterSpacing: "0.06em",
      }}
    >
      <span>SCHEMATIC · NOT A TRADE RECOMMENDATION</span>
      <span style={{ color: "var(--rust)" }}>● ARMED</span>
    </div>
  </div>
);

export default ProtectionChart;
