import React from "react";

export const OrderflowHeatmap = ({ labels }) => (
  <div
    data-testid="orderflow-heatmap"
    className="reveal"
    style={{
      width: "100%",
      border: "1px solid var(--rule)",
      background: "#0c0c10",
      padding: 18,
      position: "relative",
      fontFamily: "JetBrains Mono, monospace",
      color: "rgba(255,255,255,0.85)",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: 10,
        letterSpacing: "0.08em",
        color: "rgba(255,255,255,0.55)",
        marginBottom: 12,
      }}
    >
      <span>FLOW · {labels.price} / {labels.time}</span>
      <span style={{ color: "var(--rust-bright)" }}>● LIVE · L2 + TAPE</span>
    </div>

    <svg viewBox="0 0 900 460" width="100%" height="auto" style={{ display: "block" }}>
      <defs>
        <radialGradient id="liq1" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="rgba(255,210,140,0.55)" />
          <stop offset="1" stopColor="rgba(255,210,140,0)" />
        </radialGradient>
        <radialGradient id="liq2" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="rgba(255,170,100,0.45)" />
          <stop offset="1" stopColor="rgba(255,170,100,0)" />
        </radialGradient>
        <radialGradient id="liqHi" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="rgba(255,235,180,0.95)" />
          <stop offset="0.55" stopColor="rgba(255,200,120,0.4)" />
          <stop offset="1" stopColor="rgba(255,200,120,0)" />
        </radialGradient>
        <linearGradient id="cvdFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(196,74,31,0.45)" />
          <stop offset="1" stopColor="rgba(196,74,31,0)" />
        </linearGradient>
      </defs>

      {/* grid (subtle, blueprint) */}
      <g stroke="rgba(255,255,255,0.05)" strokeWidth="0.5">
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`gh${i}`} x1="46" y1={36 + i * 36} x2="860" y2={36 + i * 36} />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`gv${i}`} x1={46 + i * 68} y1="20" x2={46 + i * 68} y2="320" />
        ))}
      </g>

      {/* axes labels */}
      <text x="6" y="180" fill="rgba(255,255,255,0.4)" fontSize="9" letterSpacing="0.1em" transform="rotate(-90, 14, 180)">
        {labels.price}
      </text>
      <text x="800" y="450" fill="rgba(255,255,255,0.4)" fontSize="9" letterSpacing="0.1em">
        {labels.time}
      </text>

      {/* RESTING LIQUIDITY heatmap "walls" */}
      {/* Big bid-wall lower (holds, then break) */}
      <ellipse cx="170" cy="232" rx="160" ry="22" fill="url(#liq1)" />
      <ellipse cx="270" cy="232" rx="140" ry="18" fill="url(#liq1)" />
      <ellipse cx="370" cy="232" rx="120" ry="16" fill="url(#liq2)" />
      {/* Wall that "breaks" — fades after price punches through */}
      <ellipse cx="440" cy="180" rx="100" ry="14" fill="url(#liq2)" />
      <ellipse cx="500" cy="180" rx="60" ry="10" fill="url(#liq1)" opacity="0.5" />
      {/* Ask wall holding (absorption) at top */}
      <ellipse cx="700" cy="92" rx="200" ry="18" fill="url(#liqHi)" />
      <ellipse cx="780" cy="92" rx="120" ry="14" fill="url(#liq1)" />
      {/* Spoofed wall (appears then vanishes) */}
      <ellipse cx="600" cy="148" rx="80" ry="10" fill="url(#liq1)" opacity="0.4" />

      {/* price step line */}
      <path
        d="M50 252 L120 252 L120 240 L190 240 L190 224 L260 224 L260 208 L330 208 L330 196 L400 196 L400 168 L470 168 L470 140 L540 140 L540 124 L610 124 L610 112 L680 112 L680 100 L750 100 L750 96 L820 96"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinejoin="miter"
        strokeLinecap="square"
      />

      {/* aggressive trade dots — buys (rust-warm) and sells (cool) along the path */}
      <g>
        {[
          [120, 248, "b"], [190, 234, "b"], [260, 218, "b"], [330, 200, "b"],
          [400, 184, "b"], [430, 174, "b"], [470, 152, "b"], [510, 138, "b"],
          [560, 132, "s"], [600, 126, "s"], [640, 118, "b"], [680, 108, "s"],
          [720, 104, "s"], [760, 98, "s"], [800, 100, "s"],
        ].map(([x, y, t], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={t === "b" ? 3.4 : 3.2}
            fill={t === "b" ? "#7fd6a4" : "#ec7a72"}
            opacity="0.95"
          />
        ))}
      </g>

      {/* BREAK marker */}
      <g transform="translate(440, 168)">
        <circle r="9" fill="none" stroke="var(--rust-bright)" strokeWidth="1.2" strokeDasharray="2 3" />
        <text x="14" y="3" fill="var(--rust-bright)" fontSize="9" letterSpacing="0.1em">{labels.brk}</text>
      </g>

      {/* ABSORPTION marker */}
      <g transform="translate(720, 92)">
        <circle r="11" fill="none" stroke="rgba(255,235,180,0.95)" strokeWidth="1.2" />
        <text x="16" y="-4" fill="rgba(255,235,180,0.95)" fontSize="9" letterSpacing="0.1em">{labels.abs}</text>
      </g>

      {/* CVD pane (below the main chart) */}
      <g transform="translate(0, 340)">
        <text x="46" y="-2" fill="rgba(255,255,255,0.5)" fontSize="9" letterSpacing="0.1em">{labels.cvd}</text>
        <line x1="46" y1="65" x2="860" y2="65" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
        {/* CVD line — rises then flattens while price keeps climbing (divergence) */}
        <path
          d="M50 80 L120 78 L190 70 L260 62 L330 52 L400 44 L470 36 L540 30 L610 32 L680 38 L750 44 L820 52"
          fill="url(#cvdFill)"
          stroke="var(--rust-bright)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        {/* divergence callout */}
        <line x1="610" y1="32" x2="610" y2="80" stroke="rgba(255,235,180,0.45)" strokeDasharray="2 3" strokeWidth="0.6" />
        <text x="616" y="44" fill="rgba(255,235,180,0.85)" fontSize="9" letterSpacing="0.1em">
          {labels.div}
        </text>
      </g>

      {/* legend at top */}
      <g fontSize="9" letterSpacing="0.08em">
        <rect x="46" y="18" width="14" height="6" fill="url(#liqHi)" />
        <text x="66" y="24" fill="rgba(255,255,255,0.6)">{labels.liq}</text>

        <circle cx="200" cy="21" r="3" fill="#7fd6a4" />
        <text x="210" y="24" fill="rgba(255,255,255,0.6)">{labels.buy}</text>

        <circle cx="290" cy="21" r="3" fill="#ec7a72" />
        <text x="300" y="24" fill="rgba(255,255,255,0.6)">{labels.sell}</text>

        <line x1="380" y1="21" x2="404" y2="21" stroke="#fff" strokeWidth="2" />
        <text x="412" y="24" fill="rgba(255,255,255,0.6)">{labels.price}</text>
      </g>
    </svg>

    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 12,
        fontSize: 10,
        letterSpacing: "0.08em",
        color: "rgba(255,255,255,0.45)",
      }}
    >
      <span>SCHEMATIC · L2 + TIME &amp; SALES · NOT A RECOMMENDATION</span>
      <span style={{ color: "var(--rust-bright)" }}>● ARMED</span>
    </div>
  </div>
);

export default OrderflowHeatmap;
