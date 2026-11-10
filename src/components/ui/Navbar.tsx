import React, { useState } from 'react';
import type { PersonalProfile } from '../../data/personalConfig';
import { Menu, X, ArrowUpRight, FileText } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  profile: PersonalProfile;
  onOpenResume: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
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
    setMobileOpen(false);
    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.scrollTo('#' + id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#faf8f1]/90 dark:bg-[#071510]/90 backdrop-blur-xl border-b border-[#173f32]/12 dark:border-[#faf8f1]/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">
        {/* Brand Emblem: Photo Avatar + Full Name */}
        <button
          onClick={() => scrollTo('hero')}
          className="flex items-center gap-2.5 sm:gap-3 text-left group cursor-pointer focus:outline-none min-w-0"
          title={profile.name}
        >
          {/* Circular Photo Avatar Logo - Clean Hairline Border, Zero Blinking Dots */}
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full p-[2px] border border-[#173f32]/20 dark:border-[#faf8f1]/20 bg-white dark:bg-[#0e241c] shadow-xs group-hover:scale-105 transition-transform duration-200 shrink-0">
            <div className="w-full h-full rounded-full overflow-hidden bg-[#f5f2e8] dark:bg-[#071510] flex items-center justify-center">
              <img
                src="/profile-photo.jpg"
                alt={profile.name}
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/profile-photo.svg';
                }}
              />
            </div>
          </div>

          {/* Name & Subtitle - Zero Awkward Wrapping */}
          <div className="flex flex-col min-w-0 justify-center">
            <span className="font-heading text-xs xs:text-sm sm:text-base lg:text-lg font-bold tracking-tight text-[#173f32] dark:text-[#faf8f1] group-hover:opacity-80 transition-opacity whitespace-nowrap leading-tight">
              HARSH KUMAR SHANDILAYA
            </span>
            <span className="text-[9px] xs:text-[10px] sm:text-[11px] font-mono tracking-wider text-[#4a685b] dark:text-[#9fc1b4] uppercase mt-0.5 block font-medium whitespace-nowrap leading-none">
              <span className="sm:hidden">Cybersecurity &amp; Dev</span>
              <span className="hidden sm:inline">Cybersecurity &amp; Software Developer</span>
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-[13px] font-sans transition-all duration-200 relative py-1 cursor-pointer tracking-tight ${
                  isActive
                    ? 'text-[#173f32] dark:text-[#faf8f1] font-bold'
                    : 'text-[#4a685b] hover:text-[#173f32] dark:text-[#9fc1b4] dark:hover:text-[#faf8f1] font-medium'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-[#173f32] dark:bg-[#34d399] rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Action: Clean Resume Button & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* NYC Forest Green Pill Resume Button */}
          <button
            onClick={onOpenResume}
            className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-6 sm:py-2.5 rounded-full bg-[#173f32] hover:bg-[#102d24] text-[#faf8f1] dark:bg-[#faf8f1] dark:hover:bg-white dark:text-[#071510] text-[11px] sm:text-xs font-mono font-bold uppercase tracking-wider cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 active:scale-95 group shrink-0"
          >
            <FileText className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            <span className="hidden sm:inline">Resume / CV</span>
            <span className="sm:hidden">CV</span>
            <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-full border border-[#173f32]/20 dark:border-[#faf8f1]/20 bg-white/80 dark:bg-[#0e241c] text-[#173f32] dark:text-[#faf8f1] flex items-center justify-center cursor-pointer active:scale-95 shrink-0"
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#faf8f1] dark:bg-[#071510] border-b border-[#173f32]/12 dark:border-[#faf8f1]/10 px-4 py-4 space-y-1.5 backdrop-blur-2xl">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="w-full text-left py-2.5 px-3 text-sm font-sans tracking-tight text-[#173f32] dark:text-[#faf8f1] hover:bg-white/60 dark:hover:bg-white/5 rounded-xl transition-colors cursor-pointer font-medium"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};
