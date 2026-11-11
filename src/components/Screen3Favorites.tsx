import React, { useState } from 'react';
import { FavoriteItem } from '../types';
import { Search, Plus, Check, ArrowLeft, Trash2, Minus } from 'lucide-react';

interface Screen3FavoritesProps {
  favorites: FavoriteItem[];
  onAddFavoriteToBatch: (fav: FavoriteItem) => void;
  onAddNewFavorite: (fav: Omit<FavoriteItem, 'id'>) => void;
  onRemoveFavorite: (id: string) => void;
  onBack: () => void;
  activeChildName: string;
}

export const Screen3Favorites: React.FC<Screen3FavoritesProps> = ({
  favorites,
  onAddFavoriteToBatch,
  onAddNewFavorite,
  onRemoveFavorite,
  onBack,
  activeChildName,
}) => {
  const [search, setSearch] = useState('');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  // New favorite form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [includeOunces, setIncludeOunces] = useState(false);
  const [newOunces, setNewOunces] = useState(6);

  const filteredFavorites = favorites.filter((fav) =>
    fav.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleQuickAdd = (fav: FavoriteItem) => {
    onAddFavoriteToBatch(fav);
    setRecentlyAddedId(fav.id);
    setTimeout(() => setRecentlyAddedId(null), 900);
  };

  const handleCreateFavorite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddNewFavorite({
      title: newTitle.trim(),
      defaultOunces: includeOunces ? newOunces : null,
    });

    setNewTitle('');
    setIncludeOunces(false);
    setShowAddForm(false);
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#F7F7F5] text-neutral-900 font-sans">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md px-5 py-3.5 border-b border-neutral-200/70 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onBack}
            className="p-1.5 -ml-1.5 text-neutral-500 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base font-bold text-neutral-900 leading-tight">Saved Items</h1>
            <p className="text-xs text-neutral-400">
              Quick-add favorites for {activeChildName}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-3 py-1.5 bg-neutral-900 hover:bg-black text-white text-xs font-semibold rounded-full flex items-center gap-1 shadow-2xs transition-transform active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New</span>
        </button>
      </div>

      {/* New Favorite Drawer */}
      {showAddForm && (
        <div className="p-4 bg-white border-b border-neutral-200/80 animate-in slide-in-from-top duration-150">
          <form onSubmit={handleCreateFavorite} className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-neutral-700">
                New Saved Item
              </span>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="text-xs text-neutral-400 hover:text-neutral-700"
              >
                Cancel
              </button>
            </div>

            <input
              type="text"
              required
              placeholder="Item name (e.g. Whole milk, Raspberries)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-3 py-2 text-sm bg-neutral-50 rounded-xl border border-neutral-200 focus:bg-white focus:outline-hidden focus:border-neutral-400"
              autoFocus
            />

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 text-xs text-neutral-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={includeOunces}
                  onChange={(e) => setIncludeOunces(e.target.checked)}
                  className="rounded border-neutral-300 text-neutral-900 focus:ring-0"
                />
                <span>Include bottle ounces (oz)</span>
              </label>

              {includeOunces && (
                <div className="flex items-center gap-1.5 bg-neutral-100 p-0.5 rounded-lg border border-neutral-200">
                  <button
                    type="button"
                    onClick={() => setNewOunces(Math.max(1, newOunces - 1))}
                    className="w-6 h-6 bg-white rounded flex items-center justify-center text-neutral-700 shadow-2xs"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="text-xs font-semibold px-2 tabular-nums">
                    {newOunces} oz
                  </span>
                  <button
                    type="button"
                    onClick={() => setNewOunces(Math.min(24, newOunces + 1))}
                    className="w-6 h-6 bg-white rounded flex items-center justify-center text-neutral-700 shadow-2xs"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 bg-neutral-900 hover:bg-black text-white text-xs font-semibold rounded-xl"
            >
              Save Item
            </button>
          </form>
        </div>
      )}

      {/* Search Bar */}
      <div className="px-5 pt-4 pb-2">
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter saved items..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white border border-neutral-200/80 focus:border-neutral-400 focus:outline-hidden transition-all"
          />
        </div>
      </div>

      {/* Favorites List */}
      <div className="flex-1 px-5 py-2">
        <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs divide-y divide-neutral-100 overflow-hidden">
          {filteredFavorites.map((fav) => {
            const isJustAdded = recentlyAddedId === fav.id;
            return (
              <div
                key={fav.id}
                className="px-4 py-3 flex items-center justify-between gap-3 hover:bg-neutral-50/50 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <span className="text-sm font-semibold text-neutral-900">
                    {fav.title}
                  </span>
                  {fav.defaultOunces ? (
                    <span className="text-xs text-neutral-400 ml-2">
                      {fav.defaultOunces} oz
                    </span>
                  ) : null}
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleQuickAdd(fav)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                      isJustAdded
                        ? 'bg-emerald-600 text-white'
                        : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800 active:scale-95'
                    }`}
                  >
                    {isJustAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => onRemoveFavorite(fav.id)}
                    className="p-1.5 text-neutral-300 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                    title="Delete saved item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}

          {filteredFavorites.length === 0 && (
            <div className="text-center py-10 text-neutral-400 text-xs">
              No saved items match your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
