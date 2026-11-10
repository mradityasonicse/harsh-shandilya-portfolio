import React, { useState } from 'react';
import type { PersonalProfile } from '../../data/personalConfig';
import { SectionBanner } from '../ui/SectionBanner';
import { Code, Cpu, Server, Shield, CheckCircle2, Layers } from 'lucide-react';

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
        return <Code className="w-5 h-5 text-slate-800 dark:text-sky-400" />;
      case 1:
        return <Cpu className="w-5 h-5 text-slate-800 dark:text-sky-400" />;
      case 2:
        return <Server className="w-5 h-5 text-slate-800 dark:text-sky-400" />;
      case 3:
        return <Shield className="w-5 h-5 text-slate-800 dark:text-sky-400" />;
      default:
        return <Layers className="w-5 h-5 text-slate-800 dark:text-sky-400" />;
    }
  };

  const getQuadrantBadge = (index: number) => {
    switch (index) {
      case 0:
        return 'Algorithms & Core';
      case 1:
        return 'Defense & Pentesting';
      case 2:
        return 'Infra & Databases';
      case 3:
        return 'Advocacy & Events';
      default:
        return 'Technical Core';
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="rounded-2xl p-6 sm:p-8 border border-[#173f32]/12 dark:border-[#faf8f1]/10 hover:border-[#173f32]/35 dark:hover:border-[#34d399]/40 transition-all duration-300 shadow-xs relative group overflow-hidden backdrop-blur-xl bg-white/95 dark:bg-[#0e241c]/90"
    >
      {/* Specular Mouse-Reactive Spotlight Overlay */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(23, 63, 50, 0.06), transparent 75%)`,
        }}
      />

      {/* Quadrant Category Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#173f32]/12 dark:border-[#faf8f1]/10 relative z-10">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-[#f5f2e8] dark:bg-[#071510] border border-[#173f32]/12 dark:border-[#faf8f1]/10 flex items-center justify-center shadow-xs group-hover:border-[#173f32]/30 transition-all">
            {getEngineeringIcon(idx)}
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#173f32] dark:text-[#faf8f1] transition-colors leading-tight">
              {category.category}
            </h3>
            <span className="text-xs font-semibold text-emerald-700 dark:text-[#34d399] tracking-wider uppercase block mt-0.5">
              {category.themeLabel}
            </span>
          </div>
        </div>

        <span className="text-xs font-mono text-[#173f32] dark:text-[#34d399] bg-[#f5f2e8] dark:bg-[#071510] border border-[#173f32]/14 dark:border-[#faf8f1]/10 px-3 py-1 rounded-full uppercase tracking-wider font-bold">
          {getQuadrantBadge(idx)}
        </span>
      </div>

      <p className="text-sm sm:text-base text-[#284e40] dark:text-[#c2dfd4] font-sans mb-5 leading-relaxed relative z-10 font-normal">
        {category.focus || category.lore}
      </p>

      {/* Individual Skill Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 relative z-10">
        {category.skills.map((skill) => (
          <div
            key={skill.name}
            className="p-3.5 rounded-xl bg-[#f5f2e8]/70 dark:bg-[#071510]/80 border border-[#173f32]/10 dark:border-white/5 hover:border-[#173f32]/30 dark:hover:border-slate-700 transition-all flex flex-col justify-between group/skill hover:-translate-y-0.5 shadow-xs"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <span className="text-xs sm:text-sm font-bold text-[#173f32] dark:text-[#faf8f1] transition-colors flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                {skill.name}
              </span>
              <span className="text-xs font-mono text-[#284e40] dark:text-[#c2dfd4] font-bold">{skill.level}%</span>
            </div>

            {/* Proficiency progress bar */}
            <div className="w-full h-1.5 bg-[#e5dfd3] dark:bg-[#071510] rounded-full overflow-hidden my-1.5 relative border border-[#173f32]/10 dark:border-slate-700">
              <div
                className="h-full bg-[#173f32] dark:bg-[#34d399] rounded-full transition-all duration-1000"
                style={{ width: `${skill.level}%` }}
              />
            </div>
            
            <div className="flex items-center justify-between text-[10px] text-[#4a685b] dark:text-[#a0c2b5] font-mono pt-1">
              <span className="uppercase tracking-wider">{skill.category}</span>
              <span className="text-[#173f32] dark:text-[#c2dfd4] flex items-center gap-1 font-semibold">
                <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
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

  const categories = ['All', ...profile.skills.map((s) => s.category)];

  const filteredCategories =
    activeCategory === 'All'
      ? profile.skills
      : profile.skills.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <SectionBanner
        number="02 // SKILLS"
        title="Technical Skills & Proficiencies"
        subtitle="Core proficiencies across Software Development, Cybersecurity, Cloud Infrastructure, and Community Leadership"
      />

      {/* Category Filters: Clean NYC Pill Architecture */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-2 sm:mt-3 mb-6 sm:mb-8">
        {categories.map((c) => {
          const isActive = activeCategory === c;
          return (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-tight transition-all duration-300 cursor-pointer active:scale-95 ${
                isActive
                  ? 'bg-[#173f32] text-[#faf8f1] dark:bg-[#faf8f1] dark:text-[#071510] shadow-sm -translate-y-0.5'
                  : 'bg-white/90 dark:bg-[#0e241c] text-[#173f32] dark:text-[#faf8f1] border border-[#173f32]/20 dark:border-[#faf8f1]/15 hover:border-[#173f32] hover:bg-white'
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      {/* 4 Quadrants Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredCategories.map((cat, idx) => (
          <SpotlightQuadrantCard key={cat.category} category={cat} idx={idx} />
        ))}
      </div>
    </section>
  );
};
