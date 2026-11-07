import React, { useState, useRef } from 'react';
import { playAudioFx } from './AudioEngine';

interface ParchmentCardProps {
  children: React.ReactNode;
  className?: string;
  rotate?: string;
  hasTornEdges?: boolean;
}

export const ParchmentCard: React.FC<ParchmentCardProps> = ({
  children,
  className = '',
  rotate = '0',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    const tiltX = (y / rect.height - 0.5) * -3;
    const tiltY = (x / rect.width - 0.5) * 3;

    setTilt({ x: tiltX, y: tiltY });
    setSpotlight({ x: xPercent, y: yPercent, opacity: 0.18 });
  };

  const handleMouseEnter = () => {
    playAudioFx('page');
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setSpotlight((prev) => ({ ...prev, opacity: 0 }));
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative nautical-card p-6 md:p-8 rounded-xl border border-[#c5a059]/25 shadow-[0_20px_50px_rgba(0,0,0,0.85)] transition-all duration-300 ease-out will-change-transform backdrop-blur-xl ${className}`}
      style={{
        transform: `perspective(1000px) rotate(${rotate}deg) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
    >
      {/* Specular Radial Cursor Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0 rounded-xl transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 350px at ${spotlight.x}% ${spotlight.y}%, rgba(223, 190, 122, ${spotlight.opacity}), transparent 75%)`,
        }}
      />

      {/* Antique Nautical Brass Corner Markers */}
      <div className="absolute top-2.5 left-2.5 w-3 h-3 border-t border-l border-[#dfbe7a]/60 pointer-events-none" />
      <div className="absolute top-2.5 right-2.5 w-3 h-3 border-t border-r border-[#dfbe7a]/60 pointer-events-none" />
      <div className="absolute bottom-2.5 left-2.5 w-3 h-3 border-b border-l border-[#dfbe7a]/60 pointer-events-none" />
      <div className="absolute bottom-2.5 right-2.5 w-3 h-3 border-b border-r border-[#dfbe7a]/60 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-[#f1f5f9]">{children}</div>
    </div>
  );
};
