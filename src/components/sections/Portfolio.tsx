"use client";

import ScrollReveal from "@/components/ScrollReveal";
import GlowCard from "@/components/GlowCard";
import SectionHeading from "@/components/SectionHeading";
import DashboardMockup from "@/components/mockups/DashboardMockup";
import NeuralNetworkMockup from "@/components/mockups/NeuralNetworkMockup";
import MobileAppMockup from "@/components/mockups/MobileAppMockup";

const capabilities = [
  {
    title: "Web Applications",
    description:
      "Full-stack web applications with rich dashboards, real-time data, and intuitive interfaces.",
    mockup: <DashboardMockup />,
  },
  {
    title: "AI Solutions",
    description:
      "Machine learning models, intelligent automation, and data-driven insights.",
    mockup: <NeuralNetworkMockup />,
  },
  {
    title: "Mobile Apps",
    description:
      "Cross-platform mobile applications with native performance and elegant design.",
    mockup: <MobileAppMockup />,
  },
];

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="relative px-4 py-12 sm:px-6 md:py-32 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title="What We Build"
          subtitle="Showcasing our capabilities across platforms"
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((cap, index) => (
            <ScrollReveal key={cap.title} delay={index * 0.15}>
              <GlowCard>
                <div className="mb-4">{cap.mockup}</div>
                <h3 className="mb-2 text-xl font-semibold text-white">
                  {cap.title}
                </h3>
                <p className="text-sm leading-relaxed text-gray-400">
                  {cap.description}
                </p>
              </GlowCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
