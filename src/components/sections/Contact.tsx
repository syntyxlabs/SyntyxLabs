"use client";

import { useState, FormEvent } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import GlowCard from "@/components/GlowCard";
import SectionHeading from "@/components/SectionHeading";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section id="contact" className="relative py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Let's Build Something Together" />

        <ScrollReveal>
          <div className="mb-12 text-center">
            <a
              href="mailto:info@syntyxlabs.com"
              className="text-2xl font-semibold text-gold transition-all hover:underline"
            >
              info@syntyxlabs.com
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="mx-auto max-w-2xl">
            <GlowCard>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1 block text-sm text-gray-400"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors focus:border-gold"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm text-gray-400"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors focus:border-gold"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="mb-1 block text-sm text-gray-400"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors focus:border-gold"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button
                  type="submit"
                  className="mx-auto rounded-full bg-gold px-8 py-3 font-semibold text-dark transition-shadow hover:shadow-[0_0_30px_rgba(249,219,154,0.3)]"
                >
                  {submitted ? "Thanks! We'll be in touch." : "Send Message"}
                </button>
              </form>
            </GlowCard>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
