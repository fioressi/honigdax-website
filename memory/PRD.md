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
- ✅ Renders end-to-end on desktop + mobile
- ✅ All 5 manual UI checks pass (CTA, capability expand, clock, nav anchors, footer links)
- ✅ Frontend supervisor RUNNING

## Backlog / Next Action Items
- P1: DE/EN language switch (only DE currently)
- P1: Wire CTAs to a real form/Newsletter (currently anchors to #contact)
- P2: Add real product screenshots into a Capabilities "Insights" gallery
- P2: Push back to the GitHub repo as Next.js port (current build is React/CRA — repo expects static HTML or Next.js)
- P3: SEO meta tags, OG image, sitemap.xml
- P3: Honey/amber detail accents (only used for brand dot in `HonigDAX.`) — optionally extend to micro-highlights
