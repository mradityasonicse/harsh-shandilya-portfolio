import React, { useState } from 'react';
import type { PersonalProfile } from '../../data/personalConfig';
import { SectionBanner } from '../ui/SectionBanner';
import { TreasureModal, type PersonalProject } from '../ui/TreasureModal';
import { Compass, Sparkles, MapPin, Layers } from 'lucide-react';
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
      className="group cursor-pointer bg-[#171310]/95 border-2 border-[#8b5a2b]/70 hover:border-[#ffd56b] rounded-xl p-6 sm:p-8 shadow-[0_15px_45px_rgba(0,0,0,0.9)] transition-all duration-300 hover:-translate-y-2 relative overflow-hidden backdrop-blur-xl"
    >
      {/* Specular Mouse-Reactive Spotlight Flare */}
      <div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 213, 107, 0.16), transparent 75%)`,
        }}
      />

      {/* Watermark Compass background */}
      <div className="absolute -right-8 -bottom-8 w-40 h-40 opacity-5 text-[#c9a227] pointer-events-none group-hover:rotate-45 transition-transform duration-700">
        <Compass className="w-full h-full" />
      </div>

      {/* Island Pin & Category Header */}
      <div className="flex items-center justify-between gap-2 mb-3 relative z-10">
        <div className="flex items-center gap-1.5 text-xs font-cinzel text-[#ffd56b]">
          <MapPin className="w-4 h-4 text-[#ff7a1a]" />
          <span className="font-bold tracking-wider">{proj.islandCode}</span>
        </div>

        <span
          className={`px-3 py-0.5 rounded-full text-[10px] font-cinzel font-bold tracking-wider uppercase border ${getBadgeColor(
            proj.type
          )}`}
        >
          {proj.type}
        </span>
      </div>

      {/* Project Title */}
      <h3 className="text-2xl sm:text-3xl font-pirate text-[#d8c49a] group-hover:text-[#ffd56b] transition-colors mb-1.5 relative z-10 leading-tight">
        {proj.title}
      </h3>

      <p className="text-xs font-cinzel text-[#b39b6d] italic mb-4 relative z-10">
        "{proj.tagline}"
      </p>

      {/* Description */}
      <p className="text-xs sm:text-sm text-[#e8dcc0]/85 font-fell leading-relaxed mb-5 line-clamp-3 relative z-10">
        {proj.description}
      </p>

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-1.5 mb-6 relative z-10">
        {proj.techStack.map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-1 bg-[#0b0906] text-[#e8dcc0] text-[10px] font-cinzel rounded-md border border-[#8b5a2b]/50 group-hover:border-[#c9a227]/60 transition-colors shadow-sm"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Card Footer: Metrics & Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-[#8b5a2b]/40 relative z-10">
        <div className="text-[11px] font-cinzel text-[#b39b6d] flex items-center gap-1.5">
          <Layers className="w-4 h-4 text-[#ff7a1a]" />
          <span className="text-[#ffd56b] font-bold font-mono">{proj.metrics}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpen(proj);
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#a01d12] hover:bg-[#ff7a1a] text-[#d8c49a] hover:text-[#0b0906] text-xs font-cinzel font-bold rounded transition-all shadow-sm group-hover:shadow-[0_0_15px_#ff7a1a] cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" /> Inspect Scope
          </button>
        </div>
      </div>
    </div>
  );
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ profile }) => {
  const [selectedProject, setSelectedProject] = useState<PersonalProject | null>(null);

  const handleOpenProject = (proj: PersonalProject) => {
    playAudioFx('seal');
    setSelectedProject(proj);
  };

  const getBadgeColor = (type: string) => {
    switch (type) {
      case 'Distributed System':
        return 'bg-[#a01d12]/40 text-[#ffeb99] border-[#c9a227]';
      case '3D & AI':
        return 'bg-[#4a0e4e]/40 text-[#f3c5ff] border-[#b042b5]';
      case 'Full-Stack SaaS':
        return 'bg-[#0f2e24]/40 text-[#a7f3d0] border-[#10b981]';
      default:
        return 'bg-[#1e293b]/40 text-[#cbd5e1] border-[#64748b]';
    }
  };

  return (
    <section id="voyages" className="min-h-screen py-24 px-4 max-w-7xl mx-auto relative z-10">
      <SectionBanner
        number="PORT III"
        title="Featured Engineering Projects & Systems"
        subtitle="Flagship production codebases, distributed architectures, and interactive spatial applications"
      />

      {/* Caribbean Nautical Chart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
        {profile.projects.map((proj) => (
          <SpotlightProjectCard
            key={proj.id}
            proj={proj}
            onOpen={handleOpenProject}
            getBadgeColor={getBadgeColor}
          />
        ))}
      </div>

      {/* Interactive Loot Modal */}
      <TreasureModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
};
