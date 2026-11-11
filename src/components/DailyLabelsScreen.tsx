import React, { useRef } from 'react';
import { Child, LabelItem, FavoriteItem } from '../types';
import {
  Plus,
  Minus,
  Trash2,
  Printer,
  Calendar,
  Copy,
  Settings,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from 'lucide-react';
import {
  addDaysISO,
  getFriendlyDateLabel,
  getTodayISO,
  getTomorrowISO,
} from '../utils/date';

interface DailyLabelsScreenProps {
  childrenList: Child[];
  activeChild: Child;
  onSelectChild: (c: Child) => void;
  selectedDateISO: string;
  formattedDate: string;
  onChangeDateISO: (iso: string) => void;
  labels: LabelItem[];
  allLabelsCountByChild: Record<string, number>;
  favorites: FavoriteItem[];
  onAddFromFavorite: (fav: FavoriteItem) => void;
  onDuplicateLabel: (id: string) => void;
  onRemoveLabel: (id: string) => void;
  onUpdateOunces: (id: string, nextOunces: number | null) => void;
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
  selectedDateISO,
  formattedDate,
  onChangeDateISO,
  labels,
  allLabelsCountByChild,
  favorites,
  onAddFromFavorite,
  onDuplicateLabel,
  onRemoveLabel,
  onUpdateOunces,
  onOpenAddModal,
  onOpenEditModal,
  onGoToPreview,
  onGoToFavorites,
  onGoToSettings,
}) => {
  const dateInputRef = useRef<HTMLInputElement>(null);
  const todayISO = getTodayISO();
  const tomorrowISO = getTomorrowISO();
  const isToday = selectedDateISO === todayISO;
  const isTomorrow = selectedDateISO === tomorrowISO;

  // Helper to get soft pastel styles based on child's accent color
  const getChildTabStyle = (ch: Child, isActive: boolean) => {
    const isPink = ch.color.toLowerCase() === '#f43f5e' || ch.color.toLowerCase() === '#ec4899';
    const isBlue = ch.color.toLowerCase() === '#0284c7' || ch.color.toLowerCase() === '#3b82f6';

    if (isActive) {
      if (isBlue) {
        return 'bg-sky-50/90 border-sky-200/90 text-sky-950 shadow-2xs ring-1 ring-sky-200/60';
      }
      if (isPink) {
        return 'bg-rose-50/90 border-rose-200/90 text-rose-950 shadow-2xs ring-1 ring-rose-200/60';
      }
      return 'bg-white border-neutral-300 text-neutral-900 shadow-2xs';
    }

    return 'bg-neutral-100/70 border-transparent text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700';
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#F7F7F5] text-neutral-900 font-sans">
      {/* Clean iOS Header */}
      <header className="bg-white/90 backdrop-blur-md px-5 pt-4 pb-3 border-b border-neutral-200/60 sticky top-0 z-20">
        <div className="flex justify-between items-center mb-3.5">
          <h1 className="text-[22px] font-bold tracking-tight text-neutral-900">
            Little Labels
          </h1>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAddModal}
              className="h-8 px-3 rounded-full bg-neutral-900 hover:bg-black text-white text-xs font-semibold flex items-center gap-1 shadow-2xs active:scale-95 transition-all"
              title="New Label"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New</span>
            </button>
            <button
              onClick={onGoToSettings}
              className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200/80 flex items-center justify-center text-neutral-600 transition-colors"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Child Switcher (Baby Blue & Blush Pink accents) */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          {childrenList.map((ch) => {
            const isActive = ch.id === activeChild.id;
            const count = allLabelsCountByChild[ch.id] || 0;

            return (
              <button
                key={ch.id}
                onClick={() => onSelectChild(ch)}
                className={`py-2 px-3 rounded-xl flex items-center gap-2.5 border transition-all ${getChildTabStyle(
                  ch,
                  isActive
                )}`}
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold text-white shrink-0"
                  style={{ backgroundColor: ch.color }}
                >
                  {ch.avatarLetter}
                </div>
                <span className="text-[13px] font-semibold truncate">{ch.firstName}</span>
                <span
                  className={`ml-auto text-[11px] font-medium px-1.5 py-0.2 rounded-full ${
                    isActive
                      ? 'bg-white/80 text-neutral-700'
                      : 'bg-neutral-200/70 text-neutral-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Date Selector Bar */}
        <div className="flex items-center justify-between bg-neutral-100/80 rounded-xl p-1 border border-neutral-200/50">
          {/* Quick Today / Tomorrow Segmented Toggle */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => onChangeDateISO(todayISO)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                isToday
                  ? 'bg-white text-neutral-900 shadow-2xs font-semibold'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              Today
            </button>
            <button
              type="button"
              onClick={() => onChangeDateISO(tomorrowISO)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                isTomorrow
                  ? 'bg-white text-neutral-900 shadow-2xs font-semibold'
                  : 'text-neutral-500 hover:text-neutral-800'
              }`}
            >
              Tomorrow
            </button>
          </div>

          {/* Date Picker & Day Steppers */}
          <div className="flex items-center gap-0.5">
            <button
              type="button"
              onClick={() => onChangeDateISO(addDaysISO(selectedDateISO, -1))}
              className="p-1 text-neutral-400 hover:text-neutral-700 rounded-md hover:bg-white/60 transition-colors"
              title="Previous day"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  if (dateInputRef.current?.showPicker) {
                    dateInputRef.current.showPicker();
                  } else {
                    dateInputRef.current?.focus();
                  }
                }}
                className="px-2 py-1 rounded-lg hover:bg-white/70 text-xs font-semibold text-neutral-800 flex items-center gap-1.5 transition-colors"
                title="Choose date"
              >
                <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                <span>{formattedDate}</span>
              </button>
              <input
                ref={dateInputRef}
                type="date"
                value={selectedDateISO}
                onChange={(e) => {
                  if (e.target.value) onChangeDateISO(e.target.value);
                }}
                className="sr-only"
              />
            </div>

            <button
              type="button"
              onClick={() => onChangeDateISO(addDaysISO(selectedDateISO, 1))}
              className="p-1 text-neutral-400 hover:text-neutral-700 rounded-md hover:bg-white/60 transition-colors"
              title="Next day"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 px-5 py-4 space-y-5">
        {/* Quick Add Favorites */}
        <section>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-medium text-neutral-400">
              Quick Add
            </span>
            <button
              onClick={onGoToFavorites}
              className="text-xs text-neutral-500 hover:text-neutral-900 flex items-center gap-1 font-medium transition-colors"
            >
              <SlidersHorizontal className="w-3 h-3" />
              <span>Edit Saved</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {favorites.map((fav) => (
              <button
                key={fav.id}
                onClick={() => onAddFromFavorite(fav)}
                className="px-3 py-1.5 rounded-xl bg-white border border-neutral-200/80 hover:border-neutral-300 text-[13px] font-medium text-neutral-800 shadow-2xs flex items-center gap-1.5 active:scale-95 transition-all"
              >
                <Plus className="w-3.5 h-3.5 text-neutral-400" />
                <span>{fav.title}</span>
                {fav.defaultOunces ? (
                  <span className="text-xs text-neutral-400 font-normal">
                    {fav.defaultOunces} oz
                  </span>
                ) : null}
              </button>
            ))}
          </div>
        </section>

        {/* Active Child's Label List */}
        <section>
          <div className="flex justify-between items-baseline mb-2">
            <h2 className="text-xs font-medium text-neutral-400">
              {activeChild.firstName}’s Labels · {getFriendlyDateLabel(selectedDateISO)}
            </h2>
            {labels.length > 0 && (
              <span className="text-[11px] text-neutral-400">
                Tap item to edit
              </span>
            )}
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs divide-y divide-neutral-100 overflow-hidden">
            {labels.map((item) => {
              const hasOunces = typeof item.ounces === 'number' && item.ounces > 0;

              return (
                <div
                  key={item.id}
                  className="px-3.5 py-2.5 flex items-center justify-between hover:bg-neutral-50/60 transition-colors gap-2"
                >
                  {/* Item Title */}
                  <button
                    type="button"
                    onClick={() => onOpenEditModal(item)}
                    className="min-w-0 flex-1 text-left py-0.5 focus:outline-hidden"
                  >
                    <div className="text-[14px] font-semibold text-neutral-900 leading-snug truncate">
                      {item.contents}
                    </div>
                  </button>

                  {/* Right Controls: 1 oz Stepper (if liquid/bottle), Duplicate Icon, Delete Icon */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    {hasOunces ? (
                      <div className="flex items-center bg-neutral-100/90 rounded-lg p-0.5 border border-neutral-200/60">
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateOunces(item.id, Math.max(1, (item.ounces || 6) - 1))
                          }
                          className="w-6 h-6 flex items-center justify-center text-neutral-600 hover:text-neutral-900 bg-white rounded-md shadow-2xs active:scale-90 transition-transform"
                          title="Decrease 1 oz"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold px-2 text-neutral-800 min-w-[44px] text-center tabular-nums">
                          {item.ounces} oz
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateOunces(item.id, Math.min(24, (item.ounces || 6) + 1))
                          }
                          className="w-6 h-6 flex items-center justify-center text-neutral-600 hover:text-neutral-900 bg-white rounded-md shadow-2xs active:scale-90 transition-transform"
                          title="Increase 1 oz"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ) : null}

                    {/* Duplicate Symbol */}
                    <button
                      type="button"
                      onClick={() => onDuplicateLabel(item.id)}
                      className="p-1.5 text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100 rounded-lg active:scale-95 transition-all"
                      title="Duplicate"
                    >
                      <Copy className="w-4 h-4" />
                    </button>

                    {/* Remove */}
                    <button
                      type="button"
                      onClick={() => onRemoveLabel(item.id)}
                      className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}

            {labels.length === 0 && (
              <div className="py-10 px-4 text-center">
                <p className="text-sm text-neutral-400 font-medium">
                  No labels for {activeChild.firstName} yet
                </p>
                <p className="text-xs text-neutral-400 mt-1">
                  Tap any item above to add it to the list.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="bg-white/90 backdrop-blur-md px-5 py-3.5 border-t border-neutral-200/70 sticky bottom-0 z-20 flex items-center justify-between gap-3">
        <div>
          <span className="text-sm font-semibold text-neutral-900 block">
            {labels.length} {labels.length === 1 ? 'Label' : 'Labels'}
          </span>
          <span className="text-xs text-neutral-400">
            {activeChild.fullName} · {formattedDate}
          </span>
        </div>

        <button
          onClick={onGoToPreview}
          disabled={labels.length === 0}
          className={`px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-sm transition-all ${
            labels.length === 0
              ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
              : 'bg-neutral-900 hover:bg-black text-white active:scale-95'
          }`}
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Preview & Print</span>
        </button>
      </div>
    </div>
  );
};
