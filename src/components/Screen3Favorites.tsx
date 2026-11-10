import React, { useState } from 'react';
import { FavoriteItem, Category } from '../types';
import { Search, Plus, Star, Sparkles, Check, ArrowLeft, Tag } from 'lucide-react';

interface Screen3FavoritesProps {
  favorites: FavoriteItem[];
  onAddFavoriteToBatch: (fav: FavoriteItem) => void;
  onAddNewFavorite: (fav: Omit<FavoriteItem, 'id'>) => void;
  onBack: () => void;
  activeChildName: string;
}

export const Screen3Favorites: React.FC<Screen3FavoritesProps> = ({
  favorites,
  onAddFavoriteToBatch,
  onAddNewFavorite,
  onBack,
  activeChildName,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedScope, setSelectedScope] = useState<string>('all');
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  // New favorite quick form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<Category>('Snack');
  const [newQuantity, setNewQuantity] = useState('1 serving');

  const filteredFavorites = favorites.filter((fav) => {
    const matchesSearch =
      fav.title.toLowerCase().includes(search.toLowerCase()) ||
      fav.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === 'all' || fav.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesScope = selectedScope === 'all' || fav.childScope === selectedScope;
    return matchesSearch && matchesCategory && matchesScope;
  });

  const handleQuickAdd = (fav: FavoriteItem) => {
    onAddFavoriteToBatch(fav);
    setRecentlyAddedId(fav.id);
    setTimeout(() => setRecentlyAddedId(null), 1200);
  };

  const handleCreateFavorite = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    onAddNewFavorite({
      title: newTitle.trim(),
      category: newCategory,
      defaultQuantity: newQuantity.trim() || '1 serving',
      childScope: 'shared',
      popular: true,
    });

    setNewTitle('');
    setShowAddForm(false);
  };

  return (
    <div className="w-full h-full flex flex-col bg-neutral-50 text-neutral-900 overflow-hidden">
      {/* Top Navigation Bar */}
      <div className="bg-white px-4 py-3 border-b border-neutral-200 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1.5 -ml-1.5 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base font-bold text-neutral-900 leading-tight">Favorites Library</h1>
            <p className="text-[11px] text-neutral-500 font-medium">
              Quick-add foods for {activeChildName}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAddForm(true)}
          className="px-3 py-1.5 bg-neutral-900 hover:bg-black text-white text-xs font-bold rounded-lg flex items-center gap-1.5 shadow-xs transition-transform active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>New Favorite</span>
        </button>
      </div>

      {/* Search and Scope Filter */}
      <div className="p-3 bg-white border-b border-neutral-200 space-y-2 shrink-0">
        <div className="relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search favorites (e.g. eggs, milk, pasta)..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-neutral-100 border border-transparent focus:bg-white focus:border-neutral-300 focus:outline-hidden transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {['all', 'Milk', 'Water', 'Breakfast', 'Lunch', 'Snack'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 text-xs font-semibold rounded-lg shrink-0 transition-all ${
                selectedCategory === cat
                  ? 'bg-neutral-900 text-white shadow-2xs'
                  : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
              }`}
            >
              {cat === 'all' ? 'All Items' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Add New Favorite Inline Form Drawer */}
      {showAddForm && (
        <div className="p-4 bg-indigo-50 border-b border-indigo-100 animate-in slide-in-from-top duration-150 shrink-0">
          <form onSubmit={handleCreateFavorite} className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-indigo-900 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                Add New Saved Favorite
              </span>
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="text-xs text-neutral-500 hover:text-neutral-800"
              >
                Cancel
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                required
                placeholder="Item name (e.g. Yogurt cup)"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="px-2.5 py-1.5 text-xs bg-white rounded-lg border border-neutral-300 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
              />
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as Category)}
                className="px-2.5 py-1.5 text-xs bg-white rounded-lg border border-neutral-300 focus:outline-hidden"
              >
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Snack">Snack</option>
                <option value="Milk">Milk</option>
                <option value="Water">Water</option>
              </select>
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Default quantity (e.g. 4 oz, 1 pouch)"
                value={newQuantity}
                onChange={(e) => setNewQuantity(e.target.value)}
                className="flex-1 px-2.5 py-1.5 text-xs bg-white rounded-lg border border-neutral-300 focus:outline-hidden"
              />
              <button
                type="submit"
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg shadow-xs"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Favorites List */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        <div className="flex justify-between items-center px-1 mb-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
            {filteredFavorites.length} Saved Items
          </span>
          <span className="text-[11px] text-indigo-600 font-medium">
            1-Tap to add to daily run
          </span>
        </div>

        {filteredFavorites.map((fav) => {
          const isJustAdded = recentlyAddedId === fav.id;
          return (
            <div
              key={fav.id}
              className="bg-white p-3 rounded-xl border border-neutral-200/80 shadow-2xs hover:border-neutral-300 transition-all flex items-center justify-between gap-3"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-neutral-100 text-neutral-600 font-mono">
                    {fav.category}
                  </span>
                  {fav.popular && (
                    <span className="text-[10px] font-semibold text-amber-600 flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 fill-amber-500" /> Daily
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-bold text-neutral-900 truncate">{fav.title}</h3>
                <p className="text-xs text-neutral-500">{fav.defaultQuantity}</p>
              </div>

              {/* 1-Tap Add Action Button */}
              <button
                onClick={() => handleQuickAdd(fav)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                  isJustAdded
                    ? 'bg-emerald-600 text-white scale-105'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800 active:scale-95'
                }`}
              >
                {isJustAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Added!</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Today</span>
                  </>
                )}
              </button>
            </div>
          );
        })}

        {filteredFavorites.length === 0 && (
          <div className="text-center py-12 text-neutral-400">
            <Tag className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-xs font-medium">No matching favorites found.</p>
          </div>
        )}
      </div>
    </div>
  );
};
