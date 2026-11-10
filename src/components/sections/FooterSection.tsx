import React from 'react';
import { ArrowUp, Shield, Mail, Phone, ExternalLink } from 'lucide-react';

export const FooterSection: React.FC = () => {
  const scrollToTop = () => {
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
    { href: '#resume', label: 'Credentials' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <footer className="relative z-10 border-t border-[var(--border-hairline)] bg-[var(--surface-card)] pt-12 sm:pt-16 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 text-left overflow-hidden transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-8 pb-10 sm:pb-12 border-b border-[var(--border-hairline)]">
          {/* Column 1: Brand & Coordinates with Photo Avatar (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="relative shrink-0">
                <div className="w-12 h-12 rounded-full p-0.5 border border-slate-200 dark:border-slate-700 shadow-xs">
                  <div className="w-full h-full rounded-full overflow-hidden bg-[var(--canvas-bg)] flex items-center justify-center">
                    <img
                      src="/profile-photo.jpg"
                      alt="Harsh Kumar Shandilaya"
                      className="w-full h-full object-cover object-top filter contrast-[1.05]"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/profile-photo.svg';
                      }}
                    />
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-base font-display font-medium text-[var(--text-primary)] tracking-tight leading-snug">
                  Harsh Kumar Shandilaya
                </h3>
                <span className="text-[11px] font-mono text-[var(--text-muted)] uppercase tracking-wider block">
                  B.Tech CSE (Cyber Security) • Rungta University
                </span>
              </div>
            </div>

            <p className="text-sm text-[var(--text-muted)] font-sans leading-relaxed font-normal">
              Building secure software, practical cloud architectures, and reliable applications with hands-on student leadership as Google Student Ambassador 2026 and AWS Student Builder Lead.
            </p>

            <div className="pt-2 space-y-1.5 text-[11px] font-mono text-[var(--text-muted)]">
              <div className="flex items-center gap-2">
                <span>Station: Bhilai, Chhattisgarh, India</span>
              </div>
              <div className="flex items-center gap-2">
                <span>Role: Google Student Ambassador '26 • AWS SBG RCET Lead</span>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation Links (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-mono font-semibold text-[var(--text-primary)] tracking-widest uppercase">
              Sections
            </h4>
            <ul className="space-y-2 text-xs font-sans">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors block py-0.5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Verified Certifications (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-semibold text-[var(--text-primary)] tracking-widest uppercase flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-slate-700 dark:text-sky-400" />
              Verified Credentials
            </h4>
            <ul className="space-y-1.5 text-[11px] font-mono text-[var(--text-muted)]">
              <li>
                <a
                  href="https://coursera.org/share/7e749bc9a0fe90bc3717a338c758f9e7"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1"
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
                  className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1"
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
                  className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1"
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
                  className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1"
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
                  className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1"
                >
                  <span>Machine Learning & Data Science</span>
                  <ExternalLink className="w-2.5 h-2.5 opacity-60" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Quick Contact & Coordinates (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-semibold text-[var(--text-primary)] tracking-widest uppercase">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs font-mono text-[var(--text-muted)]">
              <a
                href="mailto:hshandilya2008@gmail.com"
                className="flex items-center gap-2 hover:text-[var(--text-primary)] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-slate-700 dark:text-sky-400" />
                <span>hshandilya2008@gmail.com</span>
              </a>
              <a
                href="tel:+917647088605"
                className="flex items-center gap-2 hover:text-[var(--text-primary)] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-slate-700 dark:text-sky-400" />
                <span>+91 7647088605</span>
              </a>
              <div className="flex flex-wrap items-center gap-2 pt-2">
                <a
                  href="https://github.com/hackthesparrow"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1 rounded-full bg-[var(--canvas-bg)] hover:bg-[var(--surface-hover)] text-[var(--text-primary)] border border-[var(--border-hairline)] transition-colors shadow-xs active:scale-95"
                >
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/harsh-kumar-shandilya-78b223372/"
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-1 rounded-full bg-[var(--canvas-bg)] hover:bg-[var(--surface-hover)] text-[var(--text-primary)] border border-[var(--border-hairline)] transition-colors shadow-xs active:scale-95"
                >
                  LinkedIn
                </a>
                <a
                  href="/Harsh_Resume.pdf"
                  download="Harsh_Kumar_Shandilaya_Resume.pdf"
                  className="px-3.5 py-1 rounded-full bg-[var(--text-primary)] hover:opacity-90 text-[var(--canvas-bg)] font-medium shadow-xs active:scale-95"
                >
                  Resume
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--text-muted)]">
          <div>
            © 2026 Harsh Kumar Shandilaya. All rights reserved. Built with React 19, TypeScript & Tailwind CSS.
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-[var(--border-hairline)] text-xs font-mono text-[var(--text-primary)] hover:bg-[var(--text-primary)] hover:text-[var(--canvas-bg)] transition-all bg-[var(--canvas-bg)] cursor-pointer shadow-xs group active:scale-95"
          >
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
            Back to Top
          </button>
        </div>
      </div>
    </footer>
  );
};
