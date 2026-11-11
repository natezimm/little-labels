# Little Labels

A fast, mobile-first web utility for parents preparing daily food, drink, snack, and bottle labels for **childcare, daycare, preschool, and school** using Brother QL thermal label printers.

Inspired by the calm, tactile simplicity of Things 3 and Apple Reminders, **Little Labels** lets you build and print a full day's batch of lunchbox and bottle stickers in seconds.

## Features

- **Peeling Corner Sticker Branding:** Features a tactile peeling-corner sticker header that dynamically reveals the active child's color theme underneath, paired with a matching dual-color peeling-sticker favicon and `Fraunces` soft-serif typography.
- **100% On-Device Privacy:** Child names, saved quick-add items, daily label batches, and formatting preferences live exclusively in your browser's `localStorage`. Default profiles use generic placeholders (`Child 1 LastName`, `Child 2 LastName`) so personal family data never touches source control or external servers.
- **Independent Per-Child Workflows:** Each child has their own daily label batch and their own saved Quick Add items (for example, school lunchbox items and water bottles for an older child, or daycare formula bottles and purees for an infant).
- **Bottles & Drinks vs. Food & Snacks:** Automatically organizes labels with fluid ounces into **Bottles & Drinks** (with inline `[-]` / `[+]` 1 oz steppers from `0.5` to `32 oz`) and solid lunch or snack items into **Food & Snacks** (clean, uncluttered rows without unnecessary amounts).
- **Customizable Sticker Layouts:** Choose between three pre-calibrated layouts for Brother DK-1209 (`2.1" × 1.1"`) removable thermal stickers:
  - **Split Header (Default):** Child name on the left, date on the right, and food or drink contents below.
  - **Stacked:** Child name on line 1, date on line 2, and contents on line 3.
  - **Centered:** Balanced center alignment across all lines.
- **US Date Formats & Smart Date Picker:** Defaults to **Tomorrow** for evening prep with 1-tap `Today` and `Tomorrow` toggles, day steppers, a native calendar picker, and six compact US date formats (`MM/DD/YY`, `M/D/YY`, `MM/DD`, `MM-DD`, `Nov 11`, `Nov 11th`).
- **8 Curated Child Color Themes:** Personalize each child's switcher tab, peeling header sticker, Quick Add `+` icons, and primary print buttons with Baby Blue, Blush Pink, Lavender, Sage Green, Warm Amber, Coral Peach, Teal Ocean, or Slate Indigo, while keeping the physical thermal sticker preview strictly black and white.

## Project Structure

```text
├── .github/workflows/deploy.yml  # Automated GitHub Pages deployment
├── .vscode/                      # Editor settings & recommended extensions
├── docs/                         # Archived initial design explorations
├── public/
│   └── favicon.svg               # Peeling corner sticker app icon & favicon
├── src/
│   ├── App.tsx                   # Root state, screen router & localStorage sync
│   ├── components/
│   │   ├── DailyLabelsScreen.tsx     # Screen 1: Daily batch, date bar & Quick Add
│   │   ├── Screen2AddEditLabel.tsx   # Screen 2: Add/edit bottom sheet (0.5–32 oz)
│   │   ├── Screen3Favorites.tsx      # Screen 3: Per-child saved items manager
│   │   ├── Screen4PrintPreview.tsx   # Screen 4: 1:1 Brother QL sticker roll preview
│   │   ├── Screen5Settings.tsx       # Screen 5: Profiles, layouts, date formats & printer
│   │   └── ThermalLabel.tsx          # 2.1" × 1.1" monochrome sticker renderer
│   ├── data/
│   │   ├── mockData.ts           # Generic initial placeholder data (Child 1, Child 2)
│   │   └── storage.ts            # LocalStorage persistence layer
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces
│   └── utils/
│       └── date.ts               # Date calculation & US formatting helpers
├── AGENTS.md                     # Instructions for coding agents
└── CLAUDE.md                     # Guidance for Claude Code
```

## Local Development

Install dependencies and start the local development server:

```bash
npm install
npm run dev
```

Type-check and build the production bundle:

```bash
npm run build
```
