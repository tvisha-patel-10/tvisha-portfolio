# Pila8 Post-Round Review & Guided Redo Studio

An interactive React + TypeScript prototype of the **Pila8 Post-Round Review & Guided Redo** flow (`SPEC.md`). Before submitting a recorded dual-role conversation round (**Maya — User** and **Dave — Assistant**) to human reviewers, contributors get a calm, non-judgmental automated preview with timestamped moment flags and a guided, cap-limited Redo Studio.

---

## Features & Architecture

- **End-to-End Task Flow**
  - `#/guide` — **Project Guide**: Scenario prompt, role instructions, and task constraints.
  - `#/setup` — **Device & Mic Setup**: Simulated device check, dual-track recording toggle, and live mic readiness banner.
  - `#/live` — **Live Session**: Interactive turn-by-turn conversation walkthrough with real-time tool execution and sticky live mic monitoring banner.
  - `#/review` — **Round Review (S1 & S4)**: Qualitative status summary (`Looks good`, `Likely to be flagged`, `Likely to fail`), two-lane procedural SVG waveform timeline (`Maya` + `Dave`) with tool chips and focusable flag pins, synced transcript, flag list ( desktop inline accordion + `< 640px` mobile bottom sheet), and live partner progress tracker.
  - `#/redo/:flagId` — **Guided Redo Studio (S2 & S3)**: Explicit state machine (`listen -> countdown -> recording -> checking -> fixed | stillFlagged | capReached`), lead-in/lead-out splice preview, Assistant tool-state simulation (`Finding message...` → `Result ready`), 2-take cap per flag, and zero replacement scripts.
  - `#/cleared` — **Round Cleared (S5)**: Final status confirmation, standing human-reviewer disclaimer, before/after flag chips, and role-specific carry-forward tips for Round 2.

- **Persistent Demo Controls Toolbar**
  - **View as**: Switch between `User (Maya)` and `Assistant (Dave)` at any time.
  - **Scenario**:
    - `Default (4 flags)` — `Likely to be flagged` (F1 & F2 owned by Assistant Dave; F3 & F4 owned by User Maya).
    - `V1: Looks good` — All flags low-severity optional polish items.
    - `V2: Likely to fail` — Unfixable persistent mic buzz + 4+ high-severity flags exceeding the 3-redo cap.
  - **Take outcome**:
    - `Default (F3 fails once)` — F3 take 1 returns `Still flagged`, take 2 succeeds (`Fixed`); all other flags succeed on take 1.
    - `Always Fixed` — Every take succeeds on attempt 1.
    - `Always Still flagged` — Forces retry and demonstrates the 2-take cap (`Keep original` / `Use my last take anyway`).
  - **Partner**: `Auto (~25s)` simulated partner resolution, `Instant Done`, or `Skipped`.
  - **Speed**: `1x` real-time or `4x` fast-forward playback, countdowns, and timers.

- **Accessibility & Responsive Design (`SPEC §11 & §12`)**
  - Keyboard-operable timeline scrubber (`Space` play/pause, `Left`/`Right` ±1s, `Shift+Left`/`Right` ±5s) and numbered flag pins.
  - Focus management across routes, post-check headings, and post-take return to the next open flag (`#flag-row-*`) or status card (`#status-card`).
  - Polite `aria-live` announcements for recording start/stop, 1.5s take check completion, partner progress updates, and toast confirmations.
  - Full-bleed responsive layout verified across `320px–360px` (mobile bottom sheet & compact scrubber), `768px` (tablet), and `1280px+` (desktop split view), plus `200%` browser zoom and `prefers-reduced-motion`.

---

## Local Development

### Prerequisites
- **Node.js** `>= 18.x`
- **npm** `>= 9.x`

### Install & Run
```bash
# 1. Install dependencies
npm install

# 2. Start the Vite development server (http://localhost:5173)
npm run dev
```

### Run Unit Tests
```bash
npx vitest run
```

---

## Production Build & Deployment

### Build for Production
Compile TypeScript and bundle optimized static assets into `dist/`:
```bash
npm run build
```

### Preview Production Build Locally
```bash
npm run preview
```

### Deploy
Because the app uses hash-based routing (`#/guide`, `#/setup`, `#/live`, `#/review`, `#/redo/:flagId`, `#/cleared`) and zero backend dependencies, the `dist/` directory can be deployed to any static hosting provider without custom server rewrite rules:

- **Vercel**:
  ```bash
  npx vercel --prod
  ```
  *(Build command: `npm run build`, Output directory: `dist`)*
- **Netlify**:
  ```bash
  npx netlify-cli deploy --prod --dir=dist
  ```
- **GitHub Pages / Cloudflare Pages / AWS S3**:
  Upload the contents of `dist/` directly.
