import React, { useState } from 'react';
import type { PersonalProfile } from '../../data/personalConfig';
import { SectionBanner } from '../ui/SectionBanner';
import { ParchmentCard } from '../ui/ParchmentCard';
import { GraduationCap, Award, CheckCircle2, Code2, MapPin, Terminal } from 'lucide-react';

interface AboutSectionProps {
  profile: PersonalProfile;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  const [portraitTilt, setPortraitTilt] = useState({ x: 0, y: 0 });

  const handlePortraitMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
    setPortraitTilt({ x, y });
  };

  const handlePortraitLeave = () => {
    setPortraitTilt({ x: 0, y: 0 });
  };

  return (
    <section id="legend" className="min-h-screen py-24 px-4 max-w-7xl mx-auto relative z-10">
      <SectionBanner
        number="PORT I"
        title="Engineering Chronicle & Biography"
        subtitle="A verified profile forged across production systems, hackathon podiums, and deep code architecture"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-10">
        {/* Left Side: Personal Engineering Manifesto */}
        <div className="lg:col-span-7">
          <ParchmentCard rotate="-0.8" className="border-2 border-[#8b5a2b]">
            <div className="flex items-center justify-between border-b-2 border-[#8b5a2b]/30 pb-3 mb-4">
              <span className="font-cinzel text-xs font-bold uppercase text-[#a01d12] flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-[#a01d12]" /> Software Engineer Biography
              </span>
              <span className="font-cinzel text-xs text-[#543b22]">Verified Profile • {profile.location.split('(')[0].trim()}</span>
            </div>

            <h3 className="text-2xl md:text-3xl font-pirate text-[#a01d12] mb-3">
              About Me: {profile.name}
            </h3>

            <p className="text-base text-[#1c130c] font-fell leading-relaxed mb-4 text-justify">
              {profile.aboutBio}
            </p>

            <div className="p-4 bg-[#bfa97c]/25 rounded border-l-4 border-[#a01d12] mb-6">
              <h4 className="text-xs font-cinzel font-bold text-[#171310] uppercase mb-1">
                Core Engineering Philosophy:
              </h4>
              <p className="text-sm text-[#382618] font-fell italic leading-relaxed">
                "{profile.codePhilosophy}"
              </p>
            </div>

            {/* Academic Qualifications & Degree */}
            <div className="border-t border-[#8b5a2b]/40 pt-4 space-y-2">
              <h4 className="text-xs font-cinzel font-bold text-[#171310] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-[#a01d12]" /> Academic Credentials:
              </h4>
              <div className="bg-[#f0e2c2] p-3.5 rounded border border-[#8b5a2b]/40 space-y-1">
                <div className="flex items-center justify-between text-xs font-cinzel font-bold text-[#171310]">
                  <span>{profile.education.degree}</span>
                  <span className="text-[#a01d12] font-mono">{profile.education.period}</span>
                </div>
                <div className="text-xs text-[#523d24] font-cinzel">
                  {profile.education.institution} • <span className="font-bold text-[#171310]">{profile.education.grade}</span>
                </div>
                <p className="text-[11px] text-[#382618] font-fell italic pt-1">
                  {profile.education.details}
                </p>
              </div>
            </div>
          </ParchmentCard>
        </div>

        {/* Right Side: Captain's Portrait & 4 Real Engineering Stats */}
        <div className="lg:col-span-5 space-y-6">
          {/* Captain's Ornate Portrait Card with Interactive 3D Perspective */}
          <div
            onMouseMove={handlePortraitMove}
            onMouseLeave={handlePortraitLeave}
            style={{
              transform: `perspective(1000px) rotateX(${portraitTilt.y}deg) rotateY(${portraitTilt.x}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
            className="bg-[#171310]/95 border-2 border-[#c9a227] rounded-xl p-6 shadow-[0_15px_45px_rgba(0,0,0,0.85)] relative overflow-hidden group backdrop-blur-xl"
          >
            {/* Top gold rim highlight */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#a01d12] via-[#ffd56b] to-[#ff7a1a]" />
            
            <div className="flex flex-col sm:flex-row items-center gap-5">
              {/* Portrait Medallion */}
              <div className="relative shrink-0">
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full border-4 border-[#c9a227] p-1 bg-gradient-to-br from-[#ffd56b] via-[#c9a227] to-[#543b22] shadow-[0_0_20px_rgba(201,162,39,0.4)] group-hover:shadow-[0_0_30px_#ff7a1a] transition-all">
                  <img
                    src={profile.photoUrl || '/avatar-default.svg'}
                    alt={profile.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/avatar-default.svg';
                    }}
                    className="w-full h-full object-cover rounded-full filter contrast-105"
                  />
                </div>
                {/* Wax Seal Badge on corner */}
                <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-[#a01d12] border-2 border-[#ffd56b] flex items-center justify-center text-[10px] font-bold text-[#ffd56b] shadow-md">
                  ⚓
                </div>
              </div>

              {/* Identity Brief */}
              <div className="text-center sm:text-left flex-1">
                <span className="text-[10px] font-cinzel text-[#ff7a1a] tracking-widest uppercase block mb-0.5">
                  Full-Stack Architect
                </span>
                <h4 className="text-2xl font-pirate text-[#d8c49a] group-hover:text-[#ffd56b] transition-colors leading-tight">
                  {profile.name}
                </h4>
                <p className="text-xs font-cinzel text-[#b39b6d] mt-1">
                  {profile.role.split('&')[0]}
                </p>
                <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0b0906] border border-[#c9a227]/40 text-[10px] font-cinzel text-[#e8dcc0]">
                  <MapPin className="w-3 h-3 text-[#ff7a1a]" />
                  <span>{profile.location.split('(')[0].trim()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Stats Medallions */}
          <div className="grid grid-cols-2 gap-4">
            {profile.stats.map((stat, idx) => (
              <div
                key={stat.label}
                className="bg-[#171310]/95 border border-[#c9a227]/60 rounded-xl p-4 sm:p-5 text-center shadow-[0_8px_25px_rgba(0,0,0,0.8)] hover:border-[#ffd56b] hover:-translate-y-1 transition-all backdrop-blur-xl"
              >
                <div className="w-9 h-9 mx-auto mb-2 rounded-full border border-[#c9a227]/40 flex items-center justify-center bg-[#0b0906] shadow-inner">
                  {idx === 0 && <Code2 className="w-4 h-4 text-[#c9a227]" />}
                  {idx === 1 && <Award className="w-4 h-4 text-[#ff7a1a]" />}
                  {idx === 2 && <CheckCircle2 className="w-4 h-4 text-[#c9a227]" />}
                  {idx === 3 && <MapPin className="w-4 h-4 text-[#a01d12]" />}
                </div>
                <div className="text-2xl md:text-3xl font-pirate text-[#ffd56b]">
                  {stat.value}
                </div>
                <div className="text-[11px] font-cinzel text-[#d8c49a] uppercase tracking-wider mt-1">
                  {stat.label}
                </div>
                <div className="text-[10px] font-fell text-[#b39b6d] italic">
                  {stat.subtext}
                </div>
              </div>
            ))}
          </div>

          {/* Hiring / Engagement Notice Card */}
          <div className="bg-gradient-to-br from-[#171310] via-[#211812] to-[#0b0906] border-2 border-[#c9a227] rounded-xl p-6 sm:p-7 shadow-[0_10px_35px_rgba(201,162,39,0.2)] backdrop-blur-xl">
            <span className="text-xs font-cinzel text-[#ff7a1a] uppercase tracking-widest block mb-1 font-semibold">
              Employment & Collaboration Status
            </span>
            <h4 className="text-2xl font-pirate text-[#d8c49a] mb-2 leading-tight">
              Ready for Full-Time Roles & High-Impact Projects
            </h4>
            <p className="text-xs text-[#e8dcc0]/85 font-fell leading-relaxed mb-4">
              Actively seeking opportunities with top-tier technology teams, fast-growing startups, and high-velocity engineering organizations. Open to full-stack, distributed backend, or creative 3D spatial web challenges.
            </p>
            <div className="text-xs font-cinzel text-[#ffd56b] flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
              <span className="font-semibold">Available for Immediate Onboarding</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
