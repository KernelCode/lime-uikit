# AGENTS.md — this repo is AGENT-READY

This is the **Lime** UI kit from [uikit.studio](https://uikit.studio/kit/lime).
If a developer pointed you here and said *"build me a website with this design"*,
your job is to reproduce **Lime's** exact design system in their project — not a recolor.

## Read these first
- **[`llms.txt`](./llms.txt)** — the full design brief: color tokens (light + dark), fonts,
  radius, components and pages. Machine manifest: <https://uikit.studio/kit/lime/manifest.json>.
- **`design/theme.css`** + **`design/tokens.json`** — the real token source of truth
  (cream + ink + acid lime, the rounded radius scale, light/dark semantics, the
  `[dir="rtl"]` Arabic font swap with the self-hosted Thmanyah Sans).
- **`react/src/components/`** — the real component implementations (cva + tokens).
- **`react/src/routes/`** — the real pages (landing, pricing, dashboard, components showcase).

## How to reproduce this design
1. Copy the **tokens** (light + dark) and **fonts** (Bricolage Grotesque / Inter /
   JetBrains Mono, plus Thmanyah Sans for Arabic) from `design/` into the target.
2. Rebuild the **components** listed in `llms.txt` against those tokens — match Lime's
   **rounded** shapes (base radius **1.5rem** — no squares), highlight marks and bento.
3. Keep **dark mode**, **EN/AR + RTL** and a **responsive** layout.
4. Fastest path: clone this repo and build the developer's pages inside it
   (`cd react && pnpm install && pnpm dev`), or run `npx uikit-studio add lime`
   (Claude Code skill: `lime-ui`).

Do not ship a thin recolor. Match the full system — that's the point of agent-ready.
