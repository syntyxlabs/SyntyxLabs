"use client";

import { useRef, useState, useCallback } from "react";
import TiltCard from "./TiltCard";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlowCard({ children, className = "" }: GlowCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const [isActive, setIsActive] = useState(false);

  const updateGlowFromPoint = useCallback((clientX: number, clientY: number) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 100;
    const y = ((clientY - rect.top) / rect.height) * 100;
    setGlowPosition({ x, y });
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      updateGlowFromPoint(e.clientX, e.clientY);
    },
    [updateGlowFromPoint]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const touch = e.touches[0];
      updateGlowFromPoint(touch.clientX, touch.clientY);
      setIsActive(true);
    },
    [updateGlowFromPoint]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const touch = e.touches[0];
      updateGlowFromPoint(touch.clientX, touch.clientY);
    },
    [updateGlowFromPoint]
  );

  return (
    <TiltCard className={className}>
      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-2xl"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsActive(true)}
        onMouseLeave={() => setIsActive(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => setIsActive(false)}
        onTouchCancel={() => setIsActive(false)}
      >
        {/* Glow that follows cursor OR finger */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
          style={{
            opacity: isActive ? 1 : 0,
            background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(249, 219, 154, 0.3) 0%, transparent 50%)`,
          }}
        />

        {/* Card content with glass background */}
        <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.04] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-md">
          {children}
        </div>
      </div>
    </TiltCard>
  );
}
