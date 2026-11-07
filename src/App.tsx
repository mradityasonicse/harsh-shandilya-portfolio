import React, { useState, useEffect } from 'react';
import { PERSONAL_CONFIG } from './data/personalConfig';
import { ThreeOceanScene } from './components/canvas/ThreeOceanScene';
import { Navbar } from './components/ui/Navbar';
import { CustomCursor } from './components/ui/CustomCursor';
import { AudioEngine } from './components/ui/AudioEngine';
import { HeroSection } from './components/sections/HeroSection';
import { AboutSection } from './components/sections/AboutSection';
import { SkillsSection } from './components/sections/SkillsSection';
import { ProjectsSection } from './components/sections/ProjectsSection';
import { AchievementsSection } from './components/sections/AchievementsSection';
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ContactSection } from './components/sections/ContactSection';
import { FooterSection } from './components/sections/FooterSection';
import { CaptainTerminal } from './components/ui/CaptainTerminal';
import { ResumeModal } from './components/ui/ResumeModal';
import { SoundboardBar } from './components/ui/SoundboardBar';
import { VoyageHUD } from './components/ui/VoyageHUD';

export const App: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const profile = PERSONAL_CONFIG;

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? Math.min(Math.max(currentScroll / totalScroll, 0), 1) : 0;
      setScrollProgress(progress);

      const sections = ['hero', 'legend', 'armory', 'voyages', 'spoils', 'log', 'bottle'];
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
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Global hotkeys for Captain's Terminal & Modals
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~' || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        setIsTerminalOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setIsTerminalOpen(false);
        setIsResumeOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleExplore = () => {
    const el = document.getElementById('voyages');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#05080c] text-[#f1f5f9] font-sans selection:bg-[#c5a059]/30 selection:text-[#dfbe7a] overflow-x-hidden">
      {/* 1. Procedural 3D WebGL Ocean Canvas (Fixed in Background) */}
      <ThreeOceanScene scrollProgress={scrollProgress} />

      {/* 2. Custom Gold Compass Cursor */}
      <CustomCursor />

      {/* 3. Procedural Web Audio Ocean Soundscape */}
      <AudioEngine isPlaying={audioPlaying} />

      {/* 4. Cinematic Burnt Vignette Overlay */}
      <div className="fixed inset-0 vignette-overlay z-20 pointer-events-none" />

      {/* 5. Nautical Rope Navigation Bar */}
      <Navbar
        audioPlaying={audioPlaying}
        onToggleAudio={() => setAudioPlaying(!audioPlaying)}
        activeSection={activeSection}
        profile={profile}
        onOpenTerminal={() => setIsTerminalOpen(true)}
        onOpenResume={() => setIsResumeOpen(true)}
      />

      {/* 6. Main Voyage Sections Powered by Personal Profile */}
      <main className="relative z-10 flex flex-col space-y-16 md:space-y-24">
        <HeroSection
          profile={profile}
          onExplore={handleExplore}
          onOpenResume={() => setIsResumeOpen(true)}
        />
        <AboutSection profile={profile} />
        <SkillsSection profile={profile} />
        <ProjectsSection profile={profile} />
        <AchievementsSection profile={profile} />
        <ExperienceSection profile={profile} />
        <ContactSection
          profile={profile}
          onOpenResume={() => setIsResumeOpen(true)}
        />
      </main>

      {/* 7. Pirate Code Footer */}
      <FooterSection />

      {/* 8. ADD-ON: Captain's Command Bridge CLI Terminal */}
      <CaptainTerminal
        isOpen={isTerminalOpen}
        onClose={() => setIsTerminalOpen(false)}
        onOpenResume={() => setIsResumeOpen(true)}
        profile={profile}
      />

      {/* 9. ADD-ON: Official Parchment Printable Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        profile={profile}
      />

      {/* 10. ADD-ON: Floating Nautical Soundboard FX Bar (Bottom Right) */}
      <SoundboardBar
        ambientPlaying={audioPlaying}
        onToggleAmbient={() => setAudioPlaying(!audioPlaying)}
      />

      {/* 11. ADD-ON: Floating Voyage Coordinates & Compass HUD (Bottom Left) */}
      <VoyageHUD
        scrollProgress={scrollProgress}
        activeSection={activeSection}
      />
    </div>
  );
};

export default App;
