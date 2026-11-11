import React, { useState } from 'react';
import { Child, DateFormat } from '../types';
import { formatLabelDate } from '../utils/date';
import {
  ArrowLeft,
  Check,
  Edit2,
  Plus,
  Trash2,
} from 'lucide-react';

interface Screen5SettingsProps {
  childrenList: Child[];
  onUpdateChildren: (children: Child[]) => void;
  dateFormat: DateFormat;
  onChangeDateFormat: (fmt: DateFormat) => void;
  printerModel: string;
  onChangePrinterModel: (model: string) => void;
  selectedDateISO: string;
  onBack: () => void;
}

const PRINTER_MODELS = [
  { id: 'Brother QL-810W', label: 'Brother QL-810W', desc: 'Wi-Fi / AirPrint' },
  { id: 'Brother QL-800', label: 'Brother QL-800', desc: 'USB Direct' },
  { id: 'Brother QL-1110NWB', label: 'Brother QL-1110NWB', desc: 'Wi-Fi / Bluetooth' },
];

const DATE_FORMATS: DateFormat[] = ['MM/DD/YY', 'M/D/YY', 'DD/MM/YY', 'YYYY-MM-DD'];

const ACCENT_COLORS = [
  { name: 'Baby Blue', hex: '#0284C7' },
  { name: 'Blush Pink', hex: '#F43F5E' },
  { name: 'Sage Green', hex: '#10B981' },
  { name: 'Warm Amber', hex: '#F59E0B' },
];

