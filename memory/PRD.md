# HonigDAX — Homepage (Hungema-Style Edition)

## Problem Statement
Need a homepage for honigdax website (GitHub: fioressi/honigdax-website) in the style of Hungema-landing (the user's other Emergent project: cream paper + black + rust-italic editorial design, big Playfair serif with italic accents, mono labels, section indices).

## What was built
Editorial single-page landing for **HonigDAX** — the KI-native Trading-Cockpit on Interactive Brokers — adapted to the Hungema-landing visual language:
- **Palette**: cream paper (#e9e4d8) with SVG grain noise, deep black sections, rust/terracotta accent (#c44a1f) for italic words.
- **Typography**: Playfair Display (700–900 + italic) for display, JetBrains Mono for labels/clock, Inter for body.
- **Sections**: (01) Hero with technical SVG diagram, marquee band, (02) Capabilities with 6 expandable rows, (03) Approach on black with role→outcome table + stat band, (04) Strategy Lab (Plan · Analyze · Backtest), (05) Final CTA "Let's trade it together.", 4-column footer + risk disclaimer.
- **Interactions**: Live Chicago clock (timezone-aware), section reveal on scroll (IntersectionObserver), expandable capability rows, hover micro-animations, scrolling marquee.
- **All interactive/critical elements carry data-testid attributes.**

## Architecture
- Frontend: React (CRA + craco), Tailwind base, custom CSS for editorial design tokens.
- Backend: untouched (default FastAPI template — no API needed for static landing).
- Single route `/` renders `HonigdaxLanding.jsx`.

## Environment fix
- Patched react-scripts/config/webpackDevServer.config.js to use webpack-dev-server v5 API (setupMiddlewares + server.type) so the dev server starts cleanly under supervisor.

## Status
- ✅ Renders end-to-end on desktop + iPad + mobile (verified 1920 / 820 / 390 px)
- ✅ DE/EN language switch live (localStorage persisted)
- ✅ 4 Chapters via CSS flex `order` (Chart Trading, Options, Strategy, Insights)
- ✅ Bot Intelligence section (A.05) — 9 cards, responsive (3 / 2 / 1 col)
- ✅ Beta waitlist signup with backend endpoint `/api/beta-signup`
- ✅ Frontend + Backend supervisor RUNNING

## Recently Completed (Feb 2026)
- Fixed iPad layout for Bot Intelligence section: added `@media (min-width: 600px) and (max-width: 1024px)` keeping `.of-steps-grid` / `.strat-steps-grid` at 2 columns instead of collapsing to 1
- Closed previously broken `@media (max-width: 480px)` block (was swallowing `@layer base`)
- Verified `/api/beta-signup` persists to MongoDB with idempotent email lookup + seat counter (curl-verified, seat=4 → already_on_list=true on retry)
- Added full SEO meta (canonical, Open Graph DE+EN, Twitter cards, JSON-LD SoftwareApplication), `/robots.txt`, `/sitemap.xml` with hreflang alternates
- Added editorial **Hero Equity Curve** sparkline (`/components/HeroEquityCurve.jsx`) — 7Y cumulative line, rust accent dot, mono labels, DE/EN labels (`eqTrack`, `eqYtd`, `eqSeven`)
- **Refactor**: extracted 4 SVG components from the 4258-line monolith into `/app/frontend/src/components/`:
  - `PatternChart.jsx` (123 lines)
  - `ConfluenceRadar.jsx` (176 lines)
  - `OrderflowHeatmap.jsx` (173 lines)
  - `ProtectionChart.jsx` (133 lines)
  - Net: `HonigdaxLanding.jsx` reduced from 4258 → 3670 lines (-588)

## Backlog / Next Action Items
- P2: Push to GitHub repo `fioressi/honigdax-website` as Next.js port (current build is CRA — repo expects static HTML or Next.js)
- P2: Further refactor — extract `HeroCockpit`, `TickerBar`, `CapabilityRow`, `ApproachRow`, `ChapterDivider`, `OptionsPayoffCard` (would bring monolith below 2500 lines)
- P3: Replace `og-image.png` placeholder with actual 1200×630 cream/black/rust hero card
- P3: Add JSON-LD `Product`/`FAQPage` schema if FAQ section is added
- P3: Honey/amber detail accents — optionally extend to micro-highlights
