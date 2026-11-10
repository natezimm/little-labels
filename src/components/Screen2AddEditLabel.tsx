import React, { useState } from 'react';
import { Category, LabelItem } from '../types';
import { X, Plus, Minus, Check } from 'lucide-react';

interface Screen2AddEditLabelProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (label: Partial<LabelItem>) => void;
  initialData?: LabelItem | null;
  childName: string;
  date: string;
}

const CATEGORIES: Category[] = ['Breakfast', 'Lunch', 'Snack', 'Milk', 'Water', 'Supplies'];
const QUANTITY_PRESETS = ['4 oz', '6 oz', '8 oz', '½ cup', '1 cup', '1 serving'];

export const Screen2AddEditLabel: React.FC<Screen2AddEditLabelProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  childName,
  date,
}) => {
  if (!isOpen) return null;

  const [category, setCategory] = useState<Category>(initialData?.category || 'Milk');
  const [contents, setContents] = useState(initialData?.contents || '');
  const [quantity, setQuantity] = useState(initialData?.quantity || '6 oz');
  const [copies, setCopies] = useState(initialData?.copies || 1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contents.trim()) return;

    onSave({
      id: initialData?.id || `label-${Date.now()}`,
      category,
      contents: contents.trim(),
      quantity,
      copies,
      childName,
      date,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-xs p-0 sm:p-4 transition-opacity">
      <div className="w-full max-w-md bg-white text-neutral-900 rounded-t-3xl sm:rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden animate-in slide-in-from-bottom duration-200">
        {/* Header / Grab Handle */}
        <div className="pt-3 pb-2 px-6 flex flex-col items-center border-b border-neutral-100">
          <div className="w-12 h-1.5 bg-neutral-300 rounded-full mb-3 sm:hidden" />
          <div className="w-full flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-neutral-900">
                {initialData ? 'Edit Label' : 'New Daycare Label'}
              </h2>
              <p className="text-xs text-neutral-500 font-medium">
                For {childName} • {date}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Category Chips */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">
              Category
            </label>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    category === cat
                      ? 'bg-neutral-900 text-white shadow-xs'
                      : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Item Contents Input */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1.5">
              Contents / Food & Drink
            </label>
            <input
              type="text"
              required
              value={contents}
              onChange={(e) => setContents(e.target.value)}
              placeholder="e.g. Scrambled eggs, Whole milk"
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              autoFocus
            />
            {/* Quick Suggestions */}
            <div className="flex items-center gap-1.5 mt-2 overflow-x-auto no-scrollbar py-0.5">
              <span className="text-[10px] text-neutral-400 font-medium shrink-0">Quick:</span>
              {['Whole milk', 'Water', 'Pasta', 'Scrambled eggs', 'Crunchies'].map((sug) => (
                <button
                  key={sug}
                  type="button"
                  onClick={() => setContents(sug)}
                  className="text-[11px] bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-2 py-0.5 rounded-md shrink-0 font-medium"
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity Selector: Only active for liquids or optional */}
          {category === 'Milk' || category === 'Water' ? (
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Bottle Amount (Ounces)
                </label>
                <span className="text-xs font-bold font-mono text-neutral-900">{quantity || '6 oz'}</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5 mb-2">
                {['4 oz', '5 oz', '6 oz', '8 oz'].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setQuantity(preset)}
                    className={`py-1.5 px-2 text-xs font-mono font-bold rounded-lg border text-center transition-all ${
                      quantity === preset
                        ? 'border-neutral-900 bg-neutral-900 text-white'
                        : 'border-neutral-200 hover:border-neutral-300 text-neutral-700 bg-neutral-50'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-2.5 rounded-xl bg-neutral-50 border border-neutral-200/80 text-xs text-neutral-500 flex items-center justify-between">
              <span>Amounts not required for solid food</span>
              {quantity ? (
                <button
                  type="button"
                  onClick={() => setQuantity('')}
                  className="text-[11px] text-red-600 hover:underline font-semibold"
                >
                  Clear ({quantity})
                </button>
              ) : null}
            </div>
          )}

          {/* Copies Stepper */}
          <div className="flex justify-between items-center pt-2 border-t border-neutral-100">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block">
                Number of Copies
              </span>
              <span className="text-[11px] text-neutral-400">
                Useful for multiple identical bottles
              </span>
            </div>
            <div className="flex items-center gap-2 bg-neutral-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => setCopies(Math.max(1, copies - 1))}
                className="w-7 h-7 flex items-center justify-center bg-white rounded-lg shadow-2xs text-neutral-700 active:scale-95 transition-transform"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center text-sm font-bold text-neutral-900">
                {copies}
              </span>
              <button
                type="button"
                onClick={() => setCopies(copies + 1)}
                className="w-7 h-7 flex items-center justify-center bg-white rounded-lg shadow-2xs text-neutral-700 active:scale-95 transition-transform"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              className="w-full py-3 bg-neutral-900 hover:bg-black text-white font-bold rounded-xl shadow-md flex items-center justify-center gap-2 active:scale-98 transition-all"
            >
              <Check className="w-4 h-4" />
              <span>{initialData ? 'Update Label' : 'Add to Today’s Labels'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
