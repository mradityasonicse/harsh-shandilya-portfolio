import React, { useState } from 'react';
import { Compass, ChevronRight, Navigation } from 'lucide-react';
import { playAudioFx } from './AudioEngine';

interface VoyageHUDProps {
  scrollProgress: number;
  activeSection: string;
}

export const VoyageHUD: React.FC<VoyageHUDProps> = ({ scrollProgress, activeSection }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const waypoints = [
    { id: 'hero', name: 'Helm & Horizon', label: '00' },
    { id: 'legend', name: 'Engineering Chronicle', label: '01' },
    { id: 'armory', name: 'Technical Armory', label: '02' },
    { id: 'voyages', name: 'Flagship Expeditions', label: '03' },
    { id: 'spoils', name: 'Naval Honors & Certs', label: '04' },
    { id: 'log', name: 'Chronicle of Service', label: '05' },
    { id: 'bottle', name: 'Direct Dispatch', label: '06' },
  ];

  const depthPercent = Math.round(scrollProgress * 100);

  // Dynamic coordinates interpolation (Bhilai/Raipur coordinates: 21°14'N 81°38'E)
  const latDeg = (21.24 - scrollProgress * 3).toFixed(2);
  const lonDeg = (81.63 - scrollProgress * 6).toFixed(2);

  const scrollTo = (id: string) => {
    playAudioFx('click');
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-5 left-5 z-40 flex flex-col items-start font-mono">
      {/* Quick Jump Port Drawer */}
      {menuOpen && (
        <div className="mb-2 p-3 bg-[#090e17]/95 border border-[#c5a059]/40 rounded-xl shadow-[0_10px_35px_rgba(0,0,0,0.9)] backdrop-blur-xl animate-scaleUp w-60 text-xs">
          <div className="text-[10px] text-[#dfbe7a] font-bold pb-2 mb-2 border-b border-[#c5a059]/20 uppercase tracking-wider flex items-center gap-1.5">
            <Navigation className="w-3.5 h-3.5 text-[#dfbe7a]" />
            Cartographic Waypoints
          </div>
          <div className="space-y-1">
            {waypoints.map((w) => {
              const isActive = activeSection === w.id;
              return (
                <button
                  key={w.id}
                  onClick={() => scrollTo(w.id)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between text-[11px] transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#dfbe7a] text-[#05080c] font-bold shadow-sm'
                      : 'text-[#94a3b8] hover:bg-[#141f2e] hover:text-[#f1f5f9]'
                  }`}
                >
                  <span className="truncate">{w.name}</span>
                  <span className="text-[9px] opacity-70">[{w.label}]</span>
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
        className="flex items-center gap-3 px-4 py-2 bg-[#090e17]/90 hover:bg-[#0e1622] border border-[#c5a059]/30 hover:border-[#dfbe7a] rounded-full shadow-[0_4px_30px_rgba(0,0,0,0.85)] backdrop-blur-xl cursor-pointer transition-all group"
      >
        {/* Rotating Compass Icon */}
        <div
          className="w-6 h-6 rounded-full border border-[#c5a059]/40 flex items-center justify-center text-[#dfbe7a] shadow-inner transition-transform"
          style={{ transform: `rotate(${scrollProgress * 360}deg)` }}
        >
          <Compass className="w-4 h-4" />
        </div>

        {/* Telemetry Details */}
        <div className="text-left text-[11px] leading-tight">
          <div className="text-[#dfbe7a] font-bold flex items-center gap-1.5">
            <span>EXPEDITION {depthPercent}%</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          <div className="text-[10px] text-[#94a3b8]">
            {latDeg}°N, {lonDeg}°E
          </div>
        </div>

        <ChevronRight
          className={`w-3.5 h-3.5 text-[#dfbe7a] transition-transform ${
            menuOpen ? 'rotate-90' : ''
          }`}
        />
      </button>
    </div>
  );
};
