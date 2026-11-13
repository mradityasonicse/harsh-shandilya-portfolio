import React, { useState } from 'react';
import type { PersonalProfile } from '../../data/personalConfig';
import { SectionBanner } from '../ui/SectionBanner';
import { Send, MapPin, Check, Mail, ExternalLink, Copy, CheckCheck, FileText } from 'lucide-react';

interface ContactSectionProps {
  profile: PersonalProfile;
  onOpenResume?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile, onOpenResume }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSent, setIsSent] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSent(true);

    const mailSubject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
    const mailBody = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
    window.location.href = `mailto:${profile.email}?subject=${mailSubject}&body=${mailBody}`;

    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setIsSent(false);
    }, 4500);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
      <SectionBanner
        number="06 // CONTACT"
        title="Direct Contact & Opportunity Inquiry"
        subtitle="Open for software development, cybersecurity, and cloud engineering internships & collaborative projects"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mt-4 sm:mt-6">
        {/* Left Side: Modern Dispatch Form */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl p-6 sm:p-8 border border-[var(--border-hairline)] shadow-xs bg-[var(--surface-card)] backdrop-blur-xl">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[var(--border-hairline)]">
              <span className="font-mono text-xs font-semibold text-[var(--text-primary)] flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-700 dark:text-sky-400" />
                SEND A MESSAGE
              </span>
              <span className="text-xs font-mono text-[var(--text-muted)] font-medium">Response target: 24h</span>
            </div>

            {isSent ? (
              <div className="py-12 text-center space-y-4 animate-fadeIn">
                <div className="w-14 h-14 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-800 dark:text-white shadow-xs">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-display font-medium text-[var(--text-primary)]">
                  Transmission Successfully Dispatched!
                </h3>
                <p className="text-base font-sans text-[var(--text-muted)] max-w-md mx-auto leading-relaxed font-normal">
                  Your inquiry has been delivered directly to {profile.name}. Expect an expedited reply at your registered email coordinates.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs sm:text-sm font-bold text-[#173f32] dark:text-[#faf8f1] uppercase tracking-wider mb-1.5">
                    Your Name / Organization:
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Engineering Director / Recruiter"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white dark:bg-[#071510] border border-[#173f32]/20 dark:border-[#faf8f1]/20 focus:border-[#173f32] dark:focus:border-[#34d399] rounded-2xl px-4 py-3 text-base font-sans text-[#173f32] dark:text-[#faf8f1] outline-none transition-all placeholder:text-[#4a685b]/60 dark:placeholder:text-[#a0c2b5]/60"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs sm:text-sm font-bold text-[#173f32] dark:text-[#faf8f1] uppercase tracking-wider mb-1.5">
                    Your Work Email:
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder="recruiter@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white dark:bg-[#071510] border border-[#173f32]/20 dark:border-[#faf8f1]/20 focus:border-[#173f32] dark:focus:border-[#34d399] rounded-2xl px-4 py-3 text-base font-sans text-[#173f32] dark:text-[#faf8f1] outline-none transition-all placeholder:text-[#4a685b]/60 dark:placeholder:text-[#a0c2b5]/60"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs sm:text-sm font-bold text-[#173f32] dark:text-[#faf8f1] uppercase tracking-wider mb-1.5">
                    Inquiry Scope & Requirements:
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Provide details regarding role, tech stack, or engineering project requirements..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white dark:bg-[#071510] border border-[#173f32]/20 dark:border-[#faf8f1]/20 focus:border-[#173f32] dark:focus:border-[#34d399] rounded-2xl px-4 py-3 text-base font-sans text-[#173f32] dark:text-[#faf8f1] outline-none transition-all placeholder:text-[#4a685b]/60 dark:placeholder:text-[#a0c2b5]/60"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <button
                    type="submit"
                    className="nyc-btn-primary w-full py-3.5 group"
                  >
                    <Send className="w-4 h-4 text-emerald-300 dark:text-[#071510]" />
                    <span>Transmit Email</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const cleanPhone = (profile.phone || '+917647088605').replace(/[^0-9]/g, '');
                      const txt = formData.message 
                        ? `Hi Harsh! Name: ${formData.name || 'Visitor'}\nEmail: ${formData.email || 'N/A'}\nMessage: ${formData.message}`
                        : `Hi Harsh, I saw your portfolio and would like to connect!`;
                      window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(txt)}`, '_blank');
                    }}
                    className="nyc-btn-secondary w-full py-3.5 group"
                  >
                    <span>💬 Chat on WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Right Side: Contact Channels & Direct Connection Hub */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-2xl p-6 sm:p-7 border border-[var(--border-hairline)] shadow-xs bg-[var(--surface-card)]">
            <h4 className="text-xs font-mono font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-4 pb-2 border-b border-[var(--border-hairline)]">
              Direct Contact Channels
            </h4>

            <div className="space-y-4">
              {/* Email with copy */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[var(--canvas-bg)]/80 border border-[var(--border-hairline)] hover:border-[var(--border-hover)] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--surface-card)] border border-[var(--border-hairline)] flex items-center justify-center text-[var(--text-primary)]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase">Email Transmission</div>
                    <div className="text-xs sm:text-sm font-mono text-[var(--text-primary)] font-medium">{profile.email}</div>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="p-2 rounded-full bg-[var(--surface-card)] text-[var(--text-primary)] hover:opacity-80 transition-all cursor-pointer border border-[var(--border-hairline)] active:scale-95"
                  title="Copy email"
                >
                  {copiedEmail ? <CheckCheck className="w-4 h-4 text-slate-800 dark:text-sky-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone & Direct WhatsApp Chat */}
              {profile.phone && (
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[var(--canvas-bg)]/80 border border-[var(--border-hairline)] hover:border-[var(--border-hover)] transition-all">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--surface-card)] border border-[var(--border-hairline)] flex items-center justify-center text-[var(--text-primary)]">
                      <span className="text-sm">💬</span>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase font-semibold">WhatsApp & Phone</div>
                      <a
                        href={`https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi Harsh, I saw your portfolio and would like to connect!')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs sm:text-sm font-mono text-[var(--text-primary)] hover:underline font-medium transition-colors"
                        title="Click to Chat on WhatsApp"
                        aria-label="Chat with Harsh Kumar Shandilya on WhatsApp (opens in a new tab)"
                      >
                        {profile.phone}
                      </a>
                    </div>
                  </div>
                  <a
                    href={`https://wa.me/${profile.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi Harsh, I saw your portfolio and would like to connect!')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 rounded-full bg-[var(--canvas-bg)] hover:bg-[var(--text-primary)] hover:text-[var(--canvas-bg)] text-[var(--text-primary)] text-xs font-mono font-semibold transition-all cursor-pointer flex items-center gap-1 border border-[var(--border-hairline)] active:scale-95"
                    title="Open WhatsApp Chat directly"
                    aria-label="Open WhatsApp chat directly (opens in a new tab)"
                  >
                    <span>WhatsApp</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}

              {/* Geographic Coordinates */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[var(--canvas-bg)]/80 border border-[var(--border-hairline)]">
                <div className="w-8 h-8 rounded-full bg-[var(--surface-card)] border border-[var(--border-hairline)] flex items-center justify-center text-[var(--text-primary)]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[var(--text-muted)] uppercase">Location Coordinates</div>
                  <div className="text-xs sm:text-sm font-sans text-[var(--text-primary)] font-medium">
                    {profile.location}
                  </div>
                </div>
              </div>

              {/* External Links: Pill Architecture */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Harsh Kumar Shandilya's GitHub profile (opens in a new tab)"
                  className="p-3 rounded-full bg-[var(--canvas-bg)]/80 border border-[var(--border-hairline)] hover:border-[var(--border-hover)] flex items-center justify-between group transition-all active:scale-95 px-4"
                >
                  <span className="text-xs font-mono font-semibold text-[var(--text-primary)]">GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--text-primary)]" />
                </a>

                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Harsh Kumar Shandilya's LinkedIn profile (opens in a new tab)"
                  className="p-3 rounded-full bg-[var(--canvas-bg)]/80 border border-[var(--border-hairline)] hover:border-[var(--border-hover)] flex items-center justify-between group transition-all active:scale-95 px-4"
                >
                  <span className="text-xs font-mono font-semibold text-[var(--text-primary)]">LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--text-primary)]" />
                </a>
              </div>

              {/* Quick Resume trigger */}
              {onOpenResume && (
                <button
                  onClick={() => {
                    onOpenResume();
                  }}
                  className="w-full py-3 rounded-full bg-[var(--canvas-bg)] hover:bg-[var(--surface-hover)] text-[var(--text-primary)] border border-[var(--border-hairline)] text-xs font-sans font-medium uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer mt-2 shadow-xs active:scale-95"
                >
                  <FileText className="w-4 h-4" />
                  <span>View Printable Resume</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
