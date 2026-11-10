import React from 'react';

interface SectionBannerProps {
  number: string;
  title: string;
  subtitle?: string;
}

export const SectionBanner: React.FC<SectionBannerProps> = ({ number, title, subtitle }) => {
  return (
    <div className="flex flex-col items-center justify-center mb-6 sm:mb-8 text-center relative z-10 px-4">
      {/* Clean Editorial Kicker */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#faf8f1] dark:bg-[#0e241c] border border-[#173f32]/16 dark:border-[#faf8f1]/15 mb-3 shadow-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-[#173f32] dark:bg-[#34d399] inline-block" />
        <span className="text-[11px] font-mono font-bold tracking-widest text-[#173f32] dark:text-[#34d399] uppercase">
          {number}
        </span>
      </div>

      {/* Main Subheading (H2): Breathtaking Editorial Serif */}
      <h2
        className="text-3xl sm:text-4xl md:text-5xl text-[#173f32] dark:text-[#faf8f1] tracking-tight leading-tight max-w-3xl font-normal"
        style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
      >
        {title}
      </h2>

      {/* Subtitle: High-Contrast, Crystal Clear */}
      {subtitle && (
        <p className="mt-2.5 text-base sm:text-lg text-[#3d5f52] dark:text-[#b4d6c9] font-sans font-normal max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
};
