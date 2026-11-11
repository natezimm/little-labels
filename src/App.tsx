import React, { useState, useEffect } from 'react';
import { ScreenId, Child, LabelItem, FavoriteItem } from './types';
import { storage } from './data/storage';
import { DailyLabelsScreen } from './components/DailyLabelsScreen';
import { Screen2AddEditLabel } from './components/Screen2AddEditLabel';
import { Screen3Favorites } from './components/Screen3Favorites';
import { Screen4PrintPreview } from './components/Screen4PrintPreview';
import { Screen5Settings } from './components/Screen5Settings';

export const App: React.FC = () => {
  const [screen, setScreen] = useState<ScreenId>('daily');

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
    const current = updated.find((c) => c.id === activeChild.id);
    if (current) {
      setActiveChild(current);
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
        onGoToSettings={() => setScreen('settings')}
      />
    );
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex justify-center text-neutral-900 font-sans antialiased selection:bg-sky-500 selection:text-white">
      {/* Real Mobile App Container: Full-width on mobile, centered clean container on desktop */}
      <div className="w-full max-w-md min-h-screen bg-white flex flex-col shadow-2xl sm:border-x sm:border-neutral-200 relative">
        {renderActiveScreen()}
      </div>

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
