import React from 'react';
import type { PersonalProfile } from '../../data/personalConfig';
import { SectionBanner } from '../ui/SectionBanner';
import { FileText, Download, Eye, ShieldCheck, GraduationCap, Award, ExternalLink, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface ResumeSectionProps {
  profile: PersonalProfile;
  onOpenResume: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ profile, onOpenResume }) => {
  return (
    <section id="resume" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto relative z-10 flex flex-col justify-center">
      <SectionBanner
        number="05 // RESUME"
        title="Curriculum Vitae & Verified Credentials"
        subtitle="Direct access to verified academic credentials, student leadership roles, and downloadable PDF resume"
      />

      <div className="mt-6 sm:mt-8 rounded-2xl p-6 sm:p-10 border border-[var(--border-hairline)] bg-[var(--surface-card)] shadow-xs relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Left Column: Profile & Credentials Brief */}
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full p-0.5 border border-slate-200 dark:border-slate-700 shadow-xs shrink-0">
                <div className="w-full h-full rounded-full overflow-hidden bg-[var(--canvas-bg)] flex items-center justify-center">
                  <img
                    src="/profile-photo.jpg"
                    alt={profile.name}
                    className="w-full h-full object-cover object-top filter contrast-[1.05]"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/profile-photo.svg';
                    }}
                  />
                </div>
              </div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--canvas-bg)] border border-[var(--border-hairline)] text-[var(--text-primary)] text-xs font-mono font-semibold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                Verified Developer Credentials
              </div>
            </div>

            {/* Subheading (H3): Editorial Instrument Serif */}
            <h3
              className="text-2xl sm:text-3xl text-slate-950 dark:text-white leading-tight tracking-tight font-normal"
              style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
            >
              {profile.name} — {profile.role}
            </h3>

            {/* Body Text: High-Contrast */}
            <p className="text-base text-slate-800 dark:text-slate-200 font-sans font-normal leading-relaxed">
              Official curriculum vitae documenting B.Tech Computer Science (Cyber Security) studies at Rungta University, Google Student Ambassador 2026 tenure, AWS Student Builder Group leadership, and practical software projects.
            </p>

            {/* Quick-Scan Highlights from Resume */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs sm:text-sm font-sans font-medium text-slate-850 dark:text-slate-200">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>B.Tech CSE (Cyber Security)</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Google Student Ambassador '26</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>Student Builder Group Leader</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>6+ Verified Certifications</span>
              </div>
            </div>
          </div>

          {/* Right Column: Pill Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 w-full lg:w-auto shrink-0">
            {/* 1. View Resume Button */}
            <button
              onClick={() => {
                onOpenResume();
              }}
              className="nyc-btn-primary group"
            >
              <Eye className="w-4 h-4 text-emerald-300 dark:text-[#071510]" />
              <span>View Full Resume</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </button>

            {/* 2. Download Real PDF Resume Button */}
            <a
              href="/Harsh_Resume.pdf"
              download="Harsh_Kumar_Shandilya_Resume.pdf"
              className="nyc-btn-secondary group"
            >
              <Download className="w-4 h-4 text-[#173f32] dark:text-[#faf8f1]" />
              <span>Download PDF Resume</span>
            </a>
          </div>
        </div>

        {/* Bottom Metadata bar */}
        <div className="mt-8 pt-6 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[var(--text-muted)]">
          <div className="flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>Format: Verified PDF • Harsh Final Resume</span>
          </div>
          <a
            href="/Harsh_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="text-[var(--text-primary)] hover:underline flex items-center gap-1 font-semibold"
          >
            Open in new tab <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
};
