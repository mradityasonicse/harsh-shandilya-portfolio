import React, { useState } from 'react';
import { Compass, Volume2, VolumeX, Menu, X, FileText } from 'lucide-react';
import type { PersonalProfile } from '../../data/personalConfig';
import { playAudioFx } from './AudioEngine';

interface NavbarProps {
  audioPlaying: boolean;
  onToggleAudio: () => void;
  activeSection: string;
  profile: PersonalProfile;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  audioPlaying,
  onToggleAudio,
  activeSection,
  profile,
  onOpenResume,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'resume', label: 'Resume' },
    { id: 'contact', label: 'Contact' },
  ];

  const scrollTo = (id: string) => {
    playAudioFx('click');
    setMobileOpen(false);
    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.scrollTo('#' + id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleToggleAudio = () => {
    playAudioFx('seal');
    onToggleAudio();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#05080c]/85 backdrop-blur-xl border-b border-[#c5a059]/20 shadow-[0_4px_30px_rgba(0,0,0,0.85)]">
      {/* Top Hairline Brass Accent */}
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-[#dfbe7a]/60 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Naval Astrolabe Emblem */}
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-3 text-left group cursor-pointer focus:outline-none"
        >
          <div className="w-9 h-9 rounded-full border border-[#c5a059]/40 bg-[#0e1622] flex items-center justify-center shadow-[0_0_15px_rgba(197,160,89,0.2)] group-hover:border-[#dfbe7a] transition-all">
            <Compass className="w-4 h-4 text-[#dfbe7a] group-hover:rotate-45 transition-transform duration-500" />
          </div>
          <div>
            <span className="font-heading font-medium text-base text-[#f1f5f9] group-hover:text-[#dfbe7a] transition-colors tracking-tight block leading-tight">
              {profile.name}
            </span>
            <span className="text-[10px] font-mono text-[#94a3b8] tracking-widest uppercase block">
              {profile.role} • 21°14'N
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links: Space Grotesk Medium 500 */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-xs font-heading font-medium tracking-wider uppercase transition-all duration-200 relative py-1 cursor-pointer ${
                  isActive
                    ? 'text-[#dfbe7a] font-semibold drop-shadow-[0_0_10px_rgba(223,190,122,0.4)]'
                    : 'text-[#94a3b8] hover:text-[#f1f5f9]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#c5a059] to-[#dfbe7a] rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Action HUD Controls: CV, Audio & Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Curriculum Vitae (Print/View) */}
          <button
            onClick={() => {
              playAudioFx('seal');
              onOpenResume();
            }}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg brass-btn text-xs font-heading font-bold cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Dossier / CV</span>
            <span className="sm:hidden">CV</span>
          </button>

          {/* Discreet Ocean Ambience Audio Toggle */}
          <button
            onClick={handleToggleAudio}
            title={audioPlaying ? 'Mute Ocean Ambience' : 'Play Ocean Ambience'}
            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
              audioPlaying
                ? 'border-[#dfbe7a] bg-[#dfbe7a]/15 text-[#dfbe7a] shadow-[0_0_12px_rgba(223,190,122,0.4)]'
                : 'border-[#c5a059]/30 bg-[#0e1622] text-[#94a3b8] hover:text-[#f1f5f9]'
            }`}
          >
            {audioPlaying ? (
              <Volume2 className="w-4 h-4 animate-pulse" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-8 h-8 rounded-lg border border-[#c5a059]/30 bg-[#0e1622] flex items-center justify-center text-[#dfbe7a] cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#090e17] border-b border-[#c5a059]/30 px-6 py-5 space-y-3">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`block w-full text-left py-2 text-sm font-heading tracking-widest uppercase transition-colors ${
                  isActive ? 'text-[#dfbe7a] font-bold' : 'text-[#94a3b8] hover:text-white'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
};
