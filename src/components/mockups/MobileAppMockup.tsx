"use client";

import { motion } from "framer-motion";

const appScreenItems = [
  { type: "header", color: "bg-purple-accent/20", label: "My App" },
  { type: "card", color: "bg-gold/15", label: "Dashboard" },
  { type: "stat", values: ["128", "94%", "3.2K"] },
  { type: "card", color: "bg-orange-accent/15", label: "Activity" },
  { type: "list", count: 3 },
  { type: "card", color: "bg-purple-accent/15", label: "Settings" },
  { type: "button", label: "Continue" },
  { type: "card", color: "bg-gold/10", label: "Profile" },
];

export default function MobileAppMockup() {
  return (
    <div className="flex h-48 w-full items-center justify-center p-3">
      {/* Phone frame */}
      <div className="relative h-44 w-24 overflow-hidden rounded-2xl border border-white/15 bg-dark-light/80">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 z-10 h-3 w-10 -translate-x-1/2 rounded-b-lg bg-dark-light" />

        {/* Status bar */}
        <div className="relative flex h-5 items-center justify-between px-2 pt-1">
          <span className="text-[5px] text-gray-500">9:41</span>
          <div className="flex gap-0.5">
            <div className="h-1 w-2 rounded-sm bg-gray-500/50" />
            <div className="h-1 w-1 rounded-sm bg-gray-500/50" />
          </div>
        </div>

        {/* Scrolling content */}
        <div className="h-[calc(100%-20px)] overflow-hidden">
          <motion.div
            className="flex flex-col gap-1.5 px-1.5 pb-8"
            animate={{ y: [0, -120, 0] }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              repeatDelay: 1,
            }}
          >
            {appScreenItems.map((item, i) => {
              if (item.type === "header") {
                return (
                  <div key={i} className={`rounded-lg ${item.color} p-1.5`}>
                    <div className="text-[6px] font-bold text-white">{item.label}</div>
                    <div className="mt-0.5 h-0.5 w-8 rounded bg-white/20" />
                  </div>
                );
              }
              if (item.type === "stat") {
                return (
                  <div key={i} className="flex gap-1">
                    {item.values?.map((val, j) => (
                      <div key={j} className="flex-1 rounded bg-white/5 p-1 text-center">
                        <div className="text-[7px] font-bold text-gold">{val}</div>
                      </div>
                    ))}
                  </div>
                );
              }
              if (item.type === "list") {
                return (
                  <div key={i} className="flex flex-col gap-0.5">
                    {[...Array(item.count)].map((_, j) => (
                      <div
                        key={j}
                        className="flex items-center gap-1 rounded bg-white/5 p-1"
                      >
                        <div className="h-2 w-2 rounded-full bg-purple-accent/40" />
                        <div className="h-1 flex-1 rounded bg-white/10" />
                      </div>
                    ))}
                  </div>
                );
              }
              if (item.type === "button") {
                return (
                  <div
                    key={i}
                    className="rounded-full bg-gold/80 py-1 text-center text-[5px] font-bold text-dark"
                  >
                    {item.label}
                  </div>
                );
              }
              // card type
              return (
                <div key={i} className={`rounded-lg ${item.color} p-1.5`}>
                  <div className="text-[6px] text-gray-300">{item.label}</div>
                  <div className="mt-0.5 h-1 w-12 rounded bg-white/10" />
                  <div className="mt-0.5 h-1 w-8 rounded bg-white/5" />
                </div>
              );
            })}
          </motion.div>
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-1 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-white/20" />
      </div>
    </div>
  );
}
