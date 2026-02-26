"use client";

import { useForm, ValidationError } from "@formspree/react";
import ScrollReveal from "@/components/ScrollReveal";
import GlowCard from "@/components/GlowCard";
import SectionHeading from "@/components/SectionHeading";

export default function Contact() {
  const [state, handleSubmit] = useForm("mvzblnqb");

  return (
    <section id="contact" className="relative py-12 md:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title="Let's Build Something Together" />

        <ScrollReveal>
          <div className="mb-6 text-center md:mb-12">
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
              {state.succeeded ? (
                <div className="py-8 text-center">
                  <p className="text-2xl font-semibold text-gold">
                    Thanks for reaching out!
                  </p>
                  <p className="mt-2 text-gray-400">
                    We&apos;ll get back to you as soon as possible.
                  </p>
                </div>
              ) : (
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
                      name="name"
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
                      name="email"
                      type="email"
                      required
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors focus:border-gold"
                      placeholder="your@email.com"
                    />
                    <ValidationError
                      prefix="Email"
                      field="email"
                      errors={state.errors}
                      className="mt-1 text-sm text-red-400"
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
                      name="message"
                      required
                      rows={5}
                      className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-gray-500 outline-none transition-colors focus:border-gold"
                      placeholder="Tell us about your project..."
                    />
                    <ValidationError
                      prefix="Message"
                      field="message"
                      errors={state.errors}
                      className="mt-1 text-sm text-red-400"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={state.submitting}
                    className="mx-auto rounded-full bg-gold px-8 py-3 font-semibold text-dark transition-shadow hover:shadow-[0_0_30px_rgba(249,219,154,0.3)] disabled:opacity-60"
                  >
                    {state.submitting ? "Sending..." : "Send Message"}
                  </button>
                </form>
              )}
            </GlowCard>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
