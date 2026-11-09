import React, { useState } from 'react';
import type { PersonalProfile } from '../../data/personalConfig';
import { SectionBanner } from '../ui/SectionBanner';
import { TreasureModal, type PersonalProject } from '../ui/TreasureModal';
import { Compass, Sparkles, MapPin, Layers, ArrowUpRight, GitBranch } from 'lucide-react';
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

        {/* Project Title */}
        <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#f1f5f9] group-hover:text-[#dfbe7a] transition-colors mb-1.5 leading-tight flex items-center justify-between">
          <span>{proj.title}</span>
          <ArrowUpRight className="w-4 h-4 text-[#94a3b8] group-hover:text-[#dfbe7a] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </h3>

        <p className="text-xs font-sans text-[#dfbe7a] italic mb-3.5">
          "{proj.tagline}"
        </p>

        {/* Description */}
        <p className="text-xs sm:text-sm text-[#94a3b8] font-sans leading-relaxed mb-5 line-clamp-3 font-light">
          {proj.description}
        </p>

        {/* Highlights */}
        {proj.highlights && proj.highlights.length > 0 && (
          <div className="mb-5 space-y-1 text-xs text-[#cbd5e1] font-sans font-light">
            {proj.highlights.slice(0, 2).map((h, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#dfbe7a] shrink-0" />
                <span className="truncate">{h}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack Badges */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {proj.techStack.map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 bg-[#05080c] text-[#cbd5e1] text-[10px] font-mono rounded-md border border-white/10 group-hover:border-[#dfbe7a]/40 transition-colors shadow-sm"
            >
              {tech}
            </span>
          ))}
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

  const filterTabs = ['All', 'Distributed System', '3D & AI', 'Full-Stack SaaS', 'Cyber Security'];

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
    <section id="voyages" className="min-h-screen py-24 px-4 max-w-7xl mx-auto relative z-10">
      <SectionBanner
        number="CHRONICLE III"
        title="Flagship Production Expeditions"
        subtitle="Architected codebases across distributed backend engines, 3D WebGL spatial applications, and resilient cloud systems"
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
              {tab === 'All' ? `All Expeditions (${count})` : `${tab} (${count})`}
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
