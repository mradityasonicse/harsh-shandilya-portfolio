import React, { useState, useEffect, useRef } from 'react';

interface CinematicPreloaderProps {
  ownerName?: string;
  durationMs?: number;
  onComplete?: () => void;
}

export const CinematicPreloader: React.FC<CinematicPreloaderProps> = ({
  ownerName = 'HARSH',
  durationMs = 2300,
  onComplete,
}) => {
  const [phase, setPhase] = useState<'waiting' | 'flying' | 'parting' | 'completed'>(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return 'completed';
    }
    return 'waiting';
  });
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (phase === 'completed') {
      onCompleteRef.current?.();
    }
  }, [phase]);

  useEffect(() => {
    // 1. Accessibility: Skip immediately if user requests reduced motion
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      return;
    }

    // 2. bfcache: Skip if restored from browser back-forward cache
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        setPhase('completed');
      }
    };
    window.addEventListener('pageshow', handlePageShow);

    // 3. Timing Coordination
    // Total duration: ~2300ms
    // - t=0ms: Dark stage mounted, portfolio ready underneath
    // - t=50ms: Airplane enters smoothly from left
    // - t=980ms: Airplane passes center stage; curtains begin parting
    // - t=2250ms: Curtains fully open; overlay cleanly unmounts
    const flightTimer = setTimeout(() => {
      setPhase('flying');
    }, 50);

    const partingDelay = Math.round(durationMs * 0.43);
    const partingTimer = setTimeout(() => {
      setPhase('parting');
    }, partingDelay);

    const completionTimer = setTimeout(() => {
      setPhase('completed');
    }, durationMs);

    return () => {
      window.removeEventListener('pageshow', handlePageShow);
      clearTimeout(flightTimer);
      clearTimeout(partingTimer);
      clearTimeout(completionTimer);
    };
  }, [durationMs]);

  // 4. Keyboard Shortcuts: Escape, Space, or Enter to dismiss immediately
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        setPhase('completed');
        onCompleteRef.current?.();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhase('completed');
    onCompleteRef.current?.();
  };

  if (phase === 'completed') {
    return null;
  }

  const isParting = phase === 'parting';
  const isFlying = phase === 'flying' || phase === 'parting';

  // Format owner name cleanly for uppercase letterspaced typography
  const formattedName = ownerName.trim().toUpperCase();

  return (
    <aside
      aria-label="Opening cinematic transition"
      className={`fixed inset-0 z-50 overflow-hidden select-none pointer-events-auto transition-opacity duration-300 ${
        isParting ? 'pointer-events-none' : ''
      }`}
    >
      {/* ============================================================ */}
      {/* FRAME A — RESTRAINED DARK STAGE ATMOSPHERE                   */}
      {/* ============================================================ */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(18, 26, 40, 0.4) 0%, rgba(4, 6, 9, 0.98) 75%)',
        }}
      />

      {/* ============================================================ */}
      {/* FRAME C & D — ELEGANT FABRIC THEATRICAL CURTAINS             */}
      {/* ============================================================ */}

      {/* Left Curtain Panel (Slides -100% to left) */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-1/2 h-full z-10 will-change-transform"
        style={{
          transform: isParting ? 'translateX(-100%)' : 'translateX(0%)',
          transition: isParting
            ? 'transform 1.15s cubic-bezier(0.76, 0, 0.24, 1)'
            : 'none',
          backgroundColor: '#040609',
          backgroundImage: `
            linear-gradient(90deg, 
              rgba(0, 0, 0, 0.85) 0%, 
              rgba(16, 24, 36, 0.35) 12%, 
              rgba(4, 6, 9, 0.92) 28%, 
              rgba(20, 28, 42, 0.25) 45%, 
              rgba(4, 6, 9, 0.95) 62%, 
              rgba(15, 22, 32, 0.35) 82%, 
              rgba(2, 3, 5, 0.98) 100%
            ),
            repeating-linear-gradient(90deg, 
              transparent 0px, 
              transparent 45px, 
              rgba(0, 0, 0, 0.3) 45px, 
              rgba(0, 0, 0, 0.3) 90px
            )
          `,
          boxShadow: isParting ? 'none' : 'inset -20px 0 40px rgba(0, 0, 0, 0.95)',
          borderRight: isParting ? 'none' : '1px solid rgba(223, 190, 122, 0.22)',
        }}
      />

      {/* Right Curtain Panel (Slides +100% to right) */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-1/2 h-full z-10 will-change-transform"
        style={{
          transform: isParting ? 'translateX(100%)' : 'translateX(0%)',
          transition: isParting
            ? 'transform 1.15s cubic-bezier(0.76, 0, 0.24, 1)'
            : 'none',
          backgroundColor: '#040609',
          backgroundImage: `
            linear-gradient(270deg, 
              rgba(0, 0, 0, 0.85) 0%, 
              rgba(16, 24, 36, 0.35) 12%, 
              rgba(4, 6, 9, 0.92) 28%, 
              rgba(20, 28, 42, 0.25) 45%, 
              rgba(4, 6, 9, 0.95) 62%, 
              rgba(15, 22, 32, 0.35) 82%, 
              rgba(2, 3, 5, 0.98) 100%
            ),
            repeating-linear-gradient(270deg, 
              transparent 0px, 
              transparent 45px, 
              rgba(0, 0, 0, 0.3) 45px, 
              rgba(0, 0, 0, 0.3) 90px
            )
          `,
          boxShadow: isParting ? 'none' : 'inset 20px 0 40px rgba(0, 0, 0, 0.95)',
          borderLeft: isParting ? 'none' : '1px solid rgba(223, 190, 122, 0.22)',
        }}
      />

      {/* Center Seam Parting Light Seam */}
      <div
        aria-hidden="true"
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-full z-15 pointer-events-none transition-opacity duration-500 ${
          isParting ? 'opacity-0' : 'opacity-70'
        }`}
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(223, 190, 122, 0.7) 50%, transparent 100%)',
          filter: 'blur(1px)',
        }}
      />

      {/* ============================================================ */}
      {/* FRAME B — GRAND AIRCRAFT SILHOUETTE WITH OWNER SIGNATURE     */}
      {/* ============================================================ */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 -translate-y-1/2 z-25 pointer-events-none w-full flex items-center will-change-transform"
        style={{
          transform: isFlying
            ? 'translateX(128vw) translateY(-2vh)'
            : 'translateX(-115%) translateY(2vh)',
          transition: isFlying
            ? 'transform 2.25s cubic-bezier(0.25, 0.9, 0.45, 1)'
            : 'none',
        }}
      >
        <div className="relative flex items-center">
          {/* Restrained Atmospheric Flight Trail */}
          <div
            className="w-36 sm:w-56 md:w-80 lg:w-96 h-[2px] opacity-40 mr-1"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(223, 190, 122, 0.12) 40%, rgba(223, 190, 122, 0.55) 100%)',
              filter: 'blur(0.5px)',
            }}
          />

          {/* Majestic Large Aerodynamic Aircraft Silhouette */}
          <div className="relative shrink-0 flex items-center">
            <svg
              className="w-[88vw] max-w-[540px] sm:max-w-[700px] md:max-w-[860px] lg:max-w-[1040px] xl:max-w-[1160px] h-auto drop-shadow-[0_20px_50px_rgba(0,0,0,0.98)]"
              viewBox="0 0 520 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Upper Fuselage Metallic Specular Gradient */}
                <linearGradient id="planeBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#1e2a3c" />
                  <stop offset="28%" stopColor="#2c3e56" />
                  <stop offset="55%" stopColor="#141c28" />
                  <stop offset="100%" stopColor="#080c14" />
                </linearGradient>

                {/* Controlled Fuselage Highlight Zone */}
                <linearGradient id="fuselageHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#dfbe7a" stopOpacity="0" />
                  <stop offset="20%" stopColor="#dfbe7a" stopOpacity="0.22" />
                  <stop offset="80%" stopColor="#dfbe7a" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#dfbe7a" stopOpacity="0" />
                </linearGradient>

                {/* Subtle Wing Shading */}
                <linearGradient id="wingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#162232" />
                  <stop offset="100%" stopColor="#0a0f18" />
                </linearGradient>
              </defs>

              {/* Swept Horizontal Stabilizers (Empennage) */}
              <path
                d="M 68 60 L 22 72 L 32 75 L 85 63 Z"
                fill="#0b111a"
                stroke="rgba(223, 190, 122, 0.4)"
                strokeWidth="1.0"
              />

              {/* Swept Vertical Stabilizer (Tail Fin) */}
              <path
                d="M 85 58 L 30 18 L 48 18 L 125 58 Z"
                fill="#0c121c"
                stroke="rgba(223, 190, 122, 0.5)"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              {/* Tail Fin Gold Leading Edge Strip */}
              <path
                d="M 48 18 L 30 18 L 85 58"
                stroke="#dfbe7a"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.85"
              />

              {/* Main Fuselage Aerodynamic Body */}
              <path
                d="M 18 60 Q 75 58 160 56 Q 300 54 440 56 Q 490 58 510 60 Q 490 62 440 64 Q 300 66 160 64 Q 75 62 18 60 Z"
                fill="url(#planeBodyGrad)"
                stroke="rgba(223, 190, 122, 0.65)"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />

              {/* Upper Spine Specular Highlight */}
              <path
                d="M 160 56 Q 300 54 440 56 Q 480 57.5 500 59"
                stroke="#dfbe7a"
                strokeWidth="1.2"
                strokeLinecap="round"
                opacity="0.75"
              />

              {/* Controlled Mid-Fuselage Highlight Plate */}
              <rect
                x="185"
                y="53.5"
                width="220"
                height="13"
                rx="3"
                fill="url(#fuselageHighlight)"
              />

              {/* Executive Cabin Illuminated Windows (Forward of Name) */}
              <rect x="408" y="58" width="6" height="4.5" rx="2" fill="#ffe4a0" opacity="0.85" />
              <rect x="420" y="58" width="6" height="4.5" rx="2" fill="#ffe4a0" opacity="0.85" />
              <rect x="432" y="58" width="6" height="4.5" rx="2" fill="#ffe4a0" opacity="0.85" />

              {/* Executive Cabin Illuminated Windows (Aft of Name) */}
              <rect x="160" y="58" width="6" height="4.5" rx="2" fill="#ffe4a0" opacity="0.85" />
              <rect x="172" y="58" width="6" height="4.5" rx="2" fill="#ffe4a0" opacity="0.85" />

              {/* Cockpit Canopy Tinted Glass Visor */}
              <path
                d="M 445 56 Q 472 56.5 490 58 Q 472 57.5 445 57 Z"
                fill="#06090e"
                stroke="#dfbe7a"
                strokeWidth="1.4"
                strokeLinecap="round"
                opacity="0.9"
              />

              {/* Swept Main Wing (Portside / Lower Profile) */}
              <path
                d="M 285 64 L 175 98 L 198 99 L 345 64 Z"
                fill="url(#wingGrad)"
                stroke="rgba(223, 190, 122, 0.45)"
                strokeWidth="1.1"
                strokeLinejoin="round"
              />
              {/* Winglet Accent */}
              <path
                d="M 175 98 L 170 91 L 175 92 Z"
                fill="#dfbe7a"
                opacity="0.85"
              />

              {/* Underslung Jet Engine Nacelle */}
              <rect
                x="250"
                y="69"
                width="44"
                height="12"
                rx="3"
                fill="#0e1520"
                stroke="rgba(223, 190, 122, 0.45)"
                strokeWidth="0.9"
              />
              {/* Subtle Restrained Exhaust Warmth */}
              <circle
                cx="250"
                cy="75"
                r="2.2"
                fill="#f59e0b"
                opacity="0.75"
              />

              {/* Fuselage Inscription: Portfolio Owner's Clean Signature */}
              <text
                x="295"
                y="61"
                fill="#f8fafc"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize="14"
                fontWeight="900"
                letterSpacing="0.3em"
                style={{
                  fontFamily: "'Cinzel', Georgia, serif",
                  filter: 'drop-shadow(0 1px 4px rgba(0,0,0,0.98))',
                }}
              >
                {formattedName}
              </text>

              {/* Discreet Underline Below Owner Name */}
              <line
                x1="205"
                y1="67.5"
                x2="385"
                y2="67.5"
                stroke="#dfbe7a"
                strokeWidth="0.85"
                strokeOpacity="0.55"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* FRAME D — ACCESSIBLE "SKIP INTRO" ACTION                     */}
      {/* ============================================================ */}
      <div
        className={`absolute bottom-6 right-6 z-30 transition-opacity duration-500 ${
          isParting ? 'opacity-0 pointer-events-none' : 'opacity-100 pointer-events-auto'
        }`}
      >
        <button
          type="button"
          onClick={handleSkip}
          aria-label="Skip opening intro"
          className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#94a3b8]/75 hover:text-[#dfbe7a] transition-all px-3.5 py-1.5 rounded border border-white/10 hover:border-[#dfbe7a]/40 bg-black/50 hover:bg-black/80 backdrop-blur-md focus-visible:ring-1 focus-visible:ring-[#dfbe7a] focus-visible:outline-none cursor-pointer"
        >
          Skip intro
        </button>
      </div>
    </aside>
  );
};
