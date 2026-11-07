import React, { useState } from 'react';
import { Volume2, VolumeX, Bell, FileText, Anchor, Sliders } from 'lucide-react';
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
      id: 'bell',
      label: 'Watch Bell',
      icon: <Bell className="w-3.5 h-3.5 text-[#dfbe7a]" />,
      desc: "Ship's Brass Watch Bell",
    },
    {
      id: 'page',
      label: 'Parchment',
      icon: <FileText className="w-3.5 h-3.5 text-[#dfbe7a]" />,
      desc: 'Cartographic Paper Unfurl',
    },
    {
      id: 'creak',
      label: 'Oak Hull',
      icon: <Anchor className="w-3.5 h-3.5 text-[#dfbe7a]" />,
      desc: 'Naval Vessel Timber Creak',
    },
  ];

  const handleTrigger = (id: 'cannon' | 'bell' | 'thunder' | 'page' | 'creak') => {
    playAudioFx(id);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end font-mono">
      {/* Expanded Soundboard Console */}
      {isExpanded && (
        <div className="mb-2 p-3.5 bg-[#090e17]/95 border border-[#c5a059]/40 rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.9)] backdrop-blur-xl animate-scaleUp w-60 text-xs">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#c5a059]/20">
            <span className="font-bold text-[#dfbe7a] flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
              <Volume2 className="w-3.5 h-3.5 text-[#dfbe7a]" />
              Naval Soundscape
            </span>
            <span className="text-[9px] text-[#64748b]">Web Audio API</span>
          </div>

          {/* Master Ocean Ambience Switch */}
          <button
            onClick={onToggleAmbient}
            className={`w-full py-2 px-3 rounded-lg mb-2.5 flex items-center justify-between transition-all cursor-pointer ${
              ambientPlaying
                ? 'bg-[#dfbe7a] text-[#05080c] font-bold shadow-[0_0_15px_rgba(223,190,122,0.3)]'
                : 'bg-[#05080c] text-[#94a3b8] border border-white/10 hover:border-[#dfbe7a]'
            }`}
          >
            <span className="flex items-center gap-2 text-xs">
              {ambientPlaying ? <Volume2 className="w-3.5 h-3.5 animate-pulse" /> : <VolumeX className="w-3.5 h-3.5" />}
              Ocean Waves
            </span>
            <span className="text-[10px] font-mono uppercase">
              {ambientPlaying ? 'ON' : 'MUTED'}
            </span>
          </button>

          {/* Sound FX Buttons */}
          <div className="space-y-1">
            {soundTriggers.map((s) => (
              <button
                key={s.id}
                onClick={() => handleTrigger(s.id)}
                title={s.desc}
                className="w-full p-2 bg-[#05080c]/80 hover:bg-[#141f2e] border border-white/5 hover:border-[#dfbe7a]/40 rounded-lg text-left flex items-center justify-between text-[#cbd5e1] transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  {s.icon}
                  <span className="text-[11px] group-hover:text-[#dfbe7a]">{s.label}</span>
                </div>
                <span className="text-[9px] text-[#64748b] group-hover:text-[#94a3b8]">Play</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Soundscape Trigger Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 px-3.5 py-2 bg-[#090e17]/90 hover:bg-[#0e1622] border border-[#c5a059]/30 hover:border-[#dfbe7a] rounded-full shadow-[0_4px_30px_rgba(0,0,0,0.85)] backdrop-blur-xl cursor-pointer text-xs transition-all text-[#dfbe7a]"
        title="Toggle Nautical Audio Soundscape"
      >
        <Sliders className="w-3.5 h-3.5" />
        <span className="text-[10px] uppercase font-semibold">Soundscape</span>
        {ambientPlaying && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />}
      </button>
    </div>
  );
};
