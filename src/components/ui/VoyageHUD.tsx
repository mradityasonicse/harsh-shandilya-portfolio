import React, { useState } from 'react';
import { Compass, ChevronRight, Navigation } from 'lucide-react';
import { playAudioFx } from './AudioEngine';

interface VoyageHUDProps {
  scrollProgress: number;
  activeSection: string;
}

export const VoyageHUD: React.FC<VoyageHUDProps> = ({ scrollProgress, activeSection }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const ports = [
    { id: 'hero', name: 'Helm & Compass', label: 'PORT 0' },
    { id: 'legend', name: 'Biography', label: 'PORT I' },
    { id: 'armory', name: 'Technical Armory', label: 'PORT II' },
    { id: 'voyages', name: 'Flagship Systems', label: 'PORT III' },
    { id: 'spoils', name: 'Spoils & Certs', label: 'PORT IV' },
    { id: 'log', name: 'Career Log', label: 'PORT V' },
    { id: 'bottle', name: 'Message Bottle', label: 'PORT VI' },
  ];

  const depthPercent = Math.round(scrollProgress * 100);

  // Dynamic coordinates interpolation (Bhilai/Raipur coordinates: 21°14'N 81°38'E moving westward)
  const latDeg = (21.24 - scrollProgress * 5).toFixed(2);
  const lonDeg = (81.63 - scrollProgress * 10).toFixed(2);

  const scrollTo = (id: string) => {
    playAudioFx('click');
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-5 left-5 z-40 flex flex-col items-start font-cinzel">
      {/* Quick Jump Port Drawer */}
      {menuOpen && (
        <div className="mb-2 p-3 bg-[#0b0906]/95 border-2 border-[#c9a227] rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.9)] backdrop-blur-md animate-scaleUp w-56 text-xs">
          <div className="text-[10px] text-[#ffd56b] font-bold pb-1.5 mb-2 border-b border-[#8b5a2b]/40 uppercase tracking-wider flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-[#ff7a1a]" />
            Voyage Waypoints
          </div>
          <div className="space-y-1">
            {ports.map((p) => {
              const isActive = activeSection === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => scrollTo(p.id)}
                  className={`w-full text-left px-2.5 py-1.5 rounded flex items-center justify-between text-[11px] transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-[#a01d12] text-[#ffd56b] font-bold'
                      : 'text-[#e8dcc0] hover:bg-[#171310] hover:text-[#ffd56b]'
                  }`}
                >
                  <span className="truncate">{p.name}</span>
                  <span className="text-[9px] font-mono text-[#b39b6d]">{p.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main HUD Capsule */}
      <button
        onClick={() => {
          playAudioFx('click');
          setMenuOpen(!menuOpen);
        }}
        className="flex items-center gap-3 px-4 py-2 bg-[#0b0906]/90 hover:bg-[#171310] border-2 border-[#c9a227]/70 hover:border-[#ffd56b] rounded-full shadow-[0_4px_25px_rgba(0,0,0,0.85)] backdrop-blur-md cursor-pointer transition-all group"
      >
        {/* Rotating Compass Icon */}
        <div
          className="w-6 h-6 rounded-full border border-[#c9a227] flex items-center justify-center text-[#ff7a1a] shadow-inner transition-transform"
          style={{ transform: `rotate(${scrollProgress * 360}deg)` }}
        >
          <Compass className="w-4 h-4" />
        </div>

        {/* Telemetry Details */}
        <div className="text-left text-[11px] leading-tight">
          <div className="text-[#ffd56b] font-bold font-mono flex items-center gap-1.5">
            <span>VOYAGE {depthPercent}%</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <div className="text-[9px] text-[#b39b6d] font-mono">
            {latDeg}°N, {lonDeg}°E
          </div>
        </div>

        <ChevronRight
          className={`w-3.5 h-3.5 text-[#c9a227] group-hover:text-[#ffd56b] transition-transform ${
            menuOpen ? 'rotate-90' : ''
          }`}
        />
      </button>
    </div>
  );
};
