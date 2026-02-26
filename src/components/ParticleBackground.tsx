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
          value: 80,
          density: {
            enable: true,
          },
        },
        color: {
          value: "#ffffff",
        },
        opacity: {
          value: 0.3,
        },
        size: {
          value: { min: 1, max: 2 },
        },
        links: {
          enable: true,
          color: "#ffffff",
          opacity: 0.15,
          distance: 150,
          width: 1,
        },
        move: {
          enable: true,
          speed: 0.5,
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
            distance: 200,
            links: {
              opacity: 0.4,
            },
          },
          repulse: {
            distance: 80,
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
