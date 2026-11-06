import React, { useState } from 'react';
import type { PersonalProfile } from '../../data/personalConfig';
import { ChevronDown, FileText, Code2, ExternalLink, Shield } from 'lucide-react';
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
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <section
      id="hero"
      className="min-h-screen relative flex flex-col items-center justify-center text-center px-4 pt-24 pb-16 z-10"
    >
      {/* Top Architectural Status Capsule */}
      <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#120e0a]/90 border border-[#c9a227]/50 shadow-[0_4px_25px_rgba(201,162,39,0.2)] mb-8 backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-[#ff7a1a] shadow-[0_0_10px_#ff7a1a]" />
        <span className="text-xs font-cinzel text-[#d8c49a] tracking-widest uppercase font-semibold">
          {profile.role} • {profile.location.split('(')[0].trim()}
        </span>
      </div>

      {/* Main Aged Parchment Title Banner with Interactive 3D Spatial Tilt */}
      <div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)`,
          transition: 'transform 0.15s ease-out',
        }}
        className="relative max-w-4xl mx-auto my-4 cursor-default"
      >
        <div className="parchment-card clip-torn-paper px-8 sm:px-16 py-10 md:py-14 shadow-[0_30px_70px_rgba(0,0,0,0.95)] border-2 border-[#8b5a2b] relative overflow-hidden">
          {/* Subtle gold specular gradient rim */}
          <div className="pointer-events-none absolute -inset-px rounded-sm bg-gradient-to-tr from-transparent via-[#ffd56b]/15 to-transparent" />

          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-pirate text-[#a01d12] tracking-wide leading-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
            {profile.name}
          </h1>

          <div className="h-[2px] w-36 sm:w-72 mx-auto my-5 bg-gradient-to-r from-transparent via-[#a01d12] to-transparent" />

          <p className="text-base sm:text-xl md:text-2xl font-cinzel text-[#171310] font-semibold tracking-wide">
            {profile.subRole}
          </p>

          <p className="mt-4 text-sm sm:text-base font-fell italic text-[#3e2716] max-w-2xl mx-auto leading-relaxed">
            "{profile.tagline}"
          </p>
        </div>
      </div>

      {/* High-Impact Tactical CTA Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
        <button
          onClick={handleInspect}
          className="flex items-center gap-2.5 px-8 py-3.5 wax-seal text-[#e8dcc0] hover:text-white font-cinzel font-bold text-sm tracking-wider uppercase rounded-full cursor-pointer shadow-[0_6px_25px_rgba(160,29,18,0.5)] hover:shadow-[0_0_30px_#ff7a1a] hover:scale-105 active:scale-95 transition-all group"
        >
          <Code2 className="w-5 h-5 text-[#ff7a1a] group-hover:rotate-12 transition-transform" />
          Explore Flagship Systems
        </button>

        <button
          onClick={handleExploreArmory}
          className="flex items-center gap-2.5 px-7 py-3.5 bg-[#171310]/95 text-[#d8c49a] hover:text-[#ffd56b] border-2 border-[#c9a227]/70 rounded-full font-cinzel font-semibold text-sm tracking-wider uppercase transition-all hover:shadow-[0_0_20px_#c9a227] hover:scale-105 active:scale-95 cursor-pointer backdrop-blur-md"
        >
          <Shield className="w-4 h-4 text-[#c9a227]" />
          Engineering Armory
        </button>

        <a
          href={profile.githubUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() => playAudioFx('click')}
          className="flex items-center gap-2.5 px-7 py-3.5 bg-[#171310]/95 text-[#c9a227] hover:text-white border-2 border-[#c9a227]/70 rounded-full font-cinzel font-semibold text-sm tracking-wider uppercase transition-all hover:shadow-[0_0_20px_#c9a227] hover:scale-105 active:scale-95 backdrop-blur-md"
        >
          <ExternalLink className="w-4 h-4 text-[#c9a227]" />
          Verified GitHub
        </a>

        <button
          onClick={() => {
            playAudioFx('seal');
            if (onOpenResume) onOpenResume();
          }}
          className="flex items-center gap-2 px-6 py-3.5 bg-[#21160e]/95 text-[#d8c49a] hover:text-white border border-[#8b5a2b] hover:border-[#ffd56b] rounded-full font-cinzel text-xs tracking-wider uppercase transition-all hover:scale-105 active:scale-95 shadow-sm cursor-pointer"
        >
          <FileText className="w-4 h-4 text-[#ff7a1a]" />
          Curriculum Vitae
        </button>
      </div>

      {/* Downward Navigation Anchor */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-[#c9a227] animate-bounce pointer-events-none">
        <span className="text-[10px] font-cinzel tracking-widest uppercase mb-1">Scroll to Voyage</span>
        <ChevronDown className="w-5 h-5" />
      </div>
    </section>
  );
};
