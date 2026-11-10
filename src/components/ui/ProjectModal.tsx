import React from 'react';
import { createPortal } from 'react-dom';
import type { PersonalProfile } from '../../data/personalConfig';
import { ExternalLink, X, Code2, Sparkles, CheckCircle2, Layers, AlertCircle, Wrench, TrendingUp } from 'lucide-react';

export type PersonalProject = PersonalProfile['projects'][number];

interface ProjectModalProps {
  project: PersonalProject | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/85 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-2xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0a1018] text-slate-900 dark:text-white animate-scaleUp max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            onClose();
          }}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-[#05080c] border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white flex items-center justify-center cursor-pointer transition-all z-20"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Project Classification Badge */}
        <div className="flex flex-wrap items-center gap-2.5 mb-3">
          <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-[11px] font-mono font-bold tracking-wider rounded-full border border-slate-200 dark:border-slate-700 uppercase">
            {project.type}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
            {project.projectCode || project.islandCode}
          </span>
        </div>

        {/* Title & Tagline: Space Grotesk Medium 500 */}
        <h3 className="text-2xl sm:text-3xl font-heading font-medium text-slate-900 dark:text-white mb-1.5 leading-tight tracking-[-0.02em]">
          {project.title}
        </h3>
        <p className="text-xs sm:text-sm font-sans font-normal text-slate-600 dark:text-slate-400 mb-5">
          "{project.tagline}"
        </p>

        {/* Architecture & Scope Description */}
        <div className="p-4 sm:p-5 bg-slate-50 dark:bg-[#05080c]/80 rounded-xl border-l-2 border-slate-900 dark:border-sky-400 border-y border-r border-slate-200 dark:border-slate-800 mb-6">
          <p className="text-sm text-slate-700 dark:text-slate-300 font-sans font-normal leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* 4 Core Pillars: Problem, Contribution, Tools Used, Outcome */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
          {project.problem && (
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#05080c]/60 border border-slate-200 dark:border-slate-800">
              <div className="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                The Problem
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans leading-relaxed font-normal">
                {project.problem}
              </p>
            </div>
          )}

          {project.contribution && (
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#05080c]/60 border border-slate-200 dark:border-slate-800">
              <div className="text-[10px] font-mono font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5" />
                My Contribution
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans leading-relaxed font-normal">
                {project.contribution}
              </p>
            </div>
          )}

          {project.outcome && (
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#05080c]/60 border border-slate-200 dark:border-slate-800 sm:col-span-2">
              <div className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5" />
                Outcome & Quantifiable Impact
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-sans leading-relaxed font-normal">
                {project.outcome}
              </p>
            </div>
          )}
        </div>

        {/* Key Architectural Deliverables */}
        <div className="mb-6 space-y-2.5">
          <h4 className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-600 dark:text-sky-400" />
            Key Engineering Deliverables:
          </h4>
          <div className="space-y-2">
            {project.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs font-sans text-slate-700 dark:text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mt-0.5 shrink-0" />
                <span>{h}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Badges */}
        <div className="mb-6">
          <h4 className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-2.5 flex items-center gap-2">
            <Layers className="w-4 h-4 text-slate-700 dark:text-sky-400" />
            Technology Stack & Tools:
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-slate-100 dark:bg-[#05080c] text-slate-800 dark:text-slate-300 text-[11px] font-mono rounded-lg border border-slate-200 dark:border-slate-800"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Footer: Live Metrics & GitHub Action Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-slate-200 dark:border-slate-800">
          <div className="text-xs font-mono text-slate-700 dark:text-sky-400 flex items-center gap-2 font-semibold">
            <Layers className="w-3.5 h-3.5 text-slate-500" />
            <span>{project.metrics}</span>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#05080c] dark:hover:bg-[#141f2e] text-slate-800 dark:text-white border border-slate-200 dark:border-slate-800 text-xs font-mono font-semibold transition-all shadow-sm"
            >
              <Code2 className="w-4 h-4" />
              Source Code
            </a>

            {project.demoUrl && project.demoUrl !== '#' && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:hover:bg-slate-100 dark:text-slate-950 text-xs font-mono font-bold uppercase transition-all shadow-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Live Link
              </a>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
