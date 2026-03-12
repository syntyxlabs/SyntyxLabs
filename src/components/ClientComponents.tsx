"use client";

import { Analytics } from "@vercel/analytics/next";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { trackEvent, trackScrollDepth } from "@/lib/analytics";

const ParticleBackground = dynamic(
  () => import("@/components/ParticleBackground"),
  { ssr: false }
);

const CustomCursor = dynamic(() => import("@/components/CustomCursor"), {
  ssr: false,
});

export default function ClientComponents() {
  const trackedDepths = useRef<Set<number>>(new Set());

  useEffect(() => {
    const thresholds = [25, 50, 75, 100];

    const sendScrollDepthEvents = () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const percentScrolled =
        scrollableHeight <= 0
          ? 100
          : Math.min((window.scrollY / scrollableHeight) * 100, 100);

      thresholds.forEach((threshold) => {
        if (
          percentScrolled >= threshold &&
          !trackedDepths.current.has(threshold)
        ) {
          trackedDepths.current.add(threshold);
          trackScrollDepth(threshold);
        }
      });
    };

    let ticking = false;

    const handleScroll = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(() => {
        sendScrollDepthEvents();
        ticking = false;
      });
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target as Element | null;
      const analyticsTarget = target?.closest("[data-analytics-event]");

      if (!(analyticsTarget instanceof HTMLElement)) {
        return;
      }

      const name = analyticsTarget.dataset.analyticsEvent;

      if (!name) {
        return;
      }

      const properties: Record<string, string> = {};
      const location = analyticsTarget.dataset.analyticsLocation;
      const clickTarget = analyticsTarget.dataset.analyticsTarget;

      if (location) {
        properties.location = location;
      }

      if (clickTarget) {
        properties.target = clickTarget;
      }

      trackEvent(name, properties);
    };

    sendScrollDepthEvents();
    window.addEventListener("scroll", handleScroll, { passive: true });
    document.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <>
      <ParticleBackground />
      <CustomCursor />
      <Analytics />
    </>
  );
}
