import React, { useState } from 'react';
import type { PersonalProfile } from '../../data/personalConfig';
import { ChevronDown, FileText, Shield, Compass } from 'lucide-react';
import { playAudioFx } from '../ui/AudioEngine';

interface HeroSectionProps {
  profile: PersonalProfile;
  onExplore: () => void;
  onOpenResume?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onExplore,
  onOpenResume,
}) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleInspect = () => {
    playAudioFx('seal');
    onExplore();
  };

  const handleExploreArmory = () => {
    playAudioFx('click');
    const el = document.getElementById('armory');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    setTilt({ x, y });
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="hero"
      className="min-h-screen relative flex flex-col items-center justify-center text-center px-4 pt-28 pb-16 z-10 cartography-grid"
    >
      {/* Commissioned Naval Status Pill */}
      <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-[#0e1622]/90 border border-[#c5a059]/30 shadow-[0_4px_30px_rgba(0,0,0,0.6)] mb-8 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981] animate-pulse" />
        <span className="text-xs font-mono text-[#dfbe7a] tracking-wider uppercase font-semibold">
          ACTIVE COMMISSION • SYSTEMS ARCHITECT • 21°14'N, 81°38'E
        </span>
      </div>

      {/* Main Luxury Cartographic Instrument Card */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
        className="relative max-w-4xl mx-auto my-3 cursor-default w-full"
      >
        <div className="nautical-card rounded-2xl px-8 sm:px-16 py-12 md:py-16 shadow-[0_30px_80px_rgba(0,0,0,0.95)] border border-[#c5a059]/30 relative overflow-hidden backdrop-blur-2xl">
          {/* Real-time Dynamic Specular Cursor Glow */}
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-40 transition-opacity duration-300"
            style={{
              background: `radial-gradient(500px circle at ${mousePos.x}% ${mousePos.y}%, rgba(223, 190, 122, 0.18), transparent 75%)`,
            }}
          />

          {/* Antique Brass Corner Rivets */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#dfbe7a]/60 pointer-events-none" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#dfbe7a]/60 pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#dfbe7a]/60 pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#dfbe7a]/60 pointer-events-none" />

          {/* Heading */}
          <div className="relative z-10">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-black text-[#f1f5f9] tracking-tight leading-none drop-shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
              {profile.name}
            </h1>

            {/* Hairline Divider with Compass Rosette */}
            <div className="flex items-center justify-center gap-3 my-6">
              <div className="h-[1px] w-24 sm:w-40 bg-gradient-to-r from-transparent via-[#c5a059]/40 to-[#dfbe7a]" />
              <Compass className="w-4 h-4 text-[#dfbe7a]" />
              <div className="h-[1px] w-24 sm:w-40 bg-gradient-to-l from-transparent via-[#c5a059]/40 to-[#dfbe7a]" />
            </div>

            <p className="text-base sm:text-lg md:text-xl font-heading font-semibold text-[#dfbe7a] tracking-wide">
              {profile.role}
            </p>

            <p className="mt-4 text-sm sm:text-base font-sans font-light text-[#94a3b8] max-w-2xl mx-auto leading-relaxed">
              "{profile.tagline}"
            </p>

            {/* Live Naval Architectural Telemetry Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8 pt-8 border-t border-[#c5a059]/15">
              <div className="text-center p-2 rounded-lg bg-[#05080c]/60 border border-white/5">
                <div className="text-xs text-[#94a3b8] font-mono uppercase">Throughput</div>
                <div className="text-base font-mono font-bold text-[#dfbe7a]">10,000+ TPS</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-[#05080c]/60 border border-white/5">
                <div className="text-xs text-[#94a3b8] font-mono uppercase">Framerate</div>
                <div className="text-base font-mono font-bold text-[#dfbe7a]">120 FPS WebGL</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-[#05080c]/60 border border-white/5">
                <div className="text-xs text-[#94a3b8] font-mono uppercase">Cumulative Shift</div>
                <div className="text-base font-mono font-bold text-emerald-400">0ms CLS</div>
              </div>
              <div className="text-center p-2 rounded-lg bg-[#05080c]/60 border border-white/5">
                <div className="text-xs text-[#94a3b8] font-mono uppercase">Automated Tests</div>
                <div className="text-base font-mono font-bold text-emerald-400">98%+ Verified</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* High-Impact Tactical CTA Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
        <button
          onClick={handleInspect}
          className="flex items-center gap-2.5 px-8 py-3.5 brass-btn rounded-xl cursor-pointer text-xs font-heading font-bold uppercase tracking-wider group"
        >
          <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
          Explore Flagship Expeditions
        </button>

        <button
          onClick={handleExploreArmory}
          className="flex items-center gap-2.5 px-7 py-3.5 brass-btn-outline rounded-xl text-xs font-heading font-semibold uppercase tracking-wider cursor-pointer"
        >
          <Shield className="w-4 h-4 text-[#dfbe7a]" />
          Technical Armory
        </button>

        {onOpenResume && (
          <button
            onClick={() => {
              playAudioFx('seal');
              onOpenResume();
            }}
            className="flex items-center gap-2 px-6 py-3.5 bg-[#0e1622]/90 hover:bg-[#141f2e] text-[#94a3b8] hover:text-[#dfbe7a] border border-white/10 hover:border-[#dfbe7a]/50 rounded-xl text-xs font-heading font-semibold uppercase tracking-wider cursor-pointer transition-all"
          >
            <FileText className="w-4 h-4" />
            Curriculum Vitae
          </button>
        )}
      </div>

      {/* Smooth Scroll Anchor Prompt */}
      <div className="mt-14 animate-bounce opacity-70">
        <button
          onClick={handleExploreArmory}
          className="flex flex-col items-center gap-1 text-[11px] font-mono text-[#94a3b8] hover:text-[#dfbe7a] cursor-pointer"
        >
          <span>NAVIGATE FLEET</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};
