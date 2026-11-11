import React from 'react';
import { LabelItem } from '../types';

interface ThermalLabelProps {
  label: LabelItem;
  childFullName: string;
  formattedDate: string;
  scale?: number;
}

export const ThermalLabel: React.FC<ThermalLabelProps> = ({
  label,
  childFullName,
  formattedDate,
  scale = 1,
}) => {
  // Brother DK-1209 standard small address label: 2.1" × 1.1" (62mm × 29mm)
  const baseWidth = 280;
  const baseHeight = 146;

  return (
    <div
      style={{
        width: `${baseWidth * scale}px`,
        height: `${baseHeight * scale}px`,
      }}
      className="bg-white text-black rounded-xl shadow-xs border border-neutral-300/90 px-4 py-3 flex flex-col justify-between font-thermal select-none overflow-hidden"
    >
      {/* Top: Child's Full Name */}
      <div className="border-b border-black/15 pb-1.5">
        <div className="font-extrabold text-[15px] tracking-wide uppercase leading-tight text-black truncate">
          {childFullName || 'FIRST LAST'}
        </div>
        <div className="text-[12px] font-semibold text-neutral-700 mt-0.5 leading-none">
          {formattedDate}
        </div>
      </div>

      {/* Bottom: Contents & Optional Ounces */}
      <div className="pt-1 my-auto flex items-baseline justify-between gap-2">
        <p className="font-bold text-[17px] leading-snug text-black truncate">
          {label.contents}
          {label.ounces ? (
            <span className="font-semibold text-neutral-900"> — {label.ounces} oz</span>
          ) : null}
        </p>
      </div>
    </div>
  );
};
