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
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      setGlowPosition({ x, y });
    },
    []
  );

  return (
    <TiltCard className={className}>
      <div
        ref={cardRef}
        className="relative overflow-hidden rounded-2xl"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Glow border effect */}
        <div
          className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(249, 219, 154, 0.3) 0%, transparent 50%)`,
          }}
        />

        {/* Card content with glass background */}
        <div className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
          {children}
        </div>
      </div>
    </TiltCard>
  );
}
