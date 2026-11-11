import React, { useState, useEffect, useMemo } from 'react';
import { ScreenId, Child, LabelItem, FavoriteItem, DateFormat, LabelLayout } from './types';
import { storage } from './data/storage';
import { formatLabelDate, getTomorrowISO } from './utils/date';
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
    return list.find((c) => c.id === savedId) || list[0];
  });

  // Date, Formatting & Layout States (Defaults to Tomorrow & Split Header)
  const [selectedDateISO, setSelectedDateISO] = useState<string>(() => getTomorrowISO());
  const [dateFormat, setDateFormat] = useState<DateFormat>(() => storage.getDateFormat());
  const [labelLayout, setLabelLayout] = useState<LabelLayout>(() => storage.getLabelLayout());
  const [printerModel, setPrinterModel] = useState<string>(() => storage.getPrinterModel());

  // Labels & Favorites (both scoped per child)
  const [labels, setLabels] = useState<LabelItem[]>(() => storage.getLabels());
  const [favorites, setFavorites] = useState<FavoriteItem[]>(() => storage.getFavorites(childrenList));

  // Modal State for Screen 2 (Add / Edit)
  const [isAddEditOpen, setIsAddEditOpen] = useState(false);
  const [editingLabel, setEditingLabel] = useState<LabelItem | null>(null);

  // Sync changes to localStorage
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

  useEffect(() => {
    storage.saveDateFormat(dateFormat);
  }, [dateFormat]);

  useEffect(() => {
    storage.saveLabelLayout(labelLayout);
  }, [labelLayout]);

  useEffect(() => {
    storage.savePrinterModel(printerModel);
  }, [printerModel]);

  // Formatted date string for labels and previews
  const formattedDate = useMemo(
    () => formatLabelDate(selectedDateISO, dateFormat),
    [selectedDateISO, dateFormat]
  );

  // Active child's own batch of labels
  const activeChildLabels = useMemo(
    () => labels.filter((l) => l.childId === activeChild.id),
    [labels, activeChild.id]
  );

  // Active child's own quick-add favorites
  const activeChildFavorites = useMemo(
    () => favorites.filter((f) => f.childId === activeChild.id),
    [favorites, activeChild.id]
  );

  // Count of labels per child for the child switcher badge
  const allLabelsCountByChild = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const ch of childrenList) {
      counts[ch.id] = 0;
    }
    for (const l of labels) {
      counts[l.childId] = (counts[l.childId] || 0) + 1;
    }
    return counts;
  }, [childrenList, labels]);

  // Handle Child Profile Updates from Settings
  const handleUpdateChildren = (updated: Child[]) => {
    setChildrenList(updated);
    const current = updated.find((c) => c.id === activeChild.id);
    if (current) {
      setActiveChild(current);
    } else if (updated.length > 0) {
      setActiveChild(updated[0]);
    }
  };

  // Label Operations (scoped to activeChild)
  const handleAddFromFavorite = (fav: FavoriteItem) => {
    const newItem: LabelItem = {
      id: `l-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      childId: activeChild.id,
      contents: fav.title,
      ounces: fav.defaultOunces ?? null,
    };
    setLabels((prev) => [...prev, newItem]);
  };

  const handleDuplicateLabel = (id: string) => {
    const target = labels.find((l) => l.id === id);
    if (!target) return;
    const duplicated: LabelItem = {
      ...target,
      id: `l-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    };
    const index = labels.findIndex((l) => l.id === id);
    const updated = [...labels];
    updated.splice(index + 1, 0, duplicated);
    setLabels(updated);
  };

  const handleRemoveLabel = (id: string) => {
    setLabels((prev) => prev.filter((l) => l.id !== id));
  };

  const handleUpdateOunces = (id: string, nextOunces: number | null) => {
    setLabels((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ounces: nextOunces } : l))
    );
  };

  const handleSaveLabel = (data: { contents: string; ounces: number | null; copies: number }) => {
    if (editingLabel) {
      setLabels((prev) =>
        prev.map((l) =>
          l.id === editingLabel.id
            ? { ...l, contents: data.contents, ounces: data.ounces }
            : l
        )
      );
    } else {
      const count = Math.max(1, data.copies || 1);
      const newItems: LabelItem[] = Array.from({ length: count }, (_, idx) => ({
        id: `l-${Date.now()}-${idx}-${Math.random().toString(36).slice(2, 6)}`,
        childId: activeChild.id,
        contents: data.contents,
        ounces: data.ounces,
      }));
      setLabels((prev) => [...prev, ...newItems]);
    }
    setEditingLabel(null);
  };

  const renderActiveScreen = () => {
    if (screen === 'favorites') {
      return (
        <Screen3Favorites
          favorites={activeChildFavorites}
          activeChild={activeChild}
          childrenList={childrenList}
          onSelectChild={setActiveChild}
          onAddFavoriteToBatch={handleAddFromFavorite}
          onAddNewFavorite={(newFav) =>
            setFavorites((prev) => [...prev, { ...newFav, id: `f-${Date.now()}` }])
          }
          onRemoveFavorite={(id) =>
            setFavorites((prev) => prev.filter((f) => f.id !== id))
          }
          onBack={() => setScreen('daily')}
        />
      );
    }

    if (screen === 'preview') {
      return (
        <Screen4PrintPreview
          labels={activeChildLabels}
          onBack={() => setScreen('daily')}
          activeChildFirstName={activeChild.firstName}
          activeChildFullName={activeChild.fullName}
          activeChildColor={activeChild.color}
          activeChildAvatar={activeChild.avatarLetter}
          formattedDate={formattedDate}
          printerModel={printerModel}
          labelLayout={labelLayout}
        />
      );
    }

    if (screen === 'settings') {
      return (
        <Screen5Settings
          childrenList={childrenList}
          onUpdateChildren={handleUpdateChildren}
          dateFormat={dateFormat}
          onChangeDateFormat={setDateFormat}
          labelLayout={labelLayout}
          onChangeLabelLayout={setLabelLayout}
          printerModel={printerModel}
          onChangePrinterModel={setPrinterModel}
          selectedDateISO={selectedDateISO}
          onBack={() => setScreen('daily')}
        />
      );
    }

    return (
      <DailyLabelsScreen
        childrenList={childrenList}
        activeChild={activeChild}
        onSelectChild={setActiveChild}
        selectedDateISO={selectedDateISO}
        formattedDate={formattedDate}
        onChangeDateISO={setSelectedDateISO}
        labels={activeChildLabels}
        allLabelsCountByChild={allLabelsCountByChild}
        favorites={activeChildFavorites}
        onAddFromFavorite={handleAddFromFavorite}
        onDuplicateLabel={handleDuplicateLabel}
        onRemoveLabel={handleRemoveLabel}
        onUpdateOunces={handleUpdateOunces}
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
    <div className="min-h-screen bg-[#EFEEEC] flex justify-center text-neutral-900 font-sans antialiased selection:bg-sky-500 selection:text-white">
      <div className="w-full max-w-md min-h-screen bg-[#F7F7F5] flex flex-col sm:shadow-sm sm:border-x sm:border-neutral-200/80 relative">
        {renderActiveScreen()}
      </div>

      <Screen2AddEditLabel
        isOpen={isAddEditOpen}
        onClose={() => {
          setIsAddEditOpen(false);
          setEditingLabel(null);
        }}
        onSave={handleSaveLabel}
        initialData={editingLabel}
        childName={activeChild.fullName}
        formattedDate={formattedDate}
      />
    </div>
  );
};

export default App;
