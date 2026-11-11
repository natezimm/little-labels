import React, { useState } from 'react';
import { LabelItem } from '../types';
import { ThermalLabel } from './ThermalLabel';
import { ArrowLeft, Printer, CheckCircle, AlertCircle } from 'lucide-react';

interface Screen4PrintPreviewProps {
  labels: LabelItem[];
  onBack: () => void;
  activeChildFirstName: string;
  activeChildFullName: string;
  activeChildColor: string;
  activeChildAvatar: string;
  formattedDate: string;
  printerModel: string;
}

export const Screen4PrintPreview: React.FC<Screen4PrintPreviewProps> = ({
  labels,
  onBack,
  activeChildFirstName,
  activeChildFullName,
  activeChildColor,
  activeChildAvatar,
  formattedDate,
  printerModel,
}) => {
  const [isPrinting, setIsPrinting] = useState(false);
  const [printSuccess, setPrintSuccess] = useState(false);

  const handlePrintAll = () => {
    setIsPrinting(true);
    setTimeout(() => {
      setIsPrinting(false);
      setPrintSuccess(true);
      setTimeout(() => setPrintSuccess(false), 3000);
    }, 900);
  };

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#F7F7F5] text-neutral-900 font-sans">
      {/* Top Header */}
      <div className="bg-white/90 backdrop-blur-md px-5 py-3.5 border-b border-neutral-200/70 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-2.5">
          <button
            onClick={onBack}
            className="p-1.5 -ml-1.5 text-neutral-500 hover:text-neutral-900 rounded-lg hover:bg-neutral-100 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-base font-bold text-neutral-900 leading-tight">
              Print Preview
            </h1>
            <p className="text-xs text-neutral-400">
              {activeChildFirstName} · {formattedDate}
            </p>
          </div>
        </div>

        <span className="text-xs font-medium text-neutral-400 bg-neutral-100 px-2.5 py-1 rounded-full">
          {printerModel}
        </span>
      </div>

      {/* Confirmation Banner */}
      {printSuccess && (
        <div className="bg-emerald-600 text-white px-4 py-2.5 flex items-center justify-center gap-2 text-xs font-semibold animate-in fade-in">
          <CheckCircle className="w-4 h-4" />
          <span>
            Sent {labels.length} {labels.length === 1 ? 'label' : 'labels'} to {printerModel}
          </span>
        </div>
      )}

      {/* Physical Labels Roll Preview */}
      <div className="flex-1 p-5 flex flex-col items-center gap-4">
        {/* Subtle Child Confirmation Pill */}
        <div className="w-full max-w-[280px] flex items-center justify-between px-1">
          <div className="flex items-center gap-1.5">
            <div
              className="w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold text-white shadow-2xs"
              style={{ backgroundColor: activeChildColor }}
            >
              {activeChildAvatar}
            </div>
            <span className="text-xs font-semibold text-neutral-800">
              {activeChildFullName}
            </span>
          </div>

          <span className="text-xs text-neutral-400 font-medium">
            {labels.length} {labels.length === 1 ? 'sticker' : 'stickers'}
          </span>
        </div>

        <div className="flex flex-col items-center gap-3.5 w-full">
          {labels.map((item) => (
            <ThermalLabel
              key={item.id}
              label={item}
              childFullName={activeChildFullName}
              formattedDate={formattedDate}
            />
          ))}

          {labels.length === 0 && (
            <div className="py-16 text-center text-neutral-400">
              <AlertCircle className="w-7 h-7 mx-auto mb-2 opacity-40" />
              <p className="text-xs">No labels queued for {activeChildFirstName}.</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="bg-white/90 backdrop-blur-md px-5 py-4 border-t border-neutral-200/70 sticky bottom-0 z-20">
        <button
          onClick={handlePrintAll}
          disabled={isPrinting || labels.length === 0}
          className={`w-full py-3.5 rounded-full text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all ${
            isPrinting || labels.length === 0
              ? 'bg-neutral-300 cursor-not-allowed'
              : 'bg-neutral-900 hover:bg-black active:scale-98'
          }`}
        >
          <Printer className="w-4 h-4" />
          <span>
            {isPrinting
              ? 'Sending to Printer...'
              : `Print ${labels.length} ${labels.length === 1 ? 'Label' : 'Labels'}`}
          </span>
        </button>
      </div>
    </div>
  );
};
