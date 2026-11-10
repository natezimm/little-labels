import React from 'react';
import { LabelItem } from '../types';

interface ThermalLabelProps {
  label: LabelItem;
  scale?: number;
  showPeelBorder?: boolean;
}

export const ThermalLabel: React.FC<ThermalLabelProps> = ({
  label,
  scale = 1,
  showPeelBorder = true,
}) => {
  // Physical size: 2.1" × 1.1" (~ 62mm × 29mm)
  // Ratio is ~ 1.91 : 1
  // Base display dimensions: 280px × 146px (roughly 2.1:1.1 scaled up for sharp web display)
  const baseWidth = 280;
  const baseHeight = 146;

  return (
    <div
      style={{
        width: `${baseWidth * scale}px`,
        height: `${baseHeight * scale}px`,
      }}
      className={`relative bg-white text-black rounded-lg shadow-sm border ${
        showPeelBorder ? 'border-neutral-300' : 'border-neutral-200'
      } p-3 flex flex-col justify-between font-thermal select-none overflow-hidden transition-transform duration-150`}
    >
      {/* Subtle Brother DK-1209 die-cut notch mark */}
      <div className="absolute top-1 right-2 text-[9px] font-mono text-neutral-400 opacity-60">
        DK-1209
      </div>

      {/* Top Header: Child's Full Name (Bold Uppercase for Daycare Staff legibility) */}
      <div className="border-b border-black/80 pb-1">
        <h3 className="font-extrabold text-[15px] tracking-wide uppercase leading-tight font-sans">
          {label.childName || 'FIRST LAST'}
        </h3>
        <div className="flex justify-between items-center text-[11px] font-semibold text-neutral-800 mt-0.5">
          <span>{label.date || '11/10/26'}</span>
          <span className="text-[10px] uppercase tracking-wider text-neutral-600 bg-neutral-100 px-1 py-0.2 rounded font-mono">
            {label.category}
          </span>
        </div>
      </div>

      {/* Center Body: Contents and Quantity */}
      <div className="my-auto py-1">
        <p className="font-bold text-[16px] leading-snug text-black">
          {label.contents}
          {label.quantity && (
            <span className="font-semibold text-neutral-900 ml-1">
              — {label.quantity}
            </span>
          )}
        </p>
      </div>

      {/* Subtle Thermal Footer / Cut line cue */}
      <div className="pt-0.5 border-t border-dashed border-neutral-300 flex justify-between items-center text-[9px] text-neutral-500 font-mono">
        <span>BROTHER QL THERMAL</span>
        <span>{label.id}</span>
      </div>
    </div>
  );
};
