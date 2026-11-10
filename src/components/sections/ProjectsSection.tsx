import React, { useState } from 'react';
import type { PersonalProfile } from '../../data/personalConfig';
import { SectionBanner } from '../ui/SectionBanner';
import { TreasureModal, type PersonalProject } from '../ui/TreasureModal';
import { Compass, Sparkles, MapPin, Layers, ArrowUpRight, GitBranch, AlertCircle, Wrench, TrendingUp } from 'lucide-react';
import { playAudioFx } from '../ui/AudioEngine';

interface ProjectsSectionProps {
  profile: PersonalProfile;
}

const SpotlightProjectCard: React.FC<{
  proj: PersonalProject;
  onOpen: (proj: PersonalProject) => void;
  getBadgeColor: (type: string) => string;
}> = ({ proj, onOpen, getBadgeColor }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const tools = proj.toolsUsed || proj.techStack;

  return (
    <div
      onMouseMove={handleMouseMove}
      onClick={() => onOpen(proj)}
      data-cursor="BLUEPRINT"
      className="group cursor-pointer rounded-2xl p-6 sm:p-8 border border-[#c5a059]/20 hover:border-[#dfbe7a] transition-all duration-300 hover:-translate-y-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative overflow-hidden backdrop-blur-xl flex flex-col justify-between bg-[#0a1018]/90"
    >
      {/* Specular Mouse-Reactive Spotlight Flare */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(223, 190, 122, 0.14), transparent 75%)`,
        }}
      />

      {/* Watermark Compass Silhouette with smooth spin */}
      <div className="absolute -right-6 -bottom-6 w-36 h-36 opacity-5 text-[#dfbe7a] pointer-events-none group-hover:rotate-45 transition-transform duration-700">
        <Compass className="w-full h-full" />
      </div>

      <div className="relative z-10">
        {/* Expedition Code & Category Tag */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-1.5 text-xs font-mono text-[#dfbe7a]">
            <MapPin className="w-3.5 h-3.5 text-[#dfbe7a]" />
            <span className="font-semibold tracking-wider">{proj.islandCode}</span>
          </div>

          <span
            className={`px-3 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border ${getBadgeColor(
              proj.type
            )}`}
          >
            {proj.type}
          </span>
        </div>

        {/* Project Title: Space Grotesk Medium 500 */}
        <h3 className="text-xl sm:text-2xl font-heading font-medium text-[#f1f5f9] group-hover:text-[#dfbe7a] transition-colors mb-1.5 leading-tight flex items-center justify-between tracking-[-0.02em]">
          <span>{proj.title}</span>
          <ArrowUpRight className="w-4 h-4 text-[#94a3b8] group-hover:text-[#dfbe7a] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </h3>

        <p className="text-xs font-sans text-[#dfbe7a] font-normal mb-4">
          "{proj.tagline}"
        </p>

        {/* Structured 4-Field Architecture Dossier (Problem, Contribution, Tools, Outcome) */}
        <div className="space-y-3.5 mb-5 text-xs font-sans font-normal">
          {/* 1. Problem */}
          {proj.problem && (
            <div className="p-3 rounded-xl bg-[#05080c]/80 border border-white/5 space-y-1">
              <div className="flex items-center gap-1.5 font-mono font-bold text-rose-400 text-[10px] uppercase tracking-wider">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                Problem
              </div>
              <p className="text-[#94a3b8] font-normal leading-relaxed pl-5">
                {proj.problem}
              </p>
            </div>
          )}

          {/* 2. My Contribution */}
          {proj.contribution && (
            <div className="p-3 rounded-xl bg-[#05080c]/80 border border-[#dfbe7a]/15 space-y-1">
              <div className="flex items-center gap-1.5 font-mono font-bold text-[#dfbe7a] text-[10px] uppercase tracking-wider">
                <Wrench className="w-3.5 h-3.5 shrink-0" />
                My Contribution
              </div>
              <p className="text-[#cbd5e1] font-normal leading-relaxed pl-5">
                {proj.contribution}
              </p>
            </div>
          )}

          {/* 3. Outcome */}
          {proj.outcome && (
            <div className="p-3 rounded-xl bg-[#05080c]/80 border border-emerald-500/15 space-y-1">
              <div className="flex items-center gap-1.5 font-mono font-bold text-emerald-400 text-[10px] uppercase tracking-wider">
                <TrendingUp className="w-3.5 h-3.5 shrink-0" />
                Outcome & Impact
              </div>
              <p className="text-[#cbd5e1] font-normal leading-relaxed pl-5">
                {proj.outcome}
              </p>
            </div>
          )}
        </div>

        {/* 4. Tools Used Badges: Space Mono Uppercase */}
        <div className="space-y-1.5 mb-5">
          <div className="text-[10px] font-mono text-[#94a3b8] uppercase tracking-wider font-bold">
            Tools Used:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tools.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-0.5 bg-[#05080c] text-[#cbd5e1] text-[10px] font-mono uppercase tracking-wider rounded-md border border-white/10 group-hover:border-[#dfbe7a]/40 transition-colors shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer: Metrics & Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-[#c5a059]/15 relative z-10 gap-3">
        <div className="text-[11px] font-mono text-[#94a3b8] flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-[#dfbe7a]" />
          <span className="text-[#dfbe7a] font-semibold">{proj.metrics}</span>
        </div>

        <div className="flex items-center gap-2">
          {proj.githubUrl && (
            <a
              href={proj.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                playAudioFx('seal');
              }}
              title="View Repository"
              className="p-1.5 rounded-lg bg-[#05080c] text-[#94a3b8] hover:text-[#dfbe7a] border border-white/10 hover:border-[#dfbe7a]/40 transition-all cursor-pointer"
            >
              <GitBranch className="w-3.5 h-3.5" />
            </a>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpen(proj);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#05080c] hover:bg-[#dfbe7a] text-[#dfbe7a] hover:text-[#05080c] text-xs font-heading font-bold rounded-lg border border-[#dfbe7a]/40 transition-all shadow-sm cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Inspect Blueprint
          </button>
        </div>
      </div>
    </div>
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ profile }) => {
  const [selectedProject, setSelectedProject] = useState<PersonalProject | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const filterTabs = ['All', ...Array.from(new Set(profile.projects.map((p) => p.type)))];

  const filteredProjects = filter === 'All'
    ? profile.projects
    : profile.projects.filter((p) => p.type === filter);

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'Full-Stack SaaS':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case '3D & AI':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Distributed System':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Cyber Security':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
      default:
        return 'bg-slate-500/10 text-slate-300 border-slate-500/30';
    }
  };

  const handleOpenModal = (proj: PersonalProject) => {
    playAudioFx('seal');
    setSelectedProject(proj);
  };

  return (
    <section id="projects" data-alias="voyages" className="min-h-screen py-24 px-4 max-w-7xl mx-auto relative z-10">
      {/* Anchor helper for legacy #voyages links */}
      <div id="voyages" className="absolute -top-16 left-0 pointer-events-none" />

      <SectionBanner
        number="CHRONICLE IV"
        title="Featured Work & Production Expeditions"
        subtitle="Every project documented with Problem, Contribution, Tools Used, and Measurable Outcome"
      />

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-8 mb-10">
        {filterTabs.map((tab) => {
          const isActive = filter === tab;
          const count = tab === 'All'
            ? profile.projects.length
            : profile.projects.filter((p) => p.type === tab).length;

          return (
            <button
              key={tab}
              onClick={() => {
                playAudioFx('click');
                setFilter(tab);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#c5a059] to-[#dfbe7a] text-[#05080c] font-bold shadow-[0_0_20px_rgba(223,190,122,0.4)]'
                  : 'bg-[#0e1622] text-[#94a3b8] border border-[#c5a059]/25 hover:border-[#dfbe7a] hover:text-[#f1f5f9]'
              }`}
            >
              {tab === 'All' ? `All Projects (${count})` : `${tab} (${count})`}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8">
        {filteredProjects.map((proj) => (
          <SpotlightProjectCard
            key={proj.id}
            proj={proj}
            onOpen={handleOpenModal}
            getBadgeColor={getBadgeColor}
          />
        ))}
      </div>

      {/* Blueprint Detail Modal */}
      <TreasureModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
