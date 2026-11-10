import React, { useState } from 'react';
import type { PersonalProfile } from '../../data/personalConfig';
import { SectionBanner } from '../ui/SectionBanner';
import { Compass, Cpu, Server, Shield, CheckCircle2, Layers } from 'lucide-react';
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
        return <Compass className="w-5 h-5 text-[#dfbe7a]" />;
      case 1:
        return <Cpu className="w-5 h-5 text-[#dfbe7a]" />;
      case 2:
        return <Server className="w-5 h-5 text-[#dfbe7a]" />;
      case 3:
        return <Shield className="w-5 h-5 text-[#dfbe7a]" />;
      default:
        return <Layers className="w-5 h-5 text-[#dfbe7a]" />;
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
      data-cursor="ARMORY"
      className="rounded-2xl p-6 sm:p-8 border border-[#c5a059]/20 hover:border-[#dfbe7a] transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative group overflow-hidden backdrop-blur-xl bg-[#0a1018]/90"
    >
      {/* Specular Mouse-Reactive Spotlight Overlay */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(223, 190, 122, 0.14), transparent 75%)`,
        }}
      />

      {/* Quadrant Category Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#c5a059]/15 relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#05080c] border border-[#c5a059]/40 flex items-center justify-center shadow-inner group-hover:scale-105 group-hover:border-[#dfbe7a] transition-all">
            {getEngineeringIcon(idx)}
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-heading font-bold text-[#f1f5f9] group-hover:text-[#dfbe7a] transition-colors leading-tight">
              {category.category}
            </h3>
            <span className="text-[10px] font-mono text-[#94a3b8] tracking-widest uppercase block mt-0.5">
              {category.themeLabel}
            </span>
          </div>
        </div>

        <span className="text-[10px] font-mono text-[#dfbe7a] bg-[#dfbe7a]/10 border border-[#dfbe7a]/30 px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold">
          Core Engine
        </span>
      </div>

      <p className="text-xs text-[#94a3b8] font-sans mb-6 leading-relaxed relative z-10 font-light">
        "{category.lore}"
      </p>

      {/* Individual Skill Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
        {category.skills.map((skill) => (
          <div
            key={skill.name}
            className="p-3.5 rounded-xl bg-[#05080c]/80 border border-white/5 hover:border-[#dfbe7a]/50 transition-all flex flex-col justify-between group/skill hover:-translate-y-0.5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-xs font-heading font-bold text-[#f1f5f9] group-hover/skill:text-[#dfbe7a] transition-colors flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#dfbe7a]" />
                {skill.name}
              </span>
              <span className="text-[10px] font-mono text-[#dfbe7a] font-bold">{skill.level}%</span>
            </div>

            {/* Proficiency progress bar with glowing tip */}
            <div className="w-full h-1.5 bg-[#141f2e] rounded-full overflow-hidden my-1.5 relative">
              <div
                className="h-full bg-gradient-to-r from-[#c5a059] to-[#dfbe7a] rounded-full transition-all duration-1000"
                style={{ width: `${skill.level}%` }}
              />
            </div>
            
            <div className="flex items-center justify-between text-[10px] text-[#64748b] font-mono pt-1">
              <span className="uppercase tracking-wider">{skill.category}</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Verified
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const SkillsSection: React.FC<SkillsSectionProps> = ({ profile }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Development', 'Cybersecurity', 'Tools & Cloud', 'Leadership'];

  const filteredCategories = activeCategory === 'All'
    ? profile.skills
    : profile.skills.filter((cat) => {
        const needle = activeCategory.toLowerCase().split(' ')[0];
        return cat.category.toLowerCase().includes(needle);
      });

  return (
    <section id="skills" data-alias="armory" className="min-h-screen py-24 px-4 max-w-7xl mx-auto relative z-10">
      {/* Anchor helper for legacy #armory links */}
      <div id="armory" className="absolute -top-16 left-0 pointer-events-none" />
      <SectionBanner
        number="CHRONICLE II"
        title="Technical Skills & Proficiencies"
        subtitle="Core proficiencies across Software Development, Cybersecurity, Cloud Infrastructure, and Community Leadership"
      />

      {/* Armory Category Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-6 mb-10">
        {categories.map((c) => {
          const isActive = activeCategory === c;
          return (
            <button
              key={c}
              onClick={() => {
                playAudioFx('click');
                setActiveCategory(c);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#c5a059] to-[#dfbe7a] text-[#05080c] font-bold shadow-[0_0_15px_rgba(223,190,122,0.4)]'
                  : 'bg-[#0e1622] text-[#94a3b8] border border-[#c5a059]/25 hover:border-[#dfbe7a] hover:text-[#f1f5f9]'
              }`}
            >
              {c === 'All' ? 'Complete Armory' : c}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {filteredCategories.map((cat, idx) => (
          <SpotlightQuadrantCard key={cat.category} category={cat} idx={idx} />
        ))}
      </div>
    </section>
  );
};
