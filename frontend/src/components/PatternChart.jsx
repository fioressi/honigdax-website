import React from "react";

export const PatternChart = ({ labels }) => {
  // 30 fake OHLC bars with deliberate patterns
  const candles = [
    [50,55,46,52,"u"],[52,56,49,51,"d"],[51,54,47,49,"d"],[49,53,46,52,"u"],[52,58,51,57,"u"],
    [57,60,55,56,"d"],[56,58,52,53,"d"],[53,57,51,56,"u"],[56,62,55,61,"u"],[61,66,60,65,"u"], // Bullish Engulfing zone
    [65,72,64,71,"u"],[71,78,70,77,"u"],[77,82,76,81,"u"],[81,86,79,85,"u"],[85,90,84,89,"u"], // run up to first top
    [89,92,86,87,"d"],[87,89,82,84,"d"],[84,86,80,85,"u"],[85,88,82,87,"u"],[87,91,86,90,"u"], // pull-back
    [90,92,88,89,"d"],[89,91,84,86,"d"],[86,89,82,84,"d"],[84,86,80,82,"d"],[82,84,78,79,"d"], // double top + drop
    [79,82,76,80,"u"],[80,82,78,79,"d"],[79,81,77,80,"u"],[80,82,78,81,"u"],[81,84,79,83,"u"], // triangle
  ];
  const W = 800;
  const H = 360;
  const padL = 30, padR = 30, padT = 30, padB = 50;
  const innerW = W - padL - padR;
  const innerH = H - padT - padB;
  const minP = 40, maxP = 100;
  const y = (p) => padT + ((maxP - p) / (maxP - minP)) * innerH;
  const cw = innerW / candles.length;

  return (
    <div
      data-testid="pattern-chart"
      className="reveal"
      style={{
        width: "100%",
        border: "1px solid var(--rule)",
        background: "#0c0c10",
        padding: 20,
        fontFamily: "JetBrains Mono, monospace",
        color: "rgba(255,255,255,0.85)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 12,
          fontSize: 11,
          letterSpacing: "0.08em",
          color: "rgba(255,255,255,0.55)",
        }}
      >
        <span>{labels.title}</span>
        <span style={{ color: "var(--rust-bright)" }}>🔍 PATTERNS · ON</span>
      </div>

      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="auto" style={{ display: "block" }}>
        <g stroke="rgba(255,255,255,0.05)" strokeWidth="0.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={i} x1={padL} y1={padT + i * (innerH / 5)} x2={W - padR} y2={padT + i * (innerH / 5)} />
          ))}
        </g>

        {/* Candles */}
        {candles.map((c, i) => {
          const [o, h, l, cl, dir] = c;
          const x = padL + i * cw + cw * 0.15;
          const bw = cw * 0.7;
          const col = dir === "u" ? "#5dba8a" : "#d88075";
          const yo = y(o), yc = y(cl), yh = y(h), yl = y(l);
          const top = Math.min(yo, yc);
          const bh = Math.max(2, Math.abs(yc - yo));
          return (
            <g key={i}>
              <line x1={x + bw / 2} y1={yh} x2={x + bw / 2} y2={yl} stroke={col} strokeWidth="1" />
              <rect x={x} y={top} width={bw} height={bh} fill={col} />
            </g>
          );
        })}

        {/* Bullish Engulfing tag (around candle index 8-9) */}
        <g>
          <rect x={padL + 8 * cw - 10} y={y(50)} width={cw * 2 + 20} height={innerH * 0.15} fill="rgba(93,186,138,0.12)" stroke="rgba(93,186,138,0.5)" />
          <line x1={padL + 9 * cw + cw / 2} y1={y(62)} x2={padL + 9 * cw + cw / 2} y2={y(74)} stroke="#5dba8a" strokeDasharray="2 3" />
          <g transform={`translate(${padL + 9 * cw + 8}, ${y(75)})`}>
            <rect x="0" y="-12" width="138" height="18" fill="rgba(93,186,138,0.92)" />
            <text x="69" y="1" textAnchor="middle" fill="#0d0d0d" fontSize="10" letterSpacing="0.08em" fontWeight="600">▲ {labels.tagBE}</text>
          </g>
        </g>

        {/* Double top — connect 2 peaks with neckline */}
        <g>
          <circle cx={padL + 14 * cw + cw / 2} cy={y(90)} r="4.5" fill="none" stroke="#d88075" strokeWidth="1.4" />
          <circle cx={padL + 19 * cw + cw / 2} cy={y(91)} r="4.5" fill="none" stroke="#d88075" strokeWidth="1.4" />
          <line x1={padL + 14 * cw + cw / 2} y1={y(90)} x2={padL + 19 * cw + cw / 2} y2={y(91)} stroke="#d88075" strokeWidth="1" strokeDasharray="4 3" />
          {/* neckline */}
          <line x1={padL + 14 * cw} y1={y(82)} x2={padL + 24 * cw} y2={y(82)} stroke="rgba(216,128,117,0.6)" strokeWidth="0.9" strokeDasharray="2 4" />
          <g transform={`translate(${padL + 16 * cw}, ${y(94)})`}>
            <rect x="0" y="-12" width="110" height="18" fill="rgba(216,128,117,0.92)" />
            <text x="55" y="1" textAnchor="middle" fill="#0d0d0d" fontSize="10" letterSpacing="0.08em" fontWeight="600">▼ {labels.tagDT}</text>
          </g>
          <text x={padL + 24 * cw + 4} y={y(82) + 3} fill="rgba(216,128,117,0.7)" fontSize="9" letterSpacing="0.08em">
            {labels.neck}
          </text>
        </g>

        {/* Ascending triangle on the right — two trendlines converging */}
        <g>
          <line x1={padL + 25 * cw} y1={y(82)} x2={padL + 30 * cw} y2={y(82)} stroke="rgba(196,74,31,0.85)" strokeWidth="1.2" />
          <line x1={padL + 25 * cw} y1={y(76)} x2={padL + 30 * cw} y2={y(80)} stroke="rgba(196,74,31,0.85)" strokeWidth="1.2" />
          <g transform={`translate(${padL + 25 * cw - 4}, ${y(73)})`}>
            <rect x="0" y="-12" width="140" height="18" fill="rgba(196,74,31,0.92)" />
            <text x="70" y="1" textAnchor="middle" fill="#fff" fontSize="10" letterSpacing="0.08em" fontWeight="600">△ {labels.tagTR}</text>
          </g>
        </g>
      </svg>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 10,
          fontSize: 10,
          letterSpacing: "0.08em",
          color: "rgba(255,255,255,0.45)",
        }}
      >
        <span>SCHEMATIC · BARS NOT REAL · TOGGLE WITH 🔍</span>
        <span style={{ color: "var(--rust-bright)" }}>● 3 PATTERNS DETECTED</span>
      </div>
    </div>
  );
};

export default PatternChart;
