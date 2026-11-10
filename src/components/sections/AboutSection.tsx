import React, { useState } from 'react';
import type { PersonalProfile } from '../../data/personalConfig';
import { SectionBanner } from '../ui/SectionBanner';
import { ShieldCheck, Cpu, Zap, Globe, Code } from 'lucide-react';

interface AboutSectionProps {
  profile: PersonalProfile;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ profile }) => {
  const [activeTab, setActiveTab] = useState<'bio' | 'philosophy' | 'education'>('bio');

  return (
    <section id="about" className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <SectionBanner
        number="01 // ABOUT"
        title="About & Engineering Background"
        subtitle="B.Tech Computer Science (Cyber Security) student, Google Student Ambassador & AWS Student Builder Group Lead"
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start mt-4 sm:mt-6">
        {/* Left Side: Personal Engineering Manifesto & Tabbed Profile (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl p-6 sm:p-8 border border-[#173f32]/12 dark:border-[#faf8f1]/10 bg-white/95 dark:bg-[#0e241c]/90 shadow-sm backdrop-blur-xl relative overflow-hidden transition-colors">
            {/* Nav Tabs: Clean & Bold NYC Architecture */}
            <div className="flex items-center gap-1.5 mb-6 p-1.5 rounded-full bg-[#f5f2e8] dark:bg-[#071510] border border-[#173f32]/12 dark:border-[#faf8f1]/10">
              <button
                onClick={() => setActiveTab('bio')}
                className={`flex-1 py-2 px-3 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'bio'
                    ? 'bg-[#173f32] text-[#faf8f1] dark:bg-[#faf8f1] dark:text-[#071510] shadow-xs'
                    : 'text-[#3d5f52] dark:text-[#a0c2b5] hover:text-[#173f32] dark:hover:text-white'
                }`}
              >
                Profile & Focus
              </button>
              <button
                onClick={() => setActiveTab('philosophy')}
                className={`flex-1 py-2 px-3 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'philosophy'
                    ? 'bg-[#173f32] text-[#faf8f1] dark:bg-[#faf8f1] dark:text-[#071510] shadow-xs'
                    : 'text-[#3d5f52] dark:text-[#a0c2b5] hover:text-[#173f32] dark:hover:text-white'
                }`}
              >
                Engineering Stance
              </button>
              <button
                onClick={() => setActiveTab('education')}
                className={`flex-1 py-2 px-3 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  activeTab === 'education'
                    ? 'bg-[#173f32] text-[#faf8f1] dark:bg-[#faf8f1] dark:text-[#071510] shadow-xs'
                    : 'text-[#3d5f52] dark:text-[#a0c2b5] hover:text-[#173f32] dark:hover:text-white'
                }`}
              >
                Academic Background
              </button>
            </div>

            {/* Tab Contents */}
            {activeTab === 'bio' && (
              <div className="space-y-4">
                <h3
                  className="text-2xl sm:text-3xl text-[#173f32] dark:text-[#faf8f1] tracking-tight leading-snug font-normal"
                  style={{ fontFamily: 'var(--font-serif), Georgia, serif' }}
                >
                  Building Practical Software, Cloud & Cybersecurity Systems
                </h3>
                <p className="text-base text-[#284e40] dark:text-[#c2dfd4] font-sans font-normal leading-relaxed">
                  {profile.aboutBio}
                </p>

                {/* What I Do Callout */}
                <div className="p-4 sm:p-5 bg-[#f5f2e8]/80 dark:bg-[#071510]/80 rounded-2xl border border-[#173f32]/12 dark:border-[#faf8f1]/10 text-sm sm:text-base text-[#284e40] dark:text-[#c2dfd4] font-sans leading-relaxed space-y-2">
                  <div className="text-xs font-bold text-[#173f32] dark:text-[#faf8f1] uppercase tracking-wider flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                    WHAT I DO:
                  </div>
                  <p className="text-[#284e40] dark:text-[#c2dfd4]">
                    I develop practical software applications in Java, C, and Python, practice cybersecurity and penetration testing in Kali Linux environments, and organize developer events as Google Student Ambassador 2026 and Media & Content Lead at AWS Student Builder Group RCET.
                  </p>
                </div>

                {/* What Kind of Work I'm Looking For */}
                <div className="p-4 sm:p-5 bg-[#eef6f2] dark:bg-[#0a1e16] rounded-2xl border border-[#173f32]/15 dark:border-emerald-800/40 text-sm sm:text-base font-sans leading-relaxed shadow-xs">
                  <div className="text-xs font-bold text-[#173f32] dark:text-[#34d399] uppercase tracking-wider flex items-center gap-2 mb-1.5">
                    <Zap className="w-4 h-4 text-amber-500" />
                    OPPORTUNITIES I'M SEEKING:
                  </div>
                  <p className="text-[#284e40] dark:text-[#c2dfd4] font-normal">
                    {profile.lookingForWork}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'philosophy' && (
              <div className="space-y-4">
                <div className="p-5 bg-[#f5f2e8]/80 dark:bg-[#071510]/90 rounded-xl border-l-2 border-[#173f32] dark:border-[#34d399] border-y border-r border-[#173f32]/12 dark:border-[#faf8f1]/10">
                  <h4 className="text-xs font-mono font-bold text-[#173f32] dark:text-[#34d399] uppercase mb-2 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                    Core Engineering Stance:
                  </h4>
                  <p className="text-sm sm:text-base text-[#284e40] dark:text-[#c2dfd4] font-sans italic leading-relaxed">
                    "{profile.codePhilosophy}"
                  </p>
                </div>
                <div className="space-y-2 pt-2">
                  <p className="text-sm text-[#3d5f52] dark:text-[#a0c2b5] font-sans leading-relaxed">
                    Software engineering is about constructing robust, verifiable mechanisms. Cybersecurity is an architectural baseline woven into code, systems, and deployment pipelines from day one.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'education' && (
              <div className="space-y-4">
                <div className="bg-[#f5f2e8]/80 dark:bg-[#071510]/90 p-5 rounded-2xl border border-[#173f32]/12 dark:border-[#faf8f1]/10 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-1 text-base font-bold text-[#173f32] dark:text-[#faf8f1]">
                    <span>{profile.education.degree}</span>
                    <span className="text-emerald-700 dark:text-[#34d399] font-mono font-bold text-xs">{profile.education.period}</span>
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-[#284e40] dark:text-[#c2dfd4] flex items-center gap-2">
                    <span>{profile.education.institution}</span>
                    <span className="text-[#6b887c]">•</span>
                    <span className="text-[#3d5f52] dark:text-[#a0c2b5] font-mono">{profile.education.grade}</span>
                  </div>
                  <p className="text-sm text-[#3d5f52] dark:text-[#a0c2b5] font-sans pt-1 leading-relaxed font-normal">
                    {profile.education.details}
                  </p>
                </div>

                {profile.secondaryEducation && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    {profile.secondaryEducation.map((sec) => (
                      <div key={sec.level} className="p-4 rounded-xl bg-white dark:bg-[#071510] border border-[#173f32]/12 dark:border-[#faf8f1]/10 shadow-xs">
                        <div className="text-xs font-mono text-emerald-700 dark:text-[#34d399] uppercase font-bold">{sec.level}</div>
                        <div className="text-sm font-bold text-[#173f32] dark:text-[#faf8f1] mt-0.5">{sec.school}</div>
                        <div className="text-xs font-mono text-[#3d5f52] dark:text-[#a0c2b5] mt-1 font-semibold">{sec.period}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Clean Profile Card & 4 Verified Real Metrics (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Real Profile Card - Zero Mouse Wobble Slop & Zero Blinking Dots */}
          <div className="rounded-2xl p-6 sm:p-7 shadow-xs border border-[#173f32]/12 dark:border-[#faf8f1]/10 relative overflow-hidden backdrop-blur-xl group bg-white/95 dark:bg-[#0e241c]/90 transition-colors">
            <div className="flex flex-col sm:flex-row items-center gap-5">
              <div className="relative shrink-0">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-[2px] border border-[#173f32]/20 dark:border-[#faf8f1]/20 shadow-sm bg-white dark:bg-[#071510]">
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
              </div>

              <div className="text-center sm:text-left space-y-1">
                <span className="text-xs font-mono uppercase tracking-wider text-[#173f32] dark:text-[#34d399] bg-[#f5f2e8] dark:bg-[#0a1e16] border border-[#173f32]/16 dark:border-[#34d399]/30 px-3 py-0.5 rounded-full inline-block font-semibold">
                  Google Ambassador '26
                </span>
                <h4 className="text-xl font-bold text-[#173f32] dark:text-[#faf8f1]">
                  {profile.name}
                </h4>
                <p className="text-xs font-semibold text-[#284e40] dark:text-[#c2dfd4]">
                  {profile.role}
                </p>
                <p className="text-xs text-[#3d5f52] dark:text-[#a0c2b5] font-sans mt-1">
                  B.Tech CSE (Cyber Security) • Rungta University • AWS Student Builder Lead
                </p>
              </div>
            </div>
          </div>

          {/* 4 Real Production Metrics Bento */}
          <div className="grid grid-cols-2 gap-3.5">
            <div className="p-4 rounded-xl bg-white/98 dark:bg-[#0e241c]/90 border border-[#173f32]/12 dark:border-[#faf8f1]/10 hover:border-[#173f32]/35 dark:hover:border-[#34d399]/40 transition-all shadow-xs">
              <div className="flex items-center gap-2 text-xs font-mono text-[#173f32] dark:text-[#c2dfd4] mb-1 font-bold">
                <Globe className="w-4 h-4 text-emerald-700 dark:text-[#34d399]" />
                <span>Google</span>
              </div>
              <div className="text-base font-bold text-[#173f32] dark:text-[#faf8f1]">Ambassador '26</div>
              <div className="text-xs text-[#3d5f52] dark:text-[#a0c2b5] font-sans mt-0.5 font-medium">Tech events & AI tool adoption</div>
            </div>

            <div className="p-4 rounded-xl bg-white/98 dark:bg-[#0e241c]/90 border border-[#173f32]/12 dark:border-[#faf8f1]/10 hover:border-[#173f32]/35 dark:hover:border-[#34d399]/40 transition-all shadow-xs">
              <div className="flex items-center gap-2 text-xs font-mono text-[#173f32] dark:text-[#c2dfd4] mb-1 font-bold">
                <Cpu className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>AWS Lead</span>
              </div>
              <div className="text-base font-bold text-[#173f32] dark:text-[#faf8f1]">Student Builder</div>
              <div className="text-xs text-[#3d5f52] dark:text-[#a0c2b5] font-sans mt-0.5 font-medium">RCET media & content lead</div>
            </div>

            <div className="p-4 rounded-xl bg-white/98 dark:bg-[#0e241c]/90 border border-[#173f32]/12 dark:border-[#faf8f1]/10 hover:border-[#173f32]/35 dark:hover:border-[#34d399]/40 transition-all shadow-xs">
              <div className="flex items-center gap-2 text-xs font-mono text-[#173f32] dark:text-[#c2dfd4] mb-1 font-bold">
                <ShieldCheck className="w-4 h-4 text-emerald-700 dark:text-[#34d399]" />
                <span>6+ Certs</span>
              </div>
              <div className="text-base font-bold text-[#173f32] dark:text-[#faf8f1]">Cybersecurity & Java</div>
              <div className="text-xs text-[#3d5f52] dark:text-[#a0c2b5] font-sans mt-0.5 font-medium">Coursera & verified defense badges</div>
            </div>

            <div className="p-4 rounded-xl bg-white/98 dark:bg-[#0e241c]/90 border border-[#173f32]/12 dark:border-[#faf8f1]/10 hover:border-[#173f32]/35 dark:hover:border-[#34d399]/40 transition-all shadow-xs">
              <div className="flex items-center gap-2 text-xs font-mono text-[#173f32] dark:text-[#c2dfd4] mb-1 font-bold">
                <Code className="w-4 h-4 text-emerald-700 dark:text-[#34d399]" />
                <span>Algorithms</span>
              </div>
              <div className="text-base font-bold text-[#173f32] dark:text-[#faf8f1]">Java & C Core</div>
              <div className="text-xs text-[#3d5f52] dark:text-[#a0c2b5] font-sans mt-0.5 font-medium">Huffman simulator & mini tools</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
