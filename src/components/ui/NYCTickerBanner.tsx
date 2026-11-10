import React from 'react';
import { Shield, Sparkles, Award, Terminal, Cloud, Cpu, ArrowUpRight } from 'lucide-react';

export const NYCTickerBanner: React.FC = () => {
  const items = [
    { text: "GOOGLE STUDENT AMBASSADOR '26", icon: Sparkles },
    { text: "AWS STUDENT BUILDER GROUP LEAD", icon: Cloud },
    { text: "B.TECH CSE (CYBER SECURITY)", icon: Shield },
    { text: "DEFENSIVE SYSTEM ARCHITECTURE", icon: Terminal },
    { text: "6+ VERIFIED CREDENTIALS", icon: Award },
    { text: "JAVA & DATA STRUCTURES", icon: Cpu },
    { text: "LINUX & NETWORK AUDITING", icon: Terminal },
    { text: "RUNGTA UNIVERSITY • BHILAI", icon: ArrowUpRight },
  ];

  return (
    <div className="w-full relative z-20 overflow-hidden border-y border-[#173f32]/12 dark:border-[#faf8f1]/10 bg-[#faf8f1]/80 dark:bg-[#071510]/80 backdrop-blur-md py-3 sm:py-3.5 select-none">
      <div className="flex animate-nyc-marquee whitespace-nowrap">
        {/* Track 1 */}
        <div className="flex items-center gap-6 sm:gap-8 px-4 shrink-0">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`track1-${idx}`}
                className="flex items-center gap-2.5 text-xs sm:text-[13px] font-mono font-bold tracking-widest uppercase text-[#173f32] dark:text-[#faf8f1]"
              >
                <Icon className="w-3.5 h-3.5 text-emerald-700 dark:text-[#34d399] shrink-0" />
                <span>{item.text}</span>
                <span className="text-[#173f32]/30 dark:text-white/20 mx-2 text-sm">•</span>
              </div>
            );
          })}
        </div>

        {/* Track 2 (Duplicate for seamless infinite scroll) */}
        <div className="flex items-center gap-6 sm:gap-8 px-4 shrink-0">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={`track2-${idx}`}
                className="flex items-center gap-2.5 text-xs sm:text-[13px] font-mono font-bold tracking-widest uppercase text-[#173f32] dark:text-[#faf8f1]"
              >
                <Icon className="w-3.5 h-3.5 text-emerald-700 dark:text-[#34d399] shrink-0" />
                <span>{item.text}</span>
                <span className="text-[#173f32]/30 dark:text-white/20 mx-2 text-sm">•</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NYCTickerBanner;
