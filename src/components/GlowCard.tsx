"use client";

import { useRef, useState, useCallback } from "react";

import useIsTouchDevice from "@/hooks/useIsTouchDevice";
import TiltCard from "./TiltCard";

interface GlowCardProps {
  children: React.ReactNode;
  className?: string;
}

export default function GlowCard({ children, className = "" }: GlowCardProps) {
  const isTouch = useIsTouchDevice();
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
        onMouseMove={isTouch ? undefined : handleMouseMove}
        onMouseEnter={isTouch ? undefined : () => setIsHovered(true)}
        onMouseLeave={isTouch ? undefined : () => setIsHovered(false)}
      >
        {/* Cursor-following glow on desktop only */}
        {!isTouch && (
          <div
            className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-500"
            style={{
              opacity: isHovered ? 1 : 0,
              background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(249, 219, 154, 0.3) 0%, transparent 50%)`,
            }}
          />
        )}

        {/* Card content with glass background — subtle static glow on mobile */}
        <div
          className={`relative rounded-2xl bg-white/[0.04] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)] backdrop-blur-md ${
            isTouch
              ? "border border-white/[0.12] shadow-[0_0_15px_rgba(249,219,154,0.05),inset_0_1px_0_0_rgba(255,255,255,0.05)]"
              : "border border-white/[0.08]"
          }`}
        >
          {children}
        </div>
      </div>
    </TiltCard>
  );
}
