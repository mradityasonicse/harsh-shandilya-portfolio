import React, { useState, useEffect } from 'react';
import type { PersonalProfile } from '../../data/personalConfig';
import { ChevronDown, FileText, Shield, Compass, Sparkles } from 'lucide-react';
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

  useEffect(() => {
    const timer = setTimeout(() => setHasLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

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

  // Determine photo path with graceful local fallbacks
  const primaryPhoto = profile.photoUrl || '/profile-photo.svg';
  const fallbackPhoto = '/profile-photo.svg';

  return (
    <section
      id="hero"
      aria-label="Introduction Hero Poster"
      className="min-h-screen relative flex flex-col justify-between pt-28 sm:pt-24 pb-8 px-4 sm:px-6 md:px-10 lg:px-14 overflow-hidden z-10 selection:bg-[#dc2626]/30"
    >
      {/* ============================================================ */}
      {/* 1. DRAMATIC BACKGROUND TYPOGRAPHY: "HARSH"                   */}
      {/* Rendered BEHIND the foreground portrait (z-10)               */}
      {/* ============================================================ */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-10 overflow-hidden"
      >
        <span
          className="font-black uppercase tracking-normal leading-none transition-all duration-1000 transform will-change-transform"
          style={{
            fontFamily: "'Bebas Neue', 'Anton', Impact, sans-serif",
            fontSize: 'clamp(75px, 22vw, 430px)',
            color: '#dc2626',
            backgroundImage: 'linear-gradient(180deg, #f87171 0%, #dc2626 40%, #991b1b 80%, #450a0a 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '0.04em',
            filter: 'drop-shadow(0 25px 60px rgba(220, 38, 38, 0.35))',
            opacity: hasLoaded ? 0.95 : 0,
            transform: hasLoaded ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.96)',
          }}
        >
          HARSH
        </span>
      </div>

      {/* Subtle Atmospheric Stage Spotlight */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] sm:w-[950px] sm:h-[950px] rounded-full pointer-events-none z-5"
        style={{
          background: 'radial-gradient(circle, rgba(220, 38, 38, 0.12) 0%, rgba(223, 190, 122, 0.04) 50%, transparent 72%)',
          filter: 'blur(70px)',
        }}
      />

      {/* ============================================================ */}
      {/* 2. FOREGROUND PORTRAIT (z-20) OVERLAPPING "HARSH"            */}
      {/* ============================================================ */}
      <div
        className="absolute inset-x-0 bottom-0 flex justify-center items-end pointer-events-none z-20 overflow-hidden"
        style={{
          height: '78vh',
          maxHeight: '720px',
        }}
      >
        <div
          className={`relative h-full flex items-end justify-center transition-all duration-1000 delay-150 ${
            hasLoaded ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-98'
          }`}
        >
          {!imgError ? (
            <img
              src={primaryPhoto}
              alt={`${profile.name} - ${profile.role}`}
              onError={() => setImgError(true)}
              className="h-full w-auto max-w-[90vw] md:max-w-[540px] lg:max-w-[640px] object-contain object-bottom drop-shadow-[0_30px_70px_rgba(0,0,0,0.98)]"
              style={{
                maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
              }}
            />
          ) : (
            /* Elegant Fallback Silhouette if no user portrait is supplied yet */
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
      {/* 3. EDITORIAL POSTER CONTENT COLUMNS (z-30)                   */}
      {/* Matches the composition of the reference photo               */}
      {/* ============================================================ */}
      <div className="relative z-30 w-full max-w-7xl mx-auto flex-1 flex flex-col justify-between pointer-events-none pt-4">
        {/* Top Status Bar & Location */}
        <div
          className={`flex items-center justify-between pointer-events-auto transition-all duration-700 ${
            hasLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0a0f18]/80 border border-[#dfbe7a]/30 backdrop-blur-md shadow-lg">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#10b981] animate-pulse" />
            <span className="text-[11px] font-mono text-[#dfbe7a] uppercase tracking-wider font-semibold">
              ACTIVE COMMISSION • SYSTEMS ARCHITECT
            </span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-2 text-[11px] font-mono text-[#94a3b8] tracking-widest uppercase">
            <span>{profile.location.split('•')[0].trim()}</span>
          </div>
        </div>

        {/* Main Grid: Left Column (Bio & CTAs) + Right Column (Metrics) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto py-6">
          {/* Left Column: Greeting, Name, Role, CTAs */}
          <div
            className={`lg:col-span-5 pointer-events-auto transition-all duration-700 delay-200 ${
              hasLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
            }`}
          >
            {/* "Hello, I'm" */}
            <div className="text-base sm:text-lg font-serif italic text-[#fca5a5] tracking-wide mb-1 flex items-center gap-2">
              <span>Hello, I'm</span>
              <span className="inline-block w-8 h-[1px] bg-[#fca5a5]/40" />
            </div>

            {/* Giant White Name matching Reference Image */}
            <h1 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-black text-white tracking-tight uppercase leading-[0.88] drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]" style={{ fontFamily: "'Bebas Neue', 'Anton', Impact, sans-serif" }}>
              HARSH<br />
              <span className="text-white">SHANDILYA.</span>
            </h1>

            {/* Solid Red Accent Badge matching Reference Image */}
            <div className="inline-block mt-2 sm:mt-3 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-md bg-[#dc2626] text-white font-mono text-[10px] sm:text-xs font-black uppercase tracking-wider shadow-[0_4px_16px_rgba(220,38,38,0.45)]">
              SYSTEMS ARCHITECT & FULL-STACK
            </div>

            {/* Tagline / Bio Excerpt */}
            <p className="mt-2.5 sm:mt-4 text-[11px] sm:text-sm text-[#cbd5e1] font-sans leading-relaxed max-w-md drop-shadow-md">
              "{profile.tagline}"
            </p>

            {/* Tactical CTA Buttons */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-4 sm:mt-6">
              <button
                onClick={handleInspect}
                data-cursor="EXPEDITIONS"
                className="flex items-center gap-1.5 sm:gap-2 px-4 sm:px-6 py-2.5 sm:py-3.5 bg-[#dc2626] hover:bg-[#ef4444] text-white rounded-xl text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider shadow-[0_10px_25px_rgba(220,38,38,0.5)] hover:shadow-[0_14px_32px_rgba(220,38,38,0.7)] transition-all cursor-pointer group"
              >
                <Compass className="w-3.5 h-3.5 group-hover:rotate-45 transition-transform duration-300" />
                Explore Expeditions
                <span className="text-[#fca5a5] font-black text-xs sm:text-sm">+</span>
              </button>

              <button
                onClick={handleExploreArmory}
                data-cursor="ARMORY"
                className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2.5 sm:py-3.5 bg-[#0a0f18]/85 hover:bg-[#121926] text-[#dfbe7a] border border-[#dfbe7a]/30 hover:border-[#dfbe7a]/60 rounded-xl text-[11px] sm:text-xs font-mono font-semibold uppercase tracking-wider backdrop-blur-md transition-all cursor-pointer"
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
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 sm:py-3.5 bg-[#0a0f18]/60 hover:bg-[#121926] text-[#94a3b8] hover:text-[#f1f5f9] border border-white/10 hover:border-white/20 rounded-xl text-[11px] sm:text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  CV
                </button>
              )}
            </div>

            {/* Location Tag with Flag matching Reference Image */}
            <div className="flex items-center gap-2 mt-4 text-[11px] font-mono text-[#94a3b8] tracking-widest uppercase">
              <span className="text-sm">🇮🇳</span>
              <span>NEW DELHI / RAIPUR, INDIA</span>
            </div>
          </div>

          {/* Center Column Spacer (Foreground Portrait sits here) */}
          <div className="hidden lg:block lg:col-span-4 h-32" />

          {/* Right Column: Stacked Telemetry Metrics (Desktop & Tablets, Matches reference photo) */}
          <div
            className={`hidden lg:flex lg:col-span-3 pointer-events-auto flex-col gap-3 justify-center items-end transition-all duration-700 delay-300 ${
              hasLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
            }`}
          >
            {profile.stats.map((stat, i) => (
              <div
                key={stat.label}
                className="w-full sm:w-auto min-w-[200px] p-3 rounded-xl bg-[#0a0f18]/70 border border-white/5 hover:border-[#dc2626]/40 transition-all backdrop-blur-md group/stat text-left lg:text-right"
              >
                <div className="text-[10px] text-[#94a3b8] font-mono uppercase tracking-wider flex items-center justify-between lg:justify-end gap-2">
                  <span>{stat.label}</span>
                  <span className="text-[9px] text-[#dc2626] font-bold">0{i + 1}</span>
                </div>
                <div className="text-xl sm:text-2xl font-mono font-bold text-white group-hover/stat:text-[#dfbe7a] transition-colors mt-0.5">
                  {stat.value}
                </div>
                <div className="text-[10px] text-[#64748b] font-sans">
                  {stat.subtext}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar: Scroll Navigation Prompt */}
        <div className="flex items-center justify-between pointer-events-auto pt-2 border-t border-white/5">
          <div className="flex items-center gap-2 text-[10px] font-mono text-[#64748b] uppercase tracking-widest">
            <Sparkles className="w-3 h-3 text-[#dfbe7a]" />
            <span>SCROLL TO EXPLORE EXPEDITIONS</span>
          </div>

          <button
            onClick={handleExploreArmory}
            className="flex items-center gap-1.5 text-[11px] font-mono text-[#94a3b8] hover:text-[#dfbe7a] transition-colors cursor-pointer group"
          >
            <span className="tracking-widest uppercase">NAVIGATE FLEET</span>
            <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
};
