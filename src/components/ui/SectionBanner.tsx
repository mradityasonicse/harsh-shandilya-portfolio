import React from 'react';

interface SectionBannerProps {
  number: string;
  title: string;
  subtitle?: string;
}

export const SectionBanner: React.FC<SectionBannerProps> = ({ number, title, subtitle }) => {
  return (
    <div className="flex flex-col items-center justify-center my-12 text-center relative z-10 px-4">
      {/* Decorative Skull and Crossbones Top Flourish */}
      <div className="flex items-center gap-3 mb-2">
        <div className="h-[2px] w-12 md:w-24 bg-gradient-to-r from-transparent via-[#c9a227] to-[#a01d12]" />
        <span className="text-[#c9a227] text-lg font-cinzel">⚔️ {number} ⚔️</span>
        <div className="h-[2px] w-12 md:w-24 bg-gradient-to-l from-transparent via-[#c9a227] to-[#a01d12]" />
      </div>

      {/* Ribbon Heading */}
      <div className="relative inline-block max-w-2xl">
        <div className="parchment-card clip-ribbon px-8 md:px-16 py-3 md:py-4 shadow-[0_10px_30px_rgba(0,0,0,0.8)] border-y-2 border-[#8b5a2b]">
          <h2 className="text-3xl md:text-5xl font-pirate text-[#a01d12] tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]">
            {title}
          </h2>
        </div>
      </div>

      {/* Subtitle / Nautical Chart note */}
      {subtitle && (
        <p className="mt-3 text-sm md:text-base text-[#b39b6d] font-fell italic max-w-xl">
          "{subtitle}"
        </p>
      )}
    </div>
  );
};
