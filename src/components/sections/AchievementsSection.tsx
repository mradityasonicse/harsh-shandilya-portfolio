import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import type { PersonalProfile, AchievementItem } from '../../data/personalConfig';
import { SectionBanner } from '../ui/SectionBanner';
import { Trophy, Award, Shield, Star, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
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
        return <Trophy className="w-5 h-5 text-[#ffd56b]" />;
      case 'award':
        return <Award className="w-5 h-5 text-[#ff7a1a]" />;
      case 'shield':
        return <Shield className="w-5 h-5 text-[#c9a227]" />;
      case 'star':
        return <Star className="w-5 h-5 text-[#ffeb99]" />;
      default:
        return <Sparkles className="w-5 h-5 text-[#c9a227]" />;
    }
  };

  const handleCardClick = (_item: AchievementItem) => {
    playAudioFx('seal');
    try {
      confetti({
        particleCount: 35,
        spread: 55,
        origin: { y: 0.7 },
        colors: ['#ffd56b', '#c9a227', '#a01d12'],
      });
    } catch {
      // fallback
    }
  };

  return (
    <section id="spoils" className="min-h-screen py-24 px-4 max-w-7xl mx-auto relative z-10">
      <SectionBanner
        number="PORT IV"
        title="Spoils of War & Certifications"
        subtitle="National hackathon podiums, verified industry architectural credentials, and engineering badges"
      />

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 mt-8 mb-12">
        {(['All', 'Hackathons', 'Certifications', 'Badges'] as const).map((tab) => {
          const isActive = filter === tab;
          return (
            <button
              key={tab}
              onClick={() => {
                playAudioFx('click');
                setFilter(tab);
              }}
              className={`px-5 py-2 rounded-full text-xs font-cinzel font-bold tracking-wider uppercase transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-[#a01d12] to-[#ff7a1a] text-white shadow-[0_0_20px_rgba(255,122,26,0.5)] scale-105'
                  : 'bg-[#171310]/90 text-[#d8c49a] border border-[#8b5a2b]/70 hover:border-[#ffd56b] hover:text-[#ffd56b]'
              }`}
            >
              {tab === 'All' ? `All Honors (${profile.achievements.length})` : tab}
            </button>
          );
        })}
      </div>

      {/* Spoils Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleCardClick(item)}
            className="group cursor-pointer bg-[#171310]/95 border-2 border-[#8b5a2b]/70 hover:border-[#ffd56b] rounded-xl p-6 sm:p-7 shadow-[0_12px_35px_rgba(0,0,0,0.85)] transition-all duration-300 hover:-translate-y-2 relative overflow-hidden backdrop-blur-xl flex flex-col justify-between"
          >
            {/* Specular Top Rim Gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#a01d12] via-[#ffd56b] to-[#ff7a1a] opacity-80" />

            <div>
              {/* Header: Icon, Category & Year */}
              <div className="flex items-center justify-between gap-2 mb-4">
                <div className="w-11 h-11 rounded-lg bg-[#0b0906] border border-[#c9a227] flex items-center justify-center shadow-[0_0_15px_rgba(201,162,39,0.25)] group-hover:scale-110 group-hover:shadow-[0_0_25px_#ffd56b] transition-all">
                  {getIcon(item.iconType)}
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-cinzel font-bold tracking-wider uppercase bg-[#a01d12]/30 text-[#ffd56b] border border-[#a01d12]">
                    {item.category}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#c9a227]">
                    {item.year}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl sm:text-2xl font-pirate text-[#d8c49a] group-hover:text-[#ffd56b] transition-colors leading-tight mb-2">
                {item.title}
              </h3>

              {/* Issuer */}
              <div className="text-xs font-cinzel text-[#ff7a1a] font-semibold mb-3">
                {item.issuer}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-[#e8dcc0]/85 font-fell leading-relaxed mb-4">
                {item.description}
              </p>
            </div>

            {/* Footer / Badge Code & Verification Link */}
            <div className="pt-4 border-t border-[#8b5a2b]/40 flex items-center justify-between text-[11px] font-cinzel">
              <span className="text-[#b39b6d] font-mono flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                {item.badgeCode}
              </span>

              {item.credentialUrl && (
                <a
                  href={item.credentialUrl}
                  target="_blank"
                  rel="noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                    playAudioFx('click');
                  }}
                  className="flex items-center gap-1 text-[#ffd56b] hover:text-white hover:underline transition-colors"
                >
                  Verify <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