export const Screen5Settings: React.FC<Screen5SettingsProps> = ({
  childrenList,
  onUpdateChildren,
  dateFormat,
  onChangeDateFormat,
  printerModel,
  onChangePrinterModel,
  selectedDateISO,
  onBack,
}) => {
  const [editingChild, setEditingChild] = useState<Child | null>(null);
  const [editFirstName, setEditFirstName] = useState('');
  const [editLastName, setEditLastName] = useState('');
  const [editColor, setEditColor] = useState('#0284C7');

  const startEditChild = (child: Child) => {
    setEditingChild(child);
    setEditFirstName(child.firstName);
    setEditLastName(child.lastName);
    setEditColor(child.color);
  };

  const handleSaveChild = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingChild || !editFirstName.trim()) return;

    const first = editFirstName.trim();
    const last = editLastName.trim();
    const updated = childrenList.map((ch) =>
      ch.id === editingChild.id
        ? {
            ...ch,
            firstName: first,
            lastName: last,
            fullName: last ? `${first} ${last}` : first,
            avatarLetter: first.charAt(0).toUpperCase() || 'A',
            color: editColor,
          }
        : ch
    );

    onUpdateChildren(updated);
    setEditingChild(null);
  };

  const handleAddNewChild = () => {
    const newChild: Child = {
      id: `child-${Date.now()}`,
      firstName: 'Child',
      lastName: childrenList[0]?.lastName || '',
      fullName: childrenList[0]?.lastName ? `Child ${childrenList[0].lastName}` : 'Child',
      color: childrenList.length % 2 === 0 ? '#0284C7' : '#F43F5E',
      avatarLetter: 'C',
    };
    const updated = [...childrenList, newChild];
    onUpdateChildren(updated);
    startEditChild(newChild);
  };

  const handleRemoveChild = (id: string) => {
    if (childrenList.length <= 1) return;
    const updated = childrenList.filter((c) => c.id !== id);
    onUpdateChildren(updated);
    if (editingChild?.id === id) {
      setEditingChild(null);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#F7F7F5] text-neutral-900 font-sans">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur-md px-5 py-3.5 border-b border-neutral-200/70 flex items-center gap-2.5 sticky top-0 z-20">
        <button
          onClick={onBack}
          className="p-1.5 -ml-1.5 text-neutral-500 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-base font-bold text-neutral-900">Settings</h1>
      </div>

      {/* Settings Content */}
      <div className="flex-1 p-5 space-y-6">
        {/* Children Section */}
        <section>
          <div className="flex items-center justify-between mb-2 px-1">
            <h2 className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
              Children
            </h2>
            <button
              onClick={handleAddNewChild}
              className="text-xs text-neutral-600 hover:text-neutral-900 font-semibold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Child</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs divide-y divide-neutral-100 overflow-hidden">
            {childrenList.map((ch) => (
              <div
                key={ch.id}
                className="px-4 py-3 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center font-bold text-white text-xs shrink-0"
                    style={{ backgroundColor: ch.color }}
                  >
                    {ch.avatarLetter}
                  </div>
                  <span className="text-sm font-semibold text-neutral-900 truncate">
                    {ch.fullName}
                  </span>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => startEditChild(ch)}
                    className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-xs font-medium text-neutral-700 flex items-center gap-1 transition-colors"
                  >
                    <Edit2 className="w-3 h-3" />
                    <span>Edit</span>
                  </button>
                  {childrenList.length > 1 && (
                    <button
                      onClick={() => handleRemoveChild(ch.id)}
                      className="p-1.5 text-neutral-300 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                      title="Remove child"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Inline Child Editor */}
          {editingChild && (
            <form
              onSubmit={handleSaveChild}
              className="mt-3 p-4 bg-white rounded-2xl border border-neutral-200/90 shadow-xs space-y-3.5 animate-in fade-in"
            >
              <div className="flex justify-between items-center">
                <span className="text-xs font-semibold text-neutral-800">
                  Edit Child
                </span>
                <button
                  type="button"
                  onClick={() => setEditingChild(null)}
                  className="text-xs text-neutral-400 hover:text-neutral-700"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div>
                  <label className="block text-[11px] font-medium text-neutral-400 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editFirstName}
                    onChange={(e) => setEditFirstName(e.target.value)}
                    placeholder="First name"
                    className="w-full px-3 py-2 text-xs bg-neutral-50 rounded-xl border border-neutral-200 focus:bg-white focus:outline-hidden focus:border-neutral-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-neutral-400 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={editLastName}
                    onChange={(e) => setEditLastName(e.target.value)}
                    placeholder="Last name"
                    className="w-full px-3 py-2 text-xs bg-neutral-50 rounded-xl border border-neutral-200 focus:bg-white focus:outline-hidden focus:border-neutral-400"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-medium text-neutral-500">Color Accent</span>
                <div className="flex gap-2">
                  {ACCENT_COLORS.map((c) => (
                    <button
                      key={c.hex}
                      type="button"
                      onClick={() => setEditColor(c.hex)}
                      className={`w-6 h-6 rounded-full border-2 transition-transform ${
                        editColor.toLowerCase() === c.hex.toLowerCase()
                          ? 'border-neutral-900 scale-110'
                          : 'border-transparent hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-neutral-900 hover:bg-black text-white text-xs font-semibold rounded-xl"
              >
                Save Name
              </button>
            </form>
          )}
        </section>

        {/* Date Format Section */}
        <section>
          <div className="flex justify-between items-baseline mb-2 px-1">
            <h2 className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
              Date Format
            </h2>
            <span className="text-xs text-neutral-400">
              Preview: <strong className="text-neutral-700">{formatLabelDate(selectedDateISO, dateFormat)}</strong>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {DATE_FORMATS.map((fmt) => {
              const isSelected = dateFormat === fmt;
              return (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => onChangeDateFormat(fmt)}
                  className={`py-2.5 px-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                    isSelected
                      ? 'bg-neutral-900 text-white border-neutral-900 font-semibold shadow-2xs'
                      : 'bg-white text-neutral-700 border-neutral-200/80 hover:border-neutral-300'
                  }`}
                >
                  <div>
                    <div className="text-xs">{fmt}</div>
                    <div
                      className={`text-[11px] mt-0.5 ${
                        isSelected ? 'text-neutral-300' : 'text-neutral-400'
                      }`}
                    >
                      {formatLabelDate(selectedDateISO, fmt)}
                    </div>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                </button>
              );
            })}
          </div>
        </section>

        {/* Printer Selection Section (iOS-style checkmark rows — no offset dropdown arrow) */}
        <section>
          <div className="mb-2 px-1">
            <h2 className="text-xs font-medium text-neutral-400 uppercase tracking-wider">
              Thermal Printer
            </h2>
          </div>

          <div className="bg-white rounded-2xl border border-neutral-200/80 shadow-2xs divide-y divide-neutral-100 overflow-hidden">
            {PRINTER_MODELS.map((p) => {
              const isSelected = printerModel === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => onChangePrinterModel(p.id)}
                  className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-neutral-50/70 transition-colors"
                >
                  <div>
                    <div className="text-sm font-semibold text-neutral-900">{p.label}</div>
                    <div className="text-xs text-neutral-400">{p.desc} · 2.1" × 1.1"</div>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-neutral-900 text-white flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
