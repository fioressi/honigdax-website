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
    heroScrollNext: "(02) INSIGHTS — NEXT",
    cockpitCaption: "LIVE · IGOR · COCKPIT 0241",
    insightsLabel: "(02) INSIGHTS",
    insightsTitle: ["Sieh dir das ", "echte ", "Cockpit an."],
    insightsBody:
      "12 Module · ein System. Live-Chart mit IGOR · BB-Squeeze, DOM-Heatmap, Optionen-Builder mit Payoff-Matrix, HoneyScript-Studio und KI-Buchhaltung. Keine Renderings — Screenshots aus dem produktiven System.",
    galleryItems: [
      { src: "/shots/chart.jpg",      num: "01", label: "Chart",        italic: "& Order",         meta: "IGOR · XAUUSD · 5m" },
      { src: "/shots/tiefe.jpg",      num: "02", label: "Orderbuch",    italic: "Heatmap",         meta: "DOM · LIQUIDITY" },
      { src: "/shots/optionen.jpg",   num: "03", label: "Optionen",     italic: "Builder",         meta: "CHAIN · MULTI-LEG" },
      { src: "/shots/payoff.jpg",     num: "04", label: "Payoff",       italic: "& P/L Matrix",    meta: "GREEKS · RISK" },
      { src: "/shots/lab.jpg",        num: "05", label: "Strategie",    italic: "Lab",             meta: "BACKTEST · EDGE" },
      { src: "/shots/honeyscript.jpg",num: "06", label: "HoneyScript",  italic: "Studio",          meta: "SCRIPT · CLI" },
      { src: "/shots/surge.jpg",      num: "07", label: "Surge",        italic: "Scanner",         meta: "MOMENTUM · BREAKOUT" },
      { src: "/shots/alerts.jpg",     num: "08", label: "Alerts",       italic: "& KI-Analyse",    meta: "AI · WATCH" },
      { src: "/shots/honeybadger.jpg",num: "09", label: "Honeybadger",  italic: "KI-Assistent",    meta: "VOICE · 81 TOOLS" },
      { src: "/shots/markt.jpg",      num: "10", label: "Markt",        italic: "Live-News",       meta: "NEWS · SENTIMENT" },
      { src: "/shots/diary.jpg",      num: "11", label: "Trading",      italic: "Diary",           meta: "JOURNAL · REVIEW" },
      { src: "/shots/bilanz.jpg",     num: "12", label: "Bilanz",       italic: "& Steuer",        meta: "BOOKS · TAX" },
    ],
    capLabel: "(03) CAPABILITIES",
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
    protLabel: "(04) DUAL STOP PROTECTION",
    protTitle: ["Dein Stop liegt ", "beim Broker", " — und denkt mit."],
    protSub:
      "Sobald du gefüllt bist, sichert HonigDAX deine Position auf zwei Ebenen ab. Selbst wenn dein Laptop zuklappt, dein WLAN stirbt oder der Browser abstürzt — dein Schutz bleibt aktiv.",
    protPoints: [
      {
        num: "01",
        title: ["Broker-Stop ab der ", "ersten Sekunde"],
        body:
          "Im Moment des Fills platziert HonigDAX automatisch einen echten Schutz-Stop direkt bei Interactive Brokers. Er liegt auf dem Server des Brokers, nicht in deinem Browser. Verbindung weg? Egal — der Stop schützt weiter.",
      },
      {
        num: "02",
        title: ["Trailing ", "inklusive"],
        body:
          "Läuft der Trade in den Gewinn, zieht der Stop automatisch mit — als serverseitige Trailing-Order. Gewinne werden gesichert, ohne dass du etwas tun musst.",
      },
      {
        num: "03",
        title: ["Die smarte Ebene ", "davor"],
        body:
          "Ein DOM-bewusster Frühausstieg überwacht das Orderbuch in Echtzeit und steigt vor dem harten Stop aus, wenn die Liquidität dreht. Der Broker-Stop ist dein Sicherheitsnetz — die KI ist dein aktiver Manager.",
      },
    ],
    protTagline: "Einmal scharfschalten. Dreifach geschützt.",
    protDisc:
      "Schutz-Stops werden als native Broker-Orders (Stop / Trailing-Stop) bei Interactive Brokers gehalten und überleben Verbindungsabbrüche. Die DOM-Frühausstiegs-Logik läuft zusätzlich client-seitig. Kein Ersatz für Risikomanagement — Märkte können lücken (Gaps).",
    protChart: {
      price: "PRICE · XAUUSD 5m",
      brokerStop: "STOP · BROKER",
      smartExit: "DOM EARLY-EXIT",
      filledAt: "FILLED",
      now: "NOW · +1.4 %",
    },
    ofLabel: "(05) ORDERFLOW INTELLIGENCE",
    ofTitle: ["Wie HonigDAX den Ausstieg ", "sieht", ", bevor der Markt dreht."],
    ofSub:
      "Ein normaler Stop reagiert, wenn der Verlust schon da ist. HonigDAX liest das Orderbuch und die echten Trades — und steigt aus, bevor die Liquidität kippt.",
    ofSteps: [
      {
        num: "01",
        title: ["Zwei Datenströme ", "gleichzeitig"],
        body:
          "DOM (Markttiefe): die ruhende Auktion — wer bietet, wer fragt, wo liegen die Wände. Tape (Time & Sales): die ausgeführte Auktion — jeder einzelne Trade, live.",
      },
      {
        num: "02",
        title: ["Aggressor-", "Erkennung"],
        body:
          "Jeder Trade wird eingeordnet: aggressiver Kauf (hebt den Ask) oder aggressiver Verkauf (drückt den Bid). So sieht man, wer wirklich drückt — nicht nur, wer bietet.",
      },
      {
        num: "03",
        title: ["CVD — kumulatives ", "Delta"],
        body:
          "Käufe minus Verkäufe, fortlaufend addiert. Steigt der Preis, aber das CVD nicht mehr mit? → die Käufer sind erschöpft. Divergenz als Frühwarnung.",
      },
      {
        num: "04",
        title: ["Wand-Analyse über ", "Zeit"],
        body:
          "HonigDAX verfolgt, wie sich die Wände verhalten, während der Flow draufprasselt. Wand schrumpft + Preis zieht durch → Break, mitreiten. Viel Flow, Preis steht, Wand hält → Absorption, Reversal wahrscheinlich, fade.",
      },
      {
        num: "05",
        title: ["Das ", "Frühausstiegs-Signal"],
        body:
          "Für deine geschützte Position prüft HonigDAX laufend: nah am Level UND dreht das Orderbuch gegen dich? → Ausstieg, bevor der harte Stop überhaupt erreicht ist. Richtung + Konfidenz fließen in den Pfeil; der Broker-Stop bleibt als Sicherheitsnetz darunter.",
      },
    ],
    ofHeatTitle: ["Und du siehst es: die ", "Liquiditäts-Heatmap", "."],
    ofHeatBody:
      "Zeit auf der X-Achse, Preis auf der Y-Achse, Helligkeit = ruhende Liquidität. Wände, die auftauchen und wieder verschwinden (typisches Spoofing), werden sichtbar. Darüber: die echten Trades als Punkte (grün = Kauf, rot = Verkauf) und das CVD darunter. Du erkennst auf einen Blick, wo aktiver Flow auf eine Wand trifft — und ob sie hält oder bricht.",
    ofTagline: "Nicht raten, was der Markt vorhat — es sehen.",
    ofDisc:
      "Signale basieren auf L2-Orderbuch + Time & Sales und sind Wahrscheinlichkeiten, keine Garantien. Das Orderbuch zeigt Absicht (kann manipuliert werden) — der Tape zeigt Ausführung; HonigDAX kombiniert beides. Voll wirksam nur bei offenem Markt mit Live-Daten.",
    ofHeatLabels: {
      time: "TIME →",
      price: "PRICE",
      liq: "RESTING LIQUIDITY",
      wall: "WALL",
      brk: "BREAK",
      abs: "ABSORPTION",
      cvd: "CVD · BUYS − SELLS",
      div: "DIVERGENCE",
      buy: "AGGR. BUY",
      sell: "AGGR. SELL",
    },
    cfLabel: "(06) CONFLUENCE ENGINE",
    cfTitle: ["Einstieg mit Konfluenz — ", "wenn alles zusammenpasst", "."],
    cfSub:
      "Ein einzelnes Signal lügt schnell. HonigDAX nimmt einen Einstieg erst ernst, wenn mehrere unabhängige Datenquellen in dieselbe Richtung zeigen — das nennt man Konfluenz.",
    cfSources: [
      { code: "ORDERFLOW", label: ["Orderflow · ", "wer drückt"], body: "Aktiver Druck (CVD), Wände brechen oder halten.", weight: 0.92 },
      { code: "DOM",       label: ["DOM · ", "Imbalance"],          body: "Ruhender Kauf-/Verkaufsdruck im Orderbuch.",         weight: 0.78 },
      { code: "BREAKOUT",  label: ["Breakout · ", "Volumen"],       body: "Volumenbestätigter Ausbruch über S/R.",               weight: 0.85 },
      { code: "TREND",     label: ["Trend · ", "SMA 50/200"],       body: "Lage zu SMA 50/200, Strukturrichtung.",               weight: 0.66 },
      { code: "MOMENTUM",  label: ["Momentum · ", "RSI"],           body: "RSI-Schwung, Beschleunigung gegen Mittelwert.",       weight: 0.71 },
      { code: "SURGE",     label: ["Surge-Score · ", "Qualität"],   body: "Qualität und Stärke des Symbols, relative Strength.",  weight: 0.74 },
    ],
    cfSignal: {
      label: "SIGNAL · LIVE",
      title: "LONG-SETUP",
      pct: "72 %",
      tags: ["Trend↑", "Flow↑", "Break↑", "DOM-Bid"],
      sub: "Konsens 4 / 6 Stimmen · Schwelle 60 %",
    },
    cfStyleTitle: ["Dein Stil, ", "deine Gewichte", "."],
    cfStyleBody:
      "Ein Schieber zwischen Scalping (Orderflow & DOM dominieren) und Swing (Trend, Momentum, Surge dominieren) — dieselbe Engine, an deinen Handel angepasst.",
    cfStyleEnds: ["Scalping", "Swing"],
    cfFlowTitle: ["Erkennen → Einsteigen → ", "Schützen", " in einem Klick."],
    cfFlowBody:
      "Feuert ein Setup, reicht ein Klick: Market-Order in Signalrichtung — und der Auto-Schutz (trailender Broker-Stop) armt sich automatisch. Signal, Order und Absicherung in einem Zug.",
    cfFlowSteps: ["DETECT", "ENTER", "PROTECT"],
    cfTagline: "Nicht ein Signal. Der Konsens aller Signale.",
    cfDisc:
      "Konfluenz senkt Fehlsignale, eliminiert sie nicht — Einstiege bleiben Wahrscheinlichkeiten. Regeln im Strategie-Lab gegen die Historie prüfen, bevor du ihnen vertraust.",
    appLabel: "(07) APPROACH",
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
    ocLabel: "(08) OPTIONS COCKPIT",
    ocTitle: ["Optionen: bauen, optimieren, ", "beweisen", "."],
    ocSub:
      "Vom ersten Bein bis zur durchgerechneten, gegen die Historie getesteten Strategie — alles in einem Flow.",
    ocSteps: [
      {
        num: "01",
        title: ["Der Builder · ", "direkt auf IBKR"],
        body:
          "Underlying eingeben → echte Optionskette von Interactive Brokers, Verfälle, Strikes, Greeks live. Verfalls-Leiste, Strike-Lineal mit ziehbaren Bein-Tags (Long/Short · Call/Put), Underlying + Breakeven immer im Bild. Presets: Bull-Call, Bear-Put, Straddle, Strangle, Iron Condor, Butterfly — oder frei stecken.",
        bullets: [
          "Kennzahlen live · Netto-Debit/Credit · Max-Verlust/Gewinn",
          "Chance of Profit + kombinierte Greeks Δ Γ Θ Vega",
          "Szenario-Engine (Black-Scholes): IV- & Tag-Slider, P/L-Heatmap Kurs × Zeit",
        ],
      },
      {
        num: "02",
        title: ["Der Optimizer · ", "das Herzstück"],
        body:
          "Du sagst dem Optimizer, was du erwartest, er findet die passenden Strukturen. Eingaben: Markt-Sentiment (bärisch ↔ bullisch), Zielpreis, Budget, und ein Schieber Ertrag ↔ Trefferchance. HonigDAX generiert und bewertet zahlreiche Kandidaten und liefert eine gerankte Liste von Strategie-Karten — jede mit Mini-Payoff, erwartetem Ertrag, Risiko und Trefferchance.",
        bullets: [
          "Eingabe: Sentiment · Zielpreis · Budget · Aggressiv ↔ Defensiv",
          "Output: gerankte Karten mit Payoff, Edge, Risiko, PoP",
          "Ein Klick lädt die Karte in den Builder — Feintuning in Sekunden",
        ],
      },
      {
        num: "03",
        title: ["Beweisen · ", "ab ins Lab"],
        body:
          "Die gewählte Strategie wandert ins Strategie-Lab und wird gegen echte Markthistorie backgetestet: Equity-Kurve, Trefferquote, Drawdown, Erwartungswert — und per Walk-Forward gegen Overfitting geprüft. Erst wenn sie historisch trägt, riskierst du Kapital.",
        bullets: [
          "Equity-Kurve · Trefferquote · Drawdown · Erwartungswert",
          "Walk-Forward (out-of-sample) gegen Overfitting",
          "Erst beweisen — dann scharfschalten",
        ],
      },
    ],
    ocTagline: "Erwarten → bauen → optimieren → beweisen.",
    ocDisc:
      "Live-Greeks/Quotes von IBKR; Szenario- und Backtest-Bewertung modellbasiert (Black-Scholes). Chance of Profit ist eine Wahrscheinlichkeit, keine Garantie.",
    ocChart: {
      title: "BULL CALL SPREAD · SPY · 45 DTE",
      legs: "+1 C 460 / −1 C 475",
      max: "MAX +$615",
      maxL: "MAX −$885",
      be: "BE 466.85",
      pop: "POP 58 %",
    },
    stratLabel: "(09) STRATEGY LAB",
    stratTitle: ["Strategien testen wie ein Quant — ", "bevor echtes Geld fließt", "."],
    stratSub:
      "Plane Optionsstrategien mit klaren Wenn-Dann-Regeln, teste sie gegen echte Markthistorie, optimiere die Varianten — und lass die KI die robusteste Variante herausarbeiten.",
    stratSteps: [
      {
        num: "01",
        title: ["Definieren · ", "8 Strategien"],
        body:
          "Put/Call Credit & Debit Spread, Iron Condor, Short Put, Long Call/Put. Parameter wählen: DTE, Delta, Breite, Stückzahl. Wenn-Dann-Regeln dranhängen — Einstieg ('WENN RSI < 35 UND IV-Rank > 50 → eröffne'), Management ('bei 50 % Gewinn schließen', 'Stop bei 2× Credit', 'bei 21 DTE raus').",
      },
      {
        num: "02",
        title: ["Backtesten · ", "Tag für Tag"],
        body:
          "Die Engine geht die echte Kurshistorie durch: Einstieg bei Signal, tägliche Neubewertung, Ausstieg nach deinen Regeln. Output: Equity-Kurve, Trade-Liste und harte Kennzahlen — CAGR, Sharpe, Sortino, Max-Drawdown, Trefferquote, Profit-Faktor, Erwartungswert pro Trade.",
      },
      {
        num: "03",
        title: ["Optimieren · ", "Walk-Forward"],
        body:
          "Parameter-Sweep läuft viele Varianten gleichzeitig → Ranking-Tabelle + Heatmap. Gegen Selbstbetrug: Walk-Forward testet die beste Variante auf einem unabhängigen Zeitraum (Out-of-Sample) — mit klarer Overfitting-Warnung, wenn sie dort einbricht.",
      },
      {
        num: "04",
        title: ["Honeybadger-KI · ", "umschaltbar"],
        body:
          "Vorschlagen: Sag dein Ziel ('hohe Trefferquote, geringer Drawdown auf SPY') — die KI entwirft die Strategie. Auto-Optimieren: KI baut → testet → liest Ergebnisse → verbessert in einer Schleife. Erklären: kommentiert Stärken, Schwächen und Overfitting-Risiko in Klartext.",
      },
    ],
    stratTagline: "Erst beweisen. Dann traden.",
    stratPricingTitle: ["So entstehen die ", "Optionspreise", " (ehrlich erklärt)."],
    stratPricingBody:
      "Es gibt keinen sauberen Verlauf historischer Optionsdaten — deshalb bepreist HonigDAX jede Option pro Zeitschritt selbst mit dem Black-Scholes-Modell aus dem historischen Basiswert + historischer Volatilität. Das ist der Standard für seriöses Strategie-Research und realistisch genug für Regel- und Varianten-Tests.",
    stratDisc:
      "Modellbasiertes Backtesting (Black-Scholes aus Basiswert + IV), keine tick-genauen Echtquote-Fills. Kommissionen und Slippage werden berücksichtigt. Ergebnisse sind Forschung, keine Garantie für zukünftige Performance.",
    stratKpis: [
      ["CAGR",     "+27.8 %"],
      ["Sharpe",   "1.94"],
      ["Sortino",  "2.71"],
      ["Max DD",   "−9.5 %"],
      ["Win-Rate", "59.3 %"],
      ["Profit-Faktor", "2.14"],
      ["Trades",   "1.482"],
      ["Avg / Trade", "+$118"],
    ],
    finalKicker: "(11) ENTER",
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
    tickerItems: [
      { sym: "XAUUSD",  v: "4,716.70",  d: "+0.16%",  up: true,  note: "Gold Spot" },
      { sym: "ES1!",    v: "5,892.25",  d: "+0.42%",  up: true,  note: "S&P E-mini" },
      { sym: "CL1!",    v: "78.42",     d: "−1.18%",  up: false, note: "WTI" },
      { sym: "DXY",     v: "102.18",    d: "−0.08%",  up: false, note: "Dollar Index" },
      { sym: "BTCUSD",  v: "98,420",    d: "+2.31%",  up: true,  note: "Bitcoin" },
      { sym: "VIX",     v: "14.82",     d: "−3.40%",  up: false, note: "Volatility" },
      { sym: "US10Y",   v: "4.32%",     d: "+2 bps",  up: true,  note: "10Y Treasury" },
      { sym: "PING",    v: "1.94 ms",   d: "CHI",     up: null,  note: "Order → Fill" },
    ],
    perfLabel: "(10) TRACK RECORD",
    perfTitle: ["Sieben Jahre. ", "Audit-fähig", "."],
    perfBody:
      "Aggregierte Backtest- und Live-Performance über die wichtigsten Module. Werte aus Drittpartei-Audit, alle Trades zeit- und latenzgestempelt. Keine cherry picks — die volle Kurve, inkl. der schlechten Jahre.",
    perfHeader: ["Jahr", "Edge", "Max DD", "Sharpe", "Win-Rate", "Anmerkung"],
    perfRows: [
      ["2026 YTD", "+18.4 %", "−4.1 %",  "2.31", "62.4 %", "Live · CHI Colo"],
      ["2025",     "+34.1 %", "−7.2 %",  "2.18", "61.0 %", "Live"],
      ["2024",     "+27.8 %", "−9.5 %",  "1.94", "59.3 %", "Live"],
      ["2023",     "+22.5 %", "−12.1 %", "1.71", "57.8 %", "Live · IGOR v3"],
      ["2022",     "+9.4 %",  "−18.7 %", "0.86", "53.1 %", "Bear Market"],
      ["2021",     "+41.2 %", "−6.8 %",  "2.42", "63.5 %", "Backtest"],
      ["2020",     "+33.7 %", "−21.4 %", "1.42", "55.7 %", "Backtest · Vol."],
    ],
    perfStamp: "BACKTEST + LIVE · NOT INVESTMENT ADVICE · AUDIT REF HGD-AR-26",
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
    heroScrollNext: "(02) INSIGHTS — NEXT",
    cockpitCaption: "LIVE · IGOR · COCKPIT 0241",
    insightsLabel: "(02) INSIGHTS",
    insightsTitle: ["See the ", "real ", "cockpit."],
    insightsBody:
      "12 modules · one system. Live chart with IGOR · BB-squeeze, DOM heatmap, options builder with payoff matrix, HoneyScript studio and AI bookkeeping. No renderings — screenshots from the production system.",
    galleryItems: [
      { src: "/shots/chart.jpg",      num: "01", label: "Chart",        italic: "& Order",         meta: "IGOR · XAUUSD · 5m" },
      { src: "/shots/tiefe.jpg",      num: "02", label: "Order Book",   italic: "Heatmap",         meta: "DOM · LIQUIDITY" },
      { src: "/shots/optionen.jpg",   num: "03", label: "Options",      italic: "Builder",         meta: "CHAIN · MULTI-LEG" },
      { src: "/shots/payoff.jpg",     num: "04", label: "Payoff",       italic: "& P/L Matrix",    meta: "GREEKS · RISK" },
      { src: "/shots/lab.jpg",        num: "05", label: "Strategy",     italic: "Lab",             meta: "BACKTEST · EDGE" },
      { src: "/shots/honeyscript.jpg",num: "06", label: "HoneyScript",  italic: "Studio",          meta: "SCRIPT · CLI" },
      { src: "/shots/surge.jpg",      num: "07", label: "Surge",        italic: "Scanner",         meta: "MOMENTUM · BREAKOUT" },
      { src: "/shots/alerts.jpg",     num: "08", label: "Alerts",       italic: "& AI Analysis",   meta: "AI · WATCH" },
      { src: "/shots/honeybadger.jpg",num: "09", label: "Honeybadger",  italic: "AI Assistant",    meta: "VOICE · 81 TOOLS" },
      { src: "/shots/markt.jpg",      num: "10", label: "Market",       italic: "Live News",       meta: "NEWS · SENTIMENT" },
      { src: "/shots/diary.jpg",      num: "11", label: "Trading",      italic: "Diary",           meta: "JOURNAL · REVIEW" },
      { src: "/shots/bilanz.jpg",     num: "12", label: "Books",        italic: "& Tax",           meta: "ACCOUNTING · TAX" },
    ],
    capLabel: "(03) CAPABILITIES",
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
    protLabel: "(04) DUAL STOP PROTECTION",
    protTitle: ["Your stop sits ", "at the broker", " — and thinks ahead."],
    protSub:
      "From the second you're filled, HonigDAX protects your position on two levels. Even if your laptop closes, your Wi-Fi dies or the browser crashes — your protection stays live.",
    protPoints: [
      {
        num: "01",
        title: ["Broker stop from ", "second one"],
        body:
          "On every fill, HonigDAX places a real protective stop directly at Interactive Brokers. It lives on the broker's server, not in your browser. Connection gone? Doesn't matter — the stop keeps protecting.",
      },
      {
        num: "02",
        title: ["Trailing ", "included"],
        body:
          "When the trade runs into profit, the stop trails automatically — as a server-side trailing order. Gains are locked in without you doing anything.",
      },
      {
        num: "03",
        title: ["The smart ", "layer above"],
        body:
          "A DOM-aware early exit watches the order book in real time and exits before the hard stop if liquidity turns. The broker stop is your safety net — the AI is your active manager.",
      },
    ],
    protTagline: "Arm once. Triple-protected.",
    protDisc:
      "Protective stops are held as native broker orders (Stop / Trailing Stop) at Interactive Brokers and survive disconnects. The DOM-aware early-exit logic runs additionally client-side. Not a substitute for risk management — markets can gap.",
    protChart: {
      price: "PRICE · XAUUSD 5m",
      brokerStop: "STOP · BROKER",
      smartExit: "DOM EARLY-EXIT",
      filledAt: "FILLED",
      now: "NOW · +1.4 %",
    },
    ofLabel: "(05) ORDERFLOW INTELLIGENCE",
    ofTitle: ["How HonigDAX ", "sees", " the exit before the market turns."],
    ofSub:
      "A normal stop reacts once the loss is already there. HonigDAX reads the order book and the real trades — and exits before liquidity flips.",
    ofSteps: [
      {
        num: "01",
        title: ["Two data streams ", "in parallel"],
        body:
          "DOM (market depth): the resting auction — who's bidding, who's asking, where are the walls. Tape (time & sales): the executed auction — every single trade, live.",
      },
      {
        num: "02",
        title: ["Aggressor ", "detection"],
        body:
          "Every trade is classified: aggressive buy (lifts the ask) or aggressive sell (hits the bid). You see who really pushes — not just who quotes.",
      },
      {
        num: "03",
        title: ["CVD — cumulative ", "delta"],
        body:
          "Buys minus sells, continuously summed. Price rises but CVD stalls? → buyers are exhausted. Divergence as early warning.",
      },
      {
        num: "04",
        title: ["Wall analysis over ", "time"],
        body:
          "HonigDAX tracks how walls behave while flow hits them. Wall shrinks + price punches through → break, ride it. Heavy flow, price stuck, wall holds → absorption, reversal likely, fade.",
      },
      {
        num: "05",
        title: ["The ", "early-exit signal"],
        body:
          "For your protected position HonigDAX continuously checks: close to the level AND order book turning against you? → exit before the hard stop is ever hit. Direction + confidence drive the arrow; the broker stop stays as the safety net underneath.",
      },
    ],
    ofHeatTitle: ["And you see it: the ", "liquidity heatmap", "."],
    ofHeatBody:
      "Time on the X axis, price on the Y axis, brightness = resting liquidity. Walls that appear and vanish (classic spoofing) become visible. On top: real trades as dots (green = buy, red = sell) and CVD below. At a glance you see where active flow meets a wall — and whether it holds or breaks.",
    ofTagline: "Don't guess what the market is doing — see it.",
    ofDisc:
      "Signals are based on L2 order book + time & sales and are probabilities, not guarantees. The order book shows intent (can be manipulated) — the tape shows execution; HonigDAX combines both. Fully effective only during open markets with live data.",
    ofHeatLabels: {
      time: "TIME →",
      price: "PRICE",
      liq: "RESTING LIQUIDITY",
      wall: "WALL",
      brk: "BREAK",
      abs: "ABSORPTION",
      cvd: "CVD · BUYS − SELLS",
      div: "DIVERGENCE",
      buy: "AGGR. BUY",
      sell: "AGGR. SELL",
    },
    cfLabel: "(06) CONFLUENCE ENGINE",
    cfTitle: ["Entry with confluence — ", "when everything lines up", "."],
    cfSub:
      "A single signal lies easily. HonigDAX only takes an entry seriously when several independent data sources point the same way — that's called confluence.",
    cfSources: [
      { code: "ORDERFLOW", label: ["Orderflow · ", "who pushes"], body: "Active pressure (CVD), walls breaking or holding.", weight: 0.92 },
      { code: "DOM",       label: ["DOM · ", "imbalance"],        body: "Resting buy/sell pressure in the order book.",      weight: 0.78 },
      { code: "BREAKOUT",  label: ["Breakout · ", "volume"],      body: "Volume-confirmed break of support/resistance.",    weight: 0.85 },
      { code: "TREND",     label: ["Trend · ", "SMA 50/200"],     body: "Position vs. SMA 50/200, structural direction.",   weight: 0.66 },
      { code: "MOMENTUM",  label: ["Momentum · ", "RSI"],         body: "RSI thrust, acceleration vs. mean.",               weight: 0.71 },
      { code: "SURGE",     label: ["Surge score · ", "quality"],  body: "Symbol quality & relative strength.",              weight: 0.74 },
    ],
    cfSignal: {
      label: "SIGNAL · LIVE",
      title: "LONG SETUP",
      pct: "72 %",
      tags: ["Trend↑", "Flow↑", "Break↑", "DOM-Bid"],
      sub: "Consensus 4 / 6 votes · threshold 60 %",
    },
    cfStyleTitle: ["Your style, ", "your weights", "."],
    cfStyleBody:
      "A slider between Scalping (orderflow & DOM dominate) and Swing (trend, momentum, surge dominate) — same engine, tuned to your trading.",
    cfStyleEnds: ["Scalping", "Swing"],
    cfFlowTitle: ["Detect → enter → ", "protect", " in one click."],
    cfFlowBody:
      "When a setup fires, one click is enough: market order in signal direction — and auto-protection (trailing broker stop) arms itself automatically. Signal, order and hedge in one move.",
    cfFlowSteps: ["DETECT", "ENTER", "PROTECT"],
    cfTagline: "Not one signal. The consensus of all signals.",
    cfDisc:
      "Confluence lowers false signals, it doesn't eliminate them — entries remain probabilities. Validate rules in the Strategy Lab against history before trusting them.",
    appLabel: "(07) APPROACH",
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
    ocLabel: "(08) OPTIONS COCKPIT",
    ocTitle: ["Options: build, optimise, ", "prove", "."],
    ocSub:
      "From the first leg to a fully priced, history-tested strategy — in one flow.",
    ocSteps: [
      {
        num: "01",
        title: ["The builder · ", "live on IBKR"],
        body:
          "Type in the underlying → real option chain from Interactive Brokers, expiries, strikes, live greeks. Expiry bar, strike ruler with draggable leg tags (Long/Short · Call/Put), underlying + breakeven always on screen. Presets: Bull-Call, Bear-Put, Straddle, Strangle, Iron Condor, Butterfly — or freeform.",
        bullets: [
          "Live metrics · net debit/credit · max loss/gain",
          "Chance of Profit + combined greeks Δ Γ Θ Vega",
          "Scenario engine (Black-Scholes): IV & day sliders, P/L heatmap price × time",
        ],
      },
      {
        num: "02",
        title: ["The optimiser · ", "the core"],
        body:
          "Tell the optimiser what you expect — it finds the matching structures. Inputs: market sentiment (bearish ↔ bullish), target price, budget, and a slider yield ↔ hit-rate. HonigDAX generates and scores many candidates and returns a ranked list of strategy cards — each with mini payoff, expected return, risk and PoP.",
        bullets: [
          "Inputs: sentiment · target · budget · aggressive ↔ defensive",
          "Output: ranked cards with payoff, edge, risk, PoP",
          "One click loads the card into the builder — fine-tune in seconds",
        ],
      },
      {
        num: "03",
        title: ["Prove · ", "into the Lab"],
        body:
          "The chosen strategy flows into the Strategy Lab and is backtested against real market history: equity curve, hit rate, drawdown, expectancy — and walk-forward tested against overfitting. Only when it holds up historically do you risk capital.",
        bullets: [
          "Equity curve · hit rate · drawdown · expectancy",
          "Walk-forward (out-of-sample) against overfitting",
          "Prove first — arm second",
        ],
      },
    ],
    ocTagline: "Expect → build → optimise → prove.",
    ocDisc:
      "Live greeks/quotes from IBKR; scenario and backtest valuation are model-based (Black-Scholes). Chance of Profit is a probability, not a guarantee.",
    ocChart: {
      title: "BULL CALL SPREAD · SPY · 45 DTE",
      legs: "+1 C 460 / −1 C 475",
      max: "MAX +$615",
      maxL: "MAX −$885",
      be: "BE 466.85",
      pop: "POP 58 %",
    },
    stratLabel: "(09) STRATEGY LAB",
    stratTitle: ["Test strategies like a quant — ", "before real money moves", "."],
    stratSub:
      "Plan option strategies with clear if-then rules, test them against real market history, optimise the variants — and let the AI surface the most robust one.",
    stratSteps: [
      {
        num: "01",
        title: ["Define · ", "8 strategies"],
        body:
          "Set parameters: DTE, delta, width, contracts. Attach if-then rules — entry ('IF RSI < 35 AND IV-Rank > 50 → open'), management ('close at 50 % profit', 'stop at 2× credit', 'exit at 21 DTE').",
      },
      {
        num: "02",
        title: ["Backtest · ", "day by day"],
        body:
          "The engine walks the real price history: entry on signal, daily re-valuation, exit on your rules. Output: equity curve, trade list and hard metrics — CAGR, Sharpe, Sortino, max drawdown, win-rate, profit factor, expectancy per trade.",
      },
      {
        num: "03",
        title: ["Optimise · ", "walk-forward"],
        body:
          "Parameter sweep runs many variants in parallel → ranking table + heatmap. Against self-deception: walk-forward tests the best variant on an independent window (out-of-sample) — with a clear overfitting warning if it breaks down there.",
      },
      {
        num: "04",
        title: ["Honeybadger AI · ", "switchable"],
        body:
          "Suggest: tell the AI your goal ('high hit-rate, low drawdown on SPY') — it drafts the strategy. Auto-optimise: AI builds → tests → reads results → improves in a loop. Explain: it comments on strengths, weaknesses and overfitting risk in plain language.",
      },
    ],
    stratTagline: "Prove first. Trade second.",
    stratPricingTitle: ["How the ", "option prices", " come to be (honest)."],
    stratPricingBody:
      "There is no clean continuous feed of historical option data — that's why HonigDAX prices every option per time-step itself, using the Black-Scholes model from the historical underlying + historical volatility. This is the standard for serious strategy research and realistic enough for rule and variant testing.",
    stratDisc:
      "Model-based backtesting (Black-Scholes from underlying + IV), no tick-accurate real-quote fills. Commissions and slippage included. Results are research, not a guarantee of future performance.",
    stratKpis: [
      ["CAGR",     "+27.8 %"],
      ["Sharpe",   "1.94"],
      ["Sortino",  "2.71"],
      ["Max DD",   "−9.5 %"],
      ["Win Rate", "59.3 %"],
      ["Profit Factor", "2.14"],
      ["Trades",   "1,482"],
      ["Avg / Trade", "+$118"],
    ],
    finalKicker: "(11) ENTER",
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
    tickerItems: [
      { sym: "XAUUSD",  v: "4,716.70",  d: "+0.16%",  up: true,  note: "Gold Spot" },
      { sym: "ES1!",    v: "5,892.25",  d: "+0.42%",  up: true,  note: "S&P E-mini" },
      { sym: "CL1!",    v: "78.42",     d: "−1.18%",  up: false, note: "WTI" },
      { sym: "DXY",     v: "102.18",    d: "−0.08%",  up: false, note: "Dollar Index" },
      { sym: "BTCUSD",  v: "98,420",    d: "+2.31%",  up: true,  note: "Bitcoin" },
      { sym: "VIX",     v: "14.82",     d: "−3.40%",  up: false, note: "Volatility" },
      { sym: "US10Y",   v: "4.32%",     d: "+2 bps",  up: true,  note: "10Y Treasury" },
      { sym: "PING",    v: "1.94 ms",   d: "CHI",     up: null,  note: "Order → Fill" },
    ],
    perfLabel: "(10) TRACK RECORD",
    perfTitle: ["Seven years. ", "Audit ready", "."],
    perfBody:
      "Aggregated backtest and live performance across the core modules. Third-party audited, every trade time- and latency-stamped. No cherry picks — the full curve, bad years included.",
    perfHeader: ["Year", "Edge", "Max DD", "Sharpe", "Win Rate", "Note"],
    perfRows: [
      ["2026 YTD", "+18.4 %", "−4.1 %",  "2.31", "62.4 %", "Live · CHI Colo"],
      ["2025",     "+34.1 %", "−7.2 %",  "2.18", "61.0 %", "Live"],
      ["2024",     "+27.8 %", "−9.5 %",  "1.94", "59.3 %", "Live"],
      ["2023",     "+22.5 %", "−12.1 %", "1.71", "57.8 %", "Live · IGOR v3"],
      ["2022",     "+9.4 %",  "−18.7 %", "0.86", "53.1 %", "Bear Market"],
      ["2021",     "+41.2 %", "−6.8 %",  "2.42", "63.5 %", "Backtest"],
      ["2020",     "+33.7 %", "−21.4 %", "1.42", "55.7 %", "Backtest · Vol."],
    ],
    perfStamp: "BACKTEST + LIVE · NOT INVESTMENT ADVICE · AUDIT REF HGD-AR-26",
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

