import React, { useState } from 'react';
import type { PersonalProfile } from '../../data/personalConfig';
import { SectionBanner } from '../ui/SectionBanner';
import { Send, MapPin, Check, Mail, ExternalLink, Copy, CheckCheck, FileText } from 'lucide-react';
import { playAudioFx } from '../ui/AudioEngine';

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

    playAudioFx('seal');
    setIsSent(true);

    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setIsSent(false);
    }, 4500);
  };

  const handleCopyEmail = () => {
    playAudioFx('click');
    navigator.clipboard.writeText(profile.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" data-alias="bottle" className="min-h-screen py-24 px-4 max-w-6xl mx-auto relative z-10">
      {/* Anchor helper for legacy #bottle links */}
      <div id="bottle" className="absolute -top-16 left-0 pointer-events-none" />
      <SectionBanner
        number="CHRONICLE VI"
        title="Direct Contact & Opportunity Inquiry"
        subtitle="Open for software development, cybersecurity, and cloud engineering internships & collaborative projects"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
        {/* Left Side: Modern Naval Dispatch Form */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl p-6 sm:p-8 border border-[#c5a059]/25 shadow-[0_20px_50px_rgba(0,0,0,0.85)] bg-[#0a1018]/90 backdrop-blur-xl">
            <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#c5a059]/15">
              <span className="font-mono text-xs font-semibold text-[#dfbe7a] flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#dfbe7a]" />
                TRANSMIT ENCRYPTED INQUIRY
              </span>
              <span className="text-xs font-mono text-emerald-400">● 24h Response Target</span>
            </div>

            {isSent ? (
              <div className="py-12 text-center space-y-4 animate-fadeIn">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#dfbe7a]/15 border border-[#dfbe7a] flex items-center justify-center text-[#dfbe7a] shadow-[0_0_20px_rgba(223,190,122,0.3)]">
                  <Check className="w-7 h-7 text-[#dfbe7a]" />
                </div>
                {/* Subheading (H3): Space Grotesk Medium 500 */}
                <h3 className="text-2xl font-heading font-medium text-[#f1f5f9] tracking-[-0.02em]">
                  Transmission Successfully Dispatched!
                </h3>
                {/* Body Text: Geist Sans Regular 400 */}
                <p className="text-base font-sans text-[#94a3b8] max-w-md mx-auto leading-relaxed font-normal">
                  Your inquiry has been delivered directly to {profile.name}. Expect an expedited reply at your registered email coordinates.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  {/* Micro-copy Label: Space Mono All-Caps */}
                  <label htmlFor="contact-name" className="block text-xs font-mono font-bold text-[#dfbe7a] uppercase tracking-wider mb-1.5">
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
                    className="w-full bg-[#05080c]/80 border border-[#c5a059]/30 focus:border-[#dfbe7a] rounded-xl px-4 py-3 text-base font-sans text-[#f1f5f9] outline-none transition-all placeholder:text-[#64748b]"
                  />
                </div>

                <div>
                  {/* Micro-copy Label: Space Mono All-Caps */}
                  <label htmlFor="contact-email" className="block text-xs font-mono font-bold text-[#dfbe7a] uppercase tracking-wider mb-1.5">
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
                    className="w-full bg-[#05080c]/80 border border-[#c5a059]/30 focus:border-[#dfbe7a] rounded-xl px-4 py-3 text-base font-sans text-[#f1f5f9] outline-none transition-all placeholder:text-[#64748b]"
                  />
                </div>

                <div>
                  {/* Micro-copy Label: Space Mono All-Caps */}
                  <label htmlFor="contact-message" className="block text-xs font-mono font-bold text-[#dfbe7a] uppercase tracking-wider mb-1.5">
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
                    className="w-full bg-[#05080c]/80 border border-[#c5a059]/30 focus:border-[#dfbe7a] rounded-xl px-4 py-3 text-base font-sans text-[#f1f5f9] outline-none transition-all placeholder:text-[#64748b]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <button
                    type="submit"
                    data-cursor="TRANSMIT"
                    className="w-full py-3.5 px-4 rounded-xl brass-btn text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    Transmit Email
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playAudioFx('click');
                      const cleanPhone = (profile.phone || '+917647088605').replace(/[^0-9]/g, '');
                      const txt = formData.message 
                        ? `Hi Harsh! Name: ${formData.name || 'Visitor'}\nEmail: ${formData.email || 'N/A'}\nMessage: ${formData.message}`
                        : `Hi Harsh, I saw your portfolio and would like to connect!`;
                      window.open(`https://wa.me/${cleanPhone}?text=${encodeURIComponent(txt)}`, '_blank');
                    }}
                    data-cursor="WHATSAPP"
                    className="w-full py-3.5 px-4 rounded-xl bg-emerald-500/15 hover:bg-emerald-500 text-emerald-400 hover:text-black border border-emerald-500/40 text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <span>💬 Chat on WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Right Side: Coordinates & Direct Connection Hub */}
        <div className="lg:col-span-5 space-y-6">
          {/* Coordinates Dossier */}
          <div className="nautical-card rounded-2xl p-6 sm:p-7 border border-[#c5a059]/25 shadow-[0_20px_50px_rgba(0,0,0,0.85)]">
            <h4 className="text-xs font-mono font-bold text-[#dfbe7a] uppercase tracking-wider mb-4 pb-2 border-b border-[#c5a059]/15">
              Direct Navigational Coordinates
            </h4>

            <div className="space-y-4">
              {/* Email with copy */}
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#05080c] border border-white/5 hover:border-[#dfbe7a]/40 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#0e1622] border border-[#c5a059]/30 flex items-center justify-center text-[#dfbe7a]">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#94a3b8] uppercase">Email Transmission</div>
                    <div className="text-xs sm:text-sm font-mono text-[#f1f5f9] font-medium">{profile.email}</div>
                  </div>
                </div>
                <button
                  onClick={handleCopyEmail}
                  data-cursor="COPY"
                  className="p-2 rounded-lg bg-[#141f2e] text-[#dfbe7a] hover:bg-[#dfbe7a] hover:text-[#05080c] transition-all cursor-pointer"
                  title="Copy email"
                >
                  {copiedEmail ? <CheckCheck className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone with click to call */}
              {profile.phone && (
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#05080c] border border-white/5 hover:border-[#dfbe7a]/40 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#0e1622] border border-[#c5a059]/30 flex items-center justify-center text-[#dfbe7a]">
                      <span className="text-xs">📞</span>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-[#94a3b8] uppercase">Phone / WhatsApp</div>
                      <a href={`tel:${profile.phone}`} className="text-xs sm:text-sm font-mono text-[#f1f5f9] hover:text-[#dfbe7a] font-medium transition-colors">
                        {profile.phone}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Geographic Coordinates */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#05080c] border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-[#0e1622] border border-[#c5a059]/30 flex items-center justify-center text-[#dfbe7a]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#94a3b8] uppercase">Location Coordinates</div>
                  <div className="text-xs sm:text-sm font-sans text-[#f1f5f9] font-medium">
                    {profile.location}
                  </div>
                </div>
              </div>

              {/* External Links */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="GITHUB"
                  className="p-3 rounded-xl bg-[#05080c] border border-white/10 hover:border-[#dfbe7a] flex items-center justify-between group transition-all"
                >
                  <span className="text-xs font-mono font-semibold text-[#f1f5f9] group-hover:text-[#dfbe7a]">GitHub</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#94a3b8] group-hover:text-[#dfbe7a]" />
                </a>

                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="LINKEDIN"
                  className="p-3 rounded-xl bg-[#05080c] border border-white/10 hover:border-[#dfbe7a] flex items-center justify-between group transition-all"
                >
                  <span className="text-xs font-mono font-semibold text-[#f1f5f9] group-hover:text-[#dfbe7a]">LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#94a3b8] group-hover:text-[#dfbe7a]" />
                </a>
              </div>

              {/* Quick Resume trigger */}
              {onOpenResume && (
                <button
                  onClick={() => {
                    playAudioFx('seal');
                    onOpenResume();
                  }}
                  data-cursor="DOSSIER"
                  className="w-full py-3 rounded-xl bg-[#0e1622] hover:bg-[#141f2e] text-[#dfbe7a] hover:text-white border border-[#c5a059]/30 text-xs font-heading font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer mt-2"
                >
                  <FileText className="w-4 h-4" />
                  View Printable Engineering CV
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
