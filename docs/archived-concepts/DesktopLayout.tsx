import React, { useState } from 'react';
import { Child, LabelItem, FavoriteItem } from '../types';
import { ThermalLabel } from './ThermalLabel';
import {
  Printer,
  Calendar,
  Plus,
  Copy,
  Trash2,
  Sparkles,
  Wifi,
  Sliders,
  CheckCircle,
  Package,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface DesktopLayoutProps {
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
}

export const DesktopLayout: React.FC<DesktopLayoutProps> = ({
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
}) => {
  const [density, setDensity] = useState(50);
  const [isPrinting, setIsPrinting] = useState(false);
  const [printSuccess, setPrintSuccess] = useState(false);

  const handlePrintAll = () => {
    setIsPrinting(true);
    setTimeout(() => {
      setIsPrinting(false);
      setPrintSuccess(true);
      setTimeout(() => setPrintSuccess(false), 3000);
    }, 1200);
  };

  return (
    <div className="w-full h-full flex flex-col bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Top Application Bar */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-md">
            DL
          </div>
          <div>
            <h1 className="text-base font-bold text-white leading-tight">Daycare Labels</h1>
            <p className="text-xs text-slate-400">Desktop Productivity Workspace</p>
          </div>
        </div>

        {/* Global Child Switcher & Date */}
        <div className="flex items-center gap-3">
          <div className="bg-slate-800/90 p-1 rounded-xl flex items-center gap-1 border border-slate-700/60">
            {childrenList.map((ch) => {
              const isActive = ch.id === activeChild.id;
              return (
                <button
                  key={ch.id}
                  onClick={() => onSelectChild(ch)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-2 transition-all ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: ch.color }}
                  />
                  <span>{ch.fullName}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/60 text-xs font-mono text-slate-300">
            <Calendar className="w-3.5 h-3.5 text-indigo-400" />
            <span>Tomorrow: {date}</span>
          </div>
        </div>

        {/* Printer Connectivity Badge */}
        <div className="flex items-center gap-2 text-xs bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-700/60">
          <Wifi className="w-3.5 h-3.5 text-emerald-400" />
          <span className="font-semibold text-slate-300">Brother QL-810W</span>
          <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800/80 px-1.5 py-0.5 rounded font-mono">
            Online
          </span>
        </div>
      </header>

      {/* 3-Column Productivity Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Quick Favorites & Saved Routines */}
        <div className="w-80 bg-slate-900/60 border-r border-slate-800 flex flex-col overflow-hidden shrink-0">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" /> Quick-Add Favorites
            </h2>
            <span className="text-[11px] text-slate-500 font-mono">1-Click</span>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2">
            {favorites.map((fav) => (
              <button
                key={fav.id}
                onClick={() => onAddFromFavorite(fav)}
                className="w-full text-left p-2.5 rounded-xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 transition-all flex items-center justify-between group"
              >
                <div>
                  <div className="text-[10px] font-mono text-indigo-400 uppercase">
                    {fav.category}
                  </div>
                  <div className="text-xs font-bold text-slate-200 group-hover:text-white">
                    {fav.title}
                  </div>
                  <div className="text-[11px] text-slate-400">{fav.defaultQuantity}</div>
                </div>
                <div className="w-7 h-7 rounded-lg bg-slate-700/60 group-hover:bg-indigo-600 text-slate-300 group-hover:text-white flex items-center justify-center transition-colors">
                  <Plus className="w-4 h-4" />
                </div>
              </button>
            ))}

            {/* Saved Routine Template */}
            <div className="mt-6 pt-4 border-t border-slate-800">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                <Package className="w-3.5 h-3.5 text-amber-400" /> Saved Daily Routine
              </h3>
              <div className="p-3 rounded-xl bg-indigo-950/40 border border-indigo-800/50">
                <div className="text-xs font-bold text-indigo-200 mb-1">
                  Full Daycare Pack (7 Labels)
                </div>
                <p className="text-[11px] text-indigo-300/80 mb-3 leading-relaxed">
                  Loads 2 bottles of whole milk, 2 waters, breakfast, lunch, and snack in 1 click.
                </p>
                <button
                  onClick={() => alert('Full daily pack template applied.')}
                  className="w-full py-1.5 px-3 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Apply Routine</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Center Column: Active Batch Label Table */}
        <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden">
          {/* Table Header Controls */}
          <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/30">
            <div>
              <h2 className="text-sm font-bold text-white">
                Active Batch for {activeChild.fullName}
              </h2>
              <p className="text-xs text-slate-400">
                {labels.length} stickers queued for {date}
              </p>
            </div>

            <button
              onClick={onOpenAddModal}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Custom Label</span>
            </button>
          </div>

          {/* Table Body */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="rounded-2xl border border-slate-800 bg-slate-900/50 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-900/80 text-slate-400 font-mono text-[11px]">
                    <th className="py-2.5 px-4 font-semibold">Category</th>
                    <th className="py-2.5 px-4 font-semibold">Contents</th>
                    <th className="py-2.5 px-4 font-semibold">Quantity</th>
                    <th className="py-2.5 px-4 font-semibold">Date</th>
                    <th className="py-2.5 px-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {labels.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => onOpenEditModal(item)}
                      className="hover:bg-slate-800/40 transition-colors cursor-pointer group"
                    >
                      <td className="py-3 px-4 font-mono font-bold text-indigo-400">
                        {item.category}
                      </td>
                      <td className="py-3 px-4 font-bold text-white group-hover:text-indigo-200">
                        {item.contents}
                      </td>
                      <td className="py-3 px-4 text-slate-300 font-medium">
                        {item.quantity || '—'}
                      </td>
                      <td className="py-3 px-4 text-slate-400 font-mono">{item.date}</td>
                      <td
                        className="py-3 px-4 text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => onDuplicateLabel(item.id)}
                            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                            title="Duplicate"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => onRemoveLabel(item.id)}
                            className="p-1.5 text-slate-400 hover:text-red-400 rounded-lg hover:bg-slate-800"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {labels.length === 0 && (
                <div className="py-12 text-center text-slate-500 text-xs">
                  No labels in today's batch. Add items from the left palette.
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Live Brother QL Thermal Strip Preview */}
        <div className="w-96 bg-slate-900/80 border-l border-slate-800 flex flex-col overflow-hidden shrink-0">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Printer className="w-3.5 h-3.5 text-indigo-400" /> Live Print Preview
            </h2>
            <span className="text-[11px] text-emerald-400 font-mono">300 DPI</span>
          </div>

          {/* Thermal Strip Simulation Scroll Area */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center gap-3 bg-slate-950/60">
            <div className="text-[11px] font-mono text-slate-400 w-full text-center border-b border-dashed border-slate-800 pb-2">
              Brother DK-1209 Die-Cut (2.1" × 1.1")
            </div>

            {labels.map((item, idx) => (
              <div key={item.id} className="relative">
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 text-[10px] font-mono text-slate-500">
                  #{idx + 1}
                </div>
                <ThermalLabel label={item} scale={0.92} />
              </div>
            ))}
          </div>

          {/* Right Bottom Action & Calibration Dock */}
          <div className="p-4 bg-slate-900 border-t border-slate-800 space-y-3 shrink-0">
            {/* Calibration slider */}
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Thermal Density</span>
                <span className="font-mono text-slate-300">{density}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="80"
                value={density}
                onChange={(e) => setDensity(Number(e.target.value))}
                className="w-full accent-indigo-500"
              />
            </div>

            {printSuccess && (
              <div className="p-2 bg-emerald-950 border border-emerald-800 rounded-xl text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 animate-in fade-in">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Printed {labels.length} labels to Brother QL-810W!</span>
              </div>
            )}

            <button
              onClick={handlePrintAll}
              disabled={isPrinting || labels.length === 0}
              className={`w-full py-3.5 rounded-xl font-black text-sm uppercase tracking-wide flex items-center justify-center gap-2 shadow-lg transition-all ${
                isPrinting
                  ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white active:scale-98'
              }`}
            >
              <Printer className="w-4 h-4" />
              <span>
                {isPrinting
                  ? 'Printing to Brother QL...'
                  : `Print ${labels.length} Labels (Brother QL)`}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
