import React from 'react';
import type { PersonalProfile } from '../../data/personalConfig';
import { SectionBanner } from '../ui/SectionBanner';
import { ParchmentCard } from '../ui/ParchmentCard';
import { Anchor, Calendar, CheckCircle2, MapPin } from 'lucide-react';

interface ExperienceSectionProps {
  profile: PersonalProfile;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ profile }) => {
  return (
    <section id="log" className="min-h-screen py-20 px-4 max-w-5xl mx-auto relative z-10">
      <SectionBanner
        number="PORT V"
        title="Engineering Career & Work History"
        subtitle="Documented contributions across production environments, high-concurrency systems, and leadership roles"
      />

      <div className="relative mt-12 pl-6 sm:pl-10 border-l-2 border-[#c9a227]/40 space-y-12">
        {profile.experience.map((exp, idx) => (
          <div key={exp.role} className="relative group">
            {/* Anchor Timeline Pin */}
            <div className="absolute -left-[35px] sm:-left-[51px] top-4 w-7 h-7 sm:w-9 sm:h-9 rounded-full bg-[#171310] border-2 border-[#c9a227] flex items-center justify-center shadow-[0_0_15px_rgba(201,162,39,0.5)] group-hover:border-[#ff7a1a] transition-colors">
              <Anchor className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#c9a227] group-hover:text-[#ff7a1a]" />
            </div>

            {/* Weathered Journal Card */}
            <ParchmentCard rotate={idx % 2 === 0 ? '-0.5' : '0.5'}>
              {/* Header: Date & Location */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#8b5a2b]/30 pb-3 mb-3">
                <div className="flex items-center gap-2 text-xs font-cinzel font-bold text-[#a01d12]">
                  <Calendar className="w-3.5 h-3.5 text-[#a01d12]" />
                  <span>{exp.period}</span>
                </div>
                <div className="text-xs font-cinzel text-[#523d24] flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#c9a227]" />
                  <span>{exp.organization} • {exp.location}</span>
                </div>
              </div>

              {/* Title & Role */}
              <h3 className="text-2xl font-pirate text-[#a01d12] mb-1">
                {exp.role}
              </h3>
              <div className="text-xs font-cinzel font-bold text-[#21160e] mb-3">
                {exp.organization}
              </div>

              {/* Narrative Description */}
              <p className="text-sm sm:text-base text-[#21160e] font-fell leading-relaxed mb-4 italic">
                "{exp.description}"
              </p>

              {/* Key Deliverables & Achievements */}
              <div className="space-y-1.5 pt-2 border-t border-[#8b5a2b]/20">
                <h4 className="text-xs font-cinzel font-bold text-[#171310] uppercase tracking-wider mb-1">
                  Key Production Impacts:
                </h4>
                {exp.achievements.map((ach) => (
                  <div key={ach} className="flex items-start gap-2 text-xs text-[#281a10] font-cinzel">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#a01d12] mt-0.5 shrink-0" />
                    <span>{ach}</span>
                  </div>
                ))}
              </div>
            </ParchmentCard>
          </div>
        ))}
      </div>
    </section>
  );
};
