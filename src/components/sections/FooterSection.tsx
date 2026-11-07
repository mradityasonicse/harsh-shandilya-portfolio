import React from 'react';
import { ArrowUp, Compass } from 'lucide-react';

export const FooterSection: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-[#c5a059]/20 bg-[#05080c] py-14 px-4 text-center">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Astrolabe Emblem */}
        <div className="w-11 h-11 mx-auto rounded-full border border-[#c5a059]/40 flex items-center justify-center bg-[#0e1622] shadow-[0_0_20px_rgba(197,160,89,0.2)]">
          <Compass className="w-5 h-5 text-[#dfbe7a]" />
        </div>

        {/* Motto */}
        <div className="space-y-1.5">
          <h3 className="text-xl font-heading font-bold text-[#f1f5f9] tracking-wider">
            Harsh Shandilya • Systems Architect
          </h3>
          <p className="text-xs font-sans font-light text-[#94a3b8] max-w-lg mx-auto leading-relaxed">
            "Architected for deterministic execution, zero memory leaks, and resilient scalability across complex real-world environments."
          </p>
        </div>

        {/* Return to Helm Button */}
        <div>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-5 py-2 border border-[#c5a059]/30 hover:border-[#dfbe7a] rounded-full text-xs font-mono text-[#dfbe7a] hover:text-white transition-all bg-[#0e1622] cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" /> Return to Helm (Top)
          </button>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-6 border-t border-white/5 text-[11px] font-mono text-[#64748b] space-y-1">
          <p>
            © 2026 Harsh Shandilya. All rights reserved. Built with React 19, TypeScript & Three.js WebGL.
          </p>
        </div>
      </div>
    </footer>
  );
};
