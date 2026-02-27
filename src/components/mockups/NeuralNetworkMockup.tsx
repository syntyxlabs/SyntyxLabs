"use client";

import { motion } from "framer-motion";

const PURPLE = "#AB59D7";
const GOLD = "#F9DB9A";
const ORANGE = "#F67300";

// Node positions forming a brain side-view silhouette
const nodes: [number, number][] = [
  // === CONTOUR (clockwise from front-bottom) ===
  // Frontal lobe (curving up from bottom-left)
  [85, 115], [76, 96], [74, 76], [80, 58], [94, 42], [112, 30],
  // Parietal lobe (top dome)
  [132, 22], [154, 18], [176, 22], [196, 32],
  // Occipital lobe (back, curving down)
  [212, 46], [222, 66], [222, 86], [214, 102],
  // Cerebellum (bump at back-bottom)
  [208, 114], [212, 130], [202, 144], [188, 144], [176, 132], [168, 122],
  // Temporal lobe (bottom, going left)
  [152, 116], [134, 116], [114, 115], [96, 114],
  // === INTERIOR NODES ===
  // Row 1 (near top)
  [112, 42], [134, 34], [158, 32], [182, 38], [200, 52],
  // Row 2
  [90, 66], [112, 54], [136, 46], [160, 44], [182, 52], [202, 64],
  // Row 3 (middle)
  [84, 86], [108, 72], [132, 62], [156, 58], [180, 64], [202, 80],
  // Row 4
  [90, 100], [114, 88], [138, 78], [160, 74], [182, 80], [204, 94],
  // Row 5 (lower)
  [106, 104], [132, 96], [156, 92], [178, 96], [198, 108],
  // Interior fill
  [120, 68], [148, 52], [170, 56], [192, 68], [144, 68], [168, 74],
  [124, 82], [148, 84], [172, 88], [192, 100], [140, 106], [162, 106],
];

// Pre-compute edges: connect nodes within distance threshold
const MAX_DIST = 28;
const MAX_DIST_SQ = MAX_DIST * MAX_DIST;
const edges: [number, number][] = [];
for (let i = 0; i < nodes.length; i++) {
  for (let j = i + 1; j < nodes.length; j++) {
    const dx = nodes[i][0] - nodes[j][0];
    const dy = nodes[i][1] - nodes[j][1];
    if (dx * dx + dy * dy < MAX_DIST_SQ) {
      edges.push([i, j]);
    }
  }
}

// Circuit lines extending outward from brain boundary
const circuits = [
  // Left (from frontal lobe)
  { x1: 74, y1: 76, x2: 18, y2: 76, c: PURPLE },
  { x1: 80, y1: 58, x2: 24, y2: 58, c: GOLD },
  { x1: 85, y1: 115, x2: 30, y2: 135, c: ORANGE },
  // Right (from occipital)
  { x1: 222, y1: 66, x2: 278, y2: 66, c: GOLD },
  { x1: 222, y1: 86, x2: 282, y2: 86, c: PURPLE },
  { x1: 214, y1: 102, x2: 272, y2: 115, c: ORANGE },
  // Top
  { x1: 132, y1: 22, x2: 120, y2: 2, c: GOLD },
  { x1: 154, y1: 18, x2: 154, y2: 2, c: PURPLE },
  { x1: 176, y1: 22, x2: 188, y2: 2, c: ORANGE },
  // Bottom
  { x1: 134, y1: 116, x2: 120, y2: 175, c: GOLD },
  { x1: 152, y1: 116, x2: 152, y2: 180, c: PURPLE },
  { x1: 202, y1: 144, x2: 235, y2: 178, c: ORANGE },
];

const nodeColors = nodes.map((_, i) => [GOLD, PURPLE, ORANGE][i % 3]);

// Neural signal paths: sequences of node indices for traveling dots
const signalPaths = [
  [0, 1, 2, 35, 36, 37, 38, 39, 40, 11, 10],     // frontal → top-right
  [13, 12, 11, 10, 9, 8, 7, 6, 5],                 // back → top → front
  [23, 22, 21, 20, 46, 47, 48, 49, 14, 15, 16],   // bottom → through middle → back
  [0, 29, 44, 45, 50, 51, 52, 53, 17],             // front-bottom → center → back
  [5, 24, 30, 31, 36, 42, 43, 38, 33, 28, 10],    // frontal → interior zigzag → top
  [14, 41, 40, 34, 28, 7, 6],                       // back → interior → front-top
];

