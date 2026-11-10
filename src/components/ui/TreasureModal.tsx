import React from 'react';
import { createPortal } from 'react-dom';
import type { PersonalProfile } from '../../data/personalConfig';
import { ExternalLink, X, Code2, Sparkles, CheckCircle2, Layers } from 'lucide-react';
import { playAudioFx } from './AudioEngine';

export type PersonalProject = PersonalProfile['projects'][number];

interface TreasureModalProps {
  project: PersonalProject | null;
  onClose: () => void;
}

export const TreasureModal: React.FC<TreasureModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl nautical-card rounded-2xl p-6 sm:p-8 shadow-[0_25px_70px_rgba(0,0,0,0.95)] border border-[#c5a059]/40 animate-scaleUp max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            playAudioFx('click');
            onClose();
          }}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#05080c] border border-[#c5a059]/30 hover:border-[#dfbe7a] text-[#94a3b8] hover:text-[#dfbe7a] flex items-center justify-center cursor-pointer transition-all z-20"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Project Classification Badge */}
        <div className="flex flex-wrap items-center gap-2.5 mb-3">
          <span className="px-3 py-1 bg-[#dfbe7a]/15 text-[#dfbe7a] text-[11px] font-mono font-bold tracking-wider rounded-full border border-[#dfbe7a]/30 uppercase">
            {project.type}
          </span>
          <span className="text-xs text-[#94a3b8] font-mono">
            {project.islandCode}
          </span>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#f1f5f9] mb-1.5 leading-tight">
          {project.title}
        </h3>
        <p className="text-xs sm:text-sm font-sans text-[#dfbe7a] mb-5">
          "{project.tagline}"
        </p>

        {/* Architecture & Scope Description */}
        <div className="p-4 sm:p-5 bg-[#05080c]/80 rounded-xl border-l-2 border-[#dfbe7a] border-y border-r border-white/5 mb-6">
          <p className="text-xs sm:text-sm text-[#cbd5e1] font-sans leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* 4 Core Pillars: Problem, Contribution, Tools Used, Outcome */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
          {project.problem && (
            <div className="p-3.5 rounded-xl bg-[#0a1018] border border-rose-500/20">
              <div className="text-[11px] font-mono font-bold text-rose-400 uppercase tracking-wider mb-1">
                The Problem
              </div>
              <p className="text-xs text-[#94a3b8] font-sans leading-relaxed font-light">
                {project.problem}
              </p>
            </div>
          )}

          {project.contribution && (
            <div className="p-3.5 rounded-xl bg-[#0a1018] border border-[#dfbe7a]/25">
              <div className="text-[11px] font-mono font-bold text-[#dfbe7a] uppercase tracking-wider mb-1">
                My Contribution
              </div>
              <p className="text-xs text-[#cbd5e1] font-sans leading-relaxed font-light">
                {project.contribution}
              </p>
            </div>
          )}

          {project.outcome && (
            <div className="p-3.5 rounded-xl bg-[#0a1018] border border-emerald-500/20 sm:col-span-2">
              <div className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider mb-1">
                Outcome & Quantifiable Impact
              </div>
              <p className="text-xs text-[#cbd5e1] font-sans leading-relaxed font-light">
                {project.outcome}
              </p>
            </div>
          )}
        </div>

        {/* Key Architectural Deliverables */}
        <div className="mb-6 space-y-2.5">
          <h4 className="text-xs font-mono font-bold text-[#dfbe7a] uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#dfbe7a]" />
            Key Production Deliverables & Benchmarks:
          </h4>
          <div className="space-y-2">
            {project.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs font-sans text-[#94a3b8]">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Medallions */}
        <div className="mb-6">
          <h4 className="text-xs font-mono font-bold text-[#dfbe7a] uppercase tracking-wider mb-2.5 flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#dfbe7a]" />
            Technology Stack & Tools:
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-[#05080c] text-[#cbd5e1] text-[11px] font-mono rounded-lg border border-white/10"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Footer: Live Metrics & GitHub Action Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-[#c5a059]/15">
          <div className="text-xs font-mono text-[#dfbe7a] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{project.metrics}</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#05080c] hover:bg-[#141f2e] text-[#f1f5f9] hover:text-[#dfbe7a] border border-white/10 hover:border-[#dfbe7a]/50 text-xs font-mono font-semibold transition-all"
            >
              <Code2 className="w-4 h-4" />
              Source Code
            </a>

            {project.demoUrl && project.demoUrl !== '#' && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl brass-btn text-xs font-heading font-bold"
              >
                <ExternalLink className="w-4 h-4" />
                Live Deployment
              </a>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
