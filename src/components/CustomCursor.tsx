"use client";

import { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const trailX = useSpring(0, springConfig);
  const trailY = useSpring(0, springConfig);

  useEffect(() => {
    // Hide on touch/mobile devices
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice || window.innerWidth < 768) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      trailX.set(e.clientX);
      trailY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handlePointerCheck = () => {
      const hoveredEl = document.elementFromPoint(
        mousePosition.x,
        mousePosition.y
      );
      if (hoveredEl) {
        const computed = window.getComputedStyle(hoveredEl);
        setIsPointer(computed.cursor === "pointer");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseover", handlePointerCheck);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseover", handlePointerCheck);
    };
  }, [isVisible, mousePosition.x, mousePosition.y, trailX, trailY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="pointer-events-none fixed z-[9999] hidden md:block"
        style={{
          left: mousePosition.x - 4,
          top: mousePosition.y - 4,
          width: isPointer ? 12 : 8,
          height: isPointer ? 12 : 8,
          backgroundColor: "#F9DB9A",
          borderRadius: "50%",
          transition: "width 0.2s, height 0.2s",
        }}
      />

      {/* Trailing glow */}
      <motion.div
        className="pointer-events-none fixed z-[9998] hidden md:block"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          width: isPointer ? 48 : 32,
          height: isPointer ? 48 : 32,
          background:
            "radial-gradient(circle, rgba(249, 219, 154, 0.35) 0%, rgba(249, 219, 154, 0) 70%)",
          borderRadius: "50%",
          transition: "width 0.2s, height 0.2s",
        }}
      />
    </>
  );
}
