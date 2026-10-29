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
  rotate = '-0.5',
  hasTornEdges = true,
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

    const tiltX = (y / rect.height - 0.5) * -4;
    const tiltY = (x / rect.width - 0.5) * 4;

    setTilt({ x: tiltX, y: tiltY });
    setSpotlight({ x: xPercent, y: yPercent, opacity: 0.15 });
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
      className={`relative parchment-card p-6 md:p-8 rounded-sm transition-transform duration-300 ease-out will-change-transform ${
        hasTornEdges ? 'clip-torn-paper' : ''
      } ${className}`}
      style={{
        transform: `perspective(1000px) rotate(${rotate}deg) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
    >
      {/* Specular Radial Cursor Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle 280px at ${spotlight.x}% ${spotlight.y}%, rgba(255, 230, 160, ${spotlight.opacity}), transparent 70%)`,
        }}
      />

      {/* Burnt Paper Corner Accents */}
      <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#8b5a2b] opacity-70" />
      <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#8b5a2b] opacity-70" />
      <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#8b5a2b] opacity-70" />
      <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#8b5a2b] opacity-70" />

      {/* Content */}
      <div className="relative z-10 text-[#171310]">{children}</div>
    </div>
  );
};
