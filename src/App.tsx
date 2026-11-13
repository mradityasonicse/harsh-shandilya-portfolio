import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PERSONAL_CONFIG, INTRO_CONFIG } from './data/personalConfig';
import { SECTION_SEO } from './data/seoConfig';
import { ModernistDotGrid } from './components/canvas/ModernistDotGrid';
import { Navbar } from './components/ui/Navbar';
import { NYCTickerBanner } from './components/ui/NYCTickerBanner';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ResumeSection } from './components/sections/ResumeSection';
import { ContactSection } from './components/sections/ContactSection';
import { FooterSection } from './components/sections/FooterSection';
import { ResumeModal } from './components/ui/ResumeModal';
import { CinematicPreloader } from './components/ui/CinematicPreloader';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nyc_portfolio_theme');
      if (saved) return saved === 'dark';
    }
    return false;
  });
  const profile = PERSONAL_CONFIG;

  // Sync theme with document class & localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('nyc_portfolio_theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('nyc_portfolio_theme', 'light');
    }
  }, [isDark]);

  // Synchronize document title and description with active view / modal
  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (isResumeOpen) {
      document.title = 'Official Resume & Credentials | Harsh Kumar Shandilya';
      return;
    }

    const currentSeo = SECTION_SEO[activeSection] || SECTION_SEO.hero;
    document.title = currentSeo.title;

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', currentSeo.description);
    }
  }, [activeSection, isResumeOpen]);

  // Initialize Lenis Inertia Smooth Scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    window.__lenis = lenis;

    lenis.on('scroll', () => {
      ScrollTrigger.update();

      const sections = [
        'hero',
        'about',
        'skills',
        'projects',
        'experience',
        'resume',
        'contact'
      ];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.45) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    });

    const updateRaf = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateRaf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateRaf);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  // Global hotkeys for Modal close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsResumeOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleExplore = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo('#projects');
    } else {
      const el = document.getElementById('projects');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen font-sans bg-[var(--canvas-bg)] text-[var(--text-primary)] transition-colors duration-300 selection:bg-[#112d24]/20 selection:text-[#112d24] overflow-x-hidden">
      {/* 0. Cinematic Preloader (Disabled by default) */}
      {INTRO_CONFIG.enabled && (
        <CinematicPreloader
          ownerName={INTRO_CONFIG.ownerName || profile.name}
          durationMs={INTRO_CONFIG.durationMs}
        />
      )}

      {/* 1. The Modernist Dot Matrix Grid Canvas (Static Grid + Cursor Spotlight) */}
      <ModernistDotGrid isDark={isDark} />

      {/* 2. Precision Navigation Bar with Theme Switcher */}
      <Navbar
        activeSection={activeSection}
        profile={profile}
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* 3. Main Flow: Home -> About -> Skills -> Projects -> Experience -> Resume -> Contact */}
      <main className="relative z-10 flex flex-col">
        {/* 1. Home */}
        <HeroSection
          profile={profile}
          onExplore={handleExplore}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* NYC Flowing Marquee Ticker */}
        <NYCTickerBanner />

        {/* 2. About */}
        <AboutSection profile={profile} />

        {/* 3. Skills */}
        <SkillsSection profile={profile} />

        {/* 4. Projects */}
        <ProjectsSection profile={profile} />

        {/* 5. Experience */}
        <ExperienceSection profile={profile} />

        {/* 6. Resume */}
        <ResumeSection
          profile={profile}
          onOpenResume={() => setIsResumeOpen(true)}
        />

        {/* 7. Contact */}
        <ContactSection
          profile={profile}
          onOpenResume={() => setIsResumeOpen(true)}
        />
      </main>

      {/* 4. Footer */}
      <FooterSection />

      {/* 5. Official Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        profile={profile}
      />
    </div>
  );
};

export default App;
