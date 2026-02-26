"use client";

import { useState, useEffect } from "react";

export default function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const check =
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      window.innerWidth < 768;

    setIsTouch(check);
  }, []);

  return isTouch;
}
