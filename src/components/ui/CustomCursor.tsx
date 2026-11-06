import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [rotation, setRotation] = useState(0);
  const targetPos = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
      setRotation((r) => r + 180 + Math.random() * 90);
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
        x: prev.x + (targetPos.current.x - prev.x) * 0.22,
        y: prev.y + (targetPos.current.y - prev.y) * 0.22,
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
        transform: `translate(-50%, -50%) scale(${isClicking ? 0.85 : 1})`,
      }}
    >
      {/* Outer Brass Ring with Cardinal Points */}
      <div
        className="w-10 h-10 rounded-full border-2 border-[#c9a227] flex items-center justify-center relative shadow-[0_0_15px_rgba(201,162,39,0.5)] transition-transform duration-500 ease-out"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        {/* Cardinal Markers */}
        <span className="absolute -top-3 text-[8px] font-bold text-[#c9a227] font-cinzel">N</span>
        <span className="absolute -bottom-3 text-[8px] font-bold text-[#b39b6d] font-cinzel">S</span>
        <span className="absolute -left-3 text-[8px] font-bold text-[#b39b6d] font-cinzel">W</span>
        <span className="absolute -right-3 text-[8px] font-bold text-[#b39b6d] font-cinzel">E</span>

        {/* Magnetic Needle */}
        <div className="w-[3px] h-6 relative flex flex-col items-center">
          <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[12px] border-b-[#a01d12]" />
          <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-t-[12px] border-t-[#c9a227]" />
        </div>

        {/* Center Brass Rivet */}
        <div className="absolute w-2 h-2 rounded-full bg-[#ff7a1a] shadow-[0_0_8px_#ff7a1a]" />
      </div>
    </div>
  );
};
