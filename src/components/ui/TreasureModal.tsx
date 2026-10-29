import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import confetti from 'canvas-confetti';
import type { PersonalProfile } from '../../data/personalConfig';
import { ExternalLink, X, Code2, Sparkles, CheckCircle2, Layers } from 'lucide-react';
import { playAudioFx } from './AudioEngine';

export type PersonalProject = PersonalProfile['projects'][number];

interface TreasureModalProps {
  project: PersonalProject | null;
  onClose: () => void;
}

export const TreasureModal: React.FC<TreasureModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (project) {
      try {
        confetti({
          particleCount: 45,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#c9a227', '#ff7a1a', '#a01d12', '#e8dcc0'],
        });
        playAudioFx('seal');
      } catch {
        // Safe fallback
      }
    }
  }, [project]);

  if (!project) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl parchment-card clip-torn-paper p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95)] border-2 border-[#c9a227] animate-scaleUp max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button Wax Seal */}
        <button
          onClick={() => {
            playAudioFx('click');
            onClose();
          }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full wax-seal flex items-center justify-center text-[#e8dcc0] hover:text-white cursor-pointer z-20"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Project Classification Badge */}
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <span className="px-3 py-0.5 bg-[#a01d12] text-[#d8c49a] text-xs font-bold font-cinzel tracking-wider rounded border border-[#c9a227]">
            {project.type}
          </span>
          <span className="text-xs text-[#523d24] font-cinzel font-semibold">
            {project.islandCode}
          </span>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-2xl md:text-3xl font-pirate text-[#a01d12] mb-1">
          {project.title}
        </h3>
        <p className="text-xs font-cinzel text-[#8b5a2b] italic mb-4">
          "{project.tagline}"
        </p>

        {/* Architecture & Scope Description */}
        <div className="p-4 bg-[#bfa97c]/25 rounded border-l-4 border-[#a01d12] mb-5">
          <p className="text-sm text-[#26190f] font-fell leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Key Architectural Deliverables */}
        <div className="mb-5 space-y-2">
          <h4 className="text-xs font-cinzel font-bold text-[#171310] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#a01d12]" /> Key Production Deliverables:
          </h4>
          {project.highlights.map((h, i) => (
            <div key={i} className="flex items-start gap-2 text-xs font-fell text-[#2d1f14]">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#a01d12] mt-0.5 shrink-0" />
              <span>{h}</span>
            </div>
          ))}
        </div>

        {/* Tech Stack Medallions */}
        <div className="mb-6">
          <h4 className="text-xs font-cinzel font-bold text-[#171310] uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-[#a01d12]" /> Technology Stack & Infrastructure:
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs font-cinzel bg-[#281a0e] text-[#e8dcc0] rounded border border-[#c9a227]/40 shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#8b5a2b]/30">
          <div className="text-xs font-cinzel text-[#523d24]">
            System Benchmark: <span className="font-bold text-[#a01d12]">{project.metrics}</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => playAudioFx('click')}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#171310] text-[#c9a227] hover:text-white border border-[#c9a227] rounded text-xs font-cinzel font-bold tracking-wider uppercase transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live System
            </a>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => playAudioFx('click')}
              className="flex items-center gap-1.5 px-5 py-2 wax-seal text-[#e8dcc0] hover:text-white rounded text-xs font-cinzel font-bold tracking-wider uppercase transition-all shadow-md hover:shadow-[0_0_15px_#ff7a1a]"
            >
              <Code2 className="w-3.5 h-3.5" />
              Source Code
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
