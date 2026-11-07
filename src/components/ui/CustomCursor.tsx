import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const targetPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Smooth Lerp Loop
    let animId: number;
    const updateCursor = () => {
      setPos((prev) => ({
        x: prev.x + (targetPos.current.x - prev.x) * 0.25,
        y: prev.y + (targetPos.current.y - prev.y) * 0.25,
      }));
      animId = requestAnimationFrame(updateCursor);
    };
    animId = requestAnimationFrame(updateCursor);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-75 hidden md:block"
      style={{
        left: `${pos.x}px`,
        top: `${pos.y}px`,
        transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : 1})`,
      }}
    >
      {/* Precision Astrolabe Reticle */}
      <div className="w-8 h-8 rounded-full border border-[#dfbe7a]/60 flex items-center justify-center relative shadow-[0_0_12px_rgba(223,190,122,0.35)]">
        {/* Cardinal Crosshair ticks */}
        <div className="absolute -top-1 w-[1px] h-2 bg-[#dfbe7a]" />
        <div className="absolute -bottom-1 w-[1px] h-2 bg-[#dfbe7a]" />
        <div className="absolute -left-1 w-2 h-[1px] bg-[#dfbe7a]" />
        <div className="absolute -right-1 w-2 h-[1px] bg-[#dfbe7a]" />

        {/* Center Reticle Dot */}
        <div className="w-1.5 h-1.5 rounded-full bg-[#dfbe7a] shadow-[0_0_6px_#dfbe7a]" />
      </div>
    </div>
  );
};
