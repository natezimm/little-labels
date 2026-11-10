import React from 'react';
import { Child, LabelItem, FavoriteItem } from '../types';
import { Plus, Copy, Trash2, Printer, Calendar, Heart, BookmarkCheck } from 'lucide-react';

interface ConceptBDailyLabelsProps {
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

export const ConceptBDailyLabels: React.FC<ConceptBDailyLabelsProps> = ({
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
  const quickFavorites = favorites.filter((f) => f.popular).slice(0, 5);

  const getCategoryColor = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'breakfast':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'lunch':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'snack':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'milk':
      case 'water':
        return 'bg-sky-100 text-sky-800 border-sky-200';
      default:
        return 'bg-neutral-100 text-neutral-800 border-neutral-200';
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#FAF8F5] text-stone-800 overflow-hidden font-sans">
      {/* Warm Header */}
      <div className="bg-[#FAF8F5] px-4 pt-3 pb-2 border-b border-stone-200/80 shrink-0">
        <div className="flex justify-between items-center mb-2.5">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-lg bg-[#C86D51] text-white flex items-center justify-center font-bold text-xs shadow-2xs">
              <Heart className="w-3.5 h-3.5 fill-white" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C86D51]">
                Concept B • Warm Organizer
              </span>
              <h1 className="text-xl font-bold tracking-tight text-stone-900 leading-tight">
                Daycare Labels
              </h1>
            </div>
          </div>

          <button
            onClick={onOpenAddModal}
            className="px-3 py-1.5 rounded-full bg-[#C86D51] hover:bg-[#B75E43] text-white text-xs font-bold flex items-center gap-1 shadow-sm transition-transform active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>

        {/* Child Profiles with Warm Avatars */}
        <div className="flex gap-2 mb-2">
          {childrenList.map((ch) => {
            const isActive = ch.id === activeChild.id;
            return (
              <button
                key={ch.id}
                onClick={() => onSelectChild(ch)}
                className={`flex-1 py-1.5 px-3 rounded-2xl flex items-center gap-2 border transition-all ${
                  isActive
                    ? 'bg-white border-[#C86D51] shadow-sm text-stone-900 font-bold'
                    : 'bg-stone-100/70 border-stone-200 text-stone-500 hover:bg-stone-100'
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-extrabold text-white ${
                    ch.id === 'child-1' ? 'bg-[#C86D51]' : 'bg-[#6B8E7B]'
                  }`}
                >
                  {ch.avatarLetter}
                </div>
                <span className="text-xs">{ch.firstName}</span>
              </button>
            );
          })}
        </div>

        {/* Date Selector Pill */}
        <div className="bg-white rounded-xl border border-stone-200 px-3 py-1.5 flex items-center justify-between text-xs shadow-2xs">
          <div className="flex items-center gap-2 text-stone-700 font-semibold">
            <Calendar className="w-3.5 h-3.5 text-[#C86D51]" />
            <span>Tomorrow's Labels (Nov 11)</span>
          </div>
          <span className="text-[11px] text-stone-400 font-mono">{date}</span>
        </div>
      </div>

      {/* Main Body */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
        {/* Quick Favorites Section */}
        <div>
          <div className="flex justify-between items-center mb-1.5 px-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
              Quick Favorites
            </span>
            <button
              onClick={onGoToFavorites}
              className="text-[11px] text-[#C86D51] hover:underline font-semibold flex items-center gap-1"
            >
              <BookmarkCheck className="w-3 h-3" />
              <span>Manage</span>
            </button>
          </div>

          <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
            {quickFavorites.map((fav) => (
              <button
                key={fav.id}
                onClick={() => onAddFromFavorite(fav)}
                className="px-3 py-1.5 rounded-xl bg-white border border-stone-200 hover:border-stone-300 text-xs font-semibold text-stone-800 shadow-2xs hover:shadow-xs shrink-0 flex items-center gap-1.5 active:scale-95 transition-all"
              >
                <Plus className="w-3 h-3 text-[#C86D51]" />
                <span>{fav.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Warm Card Stack */}
        <div>
          <div className="flex justify-between items-center mb-1.5 px-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
              Labels for Tomorrow ({labels.length})
            </span>
            <span className="text-[11px] text-stone-400">1-click duplicate</span>
          </div>

          <div className="space-y-2">
            {labels.map((item) => (
              <div
                key={item.id}
                onClick={() => onOpenEditModal(item)}
                className="bg-white p-3 rounded-2xl border border-stone-200/90 shadow-2xs hover:shadow-xs transition-all flex items-center justify-between gap-3 cursor-pointer group"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${getCategoryColor(
                        item.category
                      )}`}
                    >
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-stone-900 leading-snug">
                    {item.contents}
                  </h3>
                  {item.quantity && (
                    <p className="text-xs text-stone-500 font-medium">{item.quantity}</p>
                  )}
                </div>

                <div
                  className="flex items-center gap-1 shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => onDuplicateLabel(item.id)}
                    className="p-2 text-stone-400 hover:text-stone-700 rounded-xl hover:bg-stone-100 transition-colors"
                    title="Duplicate"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onRemoveLabel(item.id)}
                    className="p-2 text-stone-400 hover:text-red-600 rounded-xl hover:bg-red-50 transition-colors"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Warm Floating Action Bar */}
      <div className="bg-white/95 backdrop-blur-md p-4 border-t border-stone-200 shrink-0 shadow-lg flex items-center justify-between gap-3">
        <div>
          <span className="text-xs font-bold text-stone-900 block leading-tight">
            Ready to Print ({labels.length})
          </span>
          <span className="text-[11px] text-stone-500 font-medium">Brother QL Thermal</span>
        </div>

        <button
          onClick={onGoToPreview}
          className="px-6 py-3 rounded-2xl bg-[#C86D51] hover:bg-[#B75E43] text-white font-bold text-xs shadow-md flex items-center gap-2 active:scale-95 transition-all"
        >
          <Printer className="w-4 h-4" />
          <span>Print {labels.length} Labels</span>
        </button>
      </div>
    </div>
  );
};
