import React, { useEffect, useRef, useState } from "react";

const TID = {
  // Header
  headerNavCapabilities: "header-nav-capabilities",
  headerNavApproach: "header-nav-approach",
  headerNavStrategy: "header-nav-strategy",
  headerNavContact: "header-nav-contact",
  headerClock: "header-clock",
  headerLogo: "header-logo",
  headerCloseBox: "header-close-box",
  // Hero
  heroPrimaryCta: "hero-primary-cta",
  heroSecondaryCta: "hero-secondary-cta",
  heroDiagram: "hero-tech-diagram",
  heroEyebrow: "hero-eyebrow",
  // Marquee
  marqueeBand: "marquee-band",
  // Capabilities
  capabilityRow: (i) => `capability-row-${i}`,
  capabilityToggle: (i) => `capability-toggle-${i}`,
  // Approach
  approachRow: (i) => `approach-row-${i}`,
  // Realize / CTA
  finalCta: "final-cta-button",
  // Footer
  footerLinkCap: "footer-link-capabilities",
  footerLinkApp: "footer-link-approach",
  footerLinkSrv: "footer-link-strategy",
  footerLinkExt: "footer-link-external",
};

/* ============ small helpers ============ */
const useReveal = () => {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
};

const useClock = () => {
  const [t, setT] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return t.toLocaleTimeString("de-DE", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "America/Chicago",
  });
};

/* ============ corner: technical drawing diagram ============ */
const HeroDiagram = () => (
  <div
    data-testid={TID.heroDiagram}
    className="reveal"
    style={{
      width: 280,
      height: 280,
      flexShrink: 0,
      position: "relative",
    }}
  >
    <div
      className="font-mono"
      style={{
        position: "absolute",
        inset: 0,
        border: "1px solid rgba(13,13,13,0.18)",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 6,
          left: 10,
          fontSize: 10,
          color: "var(--muted)",
        }}
      >
        REF · HGD–0241
      </div>
      <div
        style={{
          position: "absolute",
          top: 6,
          right: 10,
          fontSize: 10,
          color: "var(--muted)",
        }}
      >
        +
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 6,
          left: 10,
          fontSize: 10,
          color: "var(--muted)",
        }}
      >
        +
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 6,
          right: 10,
          fontSize: 10,
          color: "var(--muted)",
        }}
      >
        REV 02 / 2026
      </div>

      <svg
        viewBox="0 0 280 280"
        width="100%"
        height="100%"
        style={{ display: "block" }}
      >
        {/* grid */}
        <g stroke="rgba(13,13,13,0.10)" strokeWidth="0.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={`h${i}`} x1="0" y1={40 + i * 40} x2="280" y2={40 + i * 40} />
          ))}
          {Array.from({ length: 6 }).map((_, i) => (
            <line key={`v${i}`} x1={40 + i * 40} y1="0" x2={40 + i * 40} y2="280" />
          ))}
        </g>
        {/* center cross */}
        <line x1="20" y1="140" x2="260" y2="140" stroke="rgba(13,13,13,0.45)" strokeWidth="0.6" strokeDasharray="2 4" />
        <line x1="140" y1="20" x2="140" y2="260" stroke="rgba(13,13,13,0.45)" strokeWidth="0.6" strokeDasharray="2 4" />
        {/* outer arc circle */}
        <circle cx="140" cy="140" r="100" fill="none" stroke="rgba(13,13,13,0.7)" strokeWidth="0.9" />
        <circle cx="140" cy="140" r="68" fill="none" stroke="rgba(13,13,13,0.55)" strokeWidth="0.7" />
        {/* tick marks around */}
        {Array.from({ length: 32 }).map((_, i) => {
          const a = (i / 32) * Math.PI * 2;
          const x1 = 140 + Math.cos(a) * 100;
          const y1 = 140 + Math.sin(a) * 100;
          const x2 = 140 + Math.cos(a) * (i % 4 === 0 ? 90 : 95);
          const y2 = 140 + Math.sin(a) * (i % 4 === 0 ? 90 : 95);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(13,13,13,0.7)"
              strokeWidth="0.7"
            />
          );
        })}
        {/* fill curve representing payoff */}
        <path
          d="M40 200 L120 200 L180 80 L240 80"
          fill="none"
          stroke="var(--rust)"
          strokeWidth="1.6"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        <circle cx="120" cy="200" r="3" fill="var(--rust)" />
        <circle cx="180" cy="80" r="3" fill="var(--ink)" />
        <text
          x="186"
          y="76"
          fontSize="8"
          fill="var(--ink)"
          fontFamily="JetBrains Mono"
        >
          BE 2.418
        </text>
        <text
          x="148"
          y="135"
          fontSize="9"
          fill="rgba(13,13,13,0.55)"
          fontFamily="JetBrains Mono"
        >
          Ø 100
        </text>
        {/* CHI marker */}
        <circle cx="208" cy="72" r="3.6" fill="var(--rust)" />
        <text x="216" y="76" fontSize="8" fill="var(--rust)" fontFamily="JetBrains Mono">
          CHI · 2ms
        </text>
      </svg>
    </div>
  </div>
);

