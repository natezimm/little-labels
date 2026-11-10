import React from 'react';
import { Child, LabelItem, FavoriteItem } from '../types';
import { Plus, Copy, Trash2, Printer, ChevronRight, Calendar, BookmarkCheck } from 'lucide-react';

interface ConceptADailyLabelsProps {
  childrenList: Child[];
  activeChild: Child;
  onSelectChild: (c: Child) => void;
  date: string;
  labels: LabelItem[];
  favorites: FavoriteItem[];
  onAddFromFavorite: (fav: FavoriteItem) => void;
  onDuplicateLabel: (id: string) => void;
  onRemoveLabel: (id: string) => void;
  onOpenAddModal: () => void;
  onOpenEditModal: (label: LabelItem) => void;
  onGoToPreview: () => void;
  onGoToFavorites: () => void;
}

export const ConceptADailyLabels: React.FC<ConceptADailyLabelsProps> = ({
  childrenList,
  activeChild,
  onSelectChild,
  date,
  labels,
  favorites,
  onAddFromFavorite,
  onDuplicateLabel,
  onRemoveLabel,
  onOpenAddModal,
  onOpenEditModal,
  onGoToPreview,
  onGoToFavorites,
}) => {
  // Top 4 quick favorites
  const quickFavorites = favorites.filter((f) => f.popular).slice(0, 4);

  return (
    <div className="w-full h-full flex flex-col bg-neutral-100/80 text-neutral-900 overflow-hidden font-sans">
      {/* iOS Navigation Header */}
      <div className="bg-white/90 backdrop-blur-md px-4 pt-3 pb-2 border-b border-neutral-200/80 shrink-0">
        <div className="flex justify-between items-center mb-2">
          <div>
            <span className="text-[10px] font-semibold tracking-wider uppercase text-neutral-400">
              Concept A • Minimal iOS
            </span>
            <h1 className="text-xl font-bold tracking-tight text-neutral-900">Daycare Labels</h1>
          </div>
          <button
            onClick={onOpenAddModal}
            className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-neutral-800 transition-colors"
            title="Add Custom Label"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Native iOS Segmented Child Switcher */}
        <div className="bg-neutral-200/70 p-0.5 rounded-xl flex gap-1 mb-2">
          {childrenList.map((ch) => {
            const isActive = ch.id === activeChild.id;
            return (
              <button
                key={ch.id}
                onClick={() => onSelectChild(ch)}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                {ch.firstName}
              </button>
            );
          })}
        </div>

        {/* Compact Date Picker Bar */}
        <div className="flex items-center justify-between text-xs py-1 px-1">
          <div className="flex items-center gap-1.5 text-neutral-600 font-medium">
            <Calendar className="w-3.5 h-3.5 text-neutral-400" />
            <span>Tomorrow, Nov 11</span>
            <span className="text-neutral-400 font-mono text-[11px]">({date})</span>
          </div>
          <span className="text-[11px] text-indigo-600 font-semibold cursor-pointer">
            Change Date
          </span>
        </div>
      </div>

      {/* Scrollable Main Body */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {/* Quick-Add Favorite Chips */}
        <div>
          <div className="flex justify-between items-center mb-1.5 px-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              Quick-Add Favorites
            </span>
            <button
              onClick={onGoToFavorites}
              className="text-[11px] text-neutral-500 hover:text-neutral-800 flex items-center gap-0.5 font-medium"
            >
              <BookmarkCheck className="w-3 h-3" />
              <span>Library</span>
            </button>
          </div>

          <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {quickFavorites.map((fav) => (
              <button
                key={fav.id}
                onClick={() => onAddFromFavorite(fav)}
                className="px-2.5 py-1.5 rounded-full bg-white border border-neutral-200/90 hover:border-neutral-300 text-xs font-semibold text-neutral-700 shadow-2xs hover:bg-neutral-50 shrink-0 flex items-center gap-1 active:scale-95 transition-all"
              >
                <Plus className="w-3 h-3 text-neutral-400" />
                <span>{fav.title}</span>
                <span className="text-[10px] text-neutral-400 font-mono">({fav.defaultQuantity})</span>
              </button>
            ))}
          </div>
        </div>

        {/* Grouped Table View (Native iOS List Style) */}
        <div>
          <div className="flex justify-between items-center mb-1.5 px-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
              Daily Labels ({labels.length})
            </span>
            <span className="text-[11px] text-neutral-400">Tap to edit</span>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs divide-y divide-neutral-100 overflow-hidden">
            {labels.map((item) => (
              <div
                key={item.id}
                className="px-3.5 py-2.5 flex items-center justify-between hover:bg-neutral-50/80 transition-colors group cursor-pointer"
                onClick={() => onOpenEditModal(item)}
              >
                <div className="min-w-0 flex-1 pr-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 font-mono">
                      {item.category}:
                    </span>
                    <span className="text-xs font-bold text-neutral-900 truncate">
                      {item.contents}
                    </span>
                  </div>
                  {item.quantity && (
                    <span className="text-[11px] text-neutral-500 font-medium">
                      — {item.quantity}
                    </span>
                  )}
                </div>

                {/* Row Quick Actions */}
                <div
                  className="flex items-center gap-1 shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => onDuplicateLabel(item.id)}
                    className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-md hover:bg-neutral-100 transition-colors"
                    title="Duplicate Label"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onRemoveLabel(item.id)}
                    className="p-1.5 text-neutral-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <ChevronRight className="w-3.5 h-3.5 text-neutral-300 ml-0.5" />
                </div>
              </div>
            ))}

            {labels.length === 0 && (
              <div className="py-8 text-center text-xs text-neutral-400">
                No labels added yet. Tap a quick-add favorite above.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Bottom Action Bar */}
      <div className="bg-white/95 backdrop-blur-md p-3.5 border-t border-neutral-200/80 shrink-0 flex items-center justify-between gap-3 shadow-lg">
        <div>
          <span className="text-xs font-bold text-neutral-900 block leading-tight">
            {labels.length} Labels to Print
          </span>
          <span className="text-[10px] text-neutral-400 font-medium">
            Brother QL-810W • 2.1" × 1.1"
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
