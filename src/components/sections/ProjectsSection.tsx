import React, { useState } from 'react';
import type { PersonalProfile } from '../../data/personalConfig';
import { SectionBanner } from '../ui/SectionBanner';
import { ProjectModal, type PersonalProject } from '../ui/ProjectModal';
import { Layers, ArrowUpRight, GitBranch, AlertCircle, Wrench, TrendingUp, Code2 } from 'lucide-react';

interface ProjectsSectionProps {
  profile: PersonalProfile;
}

const SpotlightProjectCard: React.FC<{
  proj: PersonalProject;
  onOpen: (proj: PersonalProject) => void;
  getBadgeColor: (type: string) => string;
  isFeatured?: boolean;
}> = ({ proj, onOpen, getBadgeColor, isFeatured }) => {
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
      className={`group cursor-pointer rounded-2xl p-6 sm:p-8 border border-[var(--border-hairline)] hover:border-[var(--border-hover)] transition-all duration-300 hover:-translate-y-1 shadow-xs relative overflow-hidden backdrop-blur-xl flex flex-col justify-between bg-[var(--surface-card)] ${
        isFeatured ? 'md:col-span-2 lg:col-span-1' : ''
      }`}
    >
      {/* Specular Mouse-Reactive Spotlight Flare */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(23, 63, 50, 0.08), transparent 75%)`,
        }}
      />

      <div className="relative z-10">
        {/* System Identifier & Category Tag */}
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <div className="flex items-center gap-1.5 text-xs font-mono text-[var(--text-muted)]">
            <Code2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="font-semibold tracking-wider">{proj.projectCode || proj.islandCode}</span>
          </div>

          <span
            className={`px-3 py-0.5 rounded-full text-[10px] font-mono font-semibold tracking-wider uppercase border ${getBadgeColor(
              proj.type
            )}`}
          >
            {proj.type}
          </span>
        </div>

        {/* Project Title: Editorial Instrument Serif */}
        <h3
          className="text-2xl sm:text-3xl text-[#173f32] dark:text-[#faf8f1] group-hover:opacity-85 transition-opacity mb-2 leading-tight flex items-center justify-between tracking-tight font-normal"
          style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
        >
          <span>{proj.title}</span>
          <ArrowUpRight className="w-5 h-5 text-[#4a685b] group-hover:text-[#173f32] dark:group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
        </h3>

        <p className="text-sm font-sans text-[#284e40] dark:text-[#c2dfd4] font-normal mb-5 leading-relaxed">
          "{proj.tagline}"
        </p>

        {/* Structured Architecture Dossier (Problem, Contribution, Outcome) */}
        <div className="space-y-2.5 mb-5 text-xs sm:text-[13px] font-sans font-normal">
          {/* 1. Problem */}
          {proj.problem && (
            <div className="p-3.5 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/70 dark:border-rose-900/40 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-rose-800 dark:text-rose-400 text-xs uppercase tracking-wider">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                Problem
              </div>
              <p className="text-[#284e40] dark:text-[#c2dfd4] font-normal leading-relaxed pl-5">
                {proj.problem}
              </p>
            </div>
          )}

          {/* 2. My Contribution */}
          {proj.contribution && (
            <div className="p-3.5 rounded-xl bg-[#f5f2e8]/80 dark:bg-[#071510]/80 border border-[#173f32]/12 dark:border-white/10 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#173f32] dark:text-[#faf8f1] text-xs uppercase tracking-wider">
                <Wrench className="w-3.5 h-3.5 shrink-0 text-emerald-700 dark:text-emerald-400" />
                Contribution
              </div>
              <p className="text-[#284e40] dark:text-[#c2dfd4] font-normal leading-relaxed pl-5">
                {proj.contribution}
              </p>
            </div>
          )}

          {/* 3. Outcome */}
          {proj.outcome && (
            <div className="p-3.5 rounded-xl bg-[#eef6f2] dark:bg-[#0a1e16] border border-[#173f32]/15 dark:border-emerald-800/40 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-[#173f32] dark:text-[#34d399] text-xs uppercase tracking-wider">
                <TrendingUp className="w-3.5 h-3.5 shrink-0 text-emerald-700 dark:text-[#34d399]" />
                Outcome & Impact
              </div>
              <p className="text-[#284e40] dark:text-[#c2dfd4] font-normal leading-relaxed pl-5">
                {proj.outcome}
              </p>
            </div>
          )}
        </div>

        {/* Tools Used Badges */}
        <div className="space-y-2 mb-5">
          <div className="text-xs font-bold text-[#173f32] dark:text-[#faf8f1] uppercase tracking-wider">
            Stack & Tooling:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tools.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-[#f5f2e8] dark:bg-[#071510] text-[#173f32] dark:text-[#c2dfd4] text-xs font-semibold rounded-full border border-[#173f32]/12 dark:border-[#faf8f1]/10 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer: Metrics & Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-[var(--border-hairline)] relative z-10 gap-3">
        <div className="text-[11px] font-mono text-[var(--text-muted)] flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
          <span className="text-[var(--text-primary)] font-semibold">{proj.metrics}</span>
        </div>

        <div className="flex items-center gap-2">
          {proj.githubUrl && (
            <a
              href={proj.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => {
                e.stopPropagation();
              }}
              title={`View ${proj.title} on GitHub`}
              aria-label={`View source code for ${proj.title} on GitHub (opens in a new tab)`}
              className="p-2.5 rounded-full bg-white dark:bg-[#071510] text-[#173f32] dark:text-[#faf8f1] border border-[#173f32]/16 dark:border-[#faf8f1]/15 hover:border-[#173f32] hover:bg-[#f5f2e8] transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <GitBranch className="w-3.5 h-3.5" />
            </a>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpen(proj);
            }}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-[#173f32] hover:bg-[#102d24] text-[#faf8f1] dark:bg-[#faf8f1] dark:hover:bg-white dark:text-[#071510] text-xs font-semibold rounded-full shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer active:scale-95"
          >
            Inspect Details
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
      case 'Java & Algorithms':
        return 'bg-amber-500/10 text-amber-800 dark:text-amber-300 border-amber-500/20';
      case 'Frontend Engineering':
        return 'bg-sky-500/10 text-sky-800 dark:text-sky-300 border-sky-500/20';
      case 'Cybersecurity & Linux':
        return 'bg-emerald-500/10 text-emerald-800 dark:text-emerald-300 border-emerald-500/20';
      default:
        return 'bg-[var(--surface-card)] text-[var(--text-muted)] border-[var(--border-hairline)]';
    }
  };

  const handleOpenModal = (proj: PersonalProject) => {
    setSelectedProject(proj);
  };

  return (
    <section id="projects" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <SectionBanner
        number="03 // PROJECTS"
        title="Featured Work & Production Projects"
        subtitle="Every project documented with Problem, Contribution, Tools Used, and Measurable Outcome"
      />

      {/* Filter Tabs: Clean NYC Pill Architecture */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-2 sm:mt-3 mb-6 sm:mb-8">
        {filterTabs.map((tab) => {
          const isActive = filter === tab;
          const count = tab === 'All'
            ? profile.projects.length
            : profile.projects.filter((p) => p.type === tab).length;

          return (
            <button
              key={tab}
              onClick={() => {
                setFilter(tab);
              }}
              className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-tight transition-all duration-300 cursor-pointer active:scale-95 ${
                isActive
                  ? 'bg-[#173f32] text-[#faf8f1] dark:bg-[#faf8f1] dark:text-[#071510] shadow-sm -translate-y-0.5'
                  : 'bg-white/90 dark:bg-[#0e241c] text-[#173f32] dark:text-[#faf8f1] border border-[#173f32]/20 dark:border-[#faf8f1]/15 hover:border-[#173f32] hover:bg-white'
              }`}
            >
              {tab === 'All' ? `All Projects (${count})` : `${tab} (${count})`}
            </button>
          );
        })}
      </div>

      {/* Projects Grid: Asymmetric 3-column architecture */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {filteredProjects.map((proj, idx) => (
          <SpotlightProjectCard
            key={proj.id}
            proj={proj}
            onOpen={handleOpenModal}
            getBadgeColor={getBadgeColor}
            isFeatured={filteredProjects.length === 3 && idx === 2}
          />
        ))}
      </div>

      {/* Project Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
