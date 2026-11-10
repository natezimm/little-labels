# Little Labels

A lightweight, mobile-first web app for parents preparing food, drinks, and bottles for children attending daycare. 

Designed for speed, one-handed operation, and direct thermal printing on Brother QL label printers.

---

## Highlights

- **100% On-Device Privacy:** All child names, classrooms, and favorite food items are saved exclusively in your browser's `localStorage`. No personal data is ever uploaded to GitHub or any server.
- **Speed First:** 1-tap rapid add from saved favorites, direct inline 1 oz bottle steppers, and 1-tap duplicate icon.
- **Child Identity Tabs:** Color-coded child indicators for instant identity switching between children.
- **Clean Hierarchy:** Solid foods (Breakfast, Lunch, Snacks) remain clean and uncluttered without unnecessary amounts, while bottles (Whole Milk, Formula, Water) feature dedicated ounce steppers.
- **Brother QL Ready:** Physical 1:1 preview calibrated for Brother DK-1209 (2.1" × 1.1" / 62mm × 29mm) die-cut removable white stickers.
- **Adaptive Desktop Mode:** Full 3-column productivity workspace with real-time thermal strip rendering.

---

## Project Structure

```text
├── .github/
│   └── workflows/
│       └── deploy.yml          # Automated GitHub Pages deployment
├── docs/
│   ├── README.md               # Overview of archived design concepts
│   └── archived-concepts/      # Concepts A, B, C and side-by-side comparison
├── src/
│   ├── App.tsx                 # Main application shell & localStorage sync
│   ├── components/
│   │   ├── DailyLabelsScreen.tsx   # Screen 1: Daily labels & quick-add
│   │   ├── Screen2AddEditLabel.tsx # Screen 2: Add/edit bottom sheet
│   │   ├── Screen3Favorites.tsx    # Screen 3: Searchable favorites library
│   │   ├── Screen4PrintPreview.tsx # Screen 4: Brother QL thermal print preview
│   │   ├── Screen5Settings.tsx     # Screen 5: Child profiles & printer setup
│   │   ├── DesktopLayout.tsx       # Desktop 3-column workspace
│   │   └── ThermalLabel.tsx        # 1:1 Brother DK-1209 sticker renderer
│   ├── data/
│   │   ├── mockData.ts         # Generic fallback presets
│   │   └── storage.ts          # On-device localStorage persistence
│   └── types/
│       └── index.ts            # Core TypeScript interfaces
```

---

## Running Locally

```bash
cd ~/Coding/little-labels
npm install
npm run dev
```

Open `http://localhost:5173` to view the app.
