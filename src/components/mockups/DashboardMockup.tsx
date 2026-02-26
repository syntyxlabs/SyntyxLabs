"use client";

import { motion } from "framer-motion";

const barHeights = [60, 85, 45, 70, 90, 55];

export default function DashboardMockup() {
  return (
    <div className="relative h-48 w-full overflow-hidden rounded-lg bg-dark-light/80 p-3">
      {/* Subtle grid lines */}
      <div className="absolute inset-0 opacity-5">
        {[...Array(6)].map((_, i) => (
          <div
            key={`h-${i}`}
            className="absolute left-0 right-0 border-t border-white"
            style={{ top: `${(i + 1) * 16.6}%` }}
          />
        ))}
        {[...Array(6)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="absolute top-0 bottom-0 border-l border-white"
            style={{ left: `${(i + 1) * 16.6}%` }}
          />
        ))}
      </div>

      {/* Top bar */}
      <div className="relative mb-3 flex items-center justify-between">
        <div className="flex gap-1">
          <div className="h-1.5 w-1.5 rounded-full bg-gold/60" />
          <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
          <div className="h-1.5 w-1.5 rounded-full bg-white/20" />
        </div>
        <span className="text-[8px] text-gray-500">Analytics</span>
      </div>

      {/* Stats row */}
      <div className="relative mb-3 flex gap-2">
        <div className="flex-1 rounded bg-white/5 p-1.5">
          <div className="text-[7px] text-gray-500">Revenue</div>
          <div className="text-xs font-bold text-gold">$124K</div>
        </div>
        <div className="flex-1 rounded bg-white/5 p-1.5">
          <div className="text-[7px] text-gray-500">Users</div>
          <div className="text-xs font-bold text-purple-accent">8,420</div>
        </div>
        <div className="flex-1 rounded bg-white/5 p-1.5">
          <div className="text-[7px] text-gray-500">Growth</div>
          <div className="text-xs font-bold text-green-400">+23%</div>
        </div>
      </div>

      {/* Bar chart */}
      <div className="relative flex h-16 items-end justify-between gap-1.5 px-1">
        {barHeights.map((height, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t"
            style={{
              background:
                i % 2 === 0
                  ? "linear-gradient(to top, #F9DB9A, #F67300)"
                  : "linear-gradient(to top, #AB59D7, #F9DB9A)",
            }}
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{
              duration: 1.2,
              delay: i * 0.15,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

    </div>
  );
}
