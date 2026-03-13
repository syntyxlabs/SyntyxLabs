"use client";

import { useState, useEffect } from "react";

export default function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const updateTouchState = () => {
      const nextIsTouch =
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        window.innerWidth < 768;

      setIsTouch(nextIsTouch);
    };

    const frameId = window.requestAnimationFrame(updateTouchState);
    window.addEventListener("resize", updateTouchState);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", updateTouchState);
    };
  }, []);

  return isTouch;
}
