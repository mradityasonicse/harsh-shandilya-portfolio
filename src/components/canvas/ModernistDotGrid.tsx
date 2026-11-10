import React, { useEffect } from 'react';

interface ModernistDotGridProps {
  isDark?: boolean;
}

export const ModernistDotGrid: React.FC<ModernistDotGridProps> = ({ isDark = false }) => {
  // Pure CSS static grid + 10-line vanilla JavaScript listener to update CSS variables for cursor position
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | PointerEvent) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 w-screen h-screen pointer-events-none z-0 overflow-hidden"
    >
      {/* 1. Base Static Dot Matrix Grid: 1.5px dots, 24px spacing on #f8fafc canvas */}
      <div
        className={`absolute inset-0 transition-colors duration-500 ${
          isDark ? 'dark-dot-grid' : 'light-dot-grid'
        }`}
      />

      {/* 2. Live Spotlight Effect: Soft radial gradient follows the user's cursor behind the grid */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: isDark
            ? `radial-gradient(650px circle at var(--mouse-x, 50vw) var(--mouse-y, 40vh), rgba(52, 211, 153, 0.08) 0%, rgba(7, 21, 16, 0.3) 45%, transparent 75%)`
            : `radial-gradient(650px circle at var(--mouse-x, 50vw) var(--mouse-y, 40vh), rgba(23, 63, 50, 0.05) 0%, rgba(245, 242, 232, 0.4) 45%, transparent 75%)`,
        }}
      />

      {/* 3. Live Dot Illumination: Dots nearest to the cursor subtly light up or shift in color */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          backgroundImage: isDark
            ? 'radial-gradient(#34d399 1.5px, transparent 1.5px)'
            : 'radial-gradient(#173f32 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
          WebkitMaskImage:
            'radial-gradient(280px circle at var(--mouse-x, 50vw) var(--mouse-y, 40vh), black 0%, transparent 100%)',
          maskImage:
            'radial-gradient(280px circle at var(--mouse-x, 50vw) var(--mouse-y, 40vh), black 0%, transparent 100%)',
        }}
      />
    </div>
  );
};
