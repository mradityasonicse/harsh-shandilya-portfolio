import React from 'react';
import { Compass } from 'lucide-react';

interface SectionBannerProps {
  number: string;
  title: string;
  subtitle?: string;
}

export const SectionBanner: React.FC<SectionBannerProps> = ({ number, title, subtitle }) => {
  return (
    <div className="flex flex-col items-center justify-center my-14 text-center relative z-10 px-4">
      {/* Precision Astrolabe / Coordinate Flourish */}
      <div className="flex items-center gap-3 mb-3">
        <div className="h-[1px] w-12 md:w-28 bg-gradient-to-r from-transparent via-[#c5a059]/40 to-[#dfbe7a]" />
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#0e1622] border border-[#c5a059]/30 shadow-inner">
          <Compass className="w-3.5 h-3.5 text-[#dfbe7a]" />
          <span className="text-[11px] font-mono tracking-widest text-[#dfbe7a] uppercase font-semibold">
            {number}
          </span>
        </div>
        <div className="h-[1px] w-12 md:w-28 bg-gradient-to-l from-transparent via-[#c5a059]/40 to-[#dfbe7a]" />
      </div>

      {/* Main Subheading (H2): Space Grotesk Medium 500 with slight geometric quirks */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-medium text-[#f1f5f9] tracking-[-0.025em] leading-tight max-w-3xl">
        {title}
      </h2>

      {/* Subtitle: Geist Sans Regular 400 with open line-height 1.6 */}
      {subtitle && (
        <p className="mt-3 text-sm md:text-base text-[#94a3b8] font-sans font-normal max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}

      {/* Hairline subtle bottom accent */}
      <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-[#c5a059]/50 to-transparent mt-4" />
    </div>
  );
};
