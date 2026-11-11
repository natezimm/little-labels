# CLAUDE.md — Little Labels

Guidance and architectural conventions for Claude Code and AI coding agents working in this repository.

## Project Overview

**Little Labels** is a lightweight, mobile-first web application for parents preparing daily food, drink, snack, and bottle labels for childcare, daycare, preschool, and school using Brother QL series thermal label printers (such as the Brother QL-810W with DK-1209 2.1" × 1.1" die-cut labels).

## Critical Privacy Rule (Strictly Enforced)

- **NEVER commit real family or child names** to source code, mock data, documentation, or git commit messages.
- This repository is public.
- All default/fallback data in `src/data/mockData.ts` must use generic placeholder names (`Child 1 LastName`, `Child 2 LastName`).
- Real user data (child names, saved quick-add items, label batches, date format, label layout) is persisted **100% locally in the user's browser `localStorage`** via `src/data/storage.ts`.

## Development Commands

```bash
npm install       # Install dependencies
npm run dev       # Start Vite dev server
npm run build     # Type-check (tsc) and build production bundle to dist/
npm run preview   # Preview production build locally
```

## Architecture & Key Files

- `public/favicon.svg`: Peeling corner sticker squircle icon showing a split of Baby Blue (`#0284C7`) and Blush Pink (`#F43F5E`) under the folded top-right flap.
- `src/App.tsx`: Root application state, screen router (`daily`, `favorites`, `preview`, `settings`), and automatic `localStorage` synchronization.
- `src/types/index.ts`: Core TypeScript interfaces (`Child`, `LabelItem`, `FavoriteItem`, `DateFormat`, `LabelLayout`, `ScreenId`).
- `src/utils/date.ts`: Dynamic date helpers (`getTodayISO`, `getTomorrowISO`, `addDaysISO`, `formatLabelDate`, `getFriendlyDateLabel`).
- `src/data/storage.ts`: Safe `localStorage` read/write wrappers with fallback migration.
- `src/data/mockData.ts`: Generic fallback data for initial load (`DEFAULT_CHILDREN`, `DEFAULT_LABELS`, `DEFAULT_FAVORITES`).
- `src/components/`:
  - `DailyLabelsScreen.tsx`: Primary workflow screen. Features the peeling-corner sticker header, child switcher tabs, `Today` / `Tomorrow` / calendar date selector, per-child Quick Add chips, and separate **Bottles & Drinks** (with 1 oz inline steppers) and **Food & Snacks** sections.
  - `Screen2AddEditLabel.tsx`: Bottom-sheet modal for creating or editing a label, supporting optional bottle ounces (`0.5`–`32 oz` via 1 oz steppers, direct input, and `1`–`10 oz` quick pills) and copy count.
  - `Screen3Favorites.tsx`: Per-child saved items manager for editing Quick Add chips.
  - `Screen4PrintPreview.tsx`: 1:1 physical thermal roll preview and print trigger.
  - `Screen5Settings.tsx`: Child profile editor (name + 8-color theme palette), Label Layout selector (`split-header`, `stacked`, `centered`), US Date Format selector (`MM/DD/YY`, `M/D/YY`, `MM/DD`, `MM-DD`, `MMM D`, `MMM Do`), and Brother QL printer model selector.
  - `ThermalLabel.tsx`: Pure black-and-white 2.1" × 1.1" sticker component supporting `split-header`, `stacked`, and `centered` layouts.

## Design & UX Principles

1. **Speed & Simplicity (Things 3 / Apple Reminders Vibe):** Calm `#F7F7F5` background, crisp white grouped cards, minimal borders, zero enterprise clutter.
2. **Typography & Sticker Motif:** Uses `Fraunces` (`.font-brand`, soft editorial serif) inside a peeling-corner white sticker header paired with `Plus Jakarta Sans` / `-apple-system` for high-legibility UI controls.
3. **Per-Child Scoping:** Each child owns their own daily label batch (`labels.filter(l => l.childId === activeChild.id)`) and their own Quick Add saved items (`favorites.filter(f => f.childId === activeChild.id)`).
4. **Amounts on Liquids Only:** Solid foods display clean item names with no amounts; bottles and drinks display ounces (`oz`) with inline `[-]` / `[+]` 1 oz steppers.
5. **Restrained Child Color Accents:** Each child's chosen color hue tints their switcher tab, the exposed corner of the header sticker, the Quick Add `+` icons, and the primary action buttons (`+ New`, `Preview & Print`, `Print Labels`), while physical thermal label previews remain strictly black on white.
