import React, { useState } from 'react';
import type { PersonalProfile } from '../../data/personalConfig';
import { SectionBanner } from '../ui/SectionBanner';
import { Flame, Shield, Compass, Cpu, CheckCircle2 } from 'lucide-react';
import { playAudioFx } from '../ui/AudioEngine';

interface SkillsSectionProps {
  profile: PersonalProfile;
}

const SpotlightQuadrantCard: React.FC<{
  category: PersonalProfile['skills'][number];
  idx: number;
}> = ({ category, idx }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const getEngineeringIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Flame className="w-5 h-5 text-[#ff7a1a]" />;
      case 1:
        return <Cpu className="w-5 h-5 text-[#c9a227]" />;
      case 2:
        return <Compass className="w-5 h-5 text-[#ffaa33]" />;
      case 3:
        return <Shield className="w-5 h-5 text-[#a01d12]" />;
      default:
        return <Shield className="w-5 h-5 text-[#c9a227]" />;
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => playAudioFx('click')}
      className="bg-[#171310]/95 border-2 border-[#8b5a2b]/70 hover:border-[#ffd56b] hover:shadow-[0_0_35px_rgba(201,162,39,0.3)] transition-all duration-300 rounded-xl p-6 sm:p-8 shadow-[0_15px_35px_rgba(0,0,0,0.85)] relative group overflow-hidden backdrop-blur-xl"
    >
      {/* Specular Mouse-Reactive Spotlight Overlay */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 213, 107, 0.16), transparent 75%)`,
        }}
      />

      {/* Category Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#c9a227]/30 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#0b0906] border border-[#c9a227]/50 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform">
            {getEngineeringIcon(idx)}
          </div>
          <div>
            <h3 className="text-xl sm:text-2xl font-pirate text-[#d8c49a] group-hover:text-[#ffd56b] transition-colors leading-tight">
              {category.category}
            </h3>
            <span className="text-[11px] font-cinzel text-[#b39b6d] tracking-wider uppercase block">
              {category.themeLabel}
            </span>
          </div>
        </div>

        <span className="text-[10px] font-cinzel text-[#ffd56b] bg-[#a01d12]/40 border border-[#a01d12] px-3 py-1 rounded-full uppercase tracking-wider font-semibold">
          Production Core
        </span>
      </div>

      <p className="text-xs text-[#e8dcc0]/75 font-fell italic mb-6 leading-relaxed relative z-10">
        "{category.lore}"
      </p>

      {/* Individual Skill Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
        {category.skills.map((skill) => (
          <div
            key={skill.name}
            className="p-3.5 rounded-lg bg-[#0b0906]/85 border border-[#8b5a2b]/60 hover:border-[#ffd56b] transition-all flex flex-col justify-between group/skill hover:-translate-y-0.5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-xs font-cinzel font-bold text-[#e8dcc0] group-hover/skill:text-[#ffd56b] transition-colors flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff7a1a]" />
                {skill.name}
              </span>
            </div>
            
            <div className="flex items-center justify-between text-[10px] text-[#b39b6d] font-cinzel pt-1.5 border-t border-[#8b5a2b]/30">
              <span className="uppercase tracking-wider">{skill.category}</span>
              <span className="text-emerald-400 flex items-center gap-1 font-mono">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Verified Stack
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SkillsSection: React.FC<SkillsSectionProps> = ({ profile }) => {
  return (
    <section id="armory" className="min-h-screen py-24 px-4 max-w-7xl mx-auto relative z-10">
      <SectionBanner
        number="PORT II"
        title="Technical Stack & Engineering Armory"
        subtitle="Battle-hardened software engineering disciplines: High-concurrency backends, distributed systems, and real-time 3D web"
      />

      {/* 4 Core Engineering Quadrants */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        {profile.skills.map((category, idx) => (
          <SpotlightQuadrantCard key={category.category} category={category} idx={idx} />
        ))}
      </div>
    </section>
  );
};
