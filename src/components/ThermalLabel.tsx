import React from 'react';
import { LabelItem, LabelLayout } from '../types';

interface ThermalLabelProps {
  label: LabelItem;
  childFullName: string;
  formattedDate: string;
  layout?: LabelLayout;
  scale?: number;
}

export const ThermalLabel: React.FC<ThermalLabelProps> = ({
  label,
  childFullName,
  formattedDate,
  layout = 'split-header',
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
      {/* Layout 1: Split Header (Date on Right — clean line, maximizes content space) */}
      {layout === 'split-header' && (
        <>
          <div className="border-b border-black/15 pb-1.5 flex items-baseline justify-between gap-2">
            <span className="font-extrabold text-[15px] tracking-wide uppercase leading-tight text-black truncate">
              {childFullName || 'FIRST LAST'}
            </span>
            <span className="text-[12px] font-semibold text-neutral-700 shrink-0 font-mono">
              {formattedDate}
            </span>
          </div>

          <div className="pt-1 my-auto flex items-baseline justify-between gap-2">
            <p className="font-bold text-[17px] leading-snug text-black truncate">
              {label.contents}
              {label.ounces ? (
                <span className="font-semibold text-neutral-900"> — {label.ounces} oz</span>
              ) : null}
            </p>
          </div>
        </>
      )}

      {/* Layout 2: Stacked (Date under Name) */}
      {layout === 'stacked' && (
        <>
          <div className="border-b border-black/15 pb-1.5">
            <div className="font-extrabold text-[15px] tracking-wide uppercase leading-tight text-black truncate">
              {childFullName || 'FIRST LAST'}
            </div>
            <div className="text-[12px] font-semibold text-neutral-700 mt-0.5 leading-none">
              {formattedDate}
            </div>
          </div>

          <div className="pt-1 my-auto flex items-baseline justify-between gap-2">
            <p className="font-bold text-[17px] leading-snug text-black truncate">
              {label.contents}
              {label.ounces ? (
                <span className="font-semibold text-neutral-900"> — {label.ounces} oz</span>
              ) : null}
            </p>
          </div>
        </>
      )}

      {/* Layout 3: Centered */}
      {layout === 'centered' && (
        <div className="my-auto text-center space-y-1">
          <div className="font-extrabold text-[15px] tracking-wide uppercase leading-tight text-black truncate">
            {childFullName || 'FIRST LAST'}
          </div>
          <div className="text-[11px] font-semibold text-neutral-600">
            {formattedDate}
          </div>
          <div className="pt-1 border-t border-black/10">
            <p className="font-bold text-[16px] leading-snug text-black truncate">
              {label.contents}
              {label.ounces ? (
                <span className="font-semibold text-neutral-900"> — {label.ounces} oz</span>
              ) : null}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
