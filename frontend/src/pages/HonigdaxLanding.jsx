import React, { useEffect, useMemo, useRef, useState } from "react";

const TID = {
  headerNavCapabilities: "header-nav-capabilities",
  headerNavApproach: "header-nav-approach",
  headerNavStrategy: "header-nav-strategy",
  headerNavContact: "header-nav-contact",
  headerClock: "header-clock",
  headerLogo: "header-logo",
  headerCloseBox: "header-close-box",
  langSwitchDE: "lang-switch-de",
  langSwitchEN: "lang-switch-en",
  heroPrimaryCta: "hero-primary-cta",
  heroSecondaryCta: "hero-secondary-cta",
  heroCockpit: "hero-cockpit-frame",
  heroEyebrow: "hero-eyebrow",
  marqueeBand: "marquee-band",
  insightsImage: "insights-image",
  capabilityRow: (i) => `capability-row-${i}`,
  capabilityToggle: (i) => `capability-toggle-${i}`,
  approachRow: (i) => `approach-row-${i}`,
  finalCta: "final-cta-button",
  footerLinkCap: "footer-link-capabilities",
  footerLinkApp: "footer-link-approach",
  footerLinkSrv: "footer-link-strategy",
  footerLinkExt: "footer-link-external",
};

/* ============ Translations ============ */
const T = {
  de: {
    headerBrandTag: "TRADING COCKPIT.",
    navCapabilities: "Capabilities",
    navApproach: "Approach",
    navStrategy: "Strategy Lab",
    navContact: "Contact",
    locationLabel: "CHICAGO",
    heroEyebrow: "(01) IBKR · MADE FOR THE EDGE",
    heroLineA: "Scalpe in",
    heroLineB: "2 ms.",
    heroBody:
      "HonigDAX ist das KI-native Trading-Cockpit auf Interactive Brokers — colociert in Chicago, gebaut für DOM-Scalping, Optionen und HoneyScript. Vom Order-Book bis zum Backtest, eine Schnittstelle.",
    heroCtaPrimary: "Enter honigdax.com",
    heroCtaSecondary: "See Capabilities →",
    heroScrollHint: "SCROLL · ENTER THE COCKPIT",
    heroScrollNext: "(02) CAPABILITIES — NEXT",
    cockpitCaption: "LIVE · IGOR · COCKPIT 0241",
    insightsLabel: "(02·a) INSIGHTS",
    insightsTitle: ["Sieh dir das ", "echte ", "Cockpit an."],
    insightsBody:
      "Live-Chart mit IGOR · der Honey Badger KI, BB-Squeeze-Erkennung, BEAR/BULL-Signale direkt im Chart und Sprach-Kommentar. Keine Renderings — Screenshots aus dem produktiven System.",
    capLabel: "(02) CAPABILITIES",
    capTitle: ["One cockpit, the ", "full", " trading lifecycle — vom DOM bis zum Backtest."],
    capabilities: [
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
    ],
    appLabel: "(03) APPROACH",
    appTitle: [
      "We handle the latency — ",
      "so you focus on the trade",
      " while we take care of the rest.",
    ],
    approachRows: [
      { left: "TRADER", right: "EDGE" },
      { left: "HEDGER", right: "COVERED" },
      { left: "QUANT", right: "DEPLOYED" },
      { left: "SCALPER", right: "2 MS FILLED" },
    ],
    stats: [
      { v: "2 ms", l: "Order → Fill · CHI" },
      { v: "81", l: "KI-Tools eingebaut" },
      { v: "24 / 7", l: "KI-Marktbeobachtung" },
      { v: "99.9 %", l: "Cockpit-Uptime" },
    ],
    stratLabel: "(04) STRATEGY LAB",
    stratLines: ["Plane.", "Analysiere.", "Backteste."],
    stratItalic: "Backteste.",
    stratBody:
      "Das genialste Strategie-Tool für ambitionierte Anleger: Optionsstrategien und HoneyScript bis ins Detail planen, das Risiko sauber analysieren und gegen echte Markthistorie backtesten — Drawdown, Win-Rate und Edge KI-ausgewertet, bevor du echtes Kapital riskierst.",
    stratList: [
      ["Plan", "Strikes, Expiries, Hedges. Risiko & Margin live."],
      ["Analyze", "Greeks, IV-Surface, Skew & Vol-Term-Struktur."],
      ["Backtest", "Reale COMEX-Historie, KI-ausgewertete Edge & Drawdown."],
    ],
    finalKicker: "(05) ENTER",
    finalLineA: ["Let\u2019s ", "trade"],
    finalLineB: "it together.",
    finalCta: "Visit honigdax.com",
    finalNote: "INVITE\u00A0ONLY · KEIN SPAM · NUR DEIN PLATZ IN DER WARTESCHLANGE",
    footerTagline:
      "KI-natives Trading-Cockpit. Exklusives Frontend für Interactive Brokers. Colociert in Chicago.",
    footerNav: "Navigate",
    footerLoc: "Location",
    footerLocBody: "Chicago · Illinois",
    footerLocSub: "Colocated at the COMEX matching engine",
    footerConn: "Connect",
    footerLegal: "© {year} HONIGDAX · DAS EXKLUSIVE IBKR-FRONTEND",
    footerCredit: "CONCEPT / TRADING SYSTEM",
    footerDisc:
      "Trading mit Futures, Optionen und Derivaten ist mit erheblichen Risiken verbunden und nicht für jeden Anleger geeignet. Latenz-Angaben beschreiben Zielwerte der Infrastruktur. HonigDAX ist ein unabhängiges Frontend und steht in keiner offiziellen Verbindung zu Interactive Brokers, der COMEX oder der CME Group. Keine Anlageberatung.",
    marqueeWords: [
      "DOM", "Scalping", "Optionen", "Trading",
      "KI", "Kommentator", "HoneyScript", "Studio",
      "Chicago", "Colocation", "Strategie", "Lab",
    ],
  },
  en: {
    headerBrandTag: "TRADING COCKPIT.",
    navCapabilities: "Capabilities",
    navApproach: "Approach",
    navStrategy: "Strategy Lab",
    navContact: "Contact",
    locationLabel: "CHICAGO",
    heroEyebrow: "(01) IBKR · MADE FOR THE EDGE",
    heroLineA: "Scalp in",
    heroLineB: "2 ms.",
    heroBody:
      "HonigDAX is the AI-native trading cockpit on Interactive Brokers — colocated in Chicago, built for DOM scalping, options and HoneyScript. From the order book to the backtest — one interface.",
    heroCtaPrimary: "Enter honigdax.com",
    heroCtaSecondary: "See Capabilities →",
    heroScrollHint: "SCROLL · ENTER THE COCKPIT",
    heroScrollNext: "(02) CAPABILITIES — NEXT",
    cockpitCaption: "LIVE · IGOR · COCKPIT 0241",
    insightsLabel: "(02·a) INSIGHTS",
    insightsTitle: ["See the ", "real ", "cockpit."],
    insightsBody:
      "Live chart with IGOR — the honey badger AI — BB-squeeze detection, BEAR/BULL signals straight in the chart and voice commentary. No renderings — screenshots from the production system.",
    capLabel: "(02) CAPABILITIES",
    capTitle: ["One cockpit, the ", "full", " trading lifecycle — from DOM to backtest."],
    capabilities: [
      {
        num: "01 /",
        label: "DOM",
        italic: "Scalping",
        meta: "ORDER BOOK · 2ms · CHI",
        body:
          "Real-time order book, click-to-trade on market depth. 2 millisecond fills — colocated in Chicago, clean edge on every tick.",
      },
      {
        num: "02 /",
        label: "Options",
        italic: "Lifecycle",
        meta: "CHAIN · GREEKS · SPREADS",
        body:
          "Live options chain, real-time greeks, multi-leg strategies by click or voice. From strike to spread — the full workflow in the cockpit.",
      },
      {
        num: "03 /",
        label: "AI",
        italic: "Commentator",
        meta: "VOICE · LIVE · BAR-BY-BAR",
        body:
          "The AI reads your chart bar by bar, comments live and takes natural language as command. 81 tools, one interface.",
      },
      {
        num: "04 /",
        label: "HoneyScript",
        italic: "Studio",
        meta: "SCRIPT · CLI · PIPE",
        body:
          "Deploy, debug and chain strategies programmatically. JSON output, pipe-friendly CLI, full workflow automatable.",
      },
      {
        num: "05 /",
        label: "Early-Exit",
        italic: "& Breakout",
        meta: "MOMENTUM · ALERTS · RISK",
        body:
          "Reversing momentum caught, breakout flagged in real time — you\u2019re in the move before the crowd even sees it.",
      },
      {
        num: "06 /",
        label: "Strategy",
        italic: "Lab",
        meta: "PLAN · ANALYZE · BACKTEST",
        body:
          "Plan options and HoneyScript down to the detail, measure drawdown and win rate against real history — AI-evaluated before any real trade.",
      },
    ],
    appLabel: "(03) APPROACH",
    appTitle: [
      "We handle the latency — ",
      "so you focus on the trade",
      " while we take care of the rest.",
    ],
    approachRows: [
      { left: "TRADER", right: "EDGE" },
      { left: "HEDGER", right: "COVERED" },
      { left: "QUANT", right: "DEPLOYED" },
      { left: "SCALPER", right: "2 MS FILLED" },
    ],
    stats: [
      { v: "2 ms", l: "Order → Fill · CHI" },
      { v: "81", l: "AI tools built-in" },
      { v: "24 / 7", l: "AI market watch" },
      { v: "99.9 %", l: "Cockpit uptime" },
    ],
    stratLabel: "(04) STRATEGY LAB",
    stratLines: ["Plan.", "Analyze.", "Backtest."],
    stratItalic: "Backtest.",
    stratBody:
      "The most brilliant strategy tool for ambitious traders: plan option strategies and HoneyScript down to the detail, analyse the risk cleanly and backtest against real market history — drawdown, win-rate and edge AI-evaluated before you risk real capital.",
    stratList: [
      ["Plan", "Strikes, expiries, hedges. Risk & margin live."],
      ["Analyze", "Greeks, IV surface, skew & vol-term structure."],
      ["Backtest", "Real COMEX history, AI-evaluated edge & drawdown."],
    ],
    finalKicker: "(05) ENTER",
    finalLineA: ["Let\u2019s ", "trade"],
    finalLineB: "it together.",
    finalCta: "Visit honigdax.com",
    finalNote: "INVITE\u00A0ONLY · NO SPAM · JUST YOUR SPOT IN THE QUEUE",
    footerTagline:
      "AI-native trading cockpit. Exclusive frontend for Interactive Brokers. Colocated in Chicago.",
    footerNav: "Navigate",
    footerLoc: "Location",
    footerLocBody: "Chicago · Illinois",
    footerLocSub: "Colocated at the COMEX matching engine",
    footerConn: "Connect",
    footerLegal: "© {year} HONIGDAX · THE EXCLUSIVE IBKR FRONTEND",
    footerCredit: "CONCEPT / TRADING SYSTEM",
    footerDisc:
      "Trading futures, options and derivatives carries substantial risk and is not suitable for every investor. Latency figures describe infrastructure targets. HonigDAX is an independent frontend and has no official affiliation with Interactive Brokers, COMEX or the CME Group. Not investment advice.",
    marqueeWords: [
      "DOM", "Scalping", "Options", "Trading",
      "AI", "Commentator", "HoneyScript", "Studio",
      "Chicago", "Colocation", "Strategy", "Lab",
    ],
  },
};

