import React, { useState, useEffect } from 'react';
import { FlightScene3D } from './FlightScene3D';

interface CinematicPreloaderProps {
  ownerName?: string;
  onComplete?: () => void;
}

export const CinematicPreloader: React.FC<CinematicPreloaderProps> = ({
  ownerName = 'Harsh Shandilya',
  onComplete,
}) => {
  const [phase, setPhase] = useState<'flying' | 'parting' | 'completed'>('flying');

  useEffect(() => {
    // 1. Accessibility: Check for prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setPhase('completed');
      onComplete?.();
      return;
    }

    // Safety fallback: ensure curtain opens and completes even if WebGL fails
    const curtainFallback = setTimeout(() => {
      setPhase((prev) => (prev === 'flying' ? 'parting' : prev));
    }, 1400);

    const completeFallback = setTimeout(() => {
      setPhase('completed');
      onComplete?.();
    }, 3200);

    return () => {
      clearTimeout(curtainFallback);
      clearTimeout(completeFallback);
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

  const handleCurtainOpen = () => {
    setPhase('parting');
  };

  const handleFlightComplete = () => {
    setPhase('completed');
    onComplete?.();
  };

  if (phase === 'completed') {
    return null;
  }

  const isParting = phase === 'parting';

  return (
    <div
      aria-hidden="true"
      onClick={handleSkip}
      className={`fixed inset-0 z-50 overflow-hidden select-none cursor-pointer ${
        isParting ? 'pointer-events-none' : 'pointer-events-auto'
      }`}
    >
      {/* ============================================================ */}
      {/* 3D WEBGL FLIGHT SCENE (Boeing 787 / Executive Jet Livery)    */}
      {/* ============================================================ */}
      <FlightScene3D
        ownerName={ownerName}
        onCurtainOpen={handleCurtainOpen}
        onComplete={handleFlightComplete}
      />

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

      {/* Subtle Skip Indicator in corner */}
      <div
        className={`absolute bottom-6 right-6 z-30 transition-opacity duration-700 pointer-events-none text-[10px] tracking-[0.25em] uppercase text-white/35 font-mono ${
          isParting ? 'opacity-0' : 'opacity-70'
        }`}
      >
        Click or ESC to skip
      </div>
    </div>
  );
};
