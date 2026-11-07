import React, { useState } from 'react';
import type { PersonalProfile } from '../../data/personalConfig';
import { SectionBanner } from '../ui/SectionBanner';
import { Terminal, MapPin, ShieldCheck, Code2 } from 'lucide-react';
import { playAudioFx } from '../ui/AudioEngine';

interface AboutSectionProps {
  profile: PersonalProfile;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  const [portraitTilt, setPortraitTilt] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<'bio' | 'philosophy' | 'education'>('bio');

  const handlePortraitMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    setPortraitTilt({ x, y });
  };

  const handlePortraitLeave = () => {
    setPortraitTilt({ x: 0, y: 0 });
  };

  return (
    <section id="legend" className="min-h-screen py-20 px-4 max-w-7xl mx-auto relative z-10">
      <SectionBanner
        number="CHRONICLE I"
        title="Engineering Provenance & Dossier"
        subtitle="A verified profile forged across production distributed systems, hackathon podiums, and deep code architecture"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
        {/* Left Side: Personal Engineering Manifesto & Interactive Tabbed Dossier */}
        <div className="lg:col-span-7">
          <div className="nautical-card p-6 sm:p-8 rounded-2xl border border-[#c5a059]/25 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl">
            {/* Header Telemetry */}
            <div className="flex items-center justify-between border-b border-[#c5a059]/15 pb-4 mb-5">
              <span className="font-mono text-xs font-semibold text-[#dfbe7a] flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#dfbe7a]" />
                ENGINEERING DOSSIER • ID: ARCH-HARSH-01
              </span>
              <span className="font-mono text-xs text-[#94a3b8] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#dfbe7a]" />
                21°14'N, 81°38'E
              </span>
            </div>

            {/* Interactive Dossier Nav Tabs */}
            <div className="flex items-center gap-2 mb-6 p-1.5 rounded-xl bg-[#05080c]/80 border border-white/5">
              <button
                onClick={() => {
                  playAudioFx('click');
                  setActiveTab('bio');
                }}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                  activeTab === 'bio'
                    ? 'bg-[#dfbe7a] text-[#05080c] shadow-sm'
                    : 'text-[#94a3b8] hover:text-[#f1f5f9]'
                }`}
              >
                Executive Bio
              </button>
              <button
                onClick={() => {
                  playAudioFx('click');
                  setActiveTab('philosophy');
                }}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                  activeTab === 'philosophy'
                    ? 'bg-[#dfbe7a] text-[#05080c] shadow-sm'
                    : 'text-[#94a3b8] hover:text-[#f1f5f9]'
                }`}
              >
                Code Philosophy
              </button>
              <button
                onClick={() => {
                  playAudioFx('click');
                  setActiveTab('education');
                }}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                  activeTab === 'education'
                    ? 'bg-[#dfbe7a] text-[#05080c] shadow-sm'
                    : 'text-[#94a3b8] hover:text-[#f1f5f9]'
                }`}
              >
                University Pedigree
              </button>
            </div>

            {/* Tab Contents with smooth fade */}
            {activeTab === 'bio' && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#f1f5f9]">
                  About Me: {profile.name}
                </h3>
                <p className="text-sm sm:text-base text-[#94a3b8] font-sans leading-relaxed font-normal">
                  {profile.aboutBio}
                </p>
                <div className="p-4 bg-[#05080c]/60 rounded-xl border border-white/5 text-xs text-[#cbd5e1] font-sans leading-relaxed">
                  Specialized in translating mission-critical engineering requirements into battle-tested architectures. From kernel-level algorithmic optimizations to responsive 3D WebGL user interfaces, every line is crafted for zero latency and deterministic execution.
                </div>
              </div>
            )}

            {activeTab === 'philosophy' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-5 bg-[#05080c]/80 rounded-xl border-l-2 border-[#dfbe7a] border-y border-r border-white/5">
                  <h4 className="text-xs font-mono font-bold text-[#dfbe7a] uppercase mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#dfbe7a]" />
                    Zero Vibe Coding & Deterministic Reliability:
                  </h4>
                  <p className="text-sm text-[#cbd5e1] font-sans italic leading-relaxed">
                    "{profile.codePhilosophy}"
                  </p>
                </div>
                <div className="space-y-2 pt-2">
                  <div className="text-xs font-mono text-[#dfbe7a] font-semibold">Architectural Tenets:</div>
                  <ul className="space-y-1.5 text-xs text-[#94a3b8] font-sans list-disc pl-4">
                    <li>Strict end-to-end type safety across backend API contracts and frontend views.</li>
                    <li>Zero-vibe coding: Every unit test, integration test, and terminal command verified before completion.</li>
                    <li>OWASP Top 10 defenses enforced at the boundary with rigorous parameter sanitization.</li>
                    <li>Sub-millisecond latency budgets and 0ms layout shift (CLS) standards.</li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'education' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="bg-[#0e1622]/90 p-5 rounded-xl border border-[#c5a059]/20 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-1 text-sm font-heading font-bold text-[#f1f5f9]">
                    <span>{profile.education.degree}</span>
                    <span className="text-[#dfbe7a] font-mono">{profile.education.period}</span>
                  </div>
                  <div className="text-xs text-[#94a3b8] font-sans">
                    {profile.education.institution} • <span className="font-semibold text-emerald-400">{profile.education.grade}</span>
                  </div>
                  <p className="text-xs text-[#94a3b8] font-sans pt-2 leading-relaxed">
                    {profile.education.details}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3 rounded-lg bg-[#05080c] border border-white/5 text-center">
                    <div className="text-[10px] font-mono text-[#94a3b8] uppercase">Academic Focus</div>
                    <div className="text-xs font-mono font-bold text-[#dfbe7a] mt-0.5">Distributed & OS</div>
                  </div>
                  <div className="p-3 rounded-lg bg-[#05080c] border border-white/5 text-center">
                    <div className="text-[10px] font-mono text-[#94a3b8] uppercase">Graduation Standing</div>
                    <div className="text-xs font-mono font-bold text-emerald-400 mt-0.5">Distinction</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Portrait Card & 4 Verified Production Metrics */}
        <div className="lg:col-span-5 space-y-6">
          {/* Captain's Architectural Portrait Card with 3D Perspective */}
          <div
            onMouseMove={handlePortraitMove}
            onMouseLeave={handlePortraitLeave}
            style={{
              transform: `perspective(1000px) rotateX(${portraitTilt.y}deg) rotateY(${portraitTilt.x}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
            className="nautical-card border-beam-card rounded-2xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.85)] border border-[#c5a059]/30 relative overflow-hidden backdrop-blur-xl group"
          >
            {/* Top gold highlight line */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#c5a059] via-[#dfbe7a] to-[#c5a059]" />

            <div className="flex flex-col sm:flex-row items-center gap-5">
              {/* Portrait Medallion */}
              <div className="relative shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[#dfbe7a] p-1 bg-[#05080c] shadow-[0_0_20px_rgba(223,190,122,0.3)] group-hover:shadow-[0_0_30px_rgba(223,190,122,0.5)] transition-all overflow-hidden flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#141f2e] to-[#05080c] flex flex-col items-center justify-center text-center p-2">
                    <Code2 className="w-7 h-7 text-[#dfbe7a] mb-1 group-hover:scale-110 transition-transform" />
                    <span className="text-[10px] font-mono text-[#94a3b8] uppercase font-bold">Harsh</span>
                  </div>
                </div>
              </div>

              {/* Bio Summary Details */}
              <div className="text-center sm:text-left space-y-1">
                <span className="text-[10px] font-mono text-[#dfbe7a] uppercase tracking-wider block font-semibold">
                  Systems Architect & Engineer
                </span>
                <h4 className="text-xl font-heading font-bold text-[#f1f5f9] leading-tight">
                  {profile.name}
                </h4>
                <p className="text-xs font-sans text-[#94a3b8] leading-relaxed">
                  {profile.subRole}
                </p>
                <div className="pt-2 flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#05080c] border border-white/10 text-emerald-400">
                    ● Available for Hire
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#05080c] border border-white/10 text-[#dfbe7a]">
                    Full-Stack / Distributed
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Verified Production Metrics Grid with Hover Animation */}
          <div className="grid grid-cols-2 gap-3.5">
            {profile.stats.map((stat) => (
              <div
                key={stat.label}
                className="nautical-card rounded-2xl p-4 sm:p-5 border border-[#c5a059]/20 hover:border-[#dfbe7a] transition-all group/stat shadow-sm hover:-translate-y-1"
              >
                <div className="text-xl sm:text-2xl font-mono font-bold text-[#dfbe7a] group-hover/stat:scale-105 transition-transform">
                  {stat.value}
                </div>
                <div className="text-xs font-heading font-semibold text-[#f1f5f9] mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] font-sans text-[#64748b] mt-0.5">
                  {stat.subtext}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