/* ============ Hooks ============ */
const useReveal = (deps = []) => {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.in)");
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
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, deps);
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

const useLang = () => {
  const [lang, setLang] = useState(() => {
    try {
      const saved = window.localStorage.getItem("honigdax.lang");
      if (saved === "de" || saved === "en") return saved;
    } catch (_e) {
      // ignore localStorage access (private mode / SSR)
    }
    return (navigator.language || "de").toLowerCase().startsWith("de")
      ? "de"
      : "en";
  });
  useEffect(() => {
    try { window.localStorage.setItem("honigdax.lang", lang); } catch (_e) { /* ignore */ }
    document.documentElement.lang = lang;
  }, [lang]);
  return [lang, setLang];
};

/* ============ Hero cockpit frame (real screenshot) ============ */
const HeroCockpit = ({ caption }) => (
  <div
    data-testid={TID.heroCockpit}
    className="reveal"
    style={{
      width: 360,
      flexShrink: 0,
      position: "relative",
      fontFamily: "JetBrains Mono, monospace",
    }}
  >
    <div
      style={{
        position: "relative",
        border: "1px solid rgba(13,13,13,0.22)",
        background: "rgba(255,255,255,0.4)",
        padding: 18,
      }}
    >
      {/* corner plus marks (Hungema-style) */}
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
        <span>REF · HGD–0241</span>
        <span>REV 02 / 2026</span>
      </div>

      <div
        style={{
          position: "relative",
          background: "#0c0c10",
          aspectRatio: "16/10",
          overflow: "hidden",
          border: "1px solid rgba(0,0,0,0.4)",
        }}
      >
        <img
          src="/honigdax-cockpit.png"
          alt="HonigDAX Cockpit — IGOR the Honey Badger live chart"
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          loading="lazy"
        />
        {/* signal dot overlay */}
        <span
          className="dot-pulse"
          style={{
            position: "absolute",
            top: 10,
            right: 12,
          }}
        />
      </div>

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
        <span>{caption}</span>
        <span style={{ color: "var(--rust)" }}>● REC</span>
      </div>
    </div>
  </div>
);

