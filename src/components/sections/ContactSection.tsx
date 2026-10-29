import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import type { PersonalProfile } from '../../data/personalConfig';
import { SectionBanner } from '../ui/SectionBanner';
import { ParchmentCard } from '../ui/ParchmentCard';
import { Send, MapPin, Check, Mail, ExternalLink, Globe } from 'lucide-react';
import { playAudioFx } from '../ui/AudioEngine';

interface ContactSectionProps {
  profile: PersonalProfile;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ profile }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    playAudioFx('seal');
    setIsSent(true);
    try {
      confetti({
        particleCount: 60,
        spread: 80,
        origin: { y: 0.7 },
        colors: ['#c9a227', '#a01d12', '#ff7a1a'],
      });
    } catch {
      // Safe fallback
    }

    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setIsSent(false);
    }, 4500);
  };

  return (
    <section id="bottle" className="min-h-screen py-20 px-4 max-w-5xl mx-auto relative z-10">
      <SectionBanner
        number="PORT V"
        title="Direct Contact & Opportunity Inquiry"
        subtitle="Open for full-time roles, architectural consulting, and high-impact software projects"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-10">
        {/* Left Side: Scrolled Letter Contact Form */}
        <div className="lg:col-span-7">
          <ParchmentCard rotate="-0.5" className="border-2 border-[#8b5a2b]">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#8b5a2b]/30">
              <span className="font-cinzel text-xs font-bold text-[#a01d12] uppercase flex items-center gap-1.5">
                ✉️ Send Direct Engineering Inquiry
              </span>
              <span className="text-xs font-cinzel text-[#523d24]">Fast 24-Hour Response</span>
            </div>

            {isSent ? (
              <div className="py-12 text-center space-y-4 animate-fadeIn">
                <div className="w-16 h-16 mx-auto rounded-full wax-seal flex items-center justify-center text-[#d8c49a] shadow-lg">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-pirate text-[#a01d12]">
                  Message Successfully Dispatched!
                </h3>
                <p className="text-sm font-fell text-[#24170f] max-w-md mx-auto italic">
                  "Your missive has been safely delivered to {profile.name}. Expect a response at your coordinates shortly."
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-cinzel font-bold text-[#171310] uppercase tracking-wider mb-1">
                    Your Name / Company:
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Engineering Recruiter / Tech Lead"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#f4e8cc] border-2 border-[#8b5a2b]/60 focus:border-[#a01d12] rounded p-2.5 text-xs font-cinzel text-[#171310] outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-email" className="block text-xs font-cinzel font-bold text-[#171310] uppercase tracking-wider mb-1">
                    Your Work Email:
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    required
                    placeholder="e.g. hiring@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#f4e8cc] border-2 border-[#8b5a2b]/60 focus:border-[#a01d12] rounded p-2.5 text-xs font-cinzel text-[#171310] outline-none transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs font-cinzel font-bold text-[#171310] uppercase tracking-wider mb-1">
                    Message / Opportunity Scope:
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    placeholder="Describe your project, team opportunity, or discussion topic..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#f4e8cc] border-2 border-[#8b5a2b]/60 focus:border-[#a01d12] rounded p-2.5 text-xs font-cinzel text-[#171310] outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 wax-seal text-[#e8dcc0] font-cinzel font-bold text-xs tracking-widest uppercase rounded flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02]"
                >
                  <Send className="w-4 h-4 text-[#ff7a1a]" />
                  Dispatch Direct Message
                </button>
              </form>
            )}
          </ParchmentCard>
        </div>

        {/* Right Side: Coordinates & Social Channels */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#171310]/95 border-2 border-[#c9a227]/60 rounded p-6 shadow-[0_10px_25px_rgba(0,0,0,0.8)]">
            <h4 className="text-xl font-pirate text-[#c9a227] mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#ff7a1a]" /> Engineer Coordinates
            </h4>

            <div className="space-y-4 text-xs font-cinzel">
              <div className="flex items-start gap-3 text-[#e8dcc0]">
                <Mail className="w-4 h-4 text-[#ff7a1a] mt-0.5 shrink-0" />
                <div>
                  <span className="text-[#a01d12] font-bold block">Direct Email:</span>
                  <a href={`mailto:${profile.email}`} className="text-[#d8c49a] hover:underline">
                    {profile.email}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3 text-[#e8dcc0]">
                <Globe className="w-4 h-4 text-[#ff7a1a] mt-0.5 shrink-0" />
                <div>
                  <span className="text-[#a01d12] font-bold block">Base Location:</span>
                  <span className="text-[#d8c49a]">{profile.location}</span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-3 border-t border-[#8b5a2b]/30">
                <span className="text-[#a01d12] font-bold block mb-2">Verified Channels:</span>
                <div className="flex flex-wrap gap-2">
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0b0906] text-[#c9a227] hover:text-white border border-[#c9a227]/40 rounded text-[11px]"
                  >
                    <ExternalLink className="w-3 h-3" /> GitHub
                  </a>
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0b0906] text-[#c9a227] hover:text-white border border-[#c9a227]/40 rounded text-[11px]"
                  >
                    <ExternalLink className="w-3 h-3" /> LinkedIn
                  </a>
                  <a
                    href={profile.twitterUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0b0906] text-[#c9a227] hover:text-white border border-[#c9a227]/40 rounded text-[11px]"
                  >
                    <ExternalLink className="w-3 h-3" /> X (Twitter)
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Resume Download Callout */}
          <div className="bg-gradient-to-br from-[#171310] to-[#24170f] border border-[#ff7a1a]/50 rounded p-6 shadow-md text-center">
            <h5 className="font-pirate text-xl text-[#d8c49a] mb-1">
              Need a Formal Resume?
            </h5>
            <p className="text-xs text-[#b39b6d] font-fell italic mb-4">
              Download complete PDF curriculum vitae with educational background, certifications, and project metrics.
            </p>
            <a
              href={profile.resumeUrl}
              download="Resume.pdf"
              className="inline-flex items-center gap-2 px-6 py-2.5 wax-seal text-[#e8dcc0] font-cinzel font-bold text-xs uppercase rounded hover:scale-105 transition-transform"
            >
              Download PDF Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