/* ============ Capability row (expandable) ============ */
const CapabilityRow = ({ i, num, label, italic, meta, body, onDark }) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="row-cap reveal"
      data-testid={TID.capabilityRow(i)}
      style={{
        borderTop: onDark ? "1px solid var(--rule-dark)" : "1px solid var(--rule)",
      }}
    >
      <button
        type="button"
        data-testid={TID.capabilityToggle(i)}
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          padding: "26px 0",
          display: "grid",
          gridTemplateColumns: "60px 1fr auto auto",
          gap: 18,
          alignItems: "center",
          cursor: "pointer",
          textAlign: "left",
          color: "inherit",
        }}
      >
        <span className="font-mono label">{num}</span>
        <span className="font-serif" style={{ fontSize: "clamp(28px,4.2vw,56px)", fontWeight: 500, lineHeight: 1.05 }}>
          {label}{" "}
          <span className="h-italic">{italic}</span>
        </span>
        <span className="font-mono label" style={{ marginRight: 18 }}>
          {meta}
        </span>
        <span
          aria-hidden
          style={{
            width: 22,
            height: 22,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            transform: open ? "rotate(45deg)" : "rotate(0)",
            transition: "transform 0.25s",
            fontFamily: "JetBrains Mono",
            fontSize: 18,
            color: open ? "var(--rust)" : "currentColor",
          }}
        >
          +
        </span>
      </button>
      <div
        style={{
          maxHeight: open ? 200 : 0,
          overflow: "hidden",
          transition: "max-height 0.4s ease",
          marginLeft: 78,
          paddingRight: 40,
        }}
      >
        <p
          style={{
            paddingBottom: 28,
            color: onDark ? "rgba(255,255,255,0.7)" : "var(--muted)",
            fontFamily: "Inter, sans-serif",
            fontSize: 15.5,
            lineHeight: 1.6,
            maxWidth: 720,
          }}
        >
          {body}
        </p>
      </div>
    </div>
  );
};

/* ============ Approach row (BRAND → END PRODUCT) ============ */
const ApproachRow = ({ i, left, right }) => (
  <div
    data-testid={TID.approachRow(i)}
    className="row-cap"
    style={{
      borderTop: "1px solid var(--rule-dark)",
      padding: "22px 0",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 24,
    }}
  >
    <span
      className="font-mono"
      style={{
        color: "rgba(255,255,255,0.75)",
        fontSize: 13,
        letterSpacing: "0.12em",
      }}
    >
      {left}
    </span>
    <span
      className="font-mono"
      style={{
        color: "var(--rust-bright)",
        fontSize: 13,
        letterSpacing: "0.12em",
      }}
    >
      → {right}
    </span>
  </div>
);

