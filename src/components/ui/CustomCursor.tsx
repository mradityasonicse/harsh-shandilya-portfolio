import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverLabel, setHoverLabel] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [rotation, setRotation] = useState(0);
  const targetPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      // Check hover state on interactive targets
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest('button, a, input, textarea, [data-cursor], .cursor-pointer, .nautical-card');
        if (interactive) {
          setIsHovered(true);
          const customLabel = interactive.getAttribute('data-cursor');
          if (customLabel) {
            setHoverLabel(customLabel);
          } else if (interactive.tagName === 'A' || interactive.tagName === 'BUTTON') {
            setHoverLabel('');
          } else {
            setHoverLabel('');
          }
        } else {
          setIsHovered(false);
          setHoverLabel('');
        }
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      setRotation((prev) => prev + 45);
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

    // Smooth Lerp Loop (Spring Physics)
    let animId: number;
    const updateCursor = () => {
      setPos((prev) => ({
        x: prev.x + (targetPos.current.x - prev.x) * 0.28,
        y: prev.y + (targetPos.current.y - prev.y) * 0.28,
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
        transform: `translate(-50%, -50%) scale(${isClicking ? 0.8 : isHovered ? 1.4 : 1})`,
      }}
    >
      {/* Precision Astrolabe Reticle */}
      <div
        className={`rounded-full border flex items-center justify-center relative transition-all duration-300 ease-out ${
          isHovered
            ? 'w-12 h-12 border-[#dfbe7a] bg-[#dfbe7a]/10 shadow-[0_0_20px_rgba(223,190,122,0.45)]'
            : 'w-7 h-7 border-[#dfbe7a]/50 shadow-[0_0_10px_rgba(223,190,122,0.25)]'
        }`}
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {/* Cardinal Crosshair Ticks */}
        <div className="absolute -top-1 w-[1px] h-2 bg-[#dfbe7a]" />
        <div className="absolute -bottom-1 w-[1px] h-2 bg-[#dfbe7a]" />
        <div className="absolute -left-1 w-2 h-[1px] bg-[#dfbe7a]" />
        <div className="absolute -right-1 w-2 h-[1px] bg-[#dfbe7a]" />

        {/* Center Magnetic Pip */}
        <div
          className={`rounded-full bg-[#dfbe7a] transition-all duration-200 ${
            isHovered ? 'w-2 h-2 shadow-[0_0_8px_#dfbe7a]' : 'w-1.5 h-1.5 shadow-[0_0_4px_#dfbe7a]'
          }`}
        />

        {/* Dynamic Micro-Label when hovering */}
        {hoverLabel && (
          <span className="absolute -bottom-5 text-[8px] font-mono font-bold tracking-widest text-[#dfbe7a] uppercase whitespace-nowrap bg-[#05080c]/90 px-1.5 py-0.5 rounded border border-[#dfbe7a]/30">
            {hoverLabel}
          </span>
        )}
      </div>
    </div>
  );
};
