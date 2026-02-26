"use client";

import { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export default function ParticleBackground() {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: false,
      fpsLimit: 60,
      particles: {
        number: {
          value: 100,
          density: {
            enable: true,
          },
        },
        color: {
          value: ["#F9DB9A", "#ffffff", "#AB59D7"],
        },
        opacity: {
          value: { min: 0.3, max: 0.7 },
          animation: {
            enable: true,
            speed: 0.8,
            minimumValue: 0.2,
          },
        },
        size: {
          value: { min: 1.5, max: 3.5 },
        },
        links: {
          enable: true,
          color: "#F9DB9A",
          opacity: 0.25,
          distance: 180,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.6,
          direction: "none",
          random: true,
          straight: false,
          outModes: {
            default: "out",
          },
        },
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: ["grab", "repulse"],
          },
        },
        modes: {
          grab: {
            distance: 250,
            links: {
              opacity: 0.6,
            },
          },
          repulse: {
            distance: 100,
            duration: 0.4,
          },
        },
      },
      detectRetina: true,
    }),
    []
  );

  if (!init) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Particles
        id="constellation-particles"
        options={options}
        className="h-full w-full"
      />
    </div>
  );
}
