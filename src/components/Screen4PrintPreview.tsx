import React, { useState } from 'react';
import { LabelItem } from '../types';
import { ThermalLabel } from './ThermalLabel';
import { ArrowLeft, Printer, Download, CheckCircle, Wifi, Sliders, Play, AlertCircle } from 'lucide-react';

interface Screen4PrintPreviewProps {
  labels: LabelItem[];
  onBack: () => void;
  activeChildName: string;
}

export const Screen4PrintPreview: React.FC<Screen4PrintPreviewProps> = ({
  labels,
  onBack,
  activeChildName,
}) => {
  const [isPrinting, setIsPrinting] = useState(false);
  const [printSuccess, setPrintSuccess] = useState(false);
  const [testPrintSuccess, setTestPrintSuccess] = useState(false);
  const [density, setDensity] = useState(50);
  const [showCalibration, setShowCalibration] = useState(false);

  const handlePrintAll = () => {
    setIsPrinting(true);
    setTimeout(() => {
      setIsPrinting(false);
      setPrintSuccess(true);
      setTimeout(() => setPrintSuccess(false), 3000);
    }, 1500);
  };

  const handleTestPrint = () => {
    setTestPrintSuccess(true);
    setTimeout(() => setTestPrintSuccess(false), 2000);
  };

  return (
    <div className="w-full h-full flex flex-col bg-neutral-100 text-neutral-900 overflow-hidden">
      {/* Top Header */}
      <div className="bg-white px-4 py-3 border-b border-neutral-200 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-1.5 -ml-1.5 text-neutral-600 hover:text-neutral-900 rounded-lg hover:bg-neutral-100"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base font-bold text-neutral-900 leading-tight">Print Preview</h1>
            <p className="text-[11px] text-neutral-500 font-medium">
              {labels.length} labels for {activeChildName}
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowCalibration(!showCalibration)}
          className={`p-2 rounded-lg border text-xs font-semibold flex items-center gap-1 transition-colors ${
            showCalibration
              ? 'bg-neutral-900 text-white border-neutral-900'
              : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Calibration</span>
        </button>
      </div>

      {/* Hardware Status Banner */}
      <div className="bg-white/80 backdrop-blur-xs px-4 py-2 border-b border-neutral-200/80 flex items-center justify-between text-xs shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-neutral-800">Brother QL-810W</span>
          <span className="text-[11px] text-neutral-400 font-mono hidden sm:inline">192.168.1.142</span>
        </div>
        <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-medium">
          <Wifi className="w-3 h-3 text-emerald-600" />
          <span>DK-1209 (2.1" × 1.1")</span>
        </div>
      </div>

      {/* Calibration Panel Drawer */}
      {showCalibration && (
        <div className="bg-neutral-50 border-b border-neutral-200 p-3 space-y-2 animate-in slide-in-from-top duration-150 shrink-0 text-xs">
          <div className="flex justify-between items-center">
            <span className="font-bold text-neutral-700">Thermal Print Density</span>
            <span className="font-mono text-neutral-500">{density}%</span>
          </div>
          <input
            type="range"
            min="20"
            max="80"
            value={density}
            onChange={(e) => setDensity(Number(e.target.value))}
            className="w-full accent-neutral-900"
          />
          <div className="flex justify-between text-[10px] text-neutral-400">
            <span>Light</span>
            <span>Standard (300 DPI)</span>
            <span>Heavy Dark</span>
          </div>
        </div>
      )}

      {/* Feedback Banner */}
      {printSuccess && (
        <div className="bg-emerald-600 text-white p-3 flex items-center justify-center gap-2 text-xs font-bold animate-in fade-in">
          <CheckCircle className="w-4 h-4" />
          <span>Printed {labels.length} labels to Brother QL-810W successfully!</span>
        </div>
      )}

      {testPrintSuccess && (
        <div className="bg-indigo-600 text-white p-3 flex items-center justify-center gap-2 text-xs font-bold animate-in fade-in">
          <CheckCircle className="w-4 h-4" />
          <span>Test label dispatched to printer.</span>
        </div>
      )}

      {/* Physical Labels Roll Strip Container */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center gap-4">
        <div className="w-full max-w-sm flex justify-between items-center text-xs text-neutral-500 px-1">
          <span className="font-medium">Continuous Roll Preview (DK-1209)</span>
          <span className="font-mono text-[11px]">{labels.length} Total Stickers</span>
        </div>

        {/* Vertical simulated sticker peel strip */}
        <div className="w-full max-w-sm bg-neutral-200/70 p-4 rounded-2xl border border-neutral-300/80 flex flex-col items-center gap-3 shadow-inner">
          {labels.map((item, idx) => (
            <div key={item.id} className="relative group">
              <div className="absolute -left-6 top-1/2 -translate-y-1/2 text-[10px] font-mono text-neutral-400">
                #{idx + 1}
              </div>
              <ThermalLabel label={item} scale={1} />
            </div>
          ))}

          {labels.length === 0 && (
            <div className="py-12 text-center text-neutral-400">
              <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-xs">No labels queued for printing.</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Sticky Action Dock */}
      <div className="bg-white border-t border-neutral-200 p-4 shrink-0 space-y-2">
        <div className="flex gap-2">
          <button
            onClick={handleTestPrint}
            className="flex-1 py-2.5 px-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
          >
            <Play className="w-3.5 h-3.5" />
            <span>Test 1 Label</span>
          </button>

          <button
            onClick={() => alert('PDF fallback download simulated: daycare-labels-batch.pdf')}
            className="py-2.5 px-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
            title="Download PDF Fallback"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">PDF</span>
          </button>
        </div>

        <button
          onClick={handlePrintAll}
          disabled={isPrinting || labels.length === 0}
          className={`w-full py-3.5 rounded-xl text-white text-sm font-extrabold flex items-center justify-center gap-2 shadow-lg transition-all ${
            isPrinting
              ? 'bg-neutral-600 cursor-not-allowed'
              : 'bg-neutral-900 hover:bg-black active:scale-98'
          }`}
        >
          <Printer className="w-4 h-4" />
          <span>
            {isPrinting ? 'Printing to Brother QL...' : `Print All ${labels.length} Labels`}
          </span>
        </button>
      </div>
    </div>
  );
};
