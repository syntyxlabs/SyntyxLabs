"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Delay showing banner slightly for better UX
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/5 bg-[#100900]/90 backdrop-blur-md"
        >
          <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-4 sm:flex-row sm:px-6 lg:px-8">
            <div className="flex flex-1 items-start gap-3">
              {/* Cookie icon */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                className="mt-0.5 h-5 w-5 shrink-0 text-gold"
              >
                <circle cx="12" cy="12" r="10" />
                <circle cx="8" cy="10" r="1" fill="currentColor" />
                <circle cx="14" cy="8" r="1" fill="currentColor" />
                <circle cx="10" cy="15" r="1" fill="currentColor" />
                <circle cx="16" cy="14" r="1" fill="currentColor" />
              </svg>
              <p className="text-sm text-gray-400">
                This website uses cookies to enhance your browsing experience,
                analyze traffic, and improve our services.
              </p>
            </div>
            <div className="flex shrink-0 gap-3">
              <button
                onClick={handleDecline}
                className="rounded-full border border-white/20 px-5 py-2 text-sm text-gray-300 transition-colors hover:border-white/40 hover:text-white"
              >
                Decline
              </button>
              <button
                onClick={handleAccept}
                className="rounded-full bg-gold px-5 py-2 text-sm font-semibold text-[#100900] transition-shadow hover:shadow-[0_0_20px_rgba(249,219,154,0.3)]"
              >
                Accept
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
