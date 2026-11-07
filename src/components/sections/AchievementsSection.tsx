import React, { useState } from 'react';
import type { PersonalProfile, AchievementItem } from '../../data/personalConfig';
import { SectionBanner } from '../ui/SectionBanner';
import { Trophy, Award, Shield, Star, ExternalLink, Sparkles } from 'lucide-react';
import { playAudioFx } from '../ui/AudioEngine';

interface AchievementsSectionProps {
  profile: PersonalProfile;
}

export const AchievementsSection: React.FC<AchievementsSectionProps> = ({ profile }) => {
  const [filter, setFilter] = useState<'All' | 'Hackathons' | 'Certifications' | 'Badges'>('All');

  const filteredItems = filter === 'All'
    ? profile.achievements
    : profile.achievements.filter((item) => item.category === filter);

  const getIcon = (type: AchievementItem['iconType']) => {
    switch (type) {
      case 'trophy':
        return <Trophy className="w-5 h-5 text-[#dfbe7a]" />;
      case 'award':
        return <Award className="w-5 h-5 text-[#dfbe7a]" />;
      case 'shield':
        return <Shield className="w-5 h-5 text-[#dfbe7a]" />;
      case 'star':
        return <Star className="w-5 h-5 text-[#dfbe7a]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#dfbe7a]" />;
    }
  };

  const handleCardClick = () => {
    playAudioFx('click');
  };

  return (
    <section id="spoils" className="min-h-screen py-20 px-4 max-w-7xl mx-auto relative z-10">
      <SectionBanner
        number="CHRONICLE IV"
        title="Naval Honors & Proof of Work"
        subtitle="National hackathon podiums, verified industry architectural credentials, and engineering badges"
      />

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8 mb-10">
        {(['All', 'Hackathons', 'Certifications', 'Badges'] as const).map((tab) => {
          const isActive = filter === tab;
          return (
            <button
              key={tab}
              onClick={() => {
                playAudioFx('click');
                setFilter(tab);
              }}
              className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#c5a059] to-[#dfbe7a] text-[#05080c] font-bold shadow-[0_0_15px_rgba(223,190,122,0.4)]'
                  : 'bg-[#0e1622] text-[#94a3b8] border border-[#c5a059]/25 hover:border-[#dfbe7a] hover:text-[#f1f5f9]'
              }`}
            >
              {tab === 'All' ? `All Honors (${profile.achievements.length})` : tab}
            </button>
          );
        })}
      </div>

      {/* Spoils Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={handleCardClick}
            className="group cursor-pointer nautical-card rounded-2xl p-6 sm:p-7 border border-[#c5a059]/20 hover:border-[#dfbe7a] transition-all duration-300 hover:-translate-y-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.85)] relative overflow-hidden backdrop-blur-xl flex flex-col justify-between"
          >
            {/* Specular Top Rim Gradient */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#dfbe7a] to-transparent opacity-60" />

            <div>
              {/* Header: Icon, Category & Year */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#05080c] border border-[#c5a059]/40 flex items-center justify-center shadow-inner group-hover:scale-105 group-hover:border-[#dfbe7a] transition-all">
                  {getIcon(item.iconType)}
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-[#dfbe7a]/10 text-[#dfbe7a] border border-[#dfbe7a]/25">
                    {item.category}
                  </span>
                  <span className="text-xs font-mono text-[#94a3b8]">
                    {item.year}
                  </span>
                </div>
              </div>

              {/* Title & Issuer */}
              <h3 className="text-lg font-heading font-bold text-[#f1f5f9] group-hover:text-[#dfbe7a] transition-colors mb-1 leading-snug">
                {item.title}
              </h3>
              <div className="text-xs font-mono text-[#94a3b8] mb-3">
                {item.issuer}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#94a3b8] font-sans leading-relaxed mb-4 font-light">
                {item.description}
              </p>
            </div>

            {/* Footer: Badge Code & Verification link */}
            <div className="flex items-center justify-between pt-4 border-t border-[#c5a059]/15">
              <span className="text-[10px] font-mono text-[#64748b] tracking-wider uppercase">
                {item.badgeCode}
              </span>

              {item.credentialUrl && (
                <a
                  href={item.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-[#dfbe7a] hover:text-white transition-colors"
                >
                  <span>Verify</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
