import React, { useState } from 'react';
import { Volume2, VolumeX, Sparkles, ChevronUp, ChevronDown, Bell, Zap, FileText, Anchor } from 'lucide-react';
import { playAudioFx } from './AudioEngine';

interface SoundboardBarProps {
  ambientPlaying: boolean;
  onToggleAmbient: () => void;
}

export const SoundboardBar: React.FC<SoundboardBarProps> = ({
  ambientPlaying,
  onToggleAmbient,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const soundTriggers: {
    id: 'cannon' | 'bell' | 'thunder' | 'page' | 'creak';
    label: string;
    icon: React.ReactNode;
    desc: string;
  }[] = [
    {
      id: 'cannon',
      label: 'Cannon',
      icon: <Sparkles className="w-3.5 h-3.5 text-[#ff7a1a]" />,
      desc: '32-Pounder Broadside Blast',
    },
    {
      id: 'bell',
      label: 'Bell',
      icon: <Bell className="w-3.5 h-3.5 text-[#ffd56b]" />,
      desc: "Ship's Brass Watch Bell",
    },
    {
      id: 'thunder',
      label: 'Thunder',
      icon: <Zap className="w-3.5 h-3.5 text-[#c9a227]" />,
      desc: 'Distant Ocean Thunderclap',
    },
    {
      id: 'page',
      label: 'Parchment',
      icon: <FileText className="w-3.5 h-3.5 text-[#d8c49a]" />,
      desc: 'Antique Paper Unroll',
    },
    {
      id: 'creak',
      label: 'Oak Creak',
      icon: <Anchor className="w-3.5 h-3.5 text-[#b39b6d]" />,
      desc: 'Black Pearl Timber Strain',
    },
  ];

  const handleTrigger = (id: 'cannon' | 'bell' | 'thunder' | 'page' | 'creak') => {
    playAudioFx(id);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Expanded Soundboard Console */}
      {isExpanded && (
        <div className="mb-2.5 p-3.5 bg-[#0b0906]/95 border-2 border-[#c9a227] rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.9)] backdrop-blur-md animate-scaleUp w-64 text-xs font-cinzel">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#8b5a2b]/40">
            <span className="font-bold text-[#ffd56b] flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-[#ff7a1a]" />
              Nautical Soundboard
            </span>
            <span className="text-[10px] text-[#b39b6d]">Web Audio API</span>
          </div>

          {/* Master Ocean Ambience Switch */}
          <button
            onClick={onToggleAmbient}
            className={`w-full py-2 px-3 rounded-lg mb-3 flex items-center justify-between transition-all cursor-pointer ${
              ambientPlaying
                ? 'bg-gradient-to-r from-[#a01d12] to-[#ff7a1a] text-white shadow-[0_0_15px_rgba(255,122,26,0.4)]'
                : 'bg-[#171310] text-[#d8c49a] border border-[#8b5a2b]/60 hover:border-[#ffd56b]'
            }`}
          >
            <span className="font-bold flex items-center gap-2">
              {ambientPlaying ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4 text-[#8b5a2b]" />}
              Ocean Swell Audio
            </span>
            <span className="text-[10px] font-mono uppercase">
              {ambientPlaying ? 'ACTIVE' : 'MUTED'}
            </span>
          </button>

          {/* Sound FX Buttons Grid */}
          <div className="grid grid-cols-2 gap-1.5">
            {soundTriggers.map((s) => (
              <button
                key={s.id}
                onClick={() => handleTrigger(s.id)}
                title={s.desc}
                className="p-2 bg-[#171310] hover:bg-[#a01d12]/30 border border-[#8b5a2b]/60 hover:border-[#ffd56b] rounded-md text-left flex items-center gap-1.5 text-[#e8dcc0] transition-colors cursor-pointer group"
              >
                {s.icon}
                <span className="text-[10px] font-bold group-hover:text-[#ffd56b]">{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Floating Toggle Button */}
      <button
        onClick={() => {
          playAudioFx('click');
          setIsExpanded(!isExpanded);
        }}
        className="flex items-center gap-2 px-3.5 py-2 bg-[#171310]/95 hover:bg-[#a01d12] text-[#ffd56b] hover:text-white border-2 border-[#c9a227] rounded-full shadow-[0_4px_20px_rgba(201,162,39,0.3)] transition-all cursor-pointer group backdrop-blur-md"
        title="Toggle Nautical Audio Console"
      >
        <Volume2 className="w-4 h-4 text-[#ff7a1a] group-hover:scale-110 transition-transform" />
        <span className="text-xs font-cinzel font-bold hidden sm:inline">Sound FX</span>
        {isExpanded ? (
          <ChevronDown className="w-3.5 h-3.5 text-[#c9a227]" />
        ) : (
          <ChevronUp className="w-3.5 h-3.5 text-[#c9a227]" />
        )}
      </button>
    </div>
  );
};
