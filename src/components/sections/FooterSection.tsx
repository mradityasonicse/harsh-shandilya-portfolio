import React from 'react';
import { ArrowUp, Compass, ShieldCheck, Sparkles } from 'lucide-react';
import { GOD_TIER_RESOURCES } from '../../data/designEyeData';
import { playAudioFx } from '../ui/AudioEngine';

export const FooterSection: React.FC = () => {
  const scrollToTop = () => {
    playAudioFx('seal');
    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.scrollTo('#hero');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { href: '#hero', label: 'Helm' },
    { href: '#legend', label: 'Chronicle' },
    { href: '#armory', label: 'Technical Armory' },
    { href: '#design-eye', label: 'Sovereign Design Eye' },
    { href: '#voyages', label: 'Expeditions' },
    { href: '#spoils', label: 'Naval Honors' },
    { href: '#log', label: 'Service Log' },
    { href: '#bottle', label: 'Dispatch' },
  ];

  return (
    <footer className="relative z-10 border-t border-[#c5a059]/30 bg-[#040609] pt-20 pb-12 px-4 sm:px-6 lg:px-8 text-left overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-gradient-to-b from-[#dfbe7a]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Main 4-Column Architectural Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-[#c5a059]/15">
          {/* Column 1: Brand & Coordinates (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#c5a059]/50 flex items-center justify-center bg-[#0e1622] shadow-[0_0_20px_rgba(197,160,89,0.3)]">
                <Compass className="w-5 h-5 text-[#dfbe7a]" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-bold text-white tracking-wide">
                  Harsh Shandilya
                </h3>
                <span className="text-[11px] font-mono text-[#c5a059] block">
                  Systems Architect • Full-Stack Engineer
                </span>
              </div>
            </div>

            <p className="text-xs text-[#94a3b8] font-sans leading-relaxed font-light">
              Architecting high-concurrency distributed systems, zero-defect microservices, and interactive 3D spatial web environments with 100% verified execution.
            </p>

            <div className="pt-2 space-y-1.5 text-[11px] font-mono text-[#64748b]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Station: 21°14'N 81°38'E • Bhilai / Raipur, India</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#dfbe7a]" />
                <span>Architecture: Zero-Vibe Coding • 100% Verified</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold text-[#dfbe7a] tracking-widest uppercase">
              Chronicles
            </h4>
            <ul className="space-y-2 text-xs font-heading">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => playAudioFx('click')}
                    className="text-[#94a3b8] hover:text-[#dfbe7a] transition-colors block py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: 16 God-Tier AI & Design Stacks (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-mono font-bold text-[#dfbe7a] tracking-widest uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#dfbe7a]" />
                16 God-Tier AI Stacks
              </h4>
              <a
                href="#design-eye"
                className="text-[10px] font-mono text-[#c5a059] hover:underline"
              >
                Inspect All →
              </a>
            </div>
            <p className="text-[11px] font-sans text-[#64748b]">
              Curated architectural resources inspiring the design eye of this portfolio:
            </p>
            <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 text-[11px] font-mono">
              {GOD_TIER_RESOURCES.slice(0, 10).map((res) => (
                <a
                  key={res.id}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#94a3b8] hover:text-[#dfbe7a] transition-colors truncate flex items-center gap-1"
                >
                  <span className="text-[#c5a059] text-[9px]">#{res.number}</span>
                  <span className="truncate">{res.domain}</span>
                </a>
              ))}
            </div>
            <div className="pt-1 text-[10px] font-mono text-[#64748b]">
              + 6 more platforms & 260+ skills active in <a href="#design-eye" className="text-[#dfbe7a] underline">Design Eye Matrix</a>.
            </div>
          </div>

          {/* Column 4: Engineering Benchmark (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold text-[#dfbe7a] tracking-widest uppercase">
              Vitals
            </h4>
            <div className="space-y-2 text-[11px] font-mono text-[#94a3b8]">
              <div className="p-2 rounded-lg bg-[#0e1622] border border-white/5">
                <span className="text-[#64748b] block text-[9px]">FRAME RATE</span>
                <span className="text-emerald-400 font-bold">120 FPS Native</span>
              </div>
              <div className="p-2 rounded-lg bg-[#0e1622] border border-white/5">
                <span className="text-[#64748b] block text-[9px]">LAYOUT SHIFT</span>
                <span className="text-emerald-400 font-bold">0 ms CLS</span>
              </div>
              <div className="p-2 rounded-lg bg-[#0e1622] border border-white/5">
                <span className="text-[#64748b] block text-[9px]">ENGINE</span>
                <span className="text-[#dfbe7a] font-bold">React 19 + Three.js</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#64748b]">
          <div>
            © 2026 Harsh Shandilya. All rights reserved. Architected with React 19, TypeScript, Three.js WebGL & Tailwind CSS v4.
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#c5a059]/40 hover:border-[#dfbe7a] text-xs font-mono text-[#dfbe7a] hover:text-white transition-all bg-[#0e1622] hover:bg-[#141f2e] cursor-pointer shadow-md group"
          >
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            Return to Helm (Top)
          </button>
        </div>
      </div>
    </footer>
  );
};