export default function NeuralNetworkMockup() {
  return (
    <div className="relative h-48 w-full overflow-hidden rounded-lg bg-dark-light/80">
      <svg viewBox="0 0 300 192" className="h-full w-full">
        <defs>
          <filter id="nn-glow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="nn-glow-lg" x="-150%" y="-150%" width="400%" height="400%">
            <feGaussianBlur stdDeviation="6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <radialGradient id="nn-ambient" cx="48%" cy="42%" r="45%">
            <stop offset="0%" stopColor={PURPLE} stopOpacity="0.15" />
            <stop offset="60%" stopColor={GOLD} stopOpacity="0.05" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Ambient glow behind brain */}
        <ellipse cx="148" cy="78" rx="85" ry="68" fill="url(#nn-ambient)" />

        {/* Pulse rings radiating from center */}
        {[0, 1, 2].map((ring) => (
          <motion.ellipse
            key={`ring-${ring}`}
            cx={150}
            cy={76}
            fill="none"
            stroke={[GOLD, PURPLE, ORANGE][ring]}
            strokeWidth={1.2}
            initial={{ rx: 20, ry: 20, strokeOpacity: 0 }}
            animate={{
              rx: [20, 90, 90],
              ry: [20, 75, 75],
              strokeOpacity: [0.3, 0.08, 0],
            }}
            transition={{
              duration: 4,
              delay: ring * 1.3,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Circuit lines extending outward */}
        {circuits.map((c, i) => (
          <g key={`cir-${i}`}>
            <motion.path
              d={`M${c.x1},${c.y1} L${c.x2},${c.y2}`}
              stroke={c.c}
              strokeWidth={1}
              strokeOpacity={0.3}
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: i * 0.1, ease: "easeOut" }}
            />
            {/* Endpoint node */}
            <motion.circle
              cx={c.x2}
              cy={c.y2}
              r={2}
              fill={c.c}
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{
                duration: 2,
                delay: 1.2 + i * 0.15,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {/* Traveling dot along circuit line */}
            <motion.circle
              r={2}
              fill={c.c}
              filter="url(#nn-glow)"
              initial={{ cx: c.x1, cy: c.y1, opacity: 0 }}
              animate={{
                cx: [c.x1, c.x2, c.x1],
                cy: [c.y1, c.y2, c.y1],
                opacity: [0, 0.9, 0.9, 0],
              }}
              transition={{
                duration: 2.5,
                delay: 1.5 + i * 0.2,
                repeat: Infinity,
                repeatDelay: 1 + (i % 4) * 0.5,
                ease: "easeInOut",
              }}
            />
          </g>
        ))}

        {/* Neural network connections */}
        {edges.map(([a, b], i) => (
          <motion.line
            key={`e-${i}`}
            x1={nodes[a][0]}
            y1={nodes[a][1]}
            x2={nodes[b][0]}
            y2={nodes[b][1]}
            stroke={GOLD}
            strokeWidth={0.6}
            animate={{ strokeOpacity: [0.04, 0.18, 0.04] }}
            transition={{
              duration: 3,
              delay: (i % 20) * 0.15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Neural signal traveling dots (through brain interior) */}
        {signalPaths.map((path, pi) => {
          const xs = path.map((idx) => nodes[idx][0]);
          const ys = path.map((idx) => nodes[idx][1]);
          const color = [GOLD, PURPLE, ORANGE, GOLD, PURPLE, ORANGE][pi];
          return (
            <motion.circle
              key={`sig-${pi}`}
              r={2.5}
              fill={color}
              filter="url(#nn-glow)"
              initial={{ cx: xs[0], cy: ys[0], opacity: 0 }}
              animate={{
                cx: xs,
                cy: ys,
                opacity: [0, 0.9, ...Array(xs.length - 3).fill(0.9), 0.9, 0],
              }}
              transition={{
                duration: 3 + (pi % 3) * 0.5,
                delay: 2 + pi * 0.8,
                repeat: Infinity,
                repeatDelay: 1.5 + (pi % 3) * 0.5,
                ease: "linear",
              }}
            />
          );
        })}

        {/* Neural network nodes */}
        {nodes.map(([x, y], i) => (
          <motion.circle
            key={`n-${i}`}
            cx={x}
            cy={y}
            r={i < 24 ? 2.2 : 1.6}
            fill={nodeColors[i]}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.3, 0.9, 0.3] }}
            transition={{
              duration: 2.5,
              delay: 0.5 + (i % 12) * 0.18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Larger glow nodes at key points */}
        {[0, 5, 9, 13, 16, 21, 35, 42, 48, 53].map((idx) => (
          <motion.circle
            key={`gn-${idx}`}
            cx={nodes[idx][0]}
            cy={nodes[idx][1]}
            r={4}
            fill={nodeColors[idx]}
            filter="url(#nn-glow)"
            animate={{ opacity: [0.05, 0.45, 0.05] }}
            transition={{
              duration: 3,
              delay: (idx % 8) * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* LLM Badge (centered on brain) */}
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 1.2, ease: "backOut" }}
          style={{ transformOrigin: "150px 76px" }}
        >
          <rect
            x={122}
            y={62}
            width={56}
            height={28}
            rx={4}
            fill="#100900"
            fillOpacity={0.88}
            stroke={GOLD}
            strokeWidth={1}
            strokeOpacity={0.6}
          />
          {/* Badge glow pulse */}
          <motion.rect
            x={122}
            y={62}
            width={56}
            height={28}
            rx={4}
            fill="none"
            stroke={GOLD}
            strokeWidth={2}
            animate={{ strokeOpacity: [0, 0.4, 0] }}
            transition={{
              duration: 3,
              delay: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <text
            x={150}
            y={81}
            textAnchor="middle"
            fill={GOLD}
            fontSize={14}
            fontWeight="bold"
            fontFamily="monospace"
            style={{ letterSpacing: "2px" }}
          >
            LLM
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
