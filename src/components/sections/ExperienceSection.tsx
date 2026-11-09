import React from 'react';
import type { PersonalProfile } from '../../data/personalConfig';
import { SectionBanner } from '../ui/SectionBanner';
import { Anchor, Calendar, CheckCircle2, MapPin } from 'lucide-react';

interface ExperienceSectionProps {
  profile: PersonalProfile;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ profile }) => {
  return (
    <section id="log" className="min-h-screen py-24 px-4 max-w-5xl mx-auto relative z-10">
      <SectionBanner
        number="CHRONICLE V"
        title="Chronicle of Service & Work History"
        subtitle="Documented contributions across production distributed backends, high-concurrency systems, and engineering leadership"
      />

      <div className="relative mt-12 pl-6 sm:pl-10 border-l border-[#c5a059]/30 space-y-12">
        {profile.experience.map((exp) => (
          <div key={exp.role} className="relative group">
            {/* Navigational Anchor Node with Ambient Pulsing Glow */}
            <div className="absolute -left-[35px] sm:-left-[51px] top-5 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#05080c] border-2 border-[#dfbe7a] flex items-center justify-center shadow-[0_0_20px_rgba(223,190,122,0.4)] group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(223,190,122,0.7)] transition-all">
              <Anchor className="w-4 h-4 text-[#dfbe7a]" />
            </div>

            {/* Vessel Tenure Card with Border Beam */}
            <div className="rounded-2xl p-6 sm:p-8 border border-[#c5a059]/20 hover:border-[#dfbe7a] transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:-translate-y-1 bg-[#0a1018]/90">
              {/* Header: Period & Location */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#c5a059]/15 pb-3 mb-4">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#dfbe7a]">
                  <Calendar className="w-3.5 h-3.5 text-[#dfbe7a]" />
                  <span>{exp.period}</span>
                </div>
                <div className="text-xs font-mono text-[#94a3b8] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#dfbe7a]" />
                  <span>{exp.organization} • {exp.location}</span>
                </div>
              </div>

              {/* Title & Role */}
              <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#f1f5f9] mb-1">
                {exp.role}
              </h3>
              <div className="text-xs font-mono font-medium text-[#dfbe7a] mb-3">
                {exp.organization}
              </div>

              {/* Narrative Description */}
              <p className="text-xs sm:text-sm text-[#94a3b8] font-sans leading-relaxed mb-5 font-light">
                {exp.description}
              </p>

              {/* Key Deliverables & Achievements */}
              <div className="space-y-2.5 pt-4 border-t border-[#c5a059]/15">
                <h4 className="text-xs font-mono font-bold text-[#dfbe7a] uppercase tracking-wider mb-2">
                  Key Production Impacts:
                </h4>
                {exp.achievements.map((ach) => (
                  <div key={ach} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#cbd5e1] font-sans">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
