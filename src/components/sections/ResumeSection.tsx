import React from 'react';
import type { PersonalProfile } from '../../data/personalConfig';
import { SectionBanner } from '../ui/SectionBanner';
import { FileText, Download, Eye, ShieldCheck, GraduationCap, Award, ExternalLink, CheckCircle2 } from 'lucide-react';
import { playAudioFx } from '../ui/AudioEngine';

interface ResumeSectionProps {
  profile: PersonalProfile;
  onOpenResume: () => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ profile, onOpenResume }) => {
  return (
    <section id="resume" className="min-h-[70vh] py-24 px-4 max-w-5xl mx-auto relative z-10 flex flex-col justify-center">
      <SectionBanner
        number="CHRONICLE V"
        title="Curriculum Vitae & Verified Credentials"
        subtitle="Direct access to verified academic credentials, student leadership roles, and downloadable PDF resume"
      />

      <div className="mt-12 rounded-2xl p-8 sm:p-12 border border-[#c5a059]/30 bg-gradient-to-br from-[#0a1018] via-[#05080c] to-[#0d1624] shadow-[0_25px_60px_rgba(0,0,0,0.9)] relative overflow-hidden">
        {/* Subtle warm ambient backdrop */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#dfbe7a]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Left Column: Profile & Credentials Brief */}
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#dfbe7a]/15 border border-[#dfbe7a]/30 text-[#dfbe7a] text-xs font-mono font-bold uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Verified Developer Resume
            </div>

            <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#f1f5f9] leading-tight">
              {profile.name} — {profile.role}
            </h3>

            <p className="text-sm font-sans text-[#94a3b8] leading-relaxed font-light">
              Official curriculum vitae documenting B.Tech Computer Science (Cyber Security) studies at Rungta University, Google Student Ambassador 2026 tenure, AWS Student Builder Group leadership, and practical software projects.
            </p>

            {/* Quick-Scan Highlights from Resume */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs font-sans text-[#cbd5e1]">
              <div className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4 text-[#dfbe7a] shrink-0" />
                <span>B.Tech CSE (Cyber Security)</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-[#dfbe7a] shrink-0" />
                <span>Google Student Ambassador '26</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>AWS Student Builder Group Lead</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>6+ Verified Certifications</span>
              </div>
            </div>
          </div>

          {/* Right Column: Prominent Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-4 w-full lg:w-auto shrink-0">
            {/* 1. View Resume Button */}
            <button
              onClick={() => {
                playAudioFx('seal');
                onOpenResume();
              }}
              data-cursor="DOSSIER"
              className="px-6 py-4 rounded-xl brass-btn text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-lg cursor-pointer"
            >
              <Eye className="w-4 h-4" />
              <span>View Full Resume</span>
            </button>

            {/* 2. Download Real PDF Resume Button */}
            <a
              href="/Harsh_Resume.pdf"
              download="Harsh_Kumar_Shandilya_Resume.pdf"
              onClick={() => playAudioFx('seal')}
              data-cursor="DOWNLOAD"
              className="px-6 py-4 rounded-xl bg-[#0e1622] hover:bg-[#141f2e] text-[#dfbe7a] hover:text-white border border-[#c5a059]/40 hover:border-[#dfbe7a] text-xs font-heading font-bold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all cursor-pointer shadow-md"
            >
              <Download className="w-4 h-4" />
              <span>Download PDF Resume</span>
            </a>
          </div>
        </div>

        {/* Bottom Metadata bar */}
        <div className="mt-8 pt-6 border-t border-[#c5a059]/15 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#64748b]">
          <div className="flex items-center gap-2">
            <FileText className="w-3.5 h-3.5 text-[#dfbe7a]" />
            <span>Format: Verified PDF • Harsh Final Resume</span>
          </div>
          <a
            href="/Harsh_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="text-[#dfbe7a] hover:underline flex items-center gap-1"
          >
            Open in new tab <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
};
