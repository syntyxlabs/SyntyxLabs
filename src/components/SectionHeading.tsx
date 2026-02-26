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
        <h2 className="text-3xl font-bold text-white md:text-4xl lg:text-5xl">
          {title}
        </h2>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
            {subtitle}
          </p>
        )}
      </div>
    </ScrollReveal>
  );
}
