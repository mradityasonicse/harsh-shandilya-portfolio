import React from 'react';
import { ArrowUp, Skull } from 'lucide-react';

export const FooterSection: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t-2 border-[#c9a227]/40 bg-[#0b0906] py-12 px-4 text-center">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Emblem */}
        <div className="w-12 h-12 mx-auto rounded-full border border-[#c9a227] flex items-center justify-center bg-[#171310] shadow-[0_0_20px_rgba(201,162,39,0.3)]">
          <Skull className="w-6 h-6 text-[#a01d12]" />
        </div>

        {/* Motto */}
        <div className="space-y-1">
          <h3 className="text-2xl font-pirate text-[#d8c49a] tracking-wider">
            The Developer's Pearl
          </h3>
          <p className="text-xs font-fell italic text-[#b39b6d] max-w-md mx-auto">
            "Take what you can, give nothing back — except for clean pull requests, zero memory leaks, and tested architectures."
          </p>
        </div>

        {/* Return to Helm Button */}
        <div>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-5 py-2 border border-[#c9a227]/50 hover:border-[#ff7a1a] rounded-full text-xs font-cinzel text-[#d8c49a] hover:text-[#ff7a1a] transition-all bg-[#171310] cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" /> Return to the Helm
          </button>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-6 border-t border-[#281d13] text-[10px] font-cinzel text-[#8b5a2b] space-y-1">
          <p>
            © 2026 Software Engineering Portfolio. Built with React 19, TypeScript & Three.js.
          </p>
        </div>
      </div>
    </footer>
  );
};
