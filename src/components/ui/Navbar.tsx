import React, { useState } from 'react';
import { Anchor, Volume2, VolumeX, Menu, X, Terminal, FileText } from 'lucide-react';
import type { PersonalProfile } from '../../data/personalConfig';
import { playAudioFx } from './AudioEngine';

interface NavbarProps {
  audioPlaying: boolean;
  onToggleAudio: () => void;
  activeSection: string;
  profile: PersonalProfile;
  onOpenTerminal: () => void;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  audioPlaying,
  onToggleAudio,
  activeSection,
  profile,
  onOpenTerminal,
  onOpenResume,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { id: 'hero', label: 'Helm' },
    { id: 'legend', label: 'Biography' },
    { id: 'armory', label: 'Tech Stack' },
    { id: 'voyages', label: 'Projects' },
    { id: 'spoils', label: 'Spoils & Certs' },
    { id: 'log', label: 'Experience' },
    { id: 'bottle', label: 'Contact' },
  ];

  const scrollTo = (id: string) => {
    playAudioFx('click');
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleToggleAudio = () => {
    playAudioFx('seal');
    onToggleAudio();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0b0906]/85 backdrop-blur-md border-b-2 border-[#c9a227]/40 shadow-[0_4px_25px_rgba(0,0,0,0.8)]">
      {/* Nautical Rope Trim Border Accent */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#a01d12] via-[#c9a227] to-[#ff7a1a]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Crest */}
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-3 text-left group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full border border-[#c9a227] bg-[#171310] flex items-center justify-center shadow-[0_0_12px_rgba(201,162,39,0.3)] group-hover:scale-105 transition-transform">
            <Anchor className="w-5 h-5 text-[#c9a227] group-hover:text-[#ff7a1a] transition-colors" />
          </div>
          <div>
            <span className="font-pirate text-xl text-[#d8c49a] group-hover:text-[#ff7a1a] transition-colors tracking-wider block leading-tight">
              {profile.name}
            </span>
            <span className="text-[10px] font-cinzel text-[#b39b6d] tracking-widest uppercase block">
              {profile.role.split('&')[0]} • 3D Portfolio
            </span>
          </div>
        </button>

        {/* Desktop Nav Links */}
        <div className="hidden lg:flex items-center gap-5">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-xs font-cinzel tracking-wider uppercase transition-all duration-300 relative py-1 cursor-pointer ${
                  isActive
                    ? 'text-[#ff7a1a] font-bold drop-shadow-[0_0_8px_#ff7a1a]'
                    : 'text-[#e8dcc0]/80 hover:text-[#c9a227]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#c9a227] to-[#ff7a1a]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Tactical Actions: Terminal, Resume, Audio Toggle & Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* CLI Terminal Button */}
          <button
            onClick={() => {
              playAudioFx('click');
              onOpenTerminal();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#171310] hover:bg-[#a01d12]/40 text-[#ffd56b] hover:text-white border border-[#c9a227]/60 hover:border-[#ffd56b] rounded-full text-xs font-cinzel cursor-pointer transition-all shadow-sm"
            title="Open Captain's CLI Terminal (~ or Ctrl+K)"
          >
            <Terminal className="w-3.5 h-3.5 text-[#ff7a1a]" />
            <span className="hidden sm:inline">CLI</span>
          </button>

          {/* Parchment Resume Button */}
          <button
            onClick={() => {
              playAudioFx('seal');
              onOpenResume();
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#171310] hover:bg-[#a01d12]/40 text-[#d8c49a] hover:text-[#ffd56b] border border-[#8b5a2b] hover:border-[#ffd56b] rounded-full text-xs font-cinzel cursor-pointer transition-all shadow-sm"
            title="Open Official Curriculum Vitae"
          >
            <FileText className="w-3.5 h-3.5 text-[#ff7a1a]" />
            <span className="hidden sm:inline">Resume</span>
          </button>

          {/* Sea Soundscape Wax Seal Button */}
          <button
            onClick={handleToggleAudio}
            className="flex items-center gap-2 px-3.5 py-1.5 wax-seal rounded-full text-xs font-cinzel text-[#e8dcc0] cursor-pointer hover:shadow-[0_0_15px_#ff7a1a] transition-all"
            title={audioPlaying ? 'Mute Sea Waves' : 'Play Ocean Ambience'}
          >
            {audioPlaying ? (
              <>
                <Volume2 className="w-4 h-4 text-[#ff7a1a] animate-pulse" />
                <span className="hidden sm:inline text-[#d8c49a]">Sound ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-[#b39b6d]" />
                <span className="hidden sm:inline text-[#b39b6d]">Sound</span>
              </>
            )}
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-[#c9a227] hover:text-[#ff7a1a] cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0b0906]/98 border-b-2 border-[#c9a227]/50 px-6 py-6 space-y-3 font-cinzel">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="block w-full text-left text-sm text-[#e8dcc0] hover:text-[#ff7a1a] py-1.5 border-b border-[#281d13]"
            >
              ⚓ {link.label}
            </button>
          ))}
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenTerminal();
              }}
              className="flex-1 py-2 bg-[#171310] border border-[#c9a227] rounded text-xs text-[#ffd56b] flex items-center justify-center gap-1.5"
            >
              <Terminal className="w-3.5 h-3.5 text-[#ff7a1a]" /> Open CLI
            </button>
            <button
              onClick={() => {
                setMobileOpen(false);
                onOpenResume();
              }}
              className="flex-1 py-2 wax-seal rounded text-xs text-[#e8dcc0] flex items-center justify-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-[#ff7a1a]" /> View Resume
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};
