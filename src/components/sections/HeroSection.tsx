import React, { useState, useEffect } from 'react';
import type { PersonalProfile } from '../../data/personalConfig';
import { ChevronDown, FileText, Shield, Compass, Sparkles, Eye, ArrowUpRight, Zap } from 'lucide-react';
import { playAudioFx } from '../ui/AudioEngine';

interface HeroSectionProps {
  profile: PersonalProfile;
  onExplore: () => void;
  onOpenResume?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  profile,
  onExplore,
  onOpenResume,
}) => {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = setTimeout(() => setHasLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setMouseTilt({ x: 0, y: 0 });
  };

  const handleInspect = () => {
    playAudioFx('seal');
    onExplore();
  };

  const handleExploreArmory = () => {
    playAudioFx('click');
    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.scrollTo('#armory');
    } else {
      const el = document.getElementById('armory');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreDesignEye = () => {
    playAudioFx('click');
    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.scrollTo('#design-eye');
    } else {
      const el = document.getElementById('design-eye');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const primaryPhoto = profile.photoUrl || '/profile-photo.svg';
  const fallbackPhoto = '/profile-photo.svg';

  return (
    <section
      id="hero"
      aria-label="Introduction Hero Poster"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="min-h-screen relative flex flex-col justify-between pt-28 sm:pt-24 pb-10 px-4 sm:px-6 md:px-10 lg:px-14 overflow-hidden z-10 selection:bg-[#dfbe7a]/30"
    >
      {/* ============================================================ */}
      {/* 1. ATMOSPHERIC BACKDROP & VOLUMETRIC SPECULAR LIGHTING      */}
      {/* ============================================================ */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] sm:w-[1100px] sm:h-[1100px] rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(223, 190, 122, 0.12) 0%, rgba(197, 160, 89, 0.04) 40%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />

      {/* ============================================================ */}
      {/* 2. GRAND ARCHITECTURAL NAME BACKDROP: "HARSH SHANDILYA"     */}
      {/* ============================================================ */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none z-10 overflow-hidden"
      >
        <span
          className="font-black uppercase tracking-tight leading-none transition-all duration-1000 transform will-change-transform text-center"
          style={{
            fontFamily: "'Bebas Neue', 'Anton', Impact, sans-serif",
            fontSize: 'clamp(60px, 18vw, 360px)',
            backgroundImage: 'linear-gradient(180deg, rgba(255,255,255,0.85) 0%, rgba(223,190,122,0.6) 45%, rgba(197,160,89,0.2) 80%, rgba(5,8,12,0.95) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.03em',
            filter: 'drop-shadow(0 25px 60px rgba(0, 0, 0, 0.9))',
            opacity: hasLoaded ? 0.95 : 0,
            transform: hasLoaded ? 'translateY(0) scale(1)' : 'translateY(25px) scale(0.96)',
          }}
        >
          HARSH
        </span>
      </div>

      {/* ============================================================ */}
      {/* 3. FOREGROUND 3D INTERACTIVE PORTRAIT WITH GYRO TILT (z-20) */}
      {/* ============================================================ */}
      <div
        className="absolute inset-x-0 bottom-0 flex justify-center items-end pointer-events-none z-20 overflow-hidden"
        style={{
          height: '76vh',
          maxHeight: '740px',
        }}
      >
        <div
          className={`relative h-full flex items-end justify-center transition-all duration-700 ${
            hasLoaded ? 'opacity-100' : 'opacity-0 translate-y-8'
          }`}
          style={{
            transform: `perspective(1000px) rotateY(${mouseTilt.x * 10}deg) rotateX(${-mouseTilt.y * 6}deg) scale3d(1.02, 1.02, 1.02)`,
            transformStyle: 'preserve-3d',
            transition: 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {!imgError ? (
            <img
              src={primaryPhoto}
              alt={`${profile.name} - ${profile.role}`}
              onError={() => setImgError(true)}
              className="h-full w-auto max-w-[90vw] md:max-w-[560px] lg:max-w-[660px] object-contain object-bottom drop-shadow-[0_30px_80px_rgba(0,0,0,0.98)]"
              style={{
                maskImage: 'linear-gradient(to bottom, black 82%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 82%, transparent 100%)',
              }}
            />
          ) : (
            <div
              className="h-[60vh] max-h-[540px] w-[320px] sm:w-[400px] flex items-end justify-center relative"
              style={{
                maskImage: 'linear-gradient(to bottom, black 75%, transparent 98%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 98%)',
              }}
            >
              <img
                src={fallbackPhoto}
                alt={profile.name}
                className="w-full h-auto object-contain object-bottom opacity-80 drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
              />
            </div>
          )}
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. GOD-LEVEL EDITORIAL POSTER ARCHITECTURE (z-30)           */}
      {/* ============================================================ */}
      <div className="relative z-30 w-full max-w-7xl mx-auto flex-1 flex flex-col justify-between pointer-events-none pt-4">
        {/* Top Status Telemetry Ribbon */}
        <div
          className={`flex flex-wrap items-center justify-between gap-3 pointer-events-auto transition-all duration-700 ${
            hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          {/* Status badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0a1018]/90 border border-[#dfbe7a]/40 backdrop-blur-xl shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#10b981] animate-pulse" />
            <span className="text-[11px] font-mono text-[#dfbe7a] uppercase tracking-wider font-bold">
              ACTIVE COMMISSION • SYSTEMS ARCHITECT
            </span>
          </div>

          {/* Engine Vitals */}
          <div className="hidden sm:inline-flex items-center gap-4 text-[11px] font-mono text-[#94a3b8] tracking-widest uppercase">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <Zap className="w-3.5 h-3.5" /> 120 FPS NATIVE
            </span>
            <span>•</span>
            <span className="text-[#cbd5e1]">{profile.location.split('•')[0].trim()}</span>
          </div>
        </div>

        {/* Main 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-6">
          {/* Left Column: Heading, Role, Tagline, CTAs (5 cols) */}
          <div
            className={`lg:col-span-5 pointer-events-auto transition-all duration-700 delay-200 ${
              hasLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
            }`}
          >
            {/* Greeting subtitle */}
            <div className="text-sm sm:text-base font-serif italic text-[#dfbe7a] tracking-wider mb-1 flex items-center gap-2.5">
              <span>Sovereign Full-Stack Architect</span>
              <span className="inline-block w-8 h-[1px] bg-[#dfbe7a]/50" />
            </div>

            {/* Giant White & Gold Heading */}
            <h1
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white tracking-tight uppercase leading-[0.88] drop-shadow-[0_4px_35px_rgba(0,0,0,0.95)]"
              style={{ fontFamily: "'Bebas Neue', 'Anton', Impact, sans-serif" }}
            >
              HARSH<br />
              <span className="bg-gradient-to-r from-white via-[#dfbe7a] to-[#c5a059] bg-clip-text text-transparent">
                SHANDILYA.
              </span>
            </h1>

            {/* Brass Sub-role Pill */}
            <div className="inline-block mt-3 px-3 py-1.5 rounded-lg bg-[#0e1622]/90 border border-[#c5a059]/40 text-[#dfbe7a] font-mono text-[11px] font-bold uppercase tracking-wider shadow-md backdrop-blur-md">
              HIGH-THROUGHPUT SYSTEMS & 3D WEBGL
            </div>

            {/* Bio statement */}
            <p className="mt-3 sm:mt-4 text-xs sm:text-sm text-[#cbd5e1] font-sans leading-relaxed max-w-md drop-shadow-md font-light">
              "{profile.tagline}"
            </p>

            {/* Tactical CTA Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mt-5 sm:mt-7">
              <button
                onClick={handleInspect}
                data-cursor="EXPEDITIONS"
                className="flex items-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 bg-gradient-to-r from-[#c5a059] to-[#dfbe7a] hover:from-[#dfbe7a] hover:to-[#f1f5f9] text-[#05080c] rounded-xl text-xs font-mono font-bold uppercase tracking-wider shadow-[0_10px_30px_rgba(223,190,122,0.4)] hover:shadow-[0_14px_40px_rgba(223,190,122,0.6)] transition-all cursor-pointer group"
              >
                <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform duration-300" />
                Explore Expeditions
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={handleExploreDesignEye}
                data-cursor="DESIGN EYE"
                className="flex items-center gap-2 px-4 sm:px-5 py-3 sm:py-3.5 bg-[#0a1018]/90 hover:bg-[#141f2e] text-[#dfbe7a] border border-[#dfbe7a]/40 hover:border-[#dfbe7a] rounded-xl text-xs font-mono font-bold uppercase tracking-wider backdrop-blur-md transition-all cursor-pointer shadow-md group"
              >
                <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                Design Eye Matrix
              </button>

              <button
                onClick={handleExploreArmory}
                data-cursor="ARMORY"
                className="flex items-center gap-1.5 px-3.5 py-3 sm:py-3.5 bg-[#0a1018]/60 hover:bg-[#121926] text-[#94a3b8] hover:text-white border border-white/10 hover:border-white/20 rounded-xl text-xs font-mono uppercase tracking-wider backdrop-blur-md transition-all cursor-pointer"
              >
                <Shield className="w-3.5 h-3.5" />
                Armory
              </button>

              {onOpenResume && (
                <button
                  onClick={() => {
                    playAudioFx('seal');
                    onOpenResume();
                  }}
                  data-cursor="RESUME"
                  className="flex items-center gap-1.5 px-3.5 py-3 sm:py-3.5 bg-[#0a1018]/60 hover:bg-[#121926] text-[#94a3b8] hover:text-white border border-white/10 hover:border-white/20 rounded-xl text-xs font-mono uppercase tracking-wider backdrop-blur-md transition-all cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  CV
                </button>
              )}
            </div>

            {/* Location coordinates */}
            <div className="flex items-center gap-2 mt-4 text-[11px] font-mono text-[#94a3b8] tracking-widest uppercase">
              <span className="text-sm">📍</span>
              <span>21°14'N 81°38'E • BHILAI / RAIPUR, INDIA</span>
            </div>
          </div>

          {/* Center Column Spacer for Cutout Portrait (4 cols) */}
          <div className="hidden lg:block lg:col-span-4 h-32" />

          {/* Right Column: Stacked Telemetry Metric Cards (3 cols) */}
          <div
            className={`hidden lg:flex lg:col-span-3 pointer-events-auto flex-col gap-3 justify-center items-end transition-all duration-700 delay-300 ${
              hasLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
            }`}
          >
            {profile.stats.map((stat, i) => (
              <div
                key={stat.label}
                onMouseEnter={() => playAudioFx('click')}
                className="w-full sm:w-auto min-w-[220px] p-4 rounded-2xl bg-[#0a1018]/85 border border-[#c5a059]/20 hover:border-[#dfbe7a] transition-all backdrop-blur-xl group/stat text-right shadow-[0_10px_30px_rgba(0,0,0,0.85)] hover:-translate-x-1"
              >
                <div className="text-[10px] text-[#94a3b8] font-mono uppercase tracking-wider flex items-center justify-end gap-2 mb-1">
                  <span>{stat.label}</span>
                  <span className="text-[10px] text-[#dfbe7a] font-bold">#0{i + 1}</span>
                </div>
                <div className="text-2xl font-mono font-bold text-white group-hover/stat:text-[#dfbe7a] transition-colors">
                  {stat.value}
                </div>
                <div className="text-[10px] text-[#64748b] font-sans mt-0.5">
                  {stat.subtext}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Quick Telemetry & Scroll Cue */}
        <div className="flex items-center justify-between pointer-events-auto pt-3 border-t border-white/5">
          <div className="flex items-center gap-2 text-[10px] font-mono text-[#64748b] uppercase tracking-widest">
            <Sparkles className="w-3 h-3 text-[#dfbe7a]" />
            <span>Awwwards & Godly Standard • Zero Vibe Coding</span>
          </div>

          <button
            onClick={handleExploreArmory}
            className="flex items-center gap-1.5 text-[11px] font-mono text-[#94a3b8] hover:text-[#dfbe7a] transition-colors cursor-pointer group"
          >
            <span className="tracking-widest uppercase">NAVIGATE EXPEDITIONS</span>
            <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
