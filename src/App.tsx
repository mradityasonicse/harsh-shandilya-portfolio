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
import { ExperienceSection } from './components/sections/ExperienceSection';
import { ContactSection } from './components/sections/ContactSection';
import { FooterSection } from './components/sections/FooterSection';

export const App: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [audioPlaying, setAudioPlaying] = useState(false);
  const profile = PERSONAL_CONFIG;

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;
      const progress = totalScroll > 0 ? Math.min(Math.max(currentScroll / totalScroll, 0), 1) : 0;
      setScrollProgress(progress);

      const sections = ['hero', 'legend', 'armory', 'voyages', 'log', 'bottle'];
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

  const handleExplore = () => {
    const el = document.getElementById('voyages');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#0b0906] text-[#e8dcc0] font-fell selection:bg-[#a01d12] selection:text-[#d8c49a] overflow-x-hidden">
      {/* 1. Procedural 3D WebGL Ocean Canvas (Fixed in Background) */}
      <ThreeOceanScene scrollProgress={scrollProgress} />

      {/* 2. Custom Gold Compass Cursor */}
      <CustomCursor />

      {/* 3. Procedural Web Audio Ocean Soundscape */}
      <AudioEngine isPlaying={audioPlaying} />

      {/* 4. Cinematic Burnt Vignette Overlay */}
      <div className="fixed inset-0 vignette-overlay z-20 pointer-events-none" />

      {/* 6. Nautical Rope Navigation Bar */}
      <Navbar
        audioPlaying={audioPlaying}
        onToggleAudio={() => setAudioPlaying(!audioPlaying)}
        activeSection={activeSection}
        profile={profile}
      />

      {/* 7. Main Voyage Sections Powered by Personal Profile */}
      <main className="relative z-10 flex flex-col space-y-16 md:space-y-24">
        <HeroSection
          profile={profile}
          onExplore={handleExplore}
        />
        <AboutSection profile={profile} />
        <SkillsSection profile={profile} />
        <ProjectsSection profile={profile} />
        <ExperienceSection profile={profile} />
        <ContactSection profile={profile} />
      </main>

      {/* 8. Pirate Code Footer */}
      <FooterSection />
    </div>
  );
};

export default App;
