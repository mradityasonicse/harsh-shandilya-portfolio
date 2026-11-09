import React, { useState } from 'react';
import type { PersonalProfile } from '../../data/personalConfig';
import { SectionBanner } from '../ui/SectionBanner';
import { Terminal, MapPin, ShieldCheck, CheckCircle2, Cpu, Zap, Code, Database } from 'lucide-react';
import { playAudioFx } from '../ui/AudioEngine';

interface AboutSectionProps {
  profile: PersonalProfile;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  const [portraitTilt, setPortraitTilt] = useState({ x: 0, y: 0 });
  const [activeTab, setActiveTab] = useState<'bio' | 'philosophy' | 'education'>('bio');

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
        number="CHRONICLE I"
        title="Engineering Provenance & Architectural Dossier"
        subtitle="A verified profile forged across production distributed systems, national hackathons, and high-velocity code architecture"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-10">
        {/* Left Side: Personal Engineering Manifesto & Interactive Tabbed Dossier (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl p-6 sm:p-8 border border-[#c5a059]/25 bg-[#0a1018]/90 shadow-[0_20px_50px_rgba(0,0,0,0.85)] backdrop-blur-xl relative overflow-hidden">
            {/* Header Telemetry */}
            <div className="flex items-center justify-between border-b border-[#c5a059]/15 pb-4 mb-6">
              <span className="font-mono text-xs font-semibold text-[#dfbe7a] flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#dfbe7a]" />
                ENGINEERING DOSSIER • ID: ARCH-HARSH-01
              </span>
              <span className="font-mono text-xs text-[#94a3b8] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[#dfbe7a]" />
                21°14'N 81°38'E
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
                    ? 'bg-gradient-to-r from-[#c5a059] to-[#dfbe7a] text-[#05080c] shadow-md font-bold'
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
                    ? 'bg-gradient-to-r from-[#c5a059] to-[#dfbe7a] text-[#05080c] shadow-md font-bold'
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
                    ? 'bg-gradient-to-r from-[#c5a059] to-[#dfbe7a] text-[#05080c] shadow-md font-bold'
                    : 'text-[#94a3b8] hover:text-[#f1f5f9]'
                }`}
              >
                Academic Pedigree
              </button>
            </div>

            {/* Tab Contents with smooth fade */}
            {activeTab === 'bio' && (
              <div className="space-y-4 animate-fadeIn">
                <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#f1f5f9]">
                  Architecting Scalable Systems with Zero Vibe Coding
                </h3>
                <p className="text-sm sm:text-base text-[#cbd5e1] font-sans leading-relaxed font-light">
                  {profile.aboutBio}
                </p>
                <div className="p-4 bg-[#05080c]/80 rounded-xl border border-white/5 text-xs text-[#94a3b8] font-sans leading-relaxed">
                  Specialized in translating mission-critical product specs into battle-tested architectures. From low-latency asynchronous FastAPI microservices and PostgreSQL schemas to silky 120 FPS WebGL 3D spatial scenes, every feature is built to withstand real production turbulence.
                </div>
              </div>
            )}

            {activeTab === 'philosophy' && (
              <div className="space-y-4 animate-fadeIn">
                <div className="p-5 bg-[#05080c]/90 rounded-xl border-l-2 border-[#dfbe7a] border-y border-r border-white/5">
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
                  <ul className="space-y-1.5 text-xs text-[#94a3b8] font-sans list-disc pl-4 font-light">
                    <li>Strict end-to-end type safety across backend API contracts and frontend views.</li>
                    <li>Zero-vibe coding: Every unit test, integration test, and terminal command machine-verified before completion.</li>
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
                  <p className="text-xs text-[#94a3b8] font-sans pt-2 leading-relaxed font-light">
                    {profile.education.details}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-[#05080c] border border-white/5 text-center">
                    <div className="text-[10px] font-mono text-[#94a3b8] uppercase">Academic Focus</div>
                    <div className="text-xs font-mono font-bold text-[#dfbe7a] mt-0.5">Distributed & OS</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-[#05080c] border border-white/5 text-center">
                    <div className="text-[10px] font-mono text-[#94a3b8] uppercase">Graduation Standing</div>
                    <div className="text-xs font-mono font-bold text-emerald-400 mt-0.5">Distinction</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Portrait Card & 4 Verified Production Metrics (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Captain's Architectural Portrait Card with 3D Perspective */}
          <div
            onMouseMove={handlePortraitMove}
            onMouseLeave={handlePortraitLeave}
            style={{
              transform: `perspective(1000px) rotateX(${portraitTilt.y}deg) rotateY(${portraitTilt.x}deg)`,
              transition: 'transform 0.15s ease-out',
            }}
            className="rounded-2xl p-6 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.85)] border border-[#c5a059]/30 relative overflow-hidden backdrop-blur-xl group bg-[#0a1018]/90"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#c5a059] via-[#dfbe7a] to-[#c5a059]" />

            <div className="flex flex-col sm:flex-row items-center gap-5">
              <div className="relative shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-2 border-[#dfbe7a] p-1 bg-[#05080c] shadow-[0_0_20px_rgba(223,190,122,0.3)] group-hover:shadow-[0_0_30px_rgba(223,190,122,0.5)] transition-all overflow-hidden flex items-center justify-center">
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-[#141f2e] to-[#05080c] flex flex-col items-center justify-center text-center p-2">
                    <Cpu className="w-7 h-7 text-[#dfbe7a] mb-1" />
                    <span className="text-[9px] font-mono text-[#cbd5e1] font-bold">ARCHITECT</span>
                  </div>
                </div>
              </div>

              <div className="text-center sm:text-left space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full inline-block font-semibold">
                  Verified Identity
                </span>
                <h4 className="text-xl font-heading font-bold text-white">
                  {profile.name}
                </h4>
                <p className="text-xs font-mono text-[#c5a059]">
                  {profile.role.split('&')[0].trim()}
                </p>
                <p className="text-[11px] text-[#94a3b8] font-sans">
                  Specialized in high-concurrency microservices, cloud telemetry, and 3D WebGL interfaces.
                </p>
              </div>
            </div>
          </div>

          {/* 4 Verified Production Benchmarks Bento */}
          <div className="grid grid-cols-2 gap-3.5">
            <div className="p-4 rounded-xl bg-[#0a1018]/85 border border-white/5 hover:border-[#dfbe7a]/40 transition-all shadow-md">
              <div className="flex items-center gap-2 text-xs font-mono text-[#dfbe7a] mb-1">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>0 ms CLS</span>
              </div>
              <div className="text-base font-heading font-bold text-white">100/100 Core Vitals</div>
              <div className="text-[10px] text-[#64748b] font-sans mt-0.5">Zero layout shift standard</div>
            </div>

            <div className="p-4 rounded-xl bg-[#0a1018]/85 border border-white/5 hover:border-[#dfbe7a]/40 transition-all shadow-md">
              <div className="flex items-center gap-2 text-xs font-mono text-[#dfbe7a] mb-1">
                <Code className="w-3.5 h-3.5 text-[#dfbe7a]" />
                <span>Zero Any</span>
              </div>
              <div className="text-base font-heading font-bold text-white">Strict TypeScript</div>
              <div className="text-[10px] text-[#64748b] font-sans mt-0.5">Deterministic compile gates</div>
            </div>

            <div className="p-4 rounded-xl bg-[#0a1018]/85 border border-white/5 hover:border-[#dfbe7a]/40 transition-all shadow-md">
              <div className="flex items-center gap-2 text-xs font-mono text-[#dfbe7a] mb-1">
                <Database className="w-3.5 h-3.5 text-[#dfbe7a]" />
                <span>ACID</span>
              </div>
              <div className="text-base font-heading font-bold text-white">Strict Schemas</div>
              <div className="text-[10px] text-[#64748b] font-sans mt-0.5">PostgreSQL & Drizzle ORM</div>
            </div>

            <div className="p-4 rounded-xl bg-[#0a1018]/85 border border-white/5 hover:border-[#dfbe7a]/40 transition-all shadow-md">
              <div className="flex items-center gap-2 text-xs font-mono text-[#dfbe7a] mb-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>98%+</span>
              </div>
              <div className="text-base font-heading font-bold text-white">Test Coverage</div>
              <div className="text-[10px] text-[#64748b] font-sans mt-0.5">Automated test harnesses</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
