import React, { useState } from 'react';
import type { PersonalProfile } from '../../data/personalConfig';
import { SectionBanner } from '../ui/SectionBanner';
import { Calendar, CheckCircle2, MapPin, GraduationCap, Trophy, Award, Shield, Star, BookOpen, ExternalLink, Users } from 'lucide-react';

interface ExperienceSectionProps {
  profile: PersonalProfile;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ profile }) => {
  const [tab, setTab] = useState<'all' | 'work' | 'education' | 'milestones'>('all');

  return (
    <section id="experience" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
      <SectionBanner
        number="04 // EXPERIENCE"
        title="Leadership, Education & Certifications"
        subtitle="Community leadership tenure, university studies, and verified cybersecurity & software credentials"
      />

      {/* Filter Tabs: Clean NYC Pill Architecture */}
      <div className="flex flex-wrap items-center justify-center gap-2 mt-2 sm:mt-3 mb-6 sm:mb-8">
        {[
          { key: 'all', label: 'All Records' },
          { key: 'work', label: 'Leadership & Experience' },
          { key: 'education', label: 'Education & Academics' },
          { key: 'milestones', label: 'Verified Certifications' }
        ].map((t) => (
          <button
            key={t.key}
            onClick={() => {
              setTab(t.key as typeof tab);
            }}
            className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold tracking-tight transition-all duration-300 cursor-pointer active:scale-95 ${
              tab === t.key
                ? 'bg-[#173f32] text-[#faf8f1] dark:bg-[#faf8f1] dark:text-[#071510] shadow-sm -translate-y-0.5'
                : 'bg-white/90 dark:bg-[#0e241c] text-[#173f32] dark:text-[#faf8f1] border border-[#173f32]/20 dark:border-[#faf8f1]/15 hover:border-[#173f32] hover:bg-white'
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
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-[#173f32] dark:text-[#faf8f1] uppercase tracking-wider">
              <Users className="w-4 h-4 text-emerald-700 dark:text-[#34d399]" />
              Work Experience & Community Leadership
            </div>

            <div className="relative pl-6 sm:pl-10 border-l border-[#173f32]/20 dark:border-[#faf8f1]/15 space-y-10">
              {profile.experience.map((exp) => (
                <div key={exp.role} className="relative group">
                  {/* Timeline Node */}
                  <div className="absolute -left-[35px] sm:-left-[51px] top-5 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#faf8f1] dark:bg-[#071510] border-2 border-[#173f32] dark:border-[#34d399] flex items-center justify-center shadow-xs group-hover:scale-105 transition-all">
                    <Users className="w-4 h-4 text-[#173f32] dark:text-[#34d399]" />
                  </div>

                  {/* Experience Card */}
                  <div className="rounded-2xl p-6 sm:p-8 border border-[#173f32]/12 dark:border-[#faf8f1]/10 hover:border-[#173f32]/35 dark:hover:border-[#34d399]/40 transition-all duration-300 shadow-xs hover:-translate-y-1 bg-white/98 dark:bg-[#0e241c]/95">
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#173f32]/10 dark:border-[#faf8f1]/10 pb-3 mb-4">
                      <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#173f32] dark:text-[#faf8f1]">
                        <Calendar className="w-3.5 h-3.5 text-emerald-700 dark:text-[#34d399]" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="text-xs font-medium text-[#4a685b] dark:text-[#a0c2b5] flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#4a685b]" />
                        <span>{exp.organization} • {exp.location}</span>
                      </div>
                    </div>

                    {/* Title & Role: Editorial Instrument Serif */}
                    <h3
                      className="text-2xl sm:text-3xl text-[#173f32] dark:text-[#faf8f1] mb-1 tracking-tight font-normal"
                      style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
                    >
                      {exp.role}
                    </h3>
                    <div className="text-xs sm:text-sm font-bold text-emerald-800 dark:text-[#34d399] mb-3 uppercase tracking-wider">
                      {exp.organization}
                    </div>

                    {/* Narrative Description */}
                    <p className="text-sm sm:text-base text-[#284e40] dark:text-[#c2dfd4] font-sans leading-relaxed mb-5 font-normal">
                      {exp.description}
                    </p>

                    {/* Key Deliverables & Achievements */}
                    <div className="space-y-2.5 pt-4 border-t border-[#173f32]/10 dark:border-[#faf8f1]/10">
                      <h4 className="text-xs font-bold text-[#173f32] dark:text-[#faf8f1] uppercase tracking-wider mb-2">
                        Key Responsibilities & Impact:
                      </h4>
                      {exp.achievements.map((ach) => (
                        <div key={ach} className="flex items-start gap-2.5 text-sm text-[#284e40] dark:text-[#c2dfd4] font-sans font-normal leading-relaxed">
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-[#34d399] mt-0.5 shrink-0" />
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
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[var(--text-primary)] uppercase tracking-wider">
              <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Education & Academic Pedigree
            </div>

            <div className="rounded-2xl p-6 sm:p-8 border border-[var(--border-hairline)] bg-[var(--surface-card)] shadow-xs relative overflow-hidden">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-hairline)] pb-4 mb-4">
                <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[var(--text-primary)]">
                  <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{profile.education.period}</span>
                </div>
                <span className="px-3 py-1 bg-[var(--canvas-bg)] text-emerald-700 dark:text-emerald-300 font-mono text-xs font-semibold rounded-full border border-[var(--border-hairline)] uppercase tracking-wider">
                  {profile.education.grade}
                </span>
              </div>

              {/* Education Degree: Space Grotesk */}
              <h3 className="text-xl sm:text-2xl font-display font-medium text-[var(--text-primary)] mb-1.5 tracking-[-0.02em]">
                {profile.education.degree}
              </h3>
              <div className="text-sm font-mono text-[var(--text-muted)] mb-4 flex items-center gap-2 font-medium">
                <BookOpen className="w-4 h-4" />
                {profile.education.institution}
              </div>

              <p className="text-sm text-[var(--text-muted)] font-sans leading-relaxed mb-4 font-normal">
                {profile.education.details}
              </p>

              <div className="flex flex-wrap gap-2 pt-2">
                {['Cyber Security', 'Data Structures & Algorithms', 'C & Java Programming', 'Computer Networks', 'Operating Systems', 'MySQL Database Management', 'AWS Cloud Fundamentals'].map((course) => (
                  <span
                    key={course}
                    className="px-3 py-1 rounded-full bg-[var(--canvas-bg)] text-[11px] font-mono text-[var(--text-muted)] border border-[var(--border-hairline)]"
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
                    className="p-5 rounded-2xl bg-[var(--surface-card)] border border-[var(--border-hairline)] shadow-xs flex items-start justify-between"
                  >
                    <div>
                      <div className="text-xs font-mono font-semibold text-[var(--text-muted)] uppercase mb-1">
                        {sec.level}
                      </div>
                      <h4 className="text-base font-display font-medium text-[var(--text-primary)]">
                        {sec.school}
                      </h4>
                    </div>
                    <span className="text-[11px] font-mono text-[var(--text-muted)] px-2.5 py-0.5 rounded-full bg-[var(--canvas-bg)] border border-[var(--border-hairline)]">
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
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[var(--text-primary)] uppercase tracking-wider">
              <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Verified Certifications & Credentials
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {profile.achievements.map((item) => (
                <div
                  key={item.id}
                  className="rounded-2xl p-5 border border-[var(--border-hairline)] hover:border-[var(--border-hover)] transition-all duration-300 bg-[var(--surface-card)] flex flex-col justify-between group shadow-xs hover:-translate-y-1"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--canvas-bg)] border border-[var(--border-hairline)] flex items-center justify-center text-[var(--text-primary)] group-hover:scale-105 transition-transform">
                        {item.iconType === 'trophy' && <Trophy className="w-4 h-4" />}
                        {item.iconType === 'award' && <Award className="w-4 h-4" />}
                        {item.iconType === 'shield' && <Shield className="w-4 h-4" />}
                        {item.iconType === 'star' && <Star className="w-4 h-4" />}
                      </div>
                      <span className="text-[10px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-[var(--canvas-bg)] text-[var(--text-muted)] border border-[var(--border-hairline)]">
                        {item.year}
                      </span>
                    </div>

                    <h4 className="text-base font-display font-medium text-[var(--text-primary)] group-hover:opacity-85 transition-opacity mb-1">
                      {item.title}
                    </h4>
                    <div className="text-[11px] font-mono text-[var(--text-muted)] mb-2.5">
                      {item.issuer}
                    </div>
                    <p className="text-xs text-[var(--text-muted)] font-sans font-normal leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[var(--border-hairline)] flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[var(--text-muted)]">{item.badgeCode}</span>
                    <a
                      href={item.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Verify ${item.title} credential from ${item.issuer} (opens in a new tab)`}
                      className="text-[var(--text-primary)] hover:underline inline-flex items-center gap-1 font-semibold"
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
