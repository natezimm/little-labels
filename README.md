# Little Labels

A fast, mobile-first web application for parents preparing daily daycare food, drink, and bottle labels for Brother QL thermal label printers.

Inspired by the calm simplicity of Things 3 and Apple Reminders, **Little Labels** lets you prepare an entire day's batch of stickers in seconds with minimal tapping.

---

## Features

- **100% On-Device Privacy:** Child names, saved quick-add items, label batches, and formatting preferences are stored exclusively in your browser's `localStorage`. No personal data ever leaves your device.
- **Independent Per-Child Workflows:** Each child has their own daily label batch and their own saved Quick Add items (e.g., toddler meals and whole milk for one child, infant formula bottles for another).
- **Bottles & Drinks vs. Food & Snacks:** Automatically organizes labels with fluid ounces into **Bottles & Drinks** (with inline `[-]` / `[+]` 1 oz steppers) and solid foods into **Food & Snacks** (clean, uncluttered rows with no unnecessary amounts).
- **Customizable Sticker Layouts:** Choose between three pre-calibrated layouts for Brother DK-1209 (2.1" × 1.1") removable thermal stickers:
  - **Split Header (Default):** Child name on the left, date on the right, food/drink contents below.
  - **Stacked:** Child name on line 1, date on line 2, contents on line 3.
  - **Centered:** Balanced center alignment across all lines.
- **US Date Formats & Smart Date Picker:** Defaults to **Tomorrow** with 1-tap `Today` / `Tomorrow` toggles, day steppers, a native calendar picker, and six compact US date formats (`MM/DD/YY`, `M/D/YY`, `MM/DD`, `MM-DD`, `Nov 11`, `Nov 11th`).
- **8 Curated Child Color Themes:** Personalize each child's tab, header emblem, and primary print buttons with Baby Blue, Blush Pink, Lavender, Sage Green, Warm Amber, Coral Peach, Teal Ocean, or Slate Indigo—while keeping the physical thermal sticker preview strictly black and white.

---

## Project Structure

```text
├── .github/workflows/deploy.yml  # Automated GitHub Pages deployment
├── .vscode/                      # Editor settings & recommended extensions
├── docs/                         # Archived initial design explorations
├── src/
│   ├── App.tsx                   # Root state, screen router & localStorage sync
│   ├── components/
│   │   ├── DailyLabelsScreen.tsx     # Screen 1: Daily batch & Quick Add
│   │   ├── Screen2AddEditLabel.tsx   # Screen 2: Add/edit bottom sheet (0.5–32 oz)
│   │   ├── Screen3Favorites.tsx      # Screen 3: Per-child saved items manager
│   │   ├── Screen4PrintPreview.tsx   # Screen 4: 1:1 Brother QL sticker roll preview
│   │   ├── Screen5Settings.tsx       # Screen 5: Profiles, layouts, date formats & printer
│   │   └── ThermalLabel.tsx          # 2.1" × 1.1" monochrome sticker renderer
│   ├── data/
│   │   ├── mockData.ts           # Generic initial sample data
│   │   └── storage.ts            # LocalStorage persistence layer
│   ├── types/
│   │   └── index.ts              # TypeScript interfaces
│   └── utils/
│       └── date.ts               # Date calculation & US formatting helpers
├── AGENTS.md                     # Instructions for coding agents
└── CLAUDE.md                     # Guidance for Claude Code
```

---

## Local Development

```bash
npm install
npm run dev
```

To type-check and build the production bundle:

```bash
npm run build
```
