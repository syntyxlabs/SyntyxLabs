"use client";

import ScrollReveal from "@/components/ScrollReveal";
import GlowCard from "@/components/GlowCard";
import SectionHeading from "@/components/SectionHeading";

const highlights = [
  {
    title: "AI-First Approach",
    description:
      "We integrate artificial intelligence into every solution, unlocking automation, predictive insights, and smarter decision-making for your business.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="h-10 w-10 text-gold"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 18v-3m0-3v.01M12 6a6 6 0 016 6c0 1.66-.68 3.16-1.76 4.24L12 18l-4.24-1.76A6 6 0 0112 6z"
        />
        <circle cx="12" cy="12" r="9" />
        <path strokeLinecap="round" d="M9 9h.01M15 9h.01" />
      </svg>
    ),
  },
  {
    title: "End-to-End Development",
    description:
      "From concept to deployment and beyond, we handle the full software development lifecycle so you can focus on what matters most — your business.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="h-10 w-10 text-gold"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    title: "Scalable Solutions",
    description:
      "We build technology that grows with you — cloud-native architectures, modular design, and infrastructure that scales from startup to enterprise.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        className="h-10 w-10 text-gold"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999A5.002 5.002 0 0012 4a5 5 0 00-4.9 4.002A4.002 4.002 0 003 12v3z"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12v4m0 0l-2-2m2 2l2-2" />
      </svg>
    ),
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="About Us" />

        <ScrollReveal>
          <p className="mx-auto mb-16 max-w-3xl text-center text-lg leading-relaxed text-gray-400">
            Syntyx Labs is a forward-thinking software development company
            specializing in AI-driven solutions and custom software. We partner
            with businesses to transform ideas into powerful, scalable technology
            that drives growth and innovation.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {highlights.map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.15}>
              <GlowCard>
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4">{item.icon}</div>
                  <h3 className="mb-2 text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-gray-400">
                    {item.description}
                  </p>
                </div>
              </GlowCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
