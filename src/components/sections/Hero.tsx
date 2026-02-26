"use client";

import ScrollReveal from "@/components/ScrollReveal";
import CodeEditor from "@/components/CodeEditor";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden px-4 pt-32 pb-20 sm:px-6 lg:px-8"
    >
      {/* Golden radial glow background */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, rgba(249, 219, 154, 0.12) 0%, transparent 60%)",
        }}
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">
        {/* Left column — text content */}
        <div className="flex-1 text-center lg:text-left">
          <ScrollReveal delay={0.1}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-gray-300">
              <span>&#128640;</span>
              <span>Empowering Businesses with Technology</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="text-white">ENGINEERING THE</span>
              <br />
              <span className="text-white">FUTURE OF</span>
              <br />
              <span className="text-purple-accent">{"{ SOFTWARE }"}</span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-gray-400 lg:mx-0">
              We craft AI-driven software solutions that help businesses scale
              and innovate. From concept to deployment, we engineer technology
              that matters.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-semibold text-dark transition-shadow duration-300 hover:shadow-[0_0_30px_rgba(249,219,154,0.3)]"
              >
                Get Started
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </a>
              <a
                href="#services"
                className="inline-flex items-center rounded-full border border-white/30 px-6 py-3 text-white transition-colors duration-300 hover:border-gold"
              >
                Our Services
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Right column — code editor */}
        <div className="w-full flex-1 lg:max-w-xl">
          <ScrollReveal direction="right" delay={0.3}>
            <div
              className="transform"
              style={{ transform: "perspective(1200px) rotateY(-5deg) rotateX(2deg)" }}
            >
              <CodeEditor />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
