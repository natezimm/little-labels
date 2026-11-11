# AGENTS.md — Little Labels

Instructions and context for autonomous coding agents working in the **Little Labels** repository.

## 1. Purpose & Target Hardware

- **App:** Mobile-first web utility for parents preparing daily daycare food, drink, and bottle labels.
- **Printer Target:** Brother QL series thermal printers (Brother QL-810W, QL-800, QL-1110NWB) using standard **DK-1209 (2.1" × 1.1" / 62mm × 29mm)** die-cut removable white stickers.
- **Tech Stack:** React 19, TypeScript, Tailwind CSS v4 (`@tailwindcss/vite`), Vite 6, Lucide React icons.

## 2. Privacy & Data Persistence Rules

- **No Personal Data in Git:** Never hardcode real child or family names in any file or commit message. Keep `DEFAULT_CHILDREN` in `src/data/mockData.ts` set to generic names (`Alex Taylor`, `Sam Taylor`).
- **On-Device Storage:** All user state (`childrenList`, `activeChildId`, `labels`, `favorites`, `dateFormat`, `labelLayout`, `printerModel`) is persisted in the browser's `localStorage` via `src/data/storage.ts`.

## 3. Core Product Mechanics

- **Per-Child State:** Both daily label batches (`LabelItem.childId`) and Quick Add saved items (`FavoriteItem.childId`) are scoped per child. Switching the active child switches both lists and updates the Print Preview.
- **Bottles & Drinks vs. Food & Snacks:**
  - Items with `ounces > 0` appear under **Bottles & Drinks** with inline `[-]` / `[+]` 1 oz steppers.
  - Items with `ounces === null` appear under **Food & Snacks** with no ounce stepper.
- **Sticker Layouts (`ThermalLabel.tsx`):**
  - `split-header` (Default): Child full name on the left, date on the right, food/drink contents below.
  - `stacked`: Child full name on line 1, date on line 2, contents on line 3.
  - `centered`: Centered alignment across all lines.
- **US Date Formats (`src/utils/date.ts`):**
  - Supports `MM/DD/YY`, `M/D/YY`, `MM/DD`, `MM-DD`, `MMM D` (`Nov 11`), and `MMM Do` (`Nov 11th`).
  - Defaults the active print date to **Tomorrow** (`getTomorrowISO()`).

## 4. Verification Workflow

Before committing or pushing any changes:
1. Run `npm run build` (`tsc && vite build`) and ensure there are zero TypeScript or Vite bundling errors.
2. Verify that no personal names were introduced in `src/` or `docs/`.
3. Push to `main` to trigger `.github/workflows/deploy.yml` for GitHub Pages deployment.
