import React, { useState, useEffect } from 'react';
import { ScreenId, Child, LabelItem, FavoriteItem } from './types';
import { storage } from './data/storage';
import { DailyLabelsScreen } from './components/DailyLabelsScreen';
import { Screen2AddEditLabel } from './components/Screen2AddEditLabel';
import { Screen3Favorites } from './components/Screen3Favorites';
import { Screen4PrintPreview } from './components/Screen4PrintPreview';
import { Screen5Settings } from './components/Screen5Settings';
import { DesktopLayout } from './components/DesktopLayout';
import {
  Smartphone,
  Monitor,
  Printer,
  Settings,
  Plus,
  BookmarkCheck,
  RotateCcw,
} from 'lucide-react';

export const App: React.FC = () => {
  // Navigation: screen selection and view mode (Mobile vs Desktop)
  const [viewMode, setViewMode] = useState<'mobile' | 'desktop'>('mobile');
  const [screen, setScreen] = useState<ScreenId>('daily');
  const [showIPhoneFrame, setShowIPhoneFrame] = useState(true);

  // Core Data States (Initialized from on-device localStorage)
  const [childrenList, setChildrenList] = useState<Child[]>(() => storage.getChildren());
  const [activeChild, setActiveChild] = useState<Child>(() => {
    const list = storage.getChildren();
    const savedId = storage.getActiveChildId();
    const found = list.find((c) => c.id === savedId);
    return found || list[0];
  });
  const [date, setDate] = useState('11/10/26');
  const [labels, setLabels] = useState<LabelItem[]>(() => storage.getLabels());
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => storage.getFavorites());

  // Modal State for Screen 2 (Add / Edit)
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [editingLabel, setEditingLabel] = useState<LabelItem | null>(null);

  // Automatically sync to device localStorage
  useEffect(() => {
    storage.saveChildren(childrenList);
  }, [childrenList]);

  useEffect(() => {
    storage.saveFavorites(favorites);
  }, [favorites]);

  useEffect(() => {
    storage.saveLabels(labels);
  }, [labels]);

  useEffect(() => {
    if (activeChild) {
      storage.saveActiveChildId(activeChild.id);
    }
  }, [activeChild]);

  // Handle Child Profile Updates from Settings
  const handleUpdateChildren = (updated: Child[]) => {
    setChildrenList(updated);
    // Refresh activeChild reference
    const current = updated.find((c) => c.id === activeChild.id);
    if (current) {
      setActiveChild(current);
      // Update label childName references
      setLabels((prev) =>
        prev.map((l) => (l.childId === current.id ? { ...l, childName: current.fullName } : l))
      );
    } else if (updated.length > 0) {
      setActiveChild(updated[0]);
    }
  };

  // Operations
  const handleAddFromFavorite = (fav: FavoriteItem) => {
    const newItem: LabelItem = {
      id: `l-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      childId: activeChild.id,
      childName: activeChild.fullName,
      date,
      category: fav.category,
      contents: fav.title,
      quantity: fav.defaultQuantity,
      copies: 1,
    };
    setLabels((prev) => [...prev, newItem]);
  };

  const handleDuplicateLabel = (id: string) => {
    const target = labels.find((l) => l.id === id);
    if (!target) return;
    const duplicated: LabelItem = {
      ...target,
      id: `l-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
    };
    const index = labels.findIndex((l) => l.id === id);
    const updated = [...labels];
    updated.splice(index + 1, 0, duplicated);
    setLabels(updated);
  };

  const handleRemoveLabel = (id: string) => {
    setLabels((prev) => prev.filter((l) => l.id !== id));
  };

  const handleUpdateQuantity = (id: string, newQty: string) => {
    setLabels((prev) =>
      prev.map((l) => (l.id === id ? { ...l, quantity: newQty } : l))
    );
  };

  const handleSaveLabel = (data: Partial<LabelItem>) => {
    if (editingLabel) {
      setLabels((prev) =>
        prev.map((l) => (l.id === editingLabel.id ? ({ ...l, ...data } as LabelItem) : l))
      );
    } else {
      const newItem: LabelItem = {
        id: `l-${Date.now()}`,
        childId: activeChild.id,
        childName: activeChild.fullName,
        date,
        category: data.category || 'Snack',
        contents: data.contents || 'New Item',
        quantity: data.quantity || '',
        copies: data.copies || 1,
      };
      setLabels((prev) => [...prev, newItem]);
    }
    setEditingLabel(null);
  };

  const handleResetData = () => {
    storage.resetAll();
    const defaultKids = storage.getChildren();
    setChildrenList(defaultKids);
    setActiveChild(defaultKids[0]);
    setFavorites(storage.getFavorites());
    setLabels(storage.getLabels());
    setDate('11/10/26');
  };

  const renderActiveScreen = () => {
    if (screen === 'favorites') {
      return (
        <Screen3Favorites
          favorites={favorites}
          onAddFavoriteToBatch={handleAddFromFavorite}
          onAddNewFavorite={(newFav) =>
            setFavorites((prev) => [...prev, { ...newFav, id: `f-${Date.now()}` }])
          }
          onBack={() => setScreen('daily')}
          activeChildName={activeChild.fullName}
        />
      );
    }

    if (screen === 'preview') {
      return (
        <Screen4PrintPreview
          labels={labels}
          onBack={() => setScreen('daily')}
          activeChildName={activeChild.fullName}
        />
      );
    }

    if (screen === 'settings') {
      return (
        <Screen5Settings
          childrenList={childrenList}
          onUpdateChildren={handleUpdateChildren}
          onBack={() => setScreen('daily')}
        />
      );
    }

    // Default: Screen 1 — Daily Labels
    return (
      <DailyLabelsScreen
        childrenList={childrenList}
        activeChild={activeChild}
        onSelectChild={setActiveChild}
        date={date}
        labels={labels}
        favorites={favorites}
        onAddFromFavorite={handleAddFromFavorite}
        onDuplicateLabel={handleDuplicateLabel}
        onRemoveLabel={handleRemoveLabel}
        onUpdateQuantity={handleUpdateQuantity}
        onOpenAddModal={() => {
          setEditingLabel(null);
          setIsAddEditOpen(true);
        }}
        onOpenEditModal={(label: LabelItem) => {
          setEditingLabel(label);
          setIsAddEditOpen(true);
        }}
        onGoToPreview={() => setScreen('preview')}
        onGoToFavorites={() => setScreen('favorites')}
      />
    );
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Global Application Bar */}
      <nav className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0 z-30">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-500 animate-pulse" />
            <span className="text-sm font-extrabold tracking-tight text-white">
              Little Labels
            </span>
          </div>

          {/* View Mode Toggle (Mobile vs Desktop) */}
          <div className="flex items-center bg-slate-800 p-0.5 rounded-xl border border-slate-700/60 text-xs">
            <button
              onClick={() => setViewMode('mobile')}
              className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'mobile'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Mobile View</span>
            </button>
            <button
              onClick={() => setViewMode('desktop')}
              className={`px-3 py-1 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
                viewMode === 'desktop'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desktop View</span>
            </button>
          </div>
        </div>

        {/* 5-Screen Navigator (Active when in Mobile mode) */}
        {viewMode === 'mobile' && (
          <div className="flex items-center gap-1 bg-slate-800/80 p-0.5 rounded-xl border border-slate-700/60 text-xs">
            <button
              onClick={() => setScreen('daily')}
              className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                screen === 'daily'
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              1. Daily
            </button>
            <button
              onClick={() => {
                setEditingLabel(null);
                setIsAddEditOpen(true);
              }}
              className="px-2 py-1 text-slate-400 hover:text-slate-200 flex items-center gap-1"
            >
              <Plus className="w-3 h-3" />
              <span>2. Add</span>
            </button>
            <button
              onClick={() => setScreen('favorites')}
              className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all ${
                screen === 'favorites'
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookmarkCheck className="w-3 h-3" />
              <span>3. Favorites</span>
            </button>
            <button
              onClick={() => setScreen('preview')}
              className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all ${
                screen === 'preview'
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Printer className="w-3 h-3" />
              <span>4. Preview</span>
            </button>
            <button
              onClick={() => setScreen('settings')}
              className={`px-2.5 py-1 rounded-lg font-semibold flex items-center gap-1 transition-all ${
                screen === 'settings'
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Settings className="w-3 h-3" />
              <span>5. Settings</span>
            </button>
          </div>
        )}

        {/* Right utility buttons */}
        <div className="flex items-center gap-2">
          {viewMode === 'mobile' && (
            <button
              onClick={() => setShowIPhoneFrame(!showIPhoneFrame)}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 border border-slate-700/60 transition-colors"
              title="Toggle iPhone 16 Frame"
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">
                {showIPhoneFrame ? 'Frame: On' : 'Frame: Off'}
              </span>
            </button>
          )}

          <button
            onClick={handleResetData}
            className="text-xs px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 border border-slate-700/60"
            title="Reset to clean defaults"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>
      </nav>

      {/* Main Presentation Area */}
      <main className="flex-1 overflow-hidden relative flex items-center justify-center p-0 sm:p-4">
        {viewMode === 'desktop' ? (
          <DesktopLayout
            childrenList={childrenList}
            activeChild={activeChild}
            onSelectChild={setActiveChild}
            date={date}
            labels={labels}
            favorites={favorites}
            onAddFromFavorite={handleAddFromFavorite}
            onDuplicateLabel={handleDuplicateLabel}
            onRemoveLabel={handleRemoveLabel}
            onOpenAddModal={() => {
              setEditingLabel(null);
              setIsAddEditOpen(true);
            }}
            onOpenEditModal={(lbl) => {
              setEditingLabel(lbl);
              setIsAddEditOpen(true);
            }}
          />
        ) : showIPhoneFrame ? (
          /* Realistic iPhone 16 Frame (390 × 844 CSS pixels) */
          <div className="w-[390px] h-[844px] max-h-[94vh] rounded-[52px] bg-black p-3.5 shadow-2xl border-4 border-slate-700 relative overflow-hidden flex flex-col shrink-0 animate-in fade-in duration-200">
            {/* Dynamic Island Pill */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-30 pointer-events-none flex items-center justify-between px-2">
              <div className="w-2.5 h-2.5 rounded-full bg-neutral-900" />
              <div className="w-2.5 h-2.5 rounded-full bg-sky-950/60" />
            </div>

            {/* iOS Status Bar Time */}
            <div className="absolute top-3 left-8 text-[11px] font-semibold text-neutral-400 z-20 pointer-events-none">
              9:41
            </div>

            {/* Screen Content Wrapper */}
            <div className="flex-1 rounded-[40px] overflow-hidden bg-white flex flex-col relative">
              {renderActiveScreen()}
            </div>

            {/* iOS Home Indicator Bar */}
            <div className="w-36 h-1 bg-neutral-500/70 rounded-full mx-auto mt-2 shrink-0 z-20" />
          </div>
        ) : (
          /* Borderless Full Viewport Mobile Mode */
          <div className="w-full h-full max-w-md mx-auto bg-white flex flex-col shadow-2xl overflow-hidden">
            {renderActiveScreen()}
          </div>
        )}
      </main>

      {/* Screen 2: Add/Edit Modal (Global Overlay) */}
      <Screen2AddEditLabel
        isOpen={isAddEditOpen}
        onClose={() => {
          setIsAddEditOpen(false);
          setEditingLabel(null);
        }}
        onSave={handleSaveLabel}
        initialData={editingLabel}
        childName={activeChild.fullName}
        date={date}
      />
    </div>
  );
};
export default App;
