"use client";

import { useState, useEffect, useCallback } from "react";

const CODE_SNIPPET = `// Syntyx Labs — AI-Powered Solutions
import { NeuralEngine } from '@syntyx/ai';
import { Pipeline } from '@syntyx/core';

const engine = new NeuralEngine({
  model: 'syntyx-v3',
  temperature: 0.7,
  maxTokens: 2048,
});

async function analyzeData(input: string) {
  const pipeline = new Pipeline([
    engine.tokenize,
    engine.embed,
    engine.predict,
  ]);

  const result = await pipeline.run(input);
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
    [/^(NeuralEngine|Pipeline|string)\b/, "type"],
    [/^(analyzeData|tokenize|embed|predict|run)\b/, "method"],
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
    <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-[#1a1208]/80 shadow-2xl backdrop-blur-sm">
      {/* Title bar */}
      <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-[#ff5f56]" />
          <div className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
          <div className="h-3 w-3 rounded-full bg-[#27c93f]" />
        </div>
        <span className="ml-2 text-xs text-gray-500">engine.ts</span>
      </div>

      {/* Code area */}
      <div className="overflow-x-auto p-4 font-mono text-sm leading-6">
        <pre className="whitespace-pre">
          {lines.map((line, lineIndex) => (
            <div key={lineIndex} className="flex">
              <span className="mr-4 inline-block w-6 select-none text-right text-gray-600">
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
