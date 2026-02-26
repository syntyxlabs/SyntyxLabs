"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Detect scroll position for navbar opacity
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver for active section detection
  useEffect(() => {
    const sections = navLinks.map((link) =>
      document.getElementById(link.href.slice(1))
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-40% 0px -55% 0px",
        threshold: 0,
      }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      const target = document.getElementById(href.slice(1));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
      setMobileMenuOpen(false);
    },
    []
  );

  return (
    <nav
      className={`fixed top-0 right-0 left-0 z-40 transition-all duration-300 ${
        scrolled
          ? "border-b border-white/5 bg-dark/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Wordmark */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, "#home")}
          className="text-xl font-semibold text-white"
        >
          Syntyx Labs
        </a>

        {/* Desktop nav links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="relative py-1 text-sm text-gray-300 transition-colors hover:text-white"
            >
              {link.label}
              {activeSection === link.href.slice(1) && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute -bottom-1 left-0 h-0.5 w-full bg-gold"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="#contact"
          onClick={(e) => handleNavClick(e, "#contact")}
          className="hidden rounded-full border border-gold px-5 py-2 text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-dark md:block"
        >
          Get Started
        </a>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="relative z-50 flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <motion.span
            animate={
              mobileMenuOpen
                ? { rotate: 45, y: 6 }
                : { rotate: 0, y: 0 }
            }
            className="block h-0.5 w-6 bg-white"
          />
          <motion.span
            animate={mobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block h-0.5 w-6 bg-white"
          />
          <motion.span
            animate={
              mobileMenuOpen
                ? { rotate: -45, y: -6 }
                : { rotate: 0, y: 0 }
            }
            className="block h-0.5 w-6 bg-white"
          />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-white/5 bg-dark/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-4 px-4 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`text-lg transition-colors ${
                    activeSection === link.href.slice(1)
                      ? "text-gold"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, "#contact")}
                className="mt-2 rounded-full border border-gold px-5 py-2 text-center text-sm font-semibold text-gold transition-all hover:bg-gold hover:text-dark"
              >
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
