import React, { useState, useEffect } from 'react';
import type { PersonalProfile } from '../../data/personalConfig';
import { ChevronDown, FileText, ArrowUpRight, Zap, Code2, Trophy, Cloud, ShieldCheck, GraduationCap } from 'lucide-react';

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

  const handleViewMyWork = () => {
    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.scrollTo('#projects');
    } else {
      const el = document.getElementById('projects');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleContactMe = () => {
    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.scrollTo('#contact');
    } else {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const primaryPhoto = profile.photoUrl || '/profile-photo.svg';
  const fallbackPhoto = '/profile-photo.svg';

  return (
    <section
      id="hero"
      aria-label="Introduction Hero Poster"
      className="relative min-h-[88vh] sm:min-h-screen flex flex-col justify-center pt-20 sm:pt-24 pb-6 sm:pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden"
    >
      {/* 1. REAL PROFILE PHOTO CUTOUT - STEADY & CLEAN (Desktop Centered Channel, Hidden on Mobile for Crisp Contrast) */}
      <div
        className="hidden lg:flex absolute inset-x-0 bottom-0 justify-center items-end pointer-events-none z-20 overflow-hidden"
        style={{
          height: '76vh',
          maxHeight: '740px',
        }}
      >
        <div
          className={`relative h-full flex items-end justify-center transition-all duration-700 ${
            hasLoaded ? 'opacity-100' : 'opacity-0 translate-y-8'
          }`}
        >
          {!imgError ? (
            <img
              src={primaryPhoto}
              alt={`${profile.name} - ${profile.role}`}
              onError={() => setImgError(true)}
              className="h-full w-auto max-w-[460px] object-contain object-bottom drop-shadow-[0_25px_60px_rgba(0,0,0,0.12)] dark:drop-shadow-[0_30px_80px_rgba(0,0,0,0.95)]"
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
                className="w-full h-auto object-contain object-bottom opacity-80 drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_20px_40px_rgba(0,0,0,0.9)]"
              />
            </div>
          )}
        </div>
      </div>

      {/* 2. HERO CONTENT ARCHITECTURE (z-30) */}
      <div className="relative z-30 w-full max-w-7xl mx-auto flex flex-col gap-6 sm:gap-8 pointer-events-none pt-2">
        {/* Main 12-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center py-2 sm:py-4">
          {/* Left Column: Heading, Role, Tagline, CTAs (5 cols) */}
          <div
            className={`lg:col-span-5 pointer-events-auto transition-all duration-700 delay-200 ${
              hasLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-6'
            }`}
          >
            {/* Role subtitle & status badge */}
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="nyc-badge-pill">
                <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
                Cybersecurity & Software Developer
              </span>
            </div>

            {/* Monumental Editorial Heading (H1) — NYC Kinetic Text Reveal: Grotesque + Instrument Serif Italic */}
            <h1
              className="text-4xl sm:text-6xl md:text-7xl lg:text-7.5xl font-black text-[#173f32] dark:text-[#faf8f1] uppercase leading-[0.92] tracking-[-0.035em]"
              style={{
                fontFamily: 'var(--font-sans), sans-serif',
                fontWeight: 900,
              }}
            >
              <span className="nyc-word-mask mr-3 sm:mr-4">
                <span className="nyc-word-reveal nyc-delay-1">HARSH</span>
              </span>
              <span className="nyc-word-mask">
                <span className="nyc-word-reveal nyc-delay-2">KUMAR</span>
              </span>
              <br />
              <span className="nyc-word-mask mt-1 sm:mt-1.5">
                <span
                  className="nyc-word-reveal nyc-delay-3 font-serif italic font-normal text-[#173f32] dark:text-[#e4f1eb] normal-case"
                  style={{
                    fontFamily: 'var(--font-serif), Georgia, serif',
                  }}
                >
                  Shandilya
                </span>
              </span>
            </h1>

            {/* Sub-role & University: Crisp & High Contrast */}
            <div className="mt-3.5 flex flex-wrap items-center gap-2 text-xs sm:text-sm font-semibold text-[#284e40] dark:text-[#c2dfd4] tracking-wide uppercase">
              <span className="text-[#173f32] dark:text-[#faf8f1] font-bold">B.TECH CSE (CYBER SECURITY)</span>
              <span className="text-[#4a685b] dark:text-[#7ba192]">•</span>
              <span className="text-[#284e40] dark:text-[#c2dfd4]">RUNGTA UNIVERSITY</span>
            </div>

            {/* Bio statement: High-Contrast, Crystal Clear */}
            <p className="mt-3.5 text-base sm:text-lg text-[#284e40] dark:text-[#c2dfd4] font-sans leading-relaxed max-w-lg font-normal">
              "{profile.tagline}"
            </p>

            {/* Clean NYC Action Buttons - High Contrast, Rounded Pill Geometry */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-3.5 mt-5 sm:mt-7">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  handleViewMyWork();
                }}
                className="nyc-btn-primary group w-full sm:w-auto inline-flex items-center justify-center gap-2"
                aria-label="View featured projects section"
              >
                <Code2 className="w-4 h-4 text-emerald-400 dark:text-[#071510]" />
                <span>View My Work</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </a>

              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  handleContactMe();
                }}
                className="nyc-btn-secondary group flex-1 sm:flex-initial inline-flex items-center justify-center gap-2"
                aria-label="Contact Harsh Kumar Shandilya"
              >
                <Zap className="w-4 h-4 text-amber-500 group-hover:scale-110 transition-transform" />
                <span>Contact Me</span>
              </a>

              {onOpenResume && (
                <button
                  onClick={onOpenResume}
                  className="nyc-btn-secondary group flex-1 sm:flex-initial inline-flex items-center justify-center gap-2"
                  aria-label="Open printable resume modal"
                >
                  <FileText className="w-4 h-4 text-[#4a685b] dark:text-[#a0c2b5]" />
                  <span>Resume</span>
                </button>
              )}
            </div>

            {/* Location coordinates - Crisp & Legible */}
            <div className="flex items-center gap-2 mt-4 text-xs font-medium text-[#4a685b] dark:text-[#9fc1b4] tracking-wide">
              <span className="text-sm">📍</span>
              <span className="font-semibold text-[#173f32] dark:text-[#faf8f1]">{profile.location}</span>
            </div>

            {/* Mobile / Tablet Credentials Bento Grid (2x2 Grid) */}
            <div className="lg:hidden grid grid-cols-2 gap-2.5 mt-5">
              {profile.stats.map((stat, i) => {
                const getIcon = (idx: number) => {
                  switch (idx) {
                    case 0: return <Trophy className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />;
                    case 1: return <Cloud className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />;
                    case 2: return <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />;
                    case 3: return <GraduationCap className="w-3.5 h-3.5 text-[#173f32] dark:text-[#34d399]" />;
                    default: return null;
                  }
                };

                return (
                  <div
                    key={`mob-${stat.label}`}
                    className="p-3 sm:p-3.5 rounded-2xl bg-white/95 dark:bg-[#0e241c]/90 border border-[#173f32]/12 dark:border-[#faf8f1]/10 shadow-xs"
                  >
                    <div className="text-[10px] text-[#4a685b] dark:text-[#a0c2b5] font-mono uppercase tracking-wider flex items-center justify-between mb-1 font-semibold">
                      <span className="flex items-center gap-1">{getIcon(i)} {stat.label}</span>
                      <span className="text-[#173f32] dark:text-[#34d399] font-bold">#0{i + 1}</span>
                    </div>
                    <div className="text-sm sm:text-base font-bold text-[#173f32] dark:text-[#faf8f1] leading-tight">
                      {stat.value}
                    </div>
                    <div className="text-[10px] text-[#4a685b] dark:text-[#a0c2b5] font-sans mt-0.5 font-medium truncate">
                      {stat.subtext}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Center Column Spacer for Cutout Portrait (4 cols) */}
          <div className="hidden lg:block lg:col-span-4 h-32" />

          {/* Right Column: Stacked Architectural Metric Cards (3 cols) */}
          <div
            className={`hidden lg:flex lg:col-span-3 pointer-events-auto flex-col gap-3 justify-center items-end transition-all duration-700 delay-300 ${
              hasLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-6'
            }`}
          >
            {profile.stats.map((stat, i) => {
              const getIcon = (idx: number) => {
                switch (idx) {
                  case 0: return <Trophy className="w-4 h-4 text-amber-600 dark:text-amber-400" />;
                  case 1: return <Cloud className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />;
                  case 2: return <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />;
                  case 3: return <GraduationCap className="w-4 h-4 text-[#173f32] dark:text-[#34d399]" />;
                  default: return null;
                }
              };

              return (
                <div
                  key={stat.label}
                  className="w-full sm:w-auto min-w-[220px] p-4 rounded-2xl bg-white/95 dark:bg-[#0e241c]/90 border border-[#173f32]/12 dark:border-[#faf8f1]/10 hover:border-[#173f32]/35 dark:hover:border-[#34d399]/40 transition-all backdrop-blur-xl group/stat text-right shadow-[0_4px_20px_rgba(23,63,50,0.04)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:-translate-x-1"
                >
                  <div className="text-xs text-[#4a685b] dark:text-[#a0c2b5] font-mono uppercase tracking-wider flex items-center justify-end gap-2 mb-1.5 font-semibold">
                    <span className="flex items-center gap-1.5">{getIcon(i)} {stat.label}</span>
                    <span className="text-xs text-[#173f32] dark:text-[#34d399] font-bold">#0{i + 1}</span>
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-[#173f32] dark:text-[#faf8f1] transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[#4a685b] dark:text-[#a0c2b5] font-sans mt-0.5 font-medium">
                    {stat.subtext}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar: Clean Status & Scroll Cue - Zero Blinking Dots */}
        <div className="flex items-center justify-between pointer-events-auto pt-3 mt-2 sm:mt-4 border-t border-[#173f32]/12 dark:border-[#faf8f1]/10">
          <div className="flex items-center gap-2 text-[10px] font-mono text-[#4a685b] dark:text-[#a0c2b5] uppercase tracking-widest font-semibold">
            <span>AVAILABLE FOR INTERNSHIPS & ROLES</span>
          </div>

          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              onExplore();
            }}
            className="flex items-center gap-1.5 text-[11px] font-mono text-[#173f32] hover:text-[#102d24] dark:text-[#c2dfd4] dark:hover:text-white transition-colors cursor-pointer group active:scale-95 font-semibold"
            aria-label="Scroll down to featured projects"
          >
            <span className="tracking-widest uppercase">SCROLL TO EXPLORE</span>
            <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};
