import React from 'react';
import { Child, LabelItem, FavoriteItem } from '../types';
import {
  Plus,
  Minus,
  Trash2,
  Printer,
  Calendar,
  BookmarkCheck,
  Sparkles,
  Droplets,
  Copy,
  Settings,
} from 'lucide-react';

interface DailyLabelsScreenProps {
  childrenList: Child[];
  activeChild: Child;
  onSelectChild: (c: Child) => void;
  date: string;
  labels: LabelItem[];
  favorites: FavoriteItem[];
  onAddFromFavorite: (fav: FavoriteItem) => void;
  onDuplicateLabel: (id: string) => void;
  onRemoveLabel: (id: string) => void;
  onUpdateQuantity: (id: string, newQty: string) => void;
  onOpenAddModal: () => void;
  onOpenEditModal: (label: LabelItem) => void;
  onGoToPreview: () => void;
  onGoToFavorites: () => void;
  onGoToSettings: () => void;
}

export const DailyLabelsScreen: React.FC<DailyLabelsScreenProps> = ({
  childrenList,
  activeChild,
  onSelectChild,
  date,
  labels,
  favorites,
  onAddFromFavorite,
  onDuplicateLabel,
  onRemoveLabel,
  onUpdateQuantity,
  onOpenAddModal,
  onOpenEditModal,
  onGoToPreview,
  onGoToFavorites,
  onGoToSettings,
}) => {
  // Helper to determine if an item is a liquid bottle (where amounts apply)
  const isLiquidBottle = (cat: string, contents: string) => {
    const c = cat.toLowerCase();
    const txt = contents.toLowerCase();
    return (
      c === 'milk' ||
      c === 'water' ||
      txt.includes('milk') ||
      txt.includes('water') ||
      txt.includes('formula') ||
      txt.includes('bottle')
    );
  };

  // Helper for inline liquid ounce adjustments (steps by exactly 1 oz)
  const handleStepOunces = (item: LabelItem, delta: number) => {
    const current = item.quantity || '6 oz';
    const matchOz = current.match(/(\d+)\s*oz/i);
    const oz = matchOz ? parseInt(matchOz[1], 10) : 6;
    const nextOz = Math.max(1, oz + delta); // Increase or decrease by 1 oz
    onUpdateQuantity(item.id, `${nextOz} oz`);
  };

  return (
    <div className="w-full h-full flex flex-col bg-white text-neutral-900 font-sans">
      {/* Top Header */}
      <div className="bg-white/95 backdrop-blur-md px-4 pt-4 pb-3 border-b border-neutral-200/80 shrink-0 sticky top-0 z-20">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h1 className="text-xl font-black tracking-tight text-neutral-900">Little Labels</h1>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={onOpenAddModal}
              className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-800 transition-colors shadow-2xs"
              title="Add Custom Label"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button
              onClick={onGoToSettings}
              className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-800 transition-colors shadow-2xs"
              title="Settings & Child Profiles"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Dynamic Child Switcher */}
        <div className="grid grid-cols-2 gap-2 mb-2">
          {childrenList.map((ch) => {
            const isActive = ch.id === activeChild.id;

            return (
              <button
                key={ch.id}
                onClick={() => onSelectChild(ch)}
                className={`py-2 px-3 rounded-2xl flex items-center justify-center gap-2 border transition-all ${
                  isActive
                    ? 'bg-white border-neutral-300 text-neutral-950 font-bold shadow-xs ring-2 ring-neutral-200'
                    : 'bg-neutral-50/60 border-neutral-200 text-neutral-600 hover:bg-neutral-100'
                }`}
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-extrabold text-white shadow-2xs shrink-0"
                  style={{ backgroundColor: ch.color || '#0284C7' }}
                >
                  {ch.avatarLetter}
                </div>
                <span className="text-xs truncate">{ch.firstName}</span>
                {isActive && (
                  <span
                    className="w-1.5 h-1.5 rounded-full ml-auto shrink-0"
                    style={{ backgroundColor: ch.color || '#0284C7' }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Compact Date Bar */}
        <div className="bg-neutral-50 rounded-xl border border-neutral-200/80 px-3 py-1.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-neutral-700 font-semibold">
            <Calendar className="w-3.5 h-3.5 text-neutral-500" />
            <span>Tomorrow's Labels (Nov 11)</span>
          </div>
          <span className="text-[11px] font-mono text-neutral-400">{date}</span>
        </div>
      </div>

      {/* Main Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {/* Speed Engine: Top 1-Tap Quick-Add Favorites */}
        <div>
          <div className="flex justify-between items-center mb-1.5 px-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-neutral-400" /> 1-Tap Rapid Add
            </span>
            <button
              onClick={onGoToFavorites}
              className="text-[11px] text-neutral-500 hover:text-neutral-800 flex items-center gap-0.5 font-semibold"
            >
              <BookmarkCheck className="w-3 h-3" />
              <span>Favorites Library</span>
            </button>
          </div>

          {/* Clean Neutral Food Chips */}
          <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {favorites.slice(0, 5).map((fav) => {
              const liquid = isLiquidBottle(fav.category, fav.title);
              return (
                <button
                  key={fav.id}
                  onClick={() => onAddFromFavorite(fav)}
                  className="px-3 py-1.5 rounded-xl border border-neutral-200/90 bg-white hover:bg-neutral-50 hover:border-neutral-300 text-xs font-semibold text-neutral-800 shadow-2xs shrink-0 flex items-center gap-1.5 active:scale-95 transition-all"
                >
                  <Plus className="w-3 h-3 text-neutral-400" />
                  <span>{fav.title}</span>
                  {liquid && fav.defaultQuantity && (
                    <span className="text-[10px] text-neutral-500 font-mono font-bold">
                      ({fav.defaultQuantity})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Daily Batch List */}
        <div>
          <div className="flex justify-between items-center mb-1.5 px-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-500">
                Daily Batch ({labels.length})
              </span>
              <span
                className="text-[10px] font-bold px-1.5 py-0.2 rounded-md bg-neutral-100 text-neutral-800 border border-neutral-200"
              >
                For {activeChild.firstName}
              </span>
            </div>
            <span className="text-[10px] text-neutral-400 font-medium">
              Amounts on liquids only
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200/90 shadow-2xs divide-y divide-neutral-100 overflow-hidden">
            {labels.map((item) => {
              const liquid = isLiquidBottle(item.category, item.contents);

              return (
                <div
                  key={item.id}
                  className="p-3 flex items-center justify-between hover:bg-neutral-50/70 transition-colors gap-2"
                >
                  {/* Category & Title */}
                  <div
                    className="min-w-0 flex-1 cursor-pointer"
                    onClick={() => onOpenEditModal(item)}
                  >
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.2 rounded-md bg-neutral-100 text-neutral-600 border border-neutral-200/80 font-mono">
                        {item.category}
                      </span>
                    </div>
                    <h3 className="text-xs font-bold text-neutral-900 leading-snug truncate">
                      {item.contents}
                    </h3>

                    {/* ONLY display amount line for liquids */}
                    {liquid && item.quantity && (
                      <div className="text-[11px] font-bold text-neutral-600 font-mono flex items-center gap-1">
                        <Droplets className="w-2.5 h-2.5 text-neutral-400" />
                        <span>{item.quantity}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions: Liquid Ounce Stepper (steps by 1 oz) + Duplicate Symbol Icon */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* ONLY liquids get ounce steppers */}
                    {liquid ? (
                      <div className="flex items-center bg-neutral-100 rounded-lg p-0.5 border border-neutral-200">
                        <button
                          onClick={() => handleStepOunces(item, -1)}
                          className="w-6 h-6 flex items-center justify-center text-neutral-600 hover:text-neutral-900 bg-white rounded shadow-2xs active:scale-90 transition-transform"
                          title="Decrease 1 oz"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-[11px] font-mono font-bold px-1.5 text-neutral-700 min-w-9 text-center">
                          {item.quantity || '6 oz'}
                        </span>
                        <button
                          onClick={() => handleStepOunces(item, 1)}
                          className="w-6 h-6 flex items-center justify-center text-neutral-600 hover:text-neutral-900 bg-white rounded shadow-2xs active:scale-90 transition-transform"
                          title="Increase 1 oz"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : null}

                    {/* Duplicate Symbol Icon */}
                    <button
                      onClick={() => onDuplicateLabel(item.id)}
                      className="p-1.5 text-neutral-600 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 rounded-lg active:scale-95 transition-all flex items-center justify-center shadow-2xs"
                      title="Duplicate label"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>

                    {/* Trash */}
                    <button
                      onClick={() => onRemoveLabel(item.id)}
                      className="p-1.5 text-neutral-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}

            {labels.length === 0 && (
              <div className="py-8 text-center text-xs text-neutral-400">
                All labels cleared. Tap the quick-add buttons above.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Bottom Sticky Action Dock */}
      <div className="bg-white/95 backdrop-blur-md p-3.5 border-t border-neutral-200 shrink-0 flex items-center justify-between gap-3 shadow-lg sticky bottom-0 z-20">
        <div>
          <span className="text-xs font-bold text-neutral-900 block leading-tight">
            {labels.length} Labels to Print
          </span>
          <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Brother QL-810W Ready
          </span>
        </div>

        <button
          onClick={onGoToPreview}
          className="px-5 py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold rounded-full shadow-md flex items-center gap-2 active:scale-95 transition-all"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Labels ({labels.length})</span>
        </button>
      </div>
    </div>
  );
};
