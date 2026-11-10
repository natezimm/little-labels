import React from 'react';
import { Child, LabelItem, FavoriteItem } from '../types';
import { ConceptADailyLabels } from './ConceptADailyLabels';
import { ConceptBDailyLabels } from './ConceptBDailyLabels';
import { ConceptCDailyLabels } from './ConceptCDailyLabels';
import { Zap, Heart, Smartphone, Check, Clock, Fingerprint } from 'lucide-react';

interface SideBySideCompareProps {
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
  onOpenEditModal: (label: LabelItem) => void;
  onGoToPreview: () => void;
  onGoToFavorites: () => void;
}

export const SideBySideCompare: React.FC<SideBySideCompareProps> = (props) => {
  return (
    <div className="w-full h-full flex flex-col bg-slate-950 text-slate-100 overflow-y-auto p-6 font-sans">
      {/* Header */}
      <div className="max-w-7xl mx-auto w-full mb-6">
        <h1 className="text-2xl font-black text-white tracking-tight">
          Concept Comparison & Design Review
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Review and interact with all three visual approaches side-by-side on simulated iPhone 16 viewports (390 × 844 px).
        </p>
      </div>

      {/* 3 iPhone Frames in a Row */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Concept A Column */}
        <div className="flex flex-col items-center">
          <div className="mb-3 text-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Concept A
            </span>
            <h2 className="text-base font-bold text-white flex items-center justify-center gap-1.5">
              <Smartphone className="w-4 h-4 text-slate-300" /> Minimal iOS Utility
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Things 3 / Apple Reminders style. Clean, native, grouped cells.
            </p>
          </div>

          {/* iPhone Frame */}
          <div className="w-[375px] h-[760px] rounded-[48px] bg-black p-3.5 shadow-2xl border-4 border-slate-700 relative overflow-hidden flex flex-col">
            {/* Dynamic Island */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-20 pointer-events-none" />
            <div className="flex-1 rounded-[36px] overflow-hidden bg-neutral-100 flex flex-col">
              <ConceptADailyLabels {...props} />
            </div>
            {/* Home indicator bar */}
            <div className="w-32 h-1 bg-neutral-400 rounded-full mx-auto mt-2 shrink-0" />
          </div>
        </div>

        {/* Concept B Column */}
        <div className="flex flex-col items-center">
          <div className="mb-3 text-center">
            <span className="text-xs font-bold text-[#C86D51] uppercase tracking-wider block">
              Concept B
            </span>
            <h2 className="text-base font-bold text-white flex items-center justify-center gap-1.5">
              <Heart className="w-4 h-4 text-[#C86D51]" /> Warm Family Organizer
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Terracotta & sage palette, rounded card stacks, child badges.
            </p>
          </div>

          {/* iPhone Frame */}
          <div className="w-[375px] h-[760px] rounded-[48px] bg-black p-3.5 shadow-2xl border-4 border-slate-700 relative overflow-hidden flex flex-col">
            {/* Dynamic Island */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-20 pointer-events-none" />
            <div className="flex-1 rounded-[36px] overflow-hidden bg-[#FAF8F5] flex flex-col">
              <ConceptBDailyLabels {...props} />
            </div>
            {/* Home indicator bar */}
            <div className="w-32 h-1 bg-stone-400 rounded-full mx-auto mt-2 shrink-0" />
          </div>
        </div>

        {/* Concept C Column */}
        <div className="flex flex-col items-center">
          <div className="mb-3 text-center">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
              Concept C
            </span>
            <h2 className="text-base font-bold text-white flex items-center justify-center gap-1.5">
              <Zap className="w-4 h-4 text-indigo-400" /> Ultra-Fast Label Builder
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              1-tap rapid add pad, inline steppers, zero modal delay.
            </p>
          </div>

          {/* iPhone Frame */}
          <div className="w-[375px] h-[760px] rounded-[48px] bg-black p-3.5 shadow-2xl border-4 border-slate-700 relative overflow-hidden flex flex-col">
            {/* Dynamic Island */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-20 pointer-events-none" />
            <div className="flex-1 rounded-[36px] overflow-hidden bg-neutral-950 flex flex-col">
              <ConceptCDailyLabels {...props} />
            </div>
            {/* Home indicator bar */}
            <div className="w-32 h-1 bg-neutral-600 rounded-full mx-auto mt-2 shrink-0" />
          </div>
        </div>
      </div>

      {/* Comparative Evaluation Matrix */}
      <div className="max-w-5xl mx-auto w-full bg-slate-900 rounded-2xl border border-slate-800 p-6 mb-8 shadow-xl">
        <h3 className="text-lg font-bold text-white mb-4">
          Comparative UX Evaluation & Speed Matrix
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-mono">
                <th className="py-2.5 px-3">Metric / Dimension</th>
                <th className="py-2.5 px-3 font-bold text-slate-200">Concept A (iOS Utility)</th>
                <th className="py-2.5 px-3 font-bold text-amber-200">Concept B (Warm Organizer)</th>
                <th className="py-2.5 px-3 font-bold text-indigo-300">Concept C (Ultra-Fast)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              <tr>
                <td className="py-3 px-3 font-bold text-slate-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-indigo-400" />
                  Estimated Time (7 Labels)
                </td>
                <td className="py-3 px-3 text-slate-300">~28 seconds</td>
                <td className="py-3 px-3 text-slate-300">~35 seconds</td>
                <td className="py-3 px-3 font-bold text-emerald-400">~14 seconds (Fastest)</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-slate-300 flex items-center gap-1.5">
                  <Fingerprint className="w-3.5 h-3.5 text-indigo-400" />
                  Total Taps Required
                </td>
                <td className="py-3 px-3 text-slate-300">12–15 taps</td>
                <td className="py-3 px-3 text-slate-300">14–18 taps</td>
                <td className="py-3 px-3 font-bold text-emerald-400">6–8 taps (Lowest)</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-slate-300">One-Handed Ergonomics</td>
                <td className="py-3 px-3 text-slate-400">Good (Standard iOS reach)</td>
                <td className="py-3 px-3 text-slate-400">Moderate (Card heights cause scroll)</td>
                <td className="py-3 px-3 font-bold text-indigo-300">Excellent (Bottom action dock)</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-slate-300">Inline Editing Friction</td>
                <td className="py-3 px-3 text-slate-400">Requires opening edit modal</td>
                <td className="py-3 px-3 text-slate-400">Requires card tap / modal</td>
                <td className="py-3 px-3 font-bold text-emerald-400">Zero modal (Direct row steppers)</td>
              </tr>
              <tr>
                <td className="py-3 px-3 font-bold text-slate-300">Visual Appeal & Warmth</td>
                <td className="py-3 px-3 text-slate-300">Clean, crisp, neutral</td>
                <td className="py-3 px-3 font-bold text-amber-300">Highest emotional warmth</td>
                <td className="py-3 px-3 text-slate-400">Utilitarian, tool-focused</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