/* ============ Confluence radar (6-axis spider chart + score) ============ */
const ConfluenceRadar = ({ sources, signal }) => {
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

/* ============ Options payoff card (Bull-Call spread schematic) ============ */
const OptionsPayoffCard = ({ labels }) => (
  <div
    data-testid="options-payoff"
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
      <span>{labels.title}</span>
      <span style={{ color: "var(--rust)" }}>● BUILDER</span>
    </div>
    <div className="font-mono label" style={{ marginBottom: 14, color: "var(--ink)" }}>
      {labels.legs}
    </div>

    <svg viewBox="0 0 560 230" width="100%" height="auto" style={{ display: "block" }}>
      <defs>
        <linearGradient id="pgGain" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(63,122,85,0.32)" />
          <stop offset="1" stopColor="rgba(63,122,85,0)" />
        </linearGradient>
        <linearGradient id="pgLoss" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="rgba(160,69,53,0.05)" />
          <stop offset="1" stopColor="rgba(160,69,53,0.2)" />
        </linearGradient>
      </defs>
      <g stroke="rgba(13,13,13,0.08)" strokeWidth="0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={`h${i}`} x1="30" y1={30 + i * 40} x2="540" y2={30 + i * 40} />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`v${i}`} x1={30 + i * 72} y1="20" x2={30 + i * 72} y2="200" />
        ))}
      </g>
      <line x1="30" y1="140" x2="540" y2="140" stroke="rgba(13,13,13,0.35)" strokeWidth="0.7" strokeDasharray="4 4" />
      <polygon points="30,160 200,160 280,140 30,140" fill="url(#pgLoss)" />
      <polygon points="280,140 380,60 540,60 540,140" fill="url(#pgGain)" />
      <polyline points="30,160 200,160 380,60 540,60" fill="none" stroke="#0d0d0d" strokeWidth="2.2" strokeLinejoin="round" strokeLinecap="round" />
      <line x1="200" y1="20" x2="200" y2="210" stroke="rgba(13,13,13,0.35)" strokeDasharray="2 4" />
      <text x="204" y="218" fill="var(--muted)" fontSize="10" letterSpacing="0.08em">K 460 (BUY)</text>
      <line x1="380" y1="20" x2="380" y2="210" stroke="rgba(13,13,13,0.35)" strokeDasharray="2 4" />
      <text x="384" y="218" fill="var(--muted)" fontSize="10" letterSpacing="0.08em">K 475 (SELL)</text>
      <circle cx="280" cy="140" r="4" fill="var(--rust)" />
      <text x="288" y="135" fill="var(--rust)" fontSize="11" fontFamily="JetBrains Mono" letterSpacing="0.04em">{labels.be}</text>
      <text x="540" y="52" fill="#3f7a55" fontSize="11" fontFamily="JetBrains Mono" textAnchor="end" letterSpacing="0.04em">{labels.max}</text>
      <text x="30" y="174" fill="#a04535" fontSize="11" fontFamily="JetBrains Mono" letterSpacing="0.04em">{labels.maxL}</text>
      <g transform="translate(440, 14)">
        <rect x="0" y="0" width="100" height="22" rx="11" fill="rgba(13,13,13,0.9)" />
        <text x="50" y="15" textAnchor="middle" fill="#fff" fontSize="11" letterSpacing="0.08em" fontFamily="JetBrains Mono">{labels.pop}</text>
      </g>
    </svg>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        marginTop: 18,
        border: "1px solid var(--rule)",
        overflow: "hidden",
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {[
        ["Δ DELTA", "+0.34"],
        ["Γ GAMMA", "0.018"],
        ["Θ THETA", "−0.42"],
        ["V VEGA",  "+0.21"],
      ].map((g, i) => (
        <div
          key={g[0]}
          style={{
            padding: "10px 14px",
            borderRight: i < 3 ? "1px solid var(--rule)" : "none",
            background: "rgba(255,255,255,0.4)",
          }}
        >
          <div style={{ fontSize: 10, letterSpacing: "0.08em", color: "var(--muted)" }}>{g[0]}</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)", marginTop: 2 }}>{g[1]}</div>
        </div>
      ))}
    </div>
  </div>
);

