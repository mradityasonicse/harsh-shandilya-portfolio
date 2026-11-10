import React from 'react';
import { ArrowUp, Shield, Mail, Phone, ExternalLink } from 'lucide-react';
import { playAudioFx } from '../ui/AudioEngine';

export const FooterSection: React.FC = () => {
  const scrollToTop = () => {
    playAudioFx('seal');
    if (typeof window !== 'undefined' && window.__lenis) {
      window.__lenis.scrollTo('#hero');
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { href: '#hero', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#experience', label: 'Experience' },
    { href: '#resume', label: 'Resume' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <footer className="relative z-10 border-t border-[#c5a059]/25 bg-[#040609] pt-20 pb-12 px-4 sm:px-6 lg:px-8 text-left overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-28 bg-gradient-to-b from-[#dfbe7a]/10 to-transparent blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-16 border-b border-[#c5a059]/15">
          {/* Column 1: Brand & Coordinates (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-[#c5a059]/50 flex items-center justify-center bg-[#0e1622] shadow-[0_0_20px_rgba(197,160,89,0.3)]">
                <Shield className="w-5 h-5 text-[#dfbe7a]" />
              </div>
              <div>
                <h3 className="text-lg font-heading font-bold text-white tracking-wide">
                  Harsh Kumar Shandilya
                </h3>
                <span className="text-[11px] font-mono text-[#c5a059] block">
                  B.Tech CSE (Cyber Security) • Rungta University
                </span>
              </div>
            </div>

            <p className="text-xs text-[#94a3b8] font-sans leading-relaxed font-light">
              Building secure software, practical cloud architectures, and reliable applications with hands-on student leadership as Google Student Ambassador 2026 and AWS Student Builder Lead.
            </p>

            <div className="pt-2 space-y-1.5 text-[11px] font-mono text-[#64748b]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Station: Bhilai / Raipur, Chhattisgarh, India</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#dfbe7a]">●</span>
                <span>Role: Google Student Ambassador '26 • AWS SBG RCET Lead</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-bold text-[#dfbe7a] tracking-widest uppercase">
              Sections
            </h4>
            <ul className="space-y-2 text-xs font-heading">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => playAudioFx('click')}
                    className="text-[#94a3b8] hover:text-[#dfbe7a] transition-colors block py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Verified Certifications (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold text-[#dfbe7a] tracking-widest uppercase flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-[#dfbe7a]" />
              Verified Credentials
            </h4>
            <ul className="space-y-1.5 text-[11px] font-mono text-[#94a3b8]">
              <li>
                <a
                  href="https://coursera.org/share/7e749bc9a0fe90bc3717a338c758f9e7"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#dfbe7a] transition-colors flex items-center gap-1"
                >
                  <span>Foundations of Cybersecurity</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://coursera.org/share/52b5ed448da8f62a1f399802af0b6530"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#dfbe7a] transition-colors flex items-center gap-1"
                >
                  <span>Intro to Cybersecurity</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://coursera.org/share/42f1ce37c6c596648906174438de0fe2"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#dfbe7a] transition-colors flex items-center gap-1"
                >
                  <span>Programming in Java</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://coursera.org/share/abe5a9612db47abae37e31f33b45b682"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#dfbe7a] transition-colors flex items-center gap-1"
                >
                  <span>Computer Networking</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
              <li>
                <a
                  href="https://coursera.org/share/e2e08944a48bfb9788ee14348789ba99"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#dfbe7a] transition-colors flex items-center gap-1"
                >
                  <span>Machine Learning & Data Science</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Contact & Coordinates (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-bold text-[#dfbe7a] tracking-widest uppercase">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs font-mono text-[#94a3b8]">
              <a
                href="mailto:hshandilya2008@gmail.com"
                className="flex items-center gap-2 hover:text-[#dfbe7a] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#dfbe7a]" />
                <span>hshandilya2008@gmail.com</span>
              </a>
              <a
                href="tel:+917647088605"
                className="flex items-center gap-2 hover:text-[#dfbe7a] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#dfbe7a]" />
                <span>+91 7647088605</span>
              </a>
              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://github.com/hackthesparrow"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 rounded-md bg-[#0e1622] hover:bg-[#141f2e] text-[#dfbe7a] border border-[#c5a059]/30 transition-colors"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/harsh-kumar-shandilya-78b223372/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3 py-1 rounded-md bg-[#0e1622] hover:bg-[#141f2e] text-[#dfbe7a] border border-[#c5a059]/30 transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="/Harsh_Resume.pdf"
                  download="Harsh_Kumar_Shandilya_Resume.pdf"
                  className="px-3 py-1 rounded-md brass-btn text-[#05080c] font-bold"
                >
                  Resume
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#64748b]">
          <div>
            © 2026 Harsh Kumar Shandilya. All rights reserved. Built with React 19, TypeScript & Tailwind CSS.
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#c5a059]/40 hover:border-[#dfbe7a] text-xs font-mono text-[#dfbe7a] hover:text-white transition-all bg-[#0e1622] hover:bg-[#141f2e] cursor-pointer shadow-md group"
          >
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
};