/* ============ Capability row ============ */
const CapabilityRow = ({ i, num, label, italic, meta, body, onDark, langKey }) => {
  const [open, setOpen] = useState(false);
  // collapse when language changes
  useEffect(() => { setOpen(false); }, [langKey]);
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
        aria-expanded={open}
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
    <span className="font-mono" style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, letterSpacing: "0.12em" }}>
      {left}
    </span>
    <span className="font-mono" style={{ color: "var(--rust-bright)", fontSize: 13, letterSpacing: "0.12em" }}>
      → {right}
    </span>
  </div>
);

/* ============ Main page ============ */
export default function HonigdaxLanding() {
  const [lang, setLang] = useLang();
  useReveal([lang]);
  const clock = useClock();
  const yearRef = useRef(new Date().getFullYear());
  const t = useMemo(() => T[lang], [lang]);

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
          <a href="#top" className="x-box" data-testid={TID.headerCloseBox} aria-label="Top">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1 L11 11 M11 1 L1 11" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </a>
          <div className="font-mono label label-strong" data-testid={TID.headerLogo} style={{ fontSize: 12, fontWeight: 600 }}>
            HONIGDAX <span style={{ color: "var(--muted)", margin: "0 6px" }}>/</span> {t.headerBrandTag}
          </div>
        </div>

        <nav style={{ display: "flex", justifyContent: "center", gap: 36 }}>
          <a className="tlink" href="#capabilities" data-testid={TID.headerNavCapabilities}>{t.navCapabilities}</a>
          <a className="tlink" href="#approach" data-testid={TID.headerNavApproach}>{t.navApproach}</a>
          <a className="tlink" href="#strategy" data-testid={TID.headerNavStrategy}>{t.navStrategy}</a>
          <a className="tlink" href="#contact" data-testid={TID.headerNavContact}>{t.navContact}</a>
        </nav>

        <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
          <div
            role="group"
            aria-label="Sprache / Language"
            style={{
              display: "inline-flex",
              border: "1px solid var(--rule)",
              borderRadius: 999,
              padding: 2,
              fontFamily: "JetBrains Mono, monospace",
              fontSize: 11,
              letterSpacing: "0.08em",
            }}
          >
            {["de", "en"].map((code) => (
              <button
                key={code}
                data-testid={code === "de" ? TID.langSwitchDE : TID.langSwitchEN}
                onClick={() => setLang(code)}
                aria-pressed={lang === code}
                style={{
                  background: lang === code ? "var(--ink)" : "transparent",
                  color: lang === code ? "var(--paper)" : "var(--ink)",
                  border: "none",
                  cursor: "pointer",
                  padding: "5px 10px",
                  borderRadius: 999,
                  textTransform: "uppercase",
                  fontFamily: "inherit",
                  fontSize: "inherit",
                  letterSpacing: "inherit",
                  transition: "background 0.18s, color 0.18s",
                }}
              >
                {code}
              </button>
            ))}
          </div>
          <div
            className="font-mono label"
            data-testid={TID.headerClock}
            style={{ display: "flex", gap: 14, alignItems: "center", fontSize: 12 }}
          >
            <span className="dot-pulse" />
            <span>{t.locationLabel} · {clock}</span>
          </div>
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
        <div className="font-mono label idx reveal" data-testid={TID.heroEyebrow} style={{ paddingTop: 22 }}>
          <span className="bar" />
          <span>{t.heroEyebrow}</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", alignItems: "end", gap: 60 }}>
          <h1 className="h-display reveal" style={{ fontSize: "clamp(64px, 11vw, 196px)", marginTop: 28 }}>
            {t.heroLineA}
            <br />
            <span className="h-italic" style={{ fontSize: "1em" }}>{t.heroLineB}</span>
          </h1>
          <HeroCockpit caption={t.cockpitCaption} />
        </div>

        <div className="reveal" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 40, alignItems: "end", marginTop: 12 }}>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 16, maxWidth: 480, lineHeight: 1.6, color: "var(--ink)" }}>
            {t.heroBody}
          </p>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href="#contact" className="pill" data-testid={TID.heroPrimaryCta}>
              {t.heroCtaPrimary}
              <span className="arr">
                <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                  <path d="M3 9 L9 3 M9 3 H4 M9 3 V8" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </span>
            </a>
            <a href="#capabilities" className="tlink" data-testid={TID.heroSecondaryCta} style={{ alignSelf: "center" }}>
              {t.heroCtaSecondary}
            </a>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 60 }}>
          <div className="font-mono label">{t.heroScrollHint}</div>
          <div
            aria-hidden
            style={{ width: 18, height: 28, borderRadius: 12, border: "1px solid rgba(13,13,13,0.4)", position: "relative" }}
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
          <div className="font-mono label">{t.heroScrollNext}</div>
        </div>
      </section>

      {/* ============== MARQUEE ============== */}
      <div className="marquee" data-testid={TID.marqueeBand}>
        <div className="marquee-track">
          {t.marqueeWords.map((w, i) => <span key={`a${i}`}>{w}</span>)}
          {t.marqueeWords.map((w, i) => <span key={`b${i}`}>{w}</span>)}
        </div>
      </div>

      {/* ============== INSIGHTS (real cockpit preview) ============== */}
      <section id="insights" style={{ padding: "120px 36px 40px" }}>
        <div className="font-mono label idx reveal" style={{ marginBottom: 56 }}>
          <span className="bar" />
          <span>{t.insightsLabel}</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
          <h2 className="h-display reveal" style={{ fontSize: "clamp(38px, 5.2vw, 80px)" }}>
            {t.insightsTitle[0]}
            <span className="h-italic">{t.insightsTitle[1]}</span>
            {t.insightsTitle[2]}
          </h2>
          <p className="reveal" style={{ fontFamily: "Inter, sans-serif", fontSize: 17, lineHeight: 1.65, color: "var(--ink)", maxWidth: 520 }}>
            {t.insightsBody}
          </p>
        </div>

        <div
          className="reveal"
          data-testid={TID.insightsImage}
          style={{
            marginTop: 56,
            position: "relative",
            border: "1px solid var(--rule)",
            background: "#0c0c10",
            aspectRatio: "16/9",
            overflow: "hidden",
            boxShadow: "0 30px 80px rgba(13,13,13,0.18)",
          }}
        >
          <img
            src="/honigdax-cockpit.png"
            alt="HonigDAX live cockpit — IGOR Gold Spot chart"
            loading="lazy"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <div
            className="font-mono"
            style={{
              position: "absolute",
              bottom: 14,
              left: 18,
              right: 18,
              display: "flex",
              justifyContent: "space-between",
              color: "rgba(255,255,255,0.8)",
              fontSize: 11,
              letterSpacing: "0.08em",
            }}
          >
            <span>XAUUSD · 5m · IGOR GOLD v4 · BB-SQUEEZE · CVD DOM</span>
            <span style={{ color: "var(--rust-bright)" }}>● LIVE · CHI</span>
          </div>
        </div>
      </section>

      {/* ============== CAPABILITIES ============== */}
      <section id="capabilities" style={{ padding: "120px 36px 80px" }}>
        <div className="font-mono label idx reveal" style={{ marginBottom: 56 }}>
          <span className="bar" />
          <span>{t.capLabel}</span>
        </div>

        <h2 className="h-display reveal" style={{ fontSize: "clamp(38px, 5.5vw, 84px)", marginLeft: "30%", maxWidth: 1000, marginBottom: 64 }}>
          {t.capTitle[0]}
          <span className="h-italic">{t.capTitle[1]}</span>
          {t.capTitle[2]}
        </h2>

        <div>
          {t.capabilities.map((c, i) => (
            <CapabilityRow
              key={`${lang}-${i}`}
              i={i}
              num={c.num}
              label={c.label}
              italic={c.italic}
              meta={c.meta}
              body={c.body}
              langKey={lang}
            />
          ))}
          <div style={{ borderTop: "1px solid var(--rule)" }} />
        </div>
      </section>

      {/* ============== APPROACH (BLACK) ============== */}
      <section
        id="approach"
        className="paper-grain dark on-dark"
        style={{ background: "var(--ink-2)", color: "#fff", padding: "120px 36px", position: "relative" }}
      >
        <div className="font-mono label idx reveal" style={{ marginBottom: 56 }}>
          <span className="bar" style={{ background: "rgba(255,255,255,0.5)" }} />
          <span>{t.appLabel}</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: 80, alignItems: "start" }}>
          <h2 className="h-display reveal" style={{ fontSize: "clamp(36px, 4.6vw, 68px)", maxWidth: 680 }}>
            {t.appTitle[0]}
            <span className="h-italic" style={{ color: "var(--rust-bright)" }}>{t.appTitle[1]}</span>
            {t.appTitle[2]}
          </h2>
          <div className="reveal" style={{ paddingTop: 12 }}>
            {t.approachRows.map((r, i) => (
              <ApproachRow key={r.left} i={i} left={r.left} right={r.right} />
            ))}
            <div style={{ borderTop: "1px solid var(--rule-dark)" }} />
          </div>
        </div>

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
          {t.stats.map((s) => (
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
      <section id="strategy" style={{ padding: "120px 36px 60px", position: "relative" }}>
        <div className="font-mono label idx reveal" style={{ marginBottom: 40 }}>
          <span className="bar" />
          <span>{t.stratLabel}</span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <h2 className="h-display reveal" style={{ fontSize: "clamp(38px, 5vw, 76px)", maxWidth: 560 }}>
            {t.stratLines.map((line, i) => (
              <React.Fragment key={i}>
                {line === t.stratItalic ? <span className="h-italic">{line}</span> : line}
                {i < t.stratLines.length - 1 && <br />}
              </React.Fragment>
            ))}
          </h2>

          <div className="reveal" style={{ fontFamily: "Inter, sans-serif" }}>
            <p style={{ fontSize: 17, lineHeight: 1.65, color: "var(--ink)", maxWidth: 520, marginBottom: 28 }}>
              {t.stratBody}
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {t.stratList.map(([k, v]) => (
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
                  <span className="font-mono label label-strong" style={{ fontWeight: 600 }}>{k}</span>
                  <span style={{ color: "var(--muted)", fontSize: 15.5 }}>{v}</span>
                </li>
              ))}
              <li style={{ borderTop: "1px solid var(--rule)" }} />
            </ul>
          </div>
        </div>
      </section>

      {/* ============== REALIZE / CTA ============== */}
      <section id="contact" style={{ padding: "120px 36px 200px", textAlign: "center", position: "relative" }}>
        <div className="font-mono label reveal" style={{ marginBottom: 36, color: "var(--muted)" }}>
          {t.finalKicker}
        </div>
        <h2 className="h-display reveal" style={{ fontSize: "clamp(64px, 9vw, 144px)", marginBottom: 12 }}>
          {t.finalLineA[0]}<span className="h-italic">{t.finalLineA[1]}</span>
        </h2>
        <h2 className="h-display reveal" style={{ fontSize: "clamp(64px, 9vw, 144px)", marginBottom: 56 }}>
          {t.finalLineB}
        </h2>

        <a href="https://honigdax.com" className="pill reveal" data-testid={TID.finalCta} style={{ padding: "18px 28px", fontSize: 15 }}>
          {t.finalCta}
          <span className="arr">
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M3 9 L9 3 M9 3 H4 M9 3 V8" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </span>
        </a>

        <p className="font-mono label reveal" style={{ marginTop: 32, color: "var(--muted)" }}>
          {t.finalNote}
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
            {t.footerTagline}
          </p>
        </div>

        <div>
          <div className="font-mono label" style={{ marginBottom: 14 }}>{t.footerNav}</div>
          <div style={{ display: "grid", gap: 10 }}>
            <a className="tlink" href="#capabilities" data-testid={TID.footerLinkCap}>{t.navCapabilities}</a>
            <a className="tlink" href="#approach" data-testid={TID.footerLinkApp}>{t.navApproach}</a>
            <a className="tlink" href="#strategy" data-testid={TID.footerLinkSrv}>{t.navStrategy}</a>
          </div>
        </div>

        <div>
          <div className="font-mono label" style={{ marginBottom: 14 }}>{t.footerLoc}</div>
          <div style={{ fontFamily: "Inter, sans-serif", fontSize: 14.5 }}>
            {t.footerLocBody}
            <div style={{ color: "var(--muted)", marginTop: 6 }}>{t.footerLocSub}</div>
          </div>
        </div>

        <div>
          <div className="font-mono label" style={{ marginBottom: 14 }}>{t.footerConn}</div>
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
          <div className="font-mono label">{t.footerLegal.replace("{year}", yearRef.current)}</div>
          <div className="font-mono label">{t.footerCredit}</div>
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
          {t.footerDisc}
        </p>
      </footer>
    </div>
  );
}
