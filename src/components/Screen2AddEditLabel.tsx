import React, { useState, useEffect } from 'react';
import { LabelItem } from '../types';
import { X, Plus, Minus, Check } from 'lucide-react';

interface Screen2AddEditLabelProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { contents: string; ounces: number | null; copies: number }) => void;
  initialData?: LabelItem | null;
  childName: string;
  formattedDate: string;
}

const OUNCE_PRESETS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export const Screen2AddEditLabel: React.FC<Screen2AddEditLabelProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
  childName,
  formattedDate,
}) => {
  const [contents, setContents] = useState('');
  const [includeOunces, setIncludeOunces] = useState(false);
  const [ounces, setOunces] = useState<number>(6);
  const [copies, setCopies] = useState<number>(1);

  useEffect(() => {
    if (isOpen) {
      setContents(initialData?.contents || '');
      const hasOz = typeof initialData?.ounces === 'number' && initialData.ounces > 0;
      setIncludeOunces(hasOz);
      setOunces(hasOz && initialData?.ounces ? initialData.ounces : 6);
      setCopies(1);
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleContentsChange = (val: string) => {
    setContents(val);
    const lower = val.toLowerCase();
    if (
      !initialData &&
      (lower.includes('milk') || lower.includes('water') || lower.includes('formula') || lower.includes('bottle'))
    ) {
      setIncludeOunces(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contents.trim()) return;

    onSave({
      contents: contents.trim(),
      ounces: includeOunces ? Math.max(0.5, ounces) : null,
      copies: initialData ? 1 : copies,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-xs p-0 sm:p-4">
      <div className="w-full max-w-md bg-white text-neutral-900 rounded-t-3xl sm:rounded-2xl shadow-xl border border-neutral-200/80 overflow-hidden animate-in slide-in-from-bottom duration-200">
        {/* Header */}
        <div className="pt-3 pb-2.5 px-5 flex flex-col items-center border-b border-neutral-100">
          <div className="w-10 h-1 bg-neutral-200 rounded-full mb-2.5 sm:hidden" />
          <div className="w-full flex justify-between items-center">
            <div>
              <h2 className="text-base font-bold text-neutral-900">
                {initialData ? 'Edit Label' : 'New Label'}
              </h2>
              <p className="text-xs text-neutral-400">
                {childName} · {formattedDate}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-neutral-700 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {/* Contents Input */}
          <div>
            <label className="block text-xs font-medium text-neutral-500 mb-1.5">
              Item Name
            </label>
            <input
              type="text"
              required
              value={contents}
              onChange={(e) => handleContentsChange(e.target.value)}
              placeholder="e.g. Scrambled eggs, Whole milk"
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 bg-neutral-50/50 focus:bg-white text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-neutral-900/10 focus:border-neutral-400 transition-all"
              autoFocus
            />
          </div>

          {/* Bottle Ounces Toggle & Selector */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-medium text-neutral-500">
                Amount (for bottles & liquids)
              </label>
              <div className="flex bg-neutral-100 p-0.5 rounded-lg text-xs">
                <button
                  type="button"
                  onClick={() => setIncludeOunces(false)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                    !includeOunces
                      ? 'bg-white text-neutral-900 shadow-2xs'
                      : 'text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  None
                </button>
                <button
                  type="button"
                  onClick={() => setIncludeOunces(true)}
                  className={`px-2.5 py-1 rounded-md font-medium transition-all ${
                    includeOunces
                      ? 'bg-white text-neutral-900 shadow-2xs'
                      : 'text-neutral-500 hover:text-neutral-800'
                  }`}
                >
                  Ounces (oz)
                </button>
              </div>
            </div>

            {includeOunces && (
              <div className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-200/70 space-y-3">
                {/* Stepper + Direct Input */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-neutral-500 font-medium">Bottle Volume</span>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setOunces((prev) => Math.max(1, prev - 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center text-neutral-700 hover:bg-neutral-100 active:scale-95 transition-all shadow-2xs"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-center bg-white border border-neutral-200 rounded-lg px-2.5 py-1">
                      <input
                        type="number"
                        min="0.5"
                        max="32"
                        step="0.5"
                        value={ounces}
                        onChange={(e) => setOunces( parseFloat(e.target.value) || 1)}
                        className="w-10 text-center text-sm font-bold text-neutral-900 focus:outline-hidden tabular-nums"
                      />
                      <span className="text-xs text-neutral-400 font-medium ml-0.5">oz</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOunces((prev) => Math.min(32, prev + 1))}
                      className="w-8 h-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center text-neutral-700 hover:bg-neutral-100 active:scale-95 transition-all shadow-2xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Quick Ounce Presets (1 to 10 oz) */}
                <div className="grid grid-cols-5 gap-1.5">
                  {OUNCE_PRESETS.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => setOunces(preset)}
                      className={`py-1.5 text-xs rounded-lg border text-center font-medium transition-all tabular-nums ${
                        ounces === preset
                          ? 'bg-neutral-900 text-white border-neutral-900 font-semibold'
                          : 'bg-white text-neutral-600 border-neutral-200/80 hover:border-neutral-300'
                      }`}
                    >
                      {preset} oz
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Copies Stepper (only when adding a new label) */}
          {!initialData && (
            <div className="flex justify-between items-center pt-2 border-t border-neutral-100">
              <span className="text-xs font-medium text-neutral-500">
                Number of Labels
              </span>
              <div className="flex items-center gap-2 bg-neutral-100 p-1 rounded-xl">
                <button
                  type="button"
                  onClick={() => setCopies(Math.max(1, copies - 1))}
                  className="w-7 h-7 flex items-center justify-center bg-white rounded-lg shadow-2xs text-neutral-700 active:scale-95 transition-transform"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-6 text-center text-xs font-bold text-neutral-900 tabular-nums">
                  {copies}
                </span>
                <button
                  type="button"
                  onClick={() => setCopies(Math.min(12, copies + 1))}
                  className="w-7 h-7 flex items-center justify-center bg-white rounded-lg shadow-2xs text-neutral-700 active:scale-95 transition-transform"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {/* Save Button */}
          <button
            type="submit"
            className="w-full py-3 bg-neutral-900 hover:bg-black text-white text-xs font-semibold rounded-xl shadow-sm flex items-center justify-center gap-1.5 active:scale-98 transition-all"
          >
            <Check className="w-4 h-4" />
            <span>{initialData ? 'Save Changes' : 'Add Label'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
