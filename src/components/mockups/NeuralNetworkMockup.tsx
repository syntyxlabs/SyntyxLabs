"use client";

import { motion } from "framer-motion";

// Define node positions for a 3-4-3 neural network layout
const layers = [
  // Input layer (3 nodes)
  [
    { x: 15, y: 15 },
    { x: 15, y: 50 },
    { x: 15, y: 85 },
  ],
  // Hidden layer (4 nodes)
  [
    { x: 50, y: 8 },
    { x: 50, y: 35 },
    { x: 50, y: 62 },
    { x: 50, y: 89 },
  ],
  // Output layer (3 nodes)
  [
    { x: 85, y: 15 },
    { x: 85, y: 50 },
    { x: 85, y: 85 },
  ],
];

// Generate connections between adjacent layers
function getConnections() {
  const connections: { x1: number; y1: number; x2: number; y2: number; delay: number }[] = [];
  let idx = 0;

  for (let l = 0; l < layers.length - 1; l++) {
    for (const fromNode of layers[l]) {
      for (const toNode of layers[l + 1]) {
        connections.push({
          x1: fromNode.x,
          y1: fromNode.y,
          x2: toNode.x,
          y2: toNode.y,
          delay: idx * 0.12,
        });
        idx++;
      }
    }
  }

  return connections;
}

const connections = getConnections();

export default function NeuralNetworkMockup() {
  return (
    <div className="relative flex h-48 w-full items-center justify-center overflow-hidden rounded-lg bg-dark-light/80 p-3">
      <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        {/* Connection lines */}
        {connections.map((conn, i) => (
          <motion.line
            key={`conn-${i}`}
            x1={conn.x1}
            y1={conn.y1}
            x2={conn.x2}
            y2={conn.y2}
            stroke="#F9DB9A"
            strokeWidth="0.3"
            initial={{ opacity: 0.05 }}
            animate={{ opacity: [0.05, 0.3, 0.05] }}
            transition={{
              duration: 2,
              delay: conn.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Nodes */}
        {layers.map((layer, layerIndex) =>
          layer.map((node, nodeIndex) => {
            const isGold = layerIndex === 0 || (layerIndex === 1 && nodeIndex % 2 === 0);
            const color = isGold ? "#F9DB9A" : "#AB59D7";

            return (
              <g key={`node-${layerIndex}-${nodeIndex}`}>
                {/* Glow */}
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="4"
                  fill={color}
                  opacity={0.15}
                  initial={{ r: 3 }}
                  animate={{ r: [3, 5, 3] }}
                  transition={{
                    duration: 2,
                    delay: layerIndex * 0.4 + nodeIndex * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                {/* Core node */}
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r="2"
                  fill={color}
                  initial={{ opacity: 0.6 }}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{
                    duration: 2,
                    delay: layerIndex * 0.4 + nodeIndex * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </g>
            );
          })
        )}

        {/* Layer labels */}
        <text x="15" y="98" textAnchor="middle" className="fill-gray-600 text-[4px]">
          Input
        </text>
        <text x="50" y="98" textAnchor="middle" className="fill-gray-600 text-[4px]">
          Hidden
        </text>
        <text x="85" y="98" textAnchor="middle" className="fill-gray-600 text-[4px]">
          Output
        </text>
      </svg>
    </div>
  );
}