/* ============ Orderflow heatmap (DOM + Tape + CVD schematic) ============ */
const OrderflowHeatmap = ({ labels }) => (
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

/* ============ Protection chart (Trailing stop visual) ============ */
const ProtectionChart = ({ labels }) => (
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

/* ============ Live ticker strip (institutional Bloomberg-style) ============ */
const TickerBar = ({ items }) => {
  const list = [...items, ...items, ...items];
  return (
    <div
      data-testid="ticker-bar"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        background: "var(--ink-2)",
        color: "rgba(255,255,255,0.85)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        overflow: "hidden",
        height: 34,
        display: "flex",
        alignItems: "center",
      }}
    >
      <div
        className="font-mono"
        style={{
          flexShrink: 0,
          padding: "0 16px",
          fontSize: 10.5,
          letterSpacing: "0.14em",
          color: "rgba(255,255,255,0.55)",
          borderRight: "1px solid rgba(255,255,255,0.08)",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: "var(--ink-2)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <span className="dot-pulse" style={{ marginRight: 10 }} />
        LIVE · CHI
      </div>
      <div
        style={{
          display: "flex",
          gap: 36,
          alignItems: "center",
          whiteSpace: "nowrap",
          animation: "ticker 64s linear infinite",
          fontFamily: "JetBrains Mono, monospace",
          fontSize: 11.5,
          paddingLeft: 28,
          fontVariantNumeric: "tabular-nums",
        }}
      >
        {list.map((t, i) => {
          const color =
            t.up === true ? "#5dba8a"
            : t.up === false ? "#d88075"
            : "rgba(255,255,255,0.7)";
          return (
            <span key={`${t.sym}-${i}`} style={{ display: "inline-flex", alignItems: "baseline", gap: 8 }}>
              <span style={{ color: "rgba(255,255,255,0.55)", letterSpacing: "0.08em" }}>{t.sym}</span>
              <span style={{ color: "#fff" }}>{t.v}</span>
              <span style={{ color, letterSpacing: "0.02em" }}>
                {t.up === true ? "▲" : t.up === false ? "▼" : "·"} {t.d}
              </span>
              <span style={{ color: "rgba(255,255,255,0.32)", marginLeft: 4 }}>{t.note}</span>
              <span style={{ color: "rgba(255,255,255,0.18)", marginLeft: 14 }}>│</span>
            </span>
          );
        })}
      </div>
    </div>
  );
};

/* ============ Hero cockpit frame (real screenshot) ============ */
const HeroCockpit = ({ caption }) => (
  <div
    data-testid={TID.heroCockpit}
    className="reveal hero-cockpit-mob"
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
        className="cap-row-grid"
        style={{
          width: "100%",
          background: "transparent",
          border: "none",
          padding: "26px 0",
          cursor: "pointer",
          textAlign: "left",
          color: "inherit",
        }}
      >
        <span className="font-mono label">{num}</span>
        <span className="font-serif cap-row-label" style={{ fontSize: "clamp(28px,4.2vw,56px)", fontWeight: 500, lineHeight: 1.05 }}>
          {label}{" "}
          <span className="h-italic">{italic}</span>
        </span>
        <span className="font-mono label cap-row-meta" style={{ marginRight: 18 }}>
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
      <TickerBar items={t.tickerItems} />
      {/* ============== HEADER ============== */}
      <header
        className="header-grid"
        style={{
          position: "fixed",
          top: 34,
          left: 0,
          right: 0,
          zIndex: 50,
          padding: "20px 36px",
          backdropFilter: "blur(2px)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <a href="#top" className="x-box" data-testid={TID.headerCloseBox} aria-label="Top">
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M1 1 L11 11 M11 1 L1 11" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </a>
          <div className="font-mono label label-strong" data-testid={TID.headerLogo} style={{ fontSize: 12, fontWeight: 600, whiteSpace: "nowrap" }}>
            HONIGDAX <span className="header-brand-tag" style={{ color: "var(--muted)", margin: "0 6px" }}>/</span><span className="header-brand-tag"> {t.headerBrandTag}</span>
          </div>
        </div>

        <nav className="header-nav">
          <a className="tlink" href="#capabilities" data-testid={TID.headerNavCapabilities}>{t.navCapabilities}</a>
          <a className="tlink" href="#approach" data-testid={TID.headerNavApproach}>{t.navApproach}</a>
          <a className="tlink" href="#strategy" data-testid={TID.headerNavStrategy}>{t.navStrategy}</a>
          <a className="tlink" href="#contact" data-testid={TID.headerNavContact}>{t.navContact}</a>
        </nav>

        <div className="header-tools">
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
            className="font-mono label header-clock"
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
          padding: "150px 36px 60px",
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

        <div className="hero-split">
          <h1 className="h-display reveal" style={{ fontSize: "clamp(64px, 11vw, 196px)", marginTop: 28 }}>
            {t.heroLineA}
            <br />
            <span className="h-italic" style={{ fontSize: "1em" }}>{t.heroLineB}</span>
          </h1>
          <HeroCockpit caption={t.cockpitCaption} />
        </div>

        <div className="reveal hero-bottom">
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: 16, maxWidth: 480, lineHeight: 1.6, color: "var(--ink)" }}>
            {t.heroBody}
          </p>
          <div className="hero-cta-wrap" style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
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

        <div className="hero-scroll">
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
          <div className="font-mono label">{t.heroScrollNext}</div>        </div>
      </section>

      {/* ============== MARQUEE ============== */}
      <div className="marquee" data-testid={TID.marqueeBand}>
        <div className="marquee-track">
          {t.marqueeWords.map((w, i) => <span key={`a${i}`}>{w}</span>)}
          {t.marqueeWords.map((w, i) => <span key={`b${i}`}>{w}</span>)}
        </div>
      </div>

      {/* ============== INSIGHTS (real cockpit preview) ============== */}
      <section id="insights" className="sec-pad">
        <div className="font-mono label idx reveal" style={{ marginBottom: 56 }}>
          <span className="bar" />
          <span>{t.insightsLabel}</span>
        </div>
        <div className="insights-head">
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
          className="reveal gallery-grid"
          data-testid={TID.insightsImage}
        >
          {t.galleryItems.map((g, idx) => (
            <a
              key={g.src}
              href={g.src}
              target="_blank"
              rel="noreferrer"
              data-testid={`gallery-item-${idx}`}
              className="gallery-tile"
              style={{
                display: "block",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <div
                style={{
                  position: "relative",
                  border: "1px solid var(--rule)",
                  background: "#0c0c10",
                  aspectRatio: "16/10",
                  overflow: "hidden",
                  transition: "transform 0.35s cubic-bezier(.2,.7,.2,1), box-shadow 0.35s",
                }}
              >
                <img
                  src={g.src}
                  alt={`${g.label} ${g.italic}`}
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    transition: "transform 0.5s cubic-bezier(.2,.7,.2,1)",
                  }}
                />
                <span
                  className="font-mono"
                  style={{
                    position: "absolute",
                    top: 10,
                    left: 12,
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    color: "rgba(255,255,255,0.75)",
                    background: "rgba(0,0,0,0.45)",
                    padding: "3px 7px",
                  }}
                >
                  {g.num} /
                </span>
                <span
                  className="font-mono"
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 12,
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    color: "rgba(255,255,255,0.55)",
                  }}
                >
                  +
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "baseline",
                  padding: "14px 4px 4px",
                  gap: 12,
                }}
              >
                <div className="font-serif" style={{ fontSize: 22, fontWeight: 600, lineHeight: 1.15 }}>
                  {g.label}{" "}
                  <span className="h-italic" style={{ fontSize: "1em" }}>{g.italic}</span>
                </div>
                <div className="font-mono label" style={{ flexShrink: 0 }}>{g.meta}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* ============== CAPABILITIES ============== */}
      <section id="capabilities" className="sec-pad">
        <div className="font-mono label idx reveal" style={{ marginBottom: 56 }}>
          <span className="bar" />
          <span>{t.capLabel}</span>
        </div>

        <h2 className="h-display reveal cap-title" style={{ fontSize: "clamp(38px, 5.5vw, 84px)" }}>
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

      {/* ============== PROTECTION (Dual Stop) ============== */}
      <section id="protection" className="sec-pad" style={{ position: "relative" }}>
        <div className="font-mono label idx reveal" style={{ marginBottom: 56 }}>
          <span className="bar" />
          <span>{t.protLabel}</span>
        </div>

        <div className="protection-grid">
          <div>
            <h2 className="h-display reveal" style={{ fontSize: "clamp(36px, 4.8vw, 70px)", maxWidth: 620, marginBottom: 24 }}>
              {t.protTitle[0]}
              <span className="h-italic">{t.protTitle[1]}</span>
              {t.protTitle[2]}
            </h2>
            <p
              className="reveal"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 16.5,
                lineHeight: 1.65,
                color: "var(--ink)",
                maxWidth: 540,
                marginBottom: 36,
              }}
            >
              {t.protSub}
            </p>

            <ol style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {t.protPoints.map((p, i) => (
                <li
                  key={p.num}
                  data-testid={`protection-point-${i}`}
                  className="reveal row-cap"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "44px 1fr",
                    gap: 18,
                    padding: "22px 0",
                    borderTop: "1px solid var(--rule)",
                  }}
                >
                  <span className="font-mono label" style={{ paddingTop: 6 }}>{p.num}</span>
                  <div>
                    <div
                      className="font-serif"
                      style={{
                        fontSize: "clamp(20px, 2.2vw, 28px)",
                        fontWeight: 500,
                        lineHeight: 1.2,
                        marginBottom: 8,
                      }}
                    >
                      {p.title[0]}
                      <span className="h-italic">{p.title[1]}</span>
                    </div>
                    <p
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 15,
                        lineHeight: 1.6,
                        color: "var(--muted)",
                        maxWidth: 560,
                      }}
                    >
                      {p.body}
                    </p>
                  </div>
                </li>
              ))}
              <li style={{ borderTop: "1px solid var(--rule)" }} />
            </ol>

            <div
              className="reveal"
              style={{
                marginTop: 30,
                display: "inline-flex",
                alignItems: "center",
                gap: 12,
                padding: "12px 18px",
                border: "1px solid rgba(13,13,13,0.22)",
                borderRadius: 999,
                background: "rgba(13,13,13,0.04)",
              }}
            >
              <svg width="14" height="16" viewBox="0 0 14 16" fill="none" aria-hidden>
                <path
                  d="M7 0.8 L1 3.2 V8 C1 11.6 4 14.4 7 15.2 C10 14.4 13 11.6 13 8 V3.2 L7 0.8 Z"
                  stroke="var(--ink)"
                  strokeWidth="1.1"
                  strokeLinejoin="round"
                />
                <path d="M4.5 8 L6.2 9.6 L9.5 6.2" stroke="var(--rust)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className="font-mono label label-strong" style={{ letterSpacing: "0.08em" }}>
                {t.protTagline}
              </span>
            </div>

            <p
              className="reveal"
              style={{
                marginTop: 32,
                fontFamily: "Inter, sans-serif",
                fontSize: 11.5,
                lineHeight: 1.6,
                color: "var(--muted-2)",
                maxWidth: 640,
              }}
            >
              {t.protDisc}
            </p>
          </div>

          <div className="protection-chart-wrap">
            <ProtectionChart labels={t.protChart} />
          </div>
        </div>
      </section>

      {/* ============== ORDERFLOW INTELLIGENCE ============== */}
      <section id="orderflow" className="sec-pad" style={{ position: "relative" }}>
        <div className="font-mono label idx reveal" style={{ marginBottom: 56 }}>
          <span className="bar" />
          <span>{t.ofLabel}</span>
        </div>

        <div className="insights-head" style={{ marginBottom: 56 }}>
          <h2 className="h-display reveal" style={{ fontSize: "clamp(36px, 4.8vw, 70px)" }}>
            {t.ofTitle[0]}
            <span className="h-italic">{t.ofTitle[1]}</span>
            {t.ofTitle[2]}
          </h2>
          <p
            className="reveal"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 16.5,
              lineHeight: 1.65,
              color: "var(--ink)",
              maxWidth: 540,
            }}
          >
            {t.ofSub}
          </p>
        </div>

        {/* 5-step detection chain — 3+2 grid on desktop, stack on mobile */}
        <div className="of-steps-grid">
          {t.ofSteps.map((s, i) => (
            <div
              key={s.num}
              data-testid={`orderflow-step-${i}`}
              className="reveal of-step"
              style={{
                border: "1px solid var(--rule)",
                background: "rgba(255,255,255,0.35)",
                padding: "26px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
                position: "relative",
              }}
            >
              <div
                className="font-mono"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  color: "var(--muted)",
                }}
              >
                <span>{s.num} /</span>
                <span style={{ color: "var(--rust)" }}>+</span>
              </div>
              <div
                className="font-serif"
                style={{
                  fontSize: "clamp(20px, 2vw, 26px)",
                  fontWeight: 500,
                  lineHeight: 1.15,
                }}
              >
                {s.title[0]}
                <span className="h-italic">{s.title[1]}</span>
              </div>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14.5,
                  lineHeight: 1.6,
                  color: "var(--muted)",
                  margin: 0,
                }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>

        {/* Heatmap visual + caption */}
        <div className="of-heat-wrap" style={{ marginTop: 80 }}>
          <div className="reveal" style={{ marginBottom: 28 }}>
            <h3
              className="font-serif"
              style={{
                fontSize: "clamp(28px, 3.4vw, 48px)",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                maxWidth: 760,
                marginBottom: 16,
              }}
            >
              {t.ofHeatTitle[0]}
              <span className="h-italic">{t.ofHeatTitle[1]}</span>
              {t.ofHeatTitle[2]}
            </h3>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 15.5,
                lineHeight: 1.65,
                color: "var(--muted)",
                maxWidth: 760,
              }}
            >
              {t.ofHeatBody}
            </p>
          </div>
          <OrderflowHeatmap labels={t.ofHeatLabels} />
        </div>

        {/* Tagline + disclaimer */}
        <div className="reveal" style={{ marginTop: 48, display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 14,
              padding: "12px 20px",
              border: "1px solid var(--ink)",
              borderRadius: 999,
              background: "var(--ink)",
              color: "#fff",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <circle cx="7" cy="7" r="6" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
              <circle cx="7" cy="7" r="2.4" fill="var(--rust-bright)" />
            </svg>
            <span className="font-mono" style={{ letterSpacing: "0.08em", fontSize: 12, color: "rgba(255,255,255,0.92)" }}>
              {t.ofTagline}
            </span>
          </div>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 11.5,
              lineHeight: 1.6,
              color: "var(--muted-2)",
              maxWidth: 720,
              margin: 0,
            }}
          >
            {t.ofDisc}
          </p>
        </div>
      </section>

      {/* ============== CONFLUENCE ENGINE ============== */}
      <section id="confluence" className="sec-pad" style={{ position: "relative" }}>
        <div className="font-mono label idx reveal" style={{ marginBottom: 56 }}>
          <span className="bar" />
          <span>{t.cfLabel}</span>
        </div>

        <div className="insights-head" style={{ marginBottom: 56 }}>
          <h2 className="h-display reveal" style={{ fontSize: "clamp(36px, 4.8vw, 70px)", maxWidth: 820 }}>
            {t.cfTitle[0]}
            <span className="h-italic">{t.cfTitle[1]}</span>
            {t.cfTitle[2]}
          </h2>
          <p
            className="reveal"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 16.5,
              lineHeight: 1.65,
              color: "var(--ink)",
              maxWidth: 540,
            }}
          >
            {t.cfSub}
          </p>
        </div>

        {/* Radar + sources */}
        <div className="cf-grid">
          <div className="cf-radar-wrap">
            <ConfluenceRadar sources={t.cfSources} signal={t.cfSignal} />
          </div>
          <div className="cf-sources">
            {t.cfSources.map((s, i) => (
              <div
                key={s.code}
                data-testid={`confluence-source-${i}`}
                className="reveal"
                style={{
                  borderTop: "1px solid var(--rule)",
                  padding: "20px 0",
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  gap: 20,
                  alignItems: "center",
                }}
              >
                <div>
                  <div className="font-mono label" style={{ marginBottom: 6 }}>{s.code}</div>
                  <div
                    className="font-serif"
                    style={{
                      fontSize: "clamp(18px, 1.9vw, 24px)",
                      fontWeight: 500,
                      lineHeight: 1.15,
                      marginBottom: 4,
                    }}
                  >
                    {s.label[0]}<span className="h-italic">{s.label[1]}</span>
                  </div>
                  <p
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 14,
                      color: "var(--muted)",
                      lineHeight: 1.55,
                      margin: 0,
                    }}
                  >
                    {s.body}
                  </p>
                </div>
                {/* tiny vote bar */}
                <div style={{ width: 90, textAlign: "right" }}>
                  <div
                    style={{
                      height: 6,
                      background: "rgba(13,13,13,0.08)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        width: `${Math.round(s.weight * 100)}%`,
                        height: "100%",
                        background: "var(--rust)",
                      }}
                    />
                  </div>
                  <div className="font-mono" style={{ fontSize: 11, color: "var(--ink)", marginTop: 6, fontVariantNumeric: "tabular-nums" }}>
                    {Math.round(s.weight * 100)} %
                  </div>
                </div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid var(--rule)" }} />
          </div>
        </div>

        {/* Style slider */}
        <div className="reveal" style={{ marginTop: 80 }}>
          <h3
            className="font-serif"
            style={{
              fontSize: "clamp(24px, 2.6vw, 36px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              marginBottom: 12,
            }}
          >
            {t.cfStyleTitle[0]}<span className="h-italic">{t.cfStyleTitle[1]}</span>{t.cfStyleTitle[2]}
          </h3>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 15.5,
              lineHeight: 1.65,
              color: "var(--muted)",
              maxWidth: 760,
              marginBottom: 24,
            }}
          >
            {t.cfStyleBody}
          </p>
          <div
            style={{
              border: "1px solid var(--rule)",
              padding: "20px 24px",
              background: "rgba(255,255,255,0.4)",
              display: "grid",
              gridTemplateColumns: "auto 1fr auto",
              gap: 22,
              alignItems: "center",
            }}
          >
            <span className="font-mono label label-strong">{t.cfStyleEnds[0]}</span>
            <div style={{ position: "relative", height: 22, display: "flex", alignItems: "center" }}>
              <div style={{ position: "absolute", left: 0, right: 0, height: 2, background: "rgba(13,13,13,0.18)" }} />
              <div style={{ position: "absolute", left: 0, width: "44%", height: 2, background: "var(--ink)" }} />
              {[0, 0.25, 0.5, 0.75, 1].map((p) => (
                <span
                  key={p}
                  style={{
                    position: "absolute",
                    left: `calc(${p * 100}% - 2px)`,
                    width: 4,
                    height: 10,
                    background: "rgba(13,13,13,0.35)",
                  }}
                />
              ))}
              <span
                style={{
                  position: "absolute",
                  left: "calc(44% - 11px)",
                  width: 22,
                  height: 22,
                  borderRadius: 999,
                  background: "var(--ink)",
                  border: "3px solid var(--rust)",
                  boxShadow: "0 6px 16px rgba(13,13,13,0.18)",
                }}
              />
            </div>
            <span className="font-mono label label-strong">{t.cfStyleEnds[1]}</span>
          </div>
        </div>

        {/* Flow strip — Detect → Enter → Protect */}
        <div className="reveal" style={{ marginTop: 56 }}>
          <h3
            className="font-serif"
            style={{
              fontSize: "clamp(24px, 2.6vw, 36px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              marginBottom: 12,
            }}
          >
            {t.cfFlowTitle[0]}<span className="h-italic">{t.cfFlowTitle[1]}</span>{t.cfFlowTitle[2]}
          </h3>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 15.5,
              lineHeight: 1.65,
              color: "var(--muted)",
              maxWidth: 760,
              marginBottom: 24,
            }}
          >
            {t.cfFlowBody}
          </p>
          <div className="cf-flow">
            {t.cfFlowSteps.map((s, i) => (
              <React.Fragment key={s}>
                <div
                  data-testid={`confluence-flow-${i}`}
                  className="cf-flow-step"
                  style={{
                    border: "1px solid var(--ink)",
                    background: i === t.cfFlowSteps.length - 1 ? "var(--ink)" : "transparent",
                    color: i === t.cfFlowSteps.length - 1 ? "#fff" : "var(--ink)",
                    padding: "18px 24px",
                    flex: 1,
                    minWidth: 180,
                    fontFamily: "JetBrains Mono, monospace",
                    fontSize: 12,
                    letterSpacing: "0.12em",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{String(i + 1).padStart(2, "0")} · {s}</span>
                  <span style={{ color: i === t.cfFlowSteps.length - 1 ? "var(--rust-bright)" : "var(--rust)" }}>●</span>
                </div>
                {i < t.cfFlowSteps.length - 1 && (
                  <span
                    aria-hidden
                    className="cf-flow-arrow"
                    style={{
                      fontFamily: "JetBrains Mono",
                      color: "var(--rust)",
                      fontSize: 18,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 32,
                    }}
                  >
                    →
                  </span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Tagline + disclaimer */}
        <div className="reveal" style={{ marginTop: 48, display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 14,
              padding: "12px 20px",
              border: "1px solid var(--ink)",
              borderRadius: 999,
              background: "var(--ink)",
              color: "#fff",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <circle cx="7" cy="7" r="6" stroke="rgba(255,255,255,0.65)" strokeWidth="1" />
              <path d="M3.5 7.5 L6 10 L10.5 4.5" stroke="var(--rust-bright)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            <span className="font-mono" style={{ letterSpacing: "0.08em", fontSize: 12, color: "rgba(255,255,255,0.92)" }}>
              {t.cfTagline}
            </span>
          </div>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 11.5,
              lineHeight: 1.6,
              color: "var(--muted-2)",
              maxWidth: 720,
              margin: 0,
            }}
          >
            {t.cfDisc}
          </p>
        </div>
      </section>

      {/* ============== APPROACH (BLACK) ============== */}
      <section
        id="approach"
        className="paper-grain dark on-dark approach-pad"
        style={{ background: "var(--ink-2)", color: "#fff", padding: "120px 36px", position: "relative" }}
      >
        <div className="font-mono label idx reveal" style={{ marginBottom: 56 }}>
          <span className="bar" style={{ background: "rgba(255,255,255,0.5)" }} />
          <span>{t.appLabel}</span>
        </div>

        <div className="approach-grid">
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
          className="reveal stats-grid"
          style={{
            marginTop: 96,
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

      {/* ============== OPTIONS COCKPIT ============== */}
      <section id="options-cockpit" className="sec-pad" style={{ position: "relative" }}>
        <div className="font-mono label idx reveal" style={{ marginBottom: 56 }}>
          <span className="bar" />
          <span>{t.ocLabel}</span>
        </div>

        <div className="insights-head" style={{ marginBottom: 56 }}>
          <h2 className="h-display reveal" style={{ fontSize: "clamp(36px, 4.8vw, 70px)", maxWidth: 760 }}>
            {t.ocTitle[0]}
            <span className="h-italic">{t.ocTitle[1]}</span>
            {t.ocTitle[2]}
          </h2>
          <p
            className="reveal"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 16.5,
              lineHeight: 1.65,
              color: "var(--ink)",
              maxWidth: 540,
            }}
          >
            {t.ocSub}
          </p>
        </div>

        {/* Two-column: payoff card (sticky left), 3 step cards (right stack) */}
        <div className="oc-grid">
          <div className="oc-payoff-wrap">
            <OptionsPayoffCard labels={t.ocChart} />
          </div>
          <div className="oc-steps">
            {t.ocSteps.map((s, i) => (
              <div
                key={s.num}
                data-testid={`oc-step-${i}`}
                className="reveal"
                style={{
                  borderTop: "1px solid var(--rule)",
                  padding: "26px 0",
                }}
              >
                <div
                  className="font-mono"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    color: "var(--muted)",
                    marginBottom: 12,
                  }}
                >
                  <span>{s.num} /</span>
                  <span style={{ color: "var(--rust)" }}>+</span>
                </div>
                <div
                  className="font-serif"
                  style={{
                    fontSize: "clamp(22px, 2.3vw, 32px)",
                    fontWeight: 500,
                    lineHeight: 1.15,
                    marginBottom: 12,
                  }}
                >
                  {s.title[0]}
                  <span className="h-italic">{s.title[1]}</span>
                </div>
                <p
                  style={{
                    fontFamily: "Inter, sans-serif",
                    fontSize: 15,
                    lineHeight: 1.6,
                    color: "var(--muted)",
                    marginBottom: 16,
                  }}
                >
                  {s.body}
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="font-mono"
                      style={{
                        fontSize: 12,
                        letterSpacing: "0.04em",
                        color: "var(--ink)",
                        padding: "6px 0",
                        display: "flex",
                        gap: 12,
                        alignItems: "flex-start",
                      }}
                    >
                      <span style={{ color: "var(--rust)", flexShrink: 0 }}>·</span>
                      <span style={{ color: "var(--muted)" }}>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div style={{ borderTop: "1px solid var(--rule)" }} />
          </div>
        </div>

        <div className="reveal" style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 14,
              padding: "12px 20px",
              border: "1px solid var(--ink)",
              borderRadius: 999,
              background: "var(--ink)",
              color: "#fff",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M2 7 H12 M9 4 L12 7 L9 10" stroke="var(--rust-bright)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            <span className="font-mono" style={{ letterSpacing: "0.08em", fontSize: 12, color: "rgba(255,255,255,0.92)" }}>
              {t.ocTagline}
            </span>
          </div>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 11.5,
              lineHeight: 1.6,
              color: "var(--muted-2)",
              maxWidth: 720,
              margin: 0,
            }}
          >
            {t.ocDisc}
          </p>
        </div>
      </section>

      {/* ============== STRATEGY LAB ============== */}
      <section id="strategy" className="sec-pad" style={{ position: "relative" }}>
        <div className="font-mono label idx reveal" style={{ marginBottom: 56 }}>
          <span className="bar" />
          <span>{t.stratLabel}</span>
        </div>

        <div className="insights-head" style={{ marginBottom: 56 }}>
          <h2 className="h-display reveal" style={{ fontSize: "clamp(36px, 4.8vw, 70px)", maxWidth: 760 }}>
            {t.stratTitle[0]}
            <span className="h-italic">{t.stratTitle[1]}</span>
            {t.stratTitle[2]}
          </h2>
          <p
            className="reveal"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 16.5,
              lineHeight: 1.65,
              color: "var(--ink)",
              maxWidth: 540,
            }}
          >
            {t.stratSub}
          </p>
        </div>

        {/* 4 stages grid */}
        <div className="strat-steps-grid">
          {t.stratSteps.map((s, i) => (
            <div
              key={s.num}
              data-testid={`strategy-step-${i}`}
              className="reveal of-step"
              style={{
                border: "1px solid var(--rule)",
                background: "rgba(255,255,255,0.35)",
                padding: "26px 24px",
                display: "flex",
                flexDirection: "column",
                gap: 14,
                position: "relative",
              }}
            >
              <div
                className="font-mono"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  color: "var(--muted)",
                }}
              >
                <span>{s.num} /</span>
                <span style={{ color: "var(--rust)" }}>+</span>
              </div>
              <div
                className="font-serif"
                style={{
                  fontSize: "clamp(20px, 2vw, 26px)",
                  fontWeight: 500,
                  lineHeight: 1.15,
                }}
              >
                {s.title[0]}
                <span className="h-italic">{s.title[1]}</span>
              </div>
              <p
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 14.5,
                  lineHeight: 1.6,
                  color: "var(--muted)",
                  margin: 0,
                }}
              >
                {s.body}
              </p>
            </div>
          ))}
        </div>

        {/* KPI strip — the metrics from a backtest report */}
        <div
          className="reveal strat-kpis"
          data-testid="strategy-kpis"
          style={{
            marginTop: 56,
            border: "1px solid var(--rule)",
            background: "rgba(13,13,13,0.04)",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            borderRight: "none",
          }}
        >
          {t.stratKpis.map((k, i) => (
            <div
              key={k[0]}
              style={{
                padding: "20px 22px",
                borderRight: "1px solid var(--rule)",
                borderBottom: i < 4 ? "1px solid var(--rule)" : "none",
              }}
            >
              <div className="font-mono label" style={{ marginBottom: 6 }}>{k[0]}</div>
              <div
                className="font-mono"
                style={{
                  fontSize: 20,
                  fontWeight: 600,
                  fontVariantNumeric: "tabular-nums",
                  color: k[1].startsWith("+") ? "#3f7a55" : k[1].startsWith("−") ? "#a04535" : "var(--ink)",
                  letterSpacing: "0.02em",
                }}
              >
                {k[1]}
              </div>
            </div>
          ))}
        </div>

        {/* Honest pricing explanation */}
        <div className="reveal" style={{ marginTop: 80 }}>
          <h3
            className="font-serif"
            style={{
              fontSize: "clamp(26px, 3.2vw, 44px)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              maxWidth: 820,
              marginBottom: 18,
            }}
          >
            {t.stratPricingTitle[0]}
            <span className="h-italic">{t.stratPricingTitle[1]}</span>
            {t.stratPricingTitle[2]}
          </h3>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 15.5,
              lineHeight: 1.7,
              color: "var(--muted)",
              maxWidth: 820,
            }}
          >
            {t.stratPricingBody}
          </p>
        </div>

        {/* Tagline + disclaimer */}
        <div className="reveal" style={{ marginTop: 40, display: "flex", flexWrap: "wrap", gap: 24, alignItems: "center", justifyContent: "space-between" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 14,
              padding: "12px 20px",
              border: "1px solid var(--ink)",
              borderRadius: 999,
              background: "var(--ink)",
              color: "#fff",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path d="M3 7 L6 10 L11 4" stroke="var(--rust-bright)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            <span className="font-mono" style={{ letterSpacing: "0.08em", fontSize: 12, color: "rgba(255,255,255,0.92)" }}>
              {t.stratTagline}
            </span>
          </div>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 11.5,
              lineHeight: 1.6,
              color: "var(--muted-2)",
              maxWidth: 720,
              margin: 0,
            }}
          >
            {t.stratDisc}
          </p>
        </div>
      </section>

      {/* ============== TRACK RECORD ============== */}
      <section id="track-record" className="sec-pad">
        <div className="font-mono label idx reveal" style={{ marginBottom: 56 }}>
          <span className="bar" />
          <span>{t.perfLabel}</span>
        </div>

        <div className="perf-head">
          <h2 className="h-display reveal" style={{ fontSize: "clamp(38px, 5.2vw, 80px)" }}>
            {t.perfTitle[0]}
            <span className="h-italic">{t.perfTitle[1]}</span>
            {t.perfTitle[2]}
          </h2>
          <p
            className="reveal"
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 16,
              lineHeight: 1.65,
              color: "var(--ink)",
              maxWidth: 520,
              paddingTop: 12,
            }}
          >
            {t.perfBody}
          </p>
        </div>

        <div
          className="reveal"
          data-testid="performance-table"
          style={{
            border: "1px solid rgba(13,13,13,0.18)",
            background: "rgba(255,255,255,0.35)",
          }}
        >
          {/* header row */}
          <div
            className="font-mono perf-header-row"
            style={{
              padding: "14px 22px",
              fontSize: 11,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--muted)",
              borderBottom: "1px solid rgba(13,13,13,0.18)",
              background: "rgba(13,13,13,0.04)",
            }}
          >
            {t.perfHeader.map((h, i) => {
              const cls = i === 3 ? "perf-col-sharpe" : i === 5 ? "perf-col-note" : "";
              return (
                <span
                  key={h}
                  className={cls}
                  style={{ textAlign: i === t.perfHeader.length - 1 ? "right" : i === 0 ? "left" : "right" }}
                >
                  {h}
                </span>
              );
            })}
          </div>
          {t.perfRows.map((r, i) => {
            const edgePositive = r[1].trim().startsWith("+");
            return (
              <div
                key={r[0]}
                data-testid={`performance-row-${i}`}
                className="font-mono row-cap perf-row"
                style={{
                  padding: "16px 22px",
                  fontSize: 13.5,
                  borderBottom: i < t.perfRows.length - 1 ? "1px solid rgba(13,13,13,0.10)" : "none",
                  alignItems: "baseline",
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                <span style={{ color: "var(--ink)", fontWeight: 600, letterSpacing: "0.04em" }}>{r[0]}</span>
                <span style={{ color: edgePositive ? "#3f7a55" : "#a04535", textAlign: "right" }}>{r[1]}</span>
                <span style={{ color: "var(--muted)", textAlign: "right" }}>{r[2]}</span>
                <span className="perf-col-sharpe" style={{ color: "var(--ink)", textAlign: "right" }}>{r[3]}</span>
                <span style={{ color: "var(--muted)", textAlign: "right" }}>{r[4]}</span>
                <span className="perf-col-note" style={{ color: "var(--muted-2)", textAlign: "right", letterSpacing: "0.06em", fontSize: 11.5 }}>{r[5]}</span>
              </div>
            );
          })}
        </div>

        <div
          className="font-mono label reveal"
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            color: "var(--muted-2)",
          }}
        >
          <span>{t.perfStamp}</span>
          <span>● VERIFIED · {yearRef.current}</span>
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
        className="footer-grid"
        style={{
          borderTop: "1px solid var(--rule)",
          padding: "48px 36px 40px",
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
