"use client";

import { motion } from "framer-motion";

const pulseKeyframes = {
  scale: [1, 1.15, 1],
  opacity: [0.5, 1, 0.5],
};

const barWidths = [85, 72, 93, 60];
const barLabels = ["Sentiment", "Intent", "Entities", "Context"];
const barColors = ["#F9DB9A", "#AB59D7", "#F67300", "#F9DB9A"];

export default function NeuralNetworkMockup() {
  return (
    <div className="relative h-48 w-full overflow-hidden rounded-lg bg-dark-light/80 p-3">
      {/* Header */}
      <div className="relative mb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <motion.div
            className="h-1.5 w-1.5 rounded-full bg-green-400"
            animate={pulseKeyframes}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          <span className="text-[8px] font-medium text-gray-400">Syntyx Agent</span>
        </div>
        <span className="text-[7px] text-gray-600">Processing</span>
      </div>

      {/* Prompt bubble */}
      <div className="mb-2 rounded bg-white/5 px-2 py-1">
        <p className="text-[7px] text-gray-500">
          <span className="text-gold/70">&#x25B6;</span>{" "}
          Analyze customer feedback for Q4
        </p>
      </div>

      {/* Animated waveform / thinking indicator */}
      <div className="mb-2.5 flex items-center gap-0.5 px-1">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="w-[3px] rounded-full"
            style={{ backgroundColor: i % 3 === 0 ? "#AB59D7" : "#F9DB9A" }}
            animate={{
              height: [4, 8 + Math.random() * 12, 4],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 0.8 + Math.random() * 0.6,
              delay: i * 0.06,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Analysis result bars */}
      <div className="flex flex-col gap-1.5">
        {barWidths.map((width, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-10 text-right text-[6px] text-gray-600">
              {barLabels[i]}
            </span>
            <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-white/5">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-full"
                style={{ backgroundColor: barColors[i] }}
                initial={{ width: 0, opacity: 0.7 }}
                animate={{ width: `${width}%`, opacity: [0.7, 1, 0.7] }}
                transition={{
                  width: { duration: 1.5, delay: 0.8 + i * 0.25, ease: "easeOut" },
                  opacity: {
                    duration: 2,
                    delay: 2.3 + i * 0.25,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }}
              />
            </div>
            <motion.span
              className="w-6 text-[7px] font-medium"
              style={{ color: barColors[i] }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 + i * 0.25 }}
            >
              {width}%
            </motion.span>
          </div>
        ))}
      </div>
    </div>
  );
}
