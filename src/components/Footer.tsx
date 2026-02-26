"use client";

import ScrollReveal from "@/components/ScrollReveal";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

const services = [
  "Custom Software",
  "AI & Machine Learning",
  "Web Applications",
  "Mobile Apps",
  "Cloud & DevOps",
  "API Integration",
];

export default function Footer() {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/10">
      {/* Top glow accent */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 h-px w-3/4 -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, #F9DB9A 30%, #F67300 50%, #AB59D7 70%, transparent)",
          opacity: 0.5,
        }}
      />

      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 pt-8 pb-6 sm:px-6 md:pt-16 md:pb-8 lg:px-8">
        <ScrollReveal>
          <div className="grid grid-cols-2 gap-6 md:gap-12 lg:grid-cols-4">
            {/* Brand column */}
            <div className="col-span-2 lg:col-span-1">
              <a href="#home" className="mb-4 inline-block text-2xl font-bold">
                Syntyx <span className="text-gold">Labs</span>
              </a>
              <p className="mb-6 max-w-xs text-sm leading-relaxed text-gray-400">
                Engineering the future of software. We craft AI-driven solutions
                that help businesses scale and innovate.
              </p>
              <a
                href="mailto:info@syntyxlabs.com"
                className="inline-flex items-center gap-2 text-sm text-gold transition-colors hover:text-orange-accent"
              >
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                info@syntyxlabs.com
              </a>
            </div>

            {/* Navigation column */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                Navigation
              </h3>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-gray-400 transition-colors hover:text-gold"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services column */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                Services
              </h3>
              <ul className="space-y-2">
                {services.map((service) => (
                  <li key={service}>
                    <a
                      href="#services"
                      className="text-sm text-gray-400 transition-colors hover:text-gold"
                    >
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA column */}
            <div className="col-span-2 lg:col-span-1">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                Start a Project
              </h3>
              <p className="mb-5 text-sm leading-relaxed text-gray-400">
                Ready to bring your idea to life? Let&apos;s talk about how we
                can help.
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-gold/50 px-5 py-2.5 text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-dark hover:shadow-[0_0_24px_rgba(249,219,154,0.25)]"
              >
                Get in Touch
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Divider */}
        <div className="mt-12 mb-8 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-gray-500">
            &copy; 2026 Syntyx Labs. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {/* Social icons - hidden until accounts are set up */}
            {/* Uncomment when socials are ready:
            <a href="#" aria-label="LinkedIn" className="text-gray-500 transition-colors hover:text-gold">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            */}

            {/* Scroll to top */}
            <button
              onClick={handleScrollToTop}
              aria-label="Scroll to top"
              className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-gray-400 transition-all hover:border-gold/50 hover:text-gold hover:shadow-[0_0_16px_rgba(249,219,154,0.15)]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
