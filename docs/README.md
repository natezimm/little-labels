# Design Exploration & Archived Concepts

This directory archives the early exploratory concepts and design rationale developed during the initial design phase of **Little Labels**.

## Archived Exploratory Components

Located in `docs/archived-concepts/`:

1. **`ConceptADailyLabels.tsx` (Concept A — Minimal iOS Utility):**
   - Clean native iOS 18 style, Things 3 / Reminders inspired.
   - Grouped table cells, neutral monochrome zinc/slate palette.
   - Evaluated and preserved: Typography, crisp white background, and subtle 1px border cards.
   - Archived because: Modal-based editing and lack of quick steppers slowed down nightly batch prep.

2. **`ConceptBDailyLabels.tsx` (Concept B — Warm Family Organizer):**
   - Oatmeal (`#FAF8F5`), terracotta (`#C86D51`), and sage green (`#6B8E7B`) palette.
   - Child avatar badges and pastel category tags.
   - Evaluated and preserved: Distinct child identity badges (refined to soft baby blue and blush pink).
   - Archived because: Tall card heights caused vertical scrolling on iPhone screens.

3. **`ConceptCDailyLabels.tsx` (Concept C — Ultra-Fast Label Builder):**
   - High-efficiency speed tool inspired by Linear and Flighty.
   - Dark slate theme with electric indigo accents.
   - Evaluated and preserved: Top 1-tap rapid add grid and direct inline steppers.
   - Archived because: Dark terminal aesthetic felt too clinical for morning family prep.

4. **`SideBySideCompare.tsx`:**
   - 3-column side-by-side comparison screen on simulated iPhone 16 frames with UX metrics scorecard.

---

## Active Primary Implementation

The active codebase in `src/` implements the refined **Little Labels** experience:
- `src/components/DailyLabelsScreen.tsx`: The primary daily workflow combining Concept A's crisp minimal iOS shell with Concept C's speed mechanisms, color-coded child identity tabs, neutral food rows, 1 oz bottle steppers, and the duplicate symbol icon.
- `src/components/Screen2AddEditLabel.tsx`: Bottom sheet for adding/editing labels with ounce presets for liquids.
- `src/components/Screen3Favorites.tsx`: Searchable favorites library.
- `src/components/Screen4PrintPreview.tsx`: Realistic 1:1 Brother QL DK-1209 (2.1" × 1.1") thermal label simulation.
- `src/components/Screen5Settings.tsx`: Child profiles with on-device `localStorage` management and printer hardware setup.
- `src/components/DesktopLayout.tsx`: 3-column desktop productivity workspace.
- `src/components/ThermalLabel.tsx`: Brother QL thermal sticker renderer.
