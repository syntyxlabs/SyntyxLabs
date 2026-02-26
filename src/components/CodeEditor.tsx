"use client";

import { useState, useEffect, useCallback } from "react";

const CODE_SNIPPET = `// Syntyx Labs — Intelligent Agent SDK
import { Agent } from '@syntyx/agents';
import { NeuralEngine } from '@syntyx/ai';

const agent = new Agent({
  name: 'syntyx-orchestrator',
  model: NeuralEngine.create({
    version: 'v4-turbo',
    reasoning: true,
  }),
  tools: ['search', 'analyze', 'deploy'],
});

async function execute(task: string) {
  const plan = await agent.plan(task);
  const result = await agent.run(plan);

  return result.insights;
}`;

interface Token {
  text: string;
  type: "keyword" | "string" | "method" | "comment" | "type" | "number" | "punctuation" | "default";
}

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  const patterns: [RegExp, Token["type"]][] = [
    [/^(\/\/.*)/, "comment"],
    [/^(import|from|const|let|var|function|async|await|return|new|export|default)\b/, "keyword"],
    [/^('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)/, "string"],
    [/^(\d+\.?\d*)/, "number"],
    [/^(Agent|NeuralEngine|Pipeline|string)\b/, "type"],
    [/^(create|plan|run|execute)\b/, "method"],
    [/^([{}()\[\];:.,=<>])/, "punctuation"],
    [/^(\S+)/, "default"],
    [/^(\s+)/, "default"],
  ];

  let remaining = line;
  while (remaining.length > 0) {
    let matched = false;
    for (const [pattern, type] of patterns) {
      const match = remaining.match(pattern);
      if (match) {
        tokens.push({ text: match[0], type });
        remaining = remaining.slice(match[0].length);
        matched = true;
        break;
      }
    }
    if (!matched) {
      tokens.push({ text: remaining[0], type: "default" });
      remaining = remaining.slice(1);
    }
  }

  return tokens;
}

const typeColorMap: Record<Token["type"], string> = {
  keyword: "text-purple-accent",
  string: "text-gold",
  method: "text-orange-accent",
  comment: "text-gray-500",
  type: "text-purple-accent/80",
  number: "text-orange-accent",
  punctuation: "text-gray-400",
  default: "text-gray-200",
};

export default function CodeEditor() {
  const [displayedLength, setDisplayedLength] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const resetAndRestart = useCallback(() => {
    setDisplayedLength(0);
    setIsTyping(true);
  }, []);

  useEffect(() => {
    if (!isTyping) return;

    if (displayedLength >= CODE_SNIPPET.length) {
      setIsTyping(false);
      const timeout = setTimeout(resetAndRestart, 3000);
      return () => clearTimeout(timeout);
    }

    const char = CODE_SNIPPET[displayedLength];
    const delay = char === "\n" ? 80 : char === " " ? 30 : Math.random() * 40 + 20;

    const timeout = setTimeout(() => {
      setDisplayedLength((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timeout);
  }, [displayedLength, isTyping, resetAndRestart]);

  const visibleText = CODE_SNIPPET.slice(0, displayedLength);
  const lines = visibleText.split("\n");

  return (
    <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-[#1a1208]/80 shadow-[0_8px_60px_-12px_rgba(249,219,154,0.15)] backdrop-blur-sm">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/5 px-3 py-2 sm:px-4 sm:py-3">
        <div className="flex gap-1.5">
          <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f56] sm:h-3 sm:w-3" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e] sm:h-3 sm:w-3" />
          <div className="h-2.5 w-2.5 rounded-full bg-[#27c93f] sm:h-3 sm:w-3" />
        </div>
        <span className="ml-2 text-xs text-gray-500">engine.ts</span>
      </div>

      {/* Code area */}
      <div className="overflow-x-auto p-3 font-mono text-xs leading-5 sm:p-4 sm:text-sm sm:leading-6">
        <pre className="whitespace-pre">
          {lines.map((line, lineIndex) => (
            <div key={lineIndex} className="flex">
              <span className="mr-3 inline-block w-5 select-none text-right text-gray-600 sm:mr-4 sm:w-6">
                {lineIndex + 1}
              </span>
              <span>
                {tokenizeLine(line).map((token, tokenIndex) => (
                  <span key={tokenIndex} className={typeColorMap[token.type]}>
                    {token.text}
                  </span>
                ))}
                {lineIndex === lines.length - 1 && (
                  <span className="ml-px inline-block h-5 w-[2px] animate-pulse bg-gold align-middle" />
                )}
              </span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}
