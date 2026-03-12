import { track } from "@vercel/analytics";

type AnalyticsValue = string | number | boolean | null | undefined;

export function trackEvent(
  name: string,
  properties?: Record<string, AnalyticsValue>
) {
  track(name, properties);
}

export function trackScrollDepth(depth: number) {
  trackEvent("Scroll Depth Reached", {
    depth,
    page: "home",
  });
}

export function trackContactFormStarted() {
  trackEvent("Contact Form Started", {
    source: "contact",
    provider: "formspree",
  });
}

export function trackContactFormSubmitted() {
  trackEvent("Contact Form Submitted", {
    source: "contact",
    provider: "formspree",
  });
}
