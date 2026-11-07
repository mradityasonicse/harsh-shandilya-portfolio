import React, { useState, useEffect } from 'react';

interface CinematicPreloaderProps {
  ownerName?: string;
  onComplete?: () => void;
}

export const CinematicPreloader: React.FC<CinematicPreloaderProps> = ({
  ownerName = 'Harsh Shandilya',
  onComplete,
}) => {
  const [phase, setPhase] = useState<'waiting' | 'flying' | 'parting' | 'completed'>('waiting');

  useEffect(() => {
    // 1. Accessibility: Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setPhase('completed');
      onComplete?.();
      return;
    }

    // 2. Asset ready check: Wait for document load or start immediately if ready
    const handleStart = () => {
      // Start flight shortly after mount
      const flightTimer = setTimeout(() => {
        setPhase('flying');
      }, 100);

      // Curtains start parting as airplane reaches center
      const partingTimer = setTimeout(() => {
        setPhase('parting');
      }, 950);

      // Finish sequence quickly and hand control to visitor
      const completeTimer = setTimeout(() => {
        setPhase('completed');
        onComplete?.();
      }, 2350);

      return () => {
        clearTimeout(flightTimer);
        clearTimeout(partingTimer);
        clearTimeout(completeTimer);
      };
    };

    let cleanupTimers: (() => void) | undefined;
    if (document.readyState === 'complete') {
      cleanupTimers = handleStart();
    } else {
      const onLoad = () => {
        cleanupTimers = handleStart();
      };
      window.addEventListener('load', onLoad, { once: true });
      // Fallback max wait in case load event is delayed
      const fallbackTimer = setTimeout(() => {
        cleanupTimers = handleStart();
      }, 400);

      return () => {
        window.removeEventListener('load', onLoad);
        clearTimeout(fallbackTimer);
        cleanupTimers?.();
      };
    }

    return () => {
      cleanupTimers?.();
    };
  }, [onComplete]);

  // Click or Escape key to skip instantly
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        setPhase('completed');
        onComplete?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onComplete]);

  const handleSkip = () => {
    setPhase('completed');
    onComplete?.();
  };

  if (phase === 'completed') {
    return null;
  }

  const isParting = phase === 'parting';
  const isFlying = phase === 'flying' || phase === 'parting';

  return (
    <div
      aria-hidden="true"
      onClick={handleSkip}
      className={`fixed inset-0 z-50 overflow-hidden select-none cursor-pointer ${
        isParting ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
    >
      {/* ============================================================ */}
      {/* ELEGANT STAGE CURTAINS (Dark fabric-like with subtle vertical folds) */}
      {/* ============================================================ */}

      {/* Left Curtain Panel */}
      <div
        className="absolute top-0 left-0 w-1/2 h-full z-10 will-change-transform"
        style={{
          transform: isParting ? 'translateX(-100%)' : 'translateX(0%)',
          transition: isParting
            ? 'transform 1.15s cubic-bezier(0.76, 0, 0.24, 1)'
            : 'none',
          backgroundColor: '#040609',
          backgroundImage: `
            linear-gradient(90deg, 
              rgba(0, 0, 0, 0.8) 0%, 
              rgba(18, 25, 36, 0.4) 15%, 
              rgba(5, 8, 12, 0.9) 30%, 
              rgba(22, 30, 44, 0.3) 48%, 
              rgba(4, 6, 9, 0.95) 65%, 
              rgba(15, 21, 31, 0.4) 85%, 
              rgba(0, 0, 0, 0.98) 100%
            ),
            repeating-linear-gradient(90deg, 
              transparent 0px, 
              transparent 40px, 
              rgba(0, 0, 0, 0.25) 40px, 
              rgba(0, 0, 0, 0.25) 80px
            )
          `,
          boxShadow: isParting ? 'none' : 'inset -15px 0 35px rgba(0, 0, 0, 0.9)',
          borderRight: isParting ? 'none' : '1px solid rgba(197, 160, 89, 0.2)',
        }}
      />

      {/* Right Curtain Panel */}
      <div
        className="absolute top-0 right-0 w-1/2 h-full z-10 will-change-transform"
        style={{
          transform: isParting ? 'translateX(100%)' : 'translateX(0%)',
          transition: isParting
            ? 'transform 1.15s cubic-bezier(0.76, 0, 0.24, 1)'
            : 'none',
          backgroundColor: '#040609',
          backgroundImage: `
            linear-gradient(270deg, 
              rgba(0, 0, 0, 0.8) 0%, 
              rgba(18, 25, 36, 0.4) 15%, 
              rgba(5, 8, 12, 0.9) 30%, 
              rgba(22, 30, 44, 0.3) 48%, 
              rgba(4, 6, 9, 0.95) 65%, 
              rgba(15, 21, 31, 0.4) 85%, 
              rgba(0, 0, 0, 0.98) 100%
            ),
            repeating-linear-gradient(270deg, 
              transparent 0px, 
              transparent 40px, 
              rgba(0, 0, 0, 0.25) 40px, 
              rgba(0, 0, 0, 0.25) 80px
            )
          `,
          boxShadow: isParting ? 'none' : 'inset 15px 0 35px rgba(0, 0, 0, 0.9)',
          borderLeft: isParting ? 'none' : '1px solid rgba(197, 160, 89, 0.2)',
        }}
      />

      {/* Center Seam Parting Light Ray (Reveals soft golden warmth right before parting) */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-1 h-full z-15 pointer-events-none transition-opacity duration-500 ${
          isParting ? 'opacity-0' : 'opacity-80'
        }`}
        style={{
          background: 'linear-gradient(180deg, transparent 0%, #dfbe7a 50%, transparent 100%)',
          filter: 'blur(1.5px)',
        }}
      />

      {/* ============================================================ */}
      {/* REFINED AIRCRAFT SILHOUETTE & PERSONAL LIVERY                */}
      {/* ============================================================ */}
      <div
        className="absolute top-1/2 -translate-y-1/2 z-20 pointer-events-none w-full flex items-center will-change-transform"
        style={{
          transform: isFlying
            ? 'translateX(115vw) translateY(-4vh)'
            : 'translateX(-45vw) translateY(4vh)',
          transition: isFlying
            ? 'transform 2.2s cubic-bezier(0.25, 1, 0.5, 1)'
            : 'none',
        }}
      >
        <div className="relative flex items-center">
          {/* Jet Atmospheric Trailing Vapor Sheen */}
          <div
            className="w-32 sm:w-48 md:w-64 h-[1.5px] opacity-40 mr-1"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(223, 190, 122, 0.1) 40%, rgba(223, 190, 122, 0.6) 100%)',
              filter: 'blur(0.5px)',
            }}
          />

          {/* Minimalist Aerodynamic Jet Silhouette */}
          <div className="relative shrink-0 flex items-center">
            <svg
              className="w-48 sm:w-64 md:w-80 h-auto drop-shadow-[0_10px_25px_rgba(0,0,0,0.9)]"
              viewBox="0 0 420 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Aircraft Fuselage & Wing Silhouette */}
              <path
                d="M10 60 Q 60 59 130 57 L 220 30 L 250 31 L 210 56 L 350 56 Q 395 57 415 60 Q 395 63 350 64 L 210 64 L 250 89 L 220 90 L 130 63 Q 60 61 10 60 Z"
                fill="#0d141e"
                stroke="rgba(223, 190, 122, 0.6)"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />

              {/* Swept Vertical Stabilizer / Tail Fin */}
              <path
                d="M 60 59 L 20 22 L 42 22 L 95 58 Z"
                fill="#090e15"
                stroke="rgba(223, 190, 122, 0.5)"
                strokeWidth="1.0"
              />

              {/* Cockpit Canopy Glint */}
              <path
                d="M 340 56 Q 365 56.5 380 58 Q 365 57.5 340 57 Z"
                fill="none"
                stroke="#dfbe7a"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.9"
              />

              {/* Restrained Engine Exhaust Warmth */}
              <circle
                cx="12"
                cy="60"
                r="2"
                fill="#ffaa22"
                opacity="0.85"
                filter="drop-shadow(0 0 4px #ffaa22)"
              />
            </svg>

            {/* Fuselage Inscription: Owner's Name & Callsign Livery */}
            <div
              className="absolute left-[38%] top-[45%] -translate-y-1/2 flex items-center gap-2 pointer-events-none"
              style={{
                fontFamily: "'Cinzel', Georgia, serif",
              }}
            >
              <span className="text-[10px] sm:text-[11px] md:text-xs font-bold tracking-[0.22em] text-[#dfbe7a] uppercase whitespace-nowrap drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                {ownerName}
              </span>
              <span className="hidden sm:inline-block w-[3px] h-[3px] rounded-full bg-[#dfbe7a]/60" />
              <span className="hidden sm:inline-block text-[8px] md:text-[9px] font-mono tracking-widest text-[#94a3b8] uppercase">
                HS-01
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
