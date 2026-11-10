import React from 'react';
import { Child, LabelItem, FavoriteItem } from '../types';
import { Plus, Minus, Trash2, Printer, Zap, Sparkles, SlidersHorizontal } from 'lucide-react';

interface ConceptCDailyLabelsProps {
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
  onGoToPreview: () => void;
  onGoToFavorites: () => void;
}

export const ConceptCDailyLabels: React.FC<ConceptCDailyLabelsProps> = ({
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
  onGoToPreview,
  onGoToFavorites,
}) => {
  // Frequently used items for the speed pad
  const speedFavorites = favorites.slice(0, 6);

  // Helper to adjust quantity quickly inline
  const handleQuickQuantityStep = (item: LabelItem, delta: number) => {
    const current = item.quantity || '6 oz';
    const matchOz = current.match(/(\d+)\s*oz/i);
    if (matchOz) {
      const oz = parseInt(matchOz[1], 10);
      const nextOz = Math.max(2, oz + delta * 2);
      onUpdateQuantity(item.id, `${nextOz} oz`);
      return;
    }
    const matchCup = current.match(/(\d+)\s*cup/i);
    if (matchCup) {
      const cups = parseInt(matchCup[1], 10);
      const nextCup = Math.max(1, cups + delta);
      onUpdateQuantity(item.id, `${nextCup} cup`);
      return;
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-neutral-950 text-neutral-100 overflow-hidden font-sans">
      {/* Speed Control Top Bar */}
      <div className="bg-neutral-900/90 backdrop-blur-md px-4 pt-3 pb-2 border-b border-neutral-800 shrink-0">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded bg-indigo-600 flex items-center justify-center">
              <Zap className="w-3 h-3 text-white fill-white" />
            </div>
            <span className="text-xs font-black tracking-wider uppercase text-indigo-400">
              Concept C • Ultra-Fast
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> QL-810W
            </span>
            <button
              onClick={onOpenAddModal}
              className="text-xs text-neutral-300 hover:text-white px-2 py-0.5 rounded bg-neutral-800 hover:bg-neutral-700 font-mono"
            >
              + Custom
            </button>
          </div>
        </div>

        {/* Child + Date Rapid Switcher Grid */}
        <div className="grid grid-cols-3 gap-1.5 mb-1">
          {childrenList.map((ch) => {
            const isActive = ch.id === activeChild.id;
            return (
              <button
                key={ch.id}
                onClick={() => onSelectChild(ch)}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-neutral-800/80 text-neutral-400 hover:text-neutral-200'
                }`}
              >
                {ch.firstName}
              </button>
            );
          })}
          <div className="py-1.5 px-2 rounded-lg text-[11px] font-mono font-bold bg-neutral-800/60 text-neutral-300 flex items-center justify-center">
            Tomorrow ({date})
          </div>
        </div>
      </div>

      {/* Main Fast-Path Content */}
      <div className="flex-1 overflow-y-auto px-3 py-2.5 space-y-3">
        {/* 1-Tap Speed Add Grid */}
        <div className="bg-neutral-900/70 p-2.5 rounded-xl border border-neutral-800/80">
          <div className="flex justify-between items-center mb-2 px-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-400 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-indigo-400" /> 1-Tap Rapid Add
            </span>
            <button
              onClick={onGoToFavorites}
              className="text-[10px] text-indigo-400 hover:underline font-mono"
            >
              All Favorites →
            </button>
          </div>

          <div className="grid grid-cols-3 gap-1.5">
            {speedFavorites.map((fav) => (
              <button
                key={fav.id}
                onClick={() => onAddFromFavorite(fav)}
                className="p-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 border border-neutral-700/60 text-left active:scale-95 transition-all group"
              >
                <div className="text-[10px] font-mono text-neutral-400 group-hover:text-indigo-300 truncate">
                  +{fav.category}
                </div>
                <div className="text-xs font-bold text-neutral-200 truncate">{fav.title}</div>
                <div className="text-[10px] text-neutral-400 font-mono">{fav.defaultQuantity}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Daily Batch Table with Inline Controls */}
        <div>
          <div className="flex justify-between items-center mb-1.5 px-1">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-neutral-400">
              Active Batch ({labels.length})
            </span>
            <span className="text-[10px] font-mono text-neutral-400">
              Inline Steppers Enabled
            </span>
          </div>

          <div className="space-y-1.5">
            {labels.map((item) => (
              <div
                key={item.id}
                className="bg-neutral-900/90 p-2.5 rounded-xl border border-neutral-800 flex items-center justify-between gap-2 hover:border-neutral-700 transition-all"
              >
                {/* Content & Category */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-[9px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded bg-neutral-800 text-neutral-400 font-mono">
                      {item.category}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-white truncate">{item.contents}</h4>
                  <div className="text-[11px] font-mono text-indigo-300 font-semibold">
                    {item.quantity}
                  </div>
                </div>

                {/* Inline Fast Stepper & Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  {/* Inline Quantity Steppers */}
                  <div className="flex items-center bg-neutral-800 rounded-lg p-0.5 border border-neutral-700/60">
                    <button
                      onClick={() => handleQuickQuantityStep(item, -1)}
                      className="w-6 h-6 flex items-center justify-center text-neutral-300 hover:text-white rounded hover:bg-neutral-700 active:scale-90"
                      title="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => handleQuickQuantityStep(item, 1)}
                      className="w-6 h-6 flex items-center justify-center text-neutral-300 hover:text-white rounded hover:bg-neutral-700 active:scale-90"
                      title="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* 1-Tap Duplicate (Creates a twin bottle in 0ms) */}
                  <button
                    onClick={() => onDuplicateLabel(item.id)}
                    className="px-2 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-[11px] font-mono font-bold rounded-lg border border-neutral-700/60 active:scale-95"
                    title="Duplicate sticker"
                  >
                    +1x
                  </button>

                  {/* Delete */}
                  <button
                    onClick={() => onRemoveLabel(item.id)}
                    className="p-1.5 text-neutral-500 hover:text-red-400 hover:bg-neutral-800 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Prominent High-Contrast Speed Print Dock */}
      <div className="bg-neutral-900 border-t border-neutral-800 p-3 shrink-0 space-y-2">
        <div className="flex justify-between items-center text-xs font-mono px-1">
          <span className="text-neutral-400">QUEUE: {labels.length} LABELS</span>
          <span className="text-emerald-400">300 DPI READY</span>
        </div>

        <button
          onClick={onGoToPreview}
          className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-sm uppercase tracking-wide rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-98 transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>PRINT {labels.length} LABELS NOW</span>
        </button>
      </div>
    </div>
  );
};
