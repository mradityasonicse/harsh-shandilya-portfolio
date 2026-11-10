import React, { useState } from 'react';
import type { PersonalProfile } from '../../data/personalConfig';
import { SectionBanner } from '../ui/SectionBanner';
import { Calendar, CheckCircle2, MapPin, GraduationCap, Trophy, Award, Shield, Star, BookOpen, ExternalLink, Users } from 'lucide-react';
import { playAudioFx } from '../ui/AudioEngine';

interface ExperienceSectionProps {
  profile: PersonalProfile;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ profile }) => {
  const [tab, setTab] = useState<'all' | 'work' | 'education' | 'milestones'>('all');

  return (
    <section id="experience" data-alias="log" className="min-h-screen py-24 px-4 max-w-6xl mx-auto relative z-10">
      {/* Anchor helper for legacy #log links */}
      <div id="log" className="absolute -top-16 left-0 pointer-events-none" />

      <SectionBanner
        number="CHRONICLE IV"
        title="Experience, Education & Certifications"
        subtitle="Community leadership tenure, university studies, and verified cybersecurity & software credentials"
      />

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-8 mb-12">
        {[
          { key: 'all', label: 'All Records' },
          { key: 'work', label: 'Leadership & Experience' },
          { key: 'education', label: 'Education & Academics' },
          { key: 'milestones', label: 'Verified Certifications' }
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => {
              playAudioFx('click');
              setTab(t.key as typeof tab);
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-200 cursor-pointer ${
              tab === t.key
                ? 'bg-gradient-to-r from-[#c5a059] to-[#dfbe7a] text-[#05080c] font-bold shadow-[0_0_20px_rgba(223,190,122,0.4)]'
                : 'bg-[#0e1622] text-[#94a3b8] border border-[#c5a059]/25 hover:border-[#dfbe7a] hover:text-[#f1f5f9]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-16">
        {/* 1. Work History & Student Leadership */}
        {(tab === 'all' || tab === 'work') && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#dfbe7a] uppercase tracking-wider">
              <Users className="w-4 h-4 text-[#dfbe7a]" />
              Work Experience & Community Leadership
            </div>

            <div className="relative pl-6 sm:pl-10 border-l border-[#c5a059]/30 space-y-10">
              {profile.experience.map((exp) => (
                <div key={exp.role} className="relative group">
                  {/* Timeline Node */}
                  <div className="absolute -left-[35px] sm:-left-[51px] top-5 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#05080c] border-2 border-[#dfbe7a] flex items-center justify-center shadow-[0_0_20px_rgba(223,190,122,0.4)] group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(223,190,122,0.7)] transition-all">
                    <Users className="w-4 h-4 text-[#dfbe7a]" />
                  </div>

                  {/* Experience Card */}
                  <div className="rounded-2xl p-6 sm:p-8 border border-[#c5a059]/20 hover:border-[#dfbe7a] transition-all duration-300 shadow-[0_20px_50px_rgba(0,0,0,0.85)] hover:-translate-y-1 bg-[#0a1018]/90">
                    {/* Header */}
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

                    {/* Title & Role: Space Grotesk Medium 500 */}
                    <h3 className="text-xl sm:text-2xl font-heading font-medium text-[#f1f5f9] mb-1 tracking-[-0.02em]">
                      {exp.role}
                    </h3>
                    <div className="text-xs font-mono font-bold text-[#dfbe7a] mb-3 uppercase tracking-wider">
                      {exp.organization}
                    </div>

                    {/* Narrative Description: Geist Sans Regular 400 */}
                    <p className="text-sm text-[#94a3b8] font-sans leading-relaxed mb-5 font-normal">
                      {exp.description}
                    </p>

                    {/* Key Deliverables & Achievements */}
                    <div className="space-y-2.5 pt-4 border-t border-[#c5a059]/15">
                      <h4 className="text-xs font-mono font-bold text-[#dfbe7a] uppercase tracking-wider mb-2">
                        Key Responsibilities & Impact:
                      </h4>
                      {exp.achievements.map((ach) => (
                        <div key={ach} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#cbd5e1] font-sans font-normal leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                          <span>{ach}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2. Education & Academic Foundation */}
        {(tab === 'all' || tab === 'education') && profile.education && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#dfbe7a] uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-[#dfbe7a]" />
              Education & Academic Pedigree
            </div>

            <div className="rounded-2xl p-6 sm:p-8 border border-[#c5a059]/30 bg-gradient-to-br from-[#0a1018] via-[#05080c] to-[#0a1420] shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#dfbe7a]/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#c5a059]/15 pb-4 mb-4">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#dfbe7a]">
                  <Calendar className="w-4 h-4 text-[#dfbe7a]" />
                  <span>{profile.education.period}</span>
                </div>
                <span className="px-3 py-1 bg-emerald-500/15 text-emerald-400 font-mono text-xs font-bold rounded-full border border-emerald-500/30 uppercase tracking-wider">
                  {profile.education.grade}
                </span>
              </div>

              {/* Education Degree: Space Grotesk Medium 500 */}
              <h3 className="text-xl sm:text-2xl font-heading font-medium text-[#f1f5f9] mb-1.5 tracking-[-0.02em]">
                {profile.education.degree}
              </h3>
              <div className="text-sm font-mono text-[#dfbe7a] mb-4 flex items-center gap-2 font-semibold">
                <BookOpen className="w-4 h-4" />
                {profile.education.institution}
              </div>

              <p className="text-sm text-[#94a3b8] font-sans leading-relaxed mb-4 font-normal">
                {profile.education.details}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {['Cyber Security', 'Data Structures & Algorithms', 'C & Java Programming', 'Computer Networks', 'Operating Systems', 'MySQL Database Management', 'AWS Cloud Fundamentals'].map((course) => (
                  <span
                    key={course}
                    className="px-2.5 py-1 rounded-md bg-[#05080c] text-[11px] font-mono text-[#cbd5e1] border border-white/10"
                  >
                    {course}
                  </span>
                ))}
              </div>
            </div>

            {/* Secondary Education Cards */}
            {profile.secondaryEducation && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {profile.secondaryEducation.map((sec) => (
                  <div
                    key={sec.level}
                    className="p-5 rounded-2xl bg-[#0a1018]/90 border border-white/5 shadow-md flex items-start justify-between"
                  >
                    <div>
                      <div className="text-xs font-mono font-bold text-[#dfbe7a] uppercase mb-1">
                        {sec.level}
                      </div>
                      <h4 className="text-sm font-heading font-bold text-white">
                        {sec.school}
                      </h4>
                    </div>
                    <span className="text-[11px] font-mono text-[#94a3b8] px-2 py-0.5 rounded bg-[#05080c] border border-white/10">
                      {sec.period}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* 3. Verified Certifications & Credentials */}
        {(tab === 'all' || tab === 'milestones') && profile.achievements && (
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#dfbe7a] uppercase tracking-wider">
              <Shield className="w-4 h-4 text-[#dfbe7a]" />
              Verified Certifications & Badges
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {profile.achievements.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl p-5 border border-[#c5a059]/20 hover:border-[#dfbe7a] transition-all duration-300 bg-[#0a1018]/90 flex flex-col justify-between group shadow-lg hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-lg bg-[#0e1622] border border-[#c5a059]/30 flex items-center justify-center text-[#dfbe7a] group-hover:scale-105 transition-transform">
                        {item.iconType === 'trophy' && <Trophy className="w-4 h-4" />}
                        {item.iconType === 'award' && <Award className="w-4 h-4" />}
                        {item.iconType === 'shield' && <Shield className="w-4 h-4" />}
                        {item.iconType === 'star' && <Star className="w-4 h-4" />}
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#dfbe7a]/15 text-[#dfbe7a] border border-[#dfbe7a]/30">
                        {item.year}
                      </span>
                    </div>

                    <h4 className="text-sm font-heading font-bold text-[#f1f5f9] group-hover:text-[#dfbe7a] transition-colors mb-1">
                      {item.title}
                    </h4>
                    <div className="text-[11px] font-mono text-[#dfbe7a] mb-2.5">
                      {item.issuer}
                    </div>
                    <p className="text-xs text-[#94a3b8] font-sans font-light leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#64748b]">{item.badgeCode}</span>
                    <a
                      href={item.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#dfbe7a] hover:text-white inline-flex items-center gap-1 font-semibold hover:underline"
                    >
                      Verify <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
