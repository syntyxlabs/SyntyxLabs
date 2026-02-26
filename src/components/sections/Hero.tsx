"use client";

import ScrollReveal from "@/components/ScrollReveal";
import CodeEditor from "@/components/CodeEditor";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-center overflow-hidden px-4 py-16 sm:px-6 lg:px-8"
    >
      {/* Golden radial glow background — layered for intensity */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: [
            "radial-gradient(ellipse at 70% 40%, rgba(249, 219, 154, 0.18) 0%, transparent 55%)",
            "radial-gradient(ellipse at 60% 60%, rgba(246, 115, 0, 0.08) 0%, transparent 50%)",
            "radial-gradient(ellipse at 80% 30%, rgba(171, 89, 215, 0.06) 0%, transparent 40%)",
          ].join(", "),
        }}
      />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center gap-4 lg:flex-row lg:items-center lg:gap-12">
        {/* Left column — text content */}
        <div className="flex-1 text-center lg:text-left">
          <ScrollReveal delay={0.1}>
            <div className="mb-2 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-gray-300 lg:mb-3">
              Empowering Businesses with Technology
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl">
              <span className="text-white">ENGINEERING THE</span>
              <br />
              <span className="text-white">FUTURE OF</span>
              <br />
              <span className="bg-gradient-to-r from-purple-accent via-gold to-orange-accent bg-clip-text text-transparent">
                {"{ SOFTWARE }"}
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-gray-400 lg:mx-0">
              We craft AI-driven software solutions that help businesses scale
              and innovate. From concept to deployment, we engineer technology
              that matters.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <div className="mt-5 flex flex-col items-center gap-4 sm:flex-row lg:justify-start">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 font-semibold text-dark shadow-[0_0_20px_rgba(249,219,154,0.2)] transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(249,219,154,0.4)]"
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
        <div className="relative w-full max-h-[220px] flex-1 lg:max-h-none lg:max-w-xl overflow-hidden">
          <ScrollReveal direction="right" delay={0.3}>
            <div
              className="lg:[transform:perspective(1200px)_rotateY(-5deg)_rotateX(2deg)]"
            >
              <CodeEditor />
            </div>
          </ScrollReveal>
          {/* Fade-out gradient on mobile so cut-off looks intentional */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-dark to-transparent lg:hidden" />
        </div>
      </div>
    </section>
  );
}