/* ============ Main page ============ */
export default function HonigdaxLanding() {
  useReveal();
  const clock = useClock();
  const yearRef = useRef(new Date().getFullYear());

  const capabilities = [
    {
      num: "01 /",
      label: "DOM",
      italic: "Scalping",
      meta: "ORDER BOOK · 2ms · CHI",
      body:
        "Order-Book in Echtzeit, Klick-Trading direkt auf der Markttiefe. Fills in 2 Millisekunden — colociert in Chicago, sauberer Edge bei jedem Tick.",
    },
    {
      num: "02 /",
      label: "Optionen",
      italic: "Lifecycle",
      meta: "CHAIN · GREEKS · SPREADS",
      body:
        "Live Options-Chain, Greeks in Echtzeit, Multi-Leg-Strategien per Klick oder Stimme. Vom Strike bis zum Spread — der komplette Workflow im Cockpit.",
    },
    {
      num: "03 /",
      label: "KI",
      italic: "Kommentator",
      meta: "VOICE · LIVE · BAR-BY-BAR",
      body:
        "Die KI liest deinen Chart Bar für Bar, kommentiert live und nimmt natürliche Sprache als Befehl. 81 Tools, eine Schnittstelle.",
    },
    {
      num: "04 /",
      label: "HoneyScript",
      italic: "Studio",
      meta: "SCRIPT · CLI · PIPE",
      body:
        "Strategien programmatisch deployen, debuggen und chainen. JSON-Output, pipe-fähige CLI, kompletter Workflow automatisierbar.",
    },
    {
      num: "05 /",
      label: "Frühausstieg",
      italic: "& Breakout",
      meta: "MOMENTUM · ALERTS · RISK",
      body:
        "Drehendes Momentum erkannt, Breakout in Echtzeit signalisiert — du bist im Move, bevor die Masse ihn überhaupt sieht.",
    },
    {
      num: "06 /",
      label: "Strategie",
      italic: "Lab",
      meta: "PLAN · ANALYZE · BACKTEST",
      body:
        "Optionen und HoneyScript bis ins Detail planen, Drawdown und Win-Rate gegen echte Historie messen — KI-ausgewertet vor jedem realen Trade.",
    },
  ];

  const approach = [
    { left: "TRADER", right: "EDGE" },
    { left: "HEDGER", right: "COVERED" },
    { left: "QUANT", right: "DEPLOYED" },
    { left: "SCALPER", right: "2 MS FILLED" },
  ];

  return (
    <div className="paper-grain" style={{ background: "var(--paper)", color: "var(--ink)", position: "relative" }}>
      {/* ============== HEADER ============== */}
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: "20px 36px",
          display: "grid",
          gridTemplateColumns: "auto 1fr auto",
          alignItems: "center",
          gap: 24,
          backdropFilter: "blur(2px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <a
            href="#top"
            className="x-box"
            data-testid={TID.headerCloseBox}
            aria-label="Top"
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1 L11 11 M11 1 L1 11" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </a>
          <div
            className="font-mono label label-strong"
            data-testid={TID.headerLogo}
            style={{ fontSize: 12, fontWeight: 600 }}
          >
            HONIGDAX <span style={{ color: "var(--muted)", margin: "0 6px" }}>/</span> TRADING COCKPIT.
          </div>
        </div>

        <nav
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 36,
          }}
        >
          <a className="tlink" href="#capabilities" data-testid={TID.headerNavCapabilities}>
            Capabilities
          </a>
          <a className="tlink" href="#approach" data-testid={TID.headerNavApproach}>
            Approach
          </a>
          <a className="tlink" href="#strategy" data-testid={TID.headerNavStrategy}>
            Strategy Lab
          </a>
          <a className="tlink" href="#contact" data-testid={TID.headerNavContact}>
            Contact
          </a>
        </nav>

        <div
          className="font-mono label"
          data-testid={TID.headerClock}
          style={{ display: "flex", gap: 14, alignItems: "center", fontSize: 12 }}
        >
          <span className="dot-pulse" />
          <span>CHICAGO · {clock}</span>
        </div>
      </header>

      {/* ============== HERO ============== */}
      <section
        id="top"
        style={{
          padding: "120px 36px 60px",
          minHeight: "100vh",
          position: "relative",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: 40,
        }}
      >
        <div
          className="font-mono label idx reveal"
          data-testid={TID.heroEyebrow}
          style={{ paddingTop: 22 }}
        >
          <span className="bar" />
          <span>(01) IBKR · MADE FOR THE EDGE</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", alignItems: "end", gap: 60 }}>
          <h1 className="h-display reveal" style={{ fontSize: "clamp(64px, 11vw, 196px)", marginTop: 28 }}>
            Scalpe in
            <br />
            <span className="h-italic" style={{ fontSize: "1em" }}>2 ms.</span>
          </h1>
          <HeroDiagram />
        </div>

        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "end", marginTop: 12 }}>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 16,
              maxWidth: 480,
              lineHeight: 1.6,
              color: "var(--ink)",
            }}
          >
            HonigDAX ist das KI-native Trading-Cockpit auf Interactive Brokers — colociert in Chicago, gebaut für DOM-Scalping, Optionen und HoneyScript. Vom Order-Book bis zum Backtest, eine Schnittstelle.
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a
              href="#contact"
              className="pill"
              data-testid={TID.heroPrimaryCta}
            >
              Enter honigdax.com
              <span className="arr">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M3 9 L9 3 M9 3 H4 M9 3 V8" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </span>
            </a>
            <a href="#capabilities" className="tlink" data-testid={TID.heroSecondaryCta} style={{ alignSelf: "center" }}>
              See Capabilities →
            </a>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginTop: 60,
          }}
        >
          <div className="font-mono label">
            SCROLL · ENTER THE COCKPIT
          </div>
          <div
            aria-hidden
            style={{
              width: 18,
              height: 28,
              borderRadius: 12,
              border: "1px solid rgba(13,13,13,0.4)",
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: 6,
                left: "50%",
                transform: "translateX(-50%)",
                width: 2,
                height: 6,
                background: "var(--ink)",
                borderRadius: 2,
                animation: "dotp 1.6s ease-out infinite",
              }}
            />
          </div>
          <div className="font-mono label">
            (02) CAPABILITIES — NEXT
          </div>
        </div>
      </section>

      {/* ============== MARQUEE ============== */}
      <div className="marquee" data-testid={TID.marqueeBand}>
        <div className="marquee-track">
          <span>DOM</span><span>Scalping</span>
          <span>Optionen</span><span>Trading</span>
          <span>KI</span><span>Kommentator</span>
          <span>HoneyScript</span><span>Studio</span>
          <span>Chicago</span><span>Colocation</span>
          <span>Strategie</span><span>Lab</span>
          {/* duplicate for seamless loop */}
          <span>DOM</span><span>Scalping</span>
          <span>Optionen</span><span>Trading</span>
          <span>KI</span><span>Kommentator</span>
          <span>HoneyScript</span><span>Studio</span>
          <span>Chicago</span><span>Colocation</span>
          <span>Strategie</span><span>Lab</span>
        </div>
      </div>

      {/* ============== CAPABILITIES ============== */}
      <section id="capabilities" style={{ padding: "120px 36px 80px" }}>
        <div
          className="font-mono label idx reveal"
          style={{ marginBottom: 56 }}
        >
          <span className="bar" />
          <span>(02) CAPABILITIES</span>
        </div>

        <h2
          className="h-display reveal"
          style={{
            fontSize: "clamp(38px, 5.5vw, 84px)",
            marginLeft: "30%",
            maxWidth: 1000,
            marginBottom: 64,
          }}
        >
          One cockpit, the <span className="h-italic">full</span> trading lifecycle — vom DOM bis zum Backtest.
        </h2>

        <div>
          {capabilities.map((c, i) => (
            <CapabilityRow
              key={c.num}
              i={i}
              num={c.num}
              label={c.label}
              italic={c.italic}
              meta={c.meta}
              body={c.body}
            />
          ))}
          <div style={{ borderTop: "1px solid var(--rule)" }} />
        </div>
      </section>

      {/* ============== APPROACH (BLACK) ============== */}
      <section
        id="approach"
        className="paper-grain dark on-dark"
        style={{
          background: "var(--ink-2)",
          color: "#fff",
          padding: "120px 36px",
          position: "relative",
        }}
      >
        <div className="font-mono label idx reveal" style={{ marginBottom: 56 }}>
          <span className="bar" style={{ background: "rgba(255,255,255,0.5)" }} />
          <span>(03) APPROACH</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 80, alignItems: "start" }}>
          <h2
            className="h-display reveal"
            style={{ fontSize: "clamp(36px, 4.6vw, 68px)", maxWidth: 680 }}
          >
            We handle the latency — <span className="h-italic" style={{ color: "var(--rust-bright)" }}>so you focus on the trade</span> while we take care of the rest.
          </h2>
          <div className="reveal" style={{ paddingTop: 12 }}>
            {approach.map((r, i) => (
              <ApproachRow key={r.left} i={i} left={r.left} right={r.right} />
            ))}
            <div style={{ borderTop: "1px solid var(--rule-dark)" }} />
          </div>
        </div>

        {/* stats strip */}
        <div
          className="reveal"
          style={{
            marginTop: 96,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 32,
            borderTop: "1px solid var(--rule-dark)",
            borderBottom: "1px solid var(--rule-dark)",
            padding: "32px 0",
          }}
        >
          {[
            { v: "2 ms", l: "Order → Fill · CHI" },
            { v: "81", l: "KI-Tools eingebaut" },
            { v: "24 / 7", l: "KI-Marktbeobachtung" },
            { v: "99.9 %", l: "Cockpit-Uptime" },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-serif" style={{ fontSize: "clamp(36px, 4.5vw, 64px)", fontWeight: 700, letterSpacing: "-0.02em" }}>
                {s.v}
              </div>
              <div className="font-mono label" style={{ color: "rgba(255,255,255,0.55)", marginTop: 6 }}>
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============== STRATEGY LAB ============== */}
      <section
        id="strategy"
        style={{ padding: "120px 36px 60px", position: "relative" }}
      >
        <div className="font-mono label idx reveal" style={{ marginBottom: 40 }}>
          <span className="bar" />
          <span>(04) STRATEGY LAB</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <h2
            className="h-display reveal"
            style={{ fontSize: "clamp(38px, 5vw, 76px)", maxWidth: 560 }}
          >
            Plane.
            <br />
            Analysiere.
            <br />
            <span className="h-italic">Backteste.</span>
          </h2>

          <div className="reveal" style={{ fontFamily: "Inter, sans-serif" }}>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "var(--ink)", maxWidth: 520, marginBottom: 28 }}>
              Das genialste Strategie-Tool für ambitionierte Anleger: Optionsstrategien und HoneyScript bis ins Detail planen, das Risiko sauber analysieren und gegen echte Markthistorie backtesten — Drawdown, Win-Rate und Edge KI-ausgewertet, bevor du echtes Kapital riskierst.
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {[
                ["Plan", "Strikes, Expiries, Hedges. Risiko & Margin live."],
                ["Analyze", "Greeks, IV-Surface, Skew & Vol-Term-Struktur."],
                ["Backtest", "Reale COMEX-Historie, KI-ausgewertete Edge & Drawdown."],
              ].map(([k, v]) => (
                <li
                  key={k}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "140px 1fr",
                    gap: 24,
                    padding: "14px 0",
                    borderTop: "1px solid var(--rule)",
                  }}
                >
                  <span className="font-mono label label-strong" style={{ fontWeight: 600 }}>
                    {k}
                  </span>
                  <span style={{ color: "var(--muted)", fontSize: 15.5 }}>{v}</span>
                </li>
              ))}
              <li style={{ borderTop: "1px solid var(--rule)" }} />
            </ul>
          </div>
        </div>
      </section>

      {/* ============== REALIZE / CTA ============== */}
      <section
        id="contact"
        style={{ padding: "120px 36px 200px", textAlign: "center", position: "relative" }}
      >
        <div
          className="font-mono label reveal"
          style={{ marginBottom: 36, color: "var(--muted)" }}
        >
          (05) ENTER
        </div>
        <h2
          className="h-display reveal"
          style={{
            fontSize: "clamp(64px, 9vw, 144px)",
            marginBottom: 12,
          }}
        >
          Let&rsquo;s{" "}
          <span className="h-italic">trade</span>
        </h2>
        <h2
          className="h-display reveal"
          style={{ fontSize: "clamp(64px, 9vw, 144px)", marginBottom: 56 }}
        >
          it together.
        </h2>

        <a
          href="https://honigdax.com"
          className="pill reveal"
          data-testid={TID.finalCta}
          style={{ padding: "18px 28px", fontSize: 15 }}
        >
          Visit honigdax.com
          <span className="arr">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M3 9 L9 3 M9 3 H4 M9 3 V8" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </span>
        </a>

        <p className="font-mono label reveal" style={{ marginTop: 32, color: "var(--muted)" }}>
          INVITE&nbsp;ONLY · KEIN SPAM · NUR DER PLATZ IN DER WARTESCHLANGE
        </p>
      </section>

      {/* ============== FOOTER ============== */}
      <footer
        style={{
          borderTop: "1px solid var(--rule)",
          padding: "48px 36px 40px",
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
          gap: 40,
        }}
      >
        <div>
          <div className="font-serif" style={{ fontSize: 28, fontWeight: 700 }}>
            HonigDAX<span style={{ color: "var(--rust)" }}>.</span>
          </div>
          <p style={{ marginTop: 12, color: "var(--muted)", fontFamily: "Inter, sans-serif", fontSize: 14, lineHeight: 1.6, maxWidth: 280 }}>
            KI-natives Trading-Cockpit. Exklusives Frontend für Interactive Brokers. Colociert in Chicago.
          </p>
        </div>

        <div>
          <div className="font-mono label" style={{ marginBottom: 14 }}>Navigate</div>
          <div style={{ display: "grid", gap: 10 }}>
            <a className="tlink" href="#capabilities" data-testid={TID.footerLinkCap}>Capabilities</a>
            <a className="tlink" href="#approach" data-testid={TID.footerLinkApp}>Approach</a>
            <a className="tlink" href="#strategy" data-testid={TID.footerLinkSrv}>Strategy Lab</a>
          </div>
        </div>

        <div>
          <div className="font-mono label" style={{ marginBottom: 14 }}>Location</div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 14.5 }}>
            Chicago · Illinois
            <div style={{ color: "var(--muted)", marginTop: 6 }}>Colocated at the COMEX matching engine</div>
          </div>
        </div>

        <div>
          <div className="font-mono label" style={{ marginBottom: 14 }}>Connect</div>
          <a className="tlink" href="https://honigdax.com" target="_blank" rel="noreferrer" data-testid={TID.footerLinkExt}>
            www.honigdax.com ↗
          </a>
        </div>

        <div
          style={{
            gridColumn: "1 / -1",
            marginTop: 36,
            paddingTop: 24,
            borderTop: "1px solid var(--rule)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <div className="font-mono label">© {yearRef.current} HONIGDAX · DAS EXKLUSIVE IBKR-FRONTEND</div>
          <div className="font-mono label">CONCEPT / TRADING SYSTEM</div>
        </div>

        <p
          style={{
            gridColumn: "1 / -1",
            color: "var(--muted-2)",
            fontFamily: "Inter, sans-serif",
            fontSize: 11.5,
            lineHeight: 1.6,
            maxWidth: 980,
            margin: "20px auto 0",
            textAlign: "center",
          }}
        >
          Trading mit Futures, Optionen und Derivaten ist mit erheblichen Risiken verbunden und nicht für jeden Anleger geeignet. Latenz-Angaben beschreiben Zielwerte der Infrastruktur. HonigDAX ist ein unabhängiges Frontend und steht in keiner offiziellen Verbindung zu Interactive Brokers, der COMEX oder der CME Group. Keine Anlageberatung.
        </p>
      </footer>
    </div>
  );
}
