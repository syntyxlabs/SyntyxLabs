"use client";

import ScrollReveal from "./ScrollReveal";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
}

export default function SectionHeading({
  title,
  subtitle,
  align = "center",
}: SectionHeadingProps) {
  const alignClass =
    align === "center"
      ? "text-center"
      : align === "right"
        ? "text-right"
        : "text-left";

  return (
    <ScrollReveal>
      <div className={`mb-16 ${alignClass}`}>
        <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
          {title}
        </h2>
        {/* Gold accent line under heading */}
        <div
          className={`animate-shimmer mt-4 h-0.5 w-16 rounded-full bg-gradient-to-r from-gold via-orange-accent to-gold ${
            align === "center"
              ? "mx-auto"
              : align === "right"
                ? "ml-auto"
                : ""
          }`}
        />
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            {subtitle}
          </p>
        )}
      </div>
    </ScrollReveal>
  );
}
