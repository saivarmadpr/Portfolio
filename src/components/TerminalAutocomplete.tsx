"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

interface Category {
  label: string;
  path: string;
  command: string;
  items: string[];
}

const CATEGORIES: Category[] = [
  {
    label: "SPECIALIZATION",
    path: "~/arsenal/specialization",
    command: "ls -la",
    items: [
      "llm-security.conf",
      "cloud-security.sh",
      "penetration-testing.py",
      "web-app-security.rs",
      "threat-analysis.log",
    ],
  },
  {
    label: "OPERATIONS",
    path: "~/arsenal/operations",
    command: "cat active_ops.txt",
    items: [
      "ai-red-teaming",
      "vulnerability-research",
      "siem-log-analysis",
      "incident-response",
      "secure-api-development",
    ],
  },
  {
    label: "SKILL STACK",
    path: "~/arsenal/skill-stack",
    command: "which --all",
    items: [
      "python3",
      "bash",
      "linux",
      "aws-cli",
      "az-cli",
      "siem-toolkit",
      "burpsuite",
      "metasploit",
      "elastic-agent",
      "rest-api-tools",
    ],
  },
  {
    label: "CERTIFICATIONS",
    path: "~/arsenal/certifications",
    command: "gpg --list-keys",
    items: [
      "CompTIA_Security+.cert",
      "AWS_CCP.cert",
      "Azure_AZ-900.cert",
      "IBM_Cloud_Advocate.cert",
      "Google_Cybersecurity.cert",
      "Microsoft_Cybersecurity.cert",
    ],
  },
  {
    label: "ACTIVE PROJECTS",
    path: "~/arsenal/active-projects",
    command: "ps aux | grep running",
    items: [
      "ai-powered-sast",
      "ai-continuous-redteam",
      "mcp-alerting-system",
      "ai-guardrails",
      "cloud-misconfig-scanner",
    ],
  },
  {
    label: "OPERATIONAL HISTORY",
    path: "~/arsenal/history",
    command: "git log --oneline",
    items: [
      "ibm-integration-systems",
      "votal-ai-red-team",
      "competitive-ctfs",
      "phishing-defense-ops",
    ],
  },
];

function TypingText({ text, speed = 40, onDone }: { text: string; speed?: number; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        onDone?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <>{displayed}</>;
}

const SPINNER_FRAMES = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];

function Spinner({ onDone }: { onDone: () => void }) {
  const [frame, setFrame] = useState(0);
  const [dots, setDots] = useState("");

  useEffect(() => {
    let f = 0;
    const interval = setInterval(() => {
      f++;
      setFrame(f % SPINNER_FRAMES.length);
      setDots(".".repeat((Math.floor(f / 3) % 4)));
    }, 80);

    const timeout = setTimeout(() => {
      clearInterval(interval);
      onDone();
    }, 800 + Math.random() * 400);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [onDone]);

  return (
    <span className="text-[13px] font-mono">
      <span className="text-[#28c840]">{SPINNER_FRAMES[frame]}</span>
      <span className="text-[#666]"> loading{dots}</span>
    </span>
  );
}

function TerminalBlock({ category, index }: { category: Category; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [phase, setPhase] = useState<"idle" | "typing" | "spinning" | "results">("idle");

  useEffect(() => {
    if (isInView) {
      const delay = setTimeout(() => setPhase("typing"), index * 450);
      return () => clearTimeout(delay);
    }
  }, [isInView, index]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="mb-3"
    >
      {/* Section label */}
      <div className="flex items-center gap-2.5 mb-1">
        <span className="text-[9px] tracking-[0.3em] uppercase font-bold text-signal-red border border-signal-red/30 px-2.5 py-0.5 bg-signal-red/5 whitespace-nowrap">
          {category.label}
        </span>
        <div className="h-px flex-1 bg-[#222]" />
      </div>

      {/* Prompt line */}
      <div className="flex items-center flex-wrap font-mono leading-snug">
        <span className="text-[#28c840] text-[13px]">sai</span>
        <span className="text-[#555] text-[13px]">@</span>
        <span className="text-[#888] text-[13px]">redteam</span>
        <span className="text-[#555] text-[13px]">:</span>
        <span className="text-[#5c9fd6] text-[13px]">{category.path}</span>
        <span className="text-[#555] text-[13px]">$&nbsp;</span>
        <span className="text-[#ccc] text-[13px]">
          {phase === "idle" ? (
            <span className="animate-pulse">_</span>
          ) : (
            <TypingText
              text={category.command}
              speed={25}
              onDone={() => setPhase("spinning")}
            />
          )}
          {phase === "typing" && <span className="text-[#28c840] animate-pulse">▊</span>}
        </span>
      </div>

      {/* Spinner */}
      {phase === "spinning" && (
        <div className="mt-1 ml-2">
          <Spinner onDone={() => setPhase("results")} />
        </div>
      )}

      {/* Results */}
      <AnimatePresence>
        {phase === "results" && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden mt-1 ml-4 pl-3 border-l border-[#333]"
          >
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              {category.items.map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.15, delay: i * 0.04 }}
                  className="text-sm font-mono text-[#e0e0e0] hover:bg-signal-red hover:text-ivory px-2 py-0.5 transition-all duration-200 cursor-default"
                  whileHover={{ scale: 1.05 }}
                >
                  {item}
                </motion.span>
              ))}
              <span className="text-[10px] font-mono text-[#444]">({category.items.length} found)</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function TerminalAutocomplete() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="border-2 border-charcoal bg-[#0a0a0a] relative overflow-hidden rounded-lg shadow-2xl"
    >
      {/* Terminal header bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-[#333]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-[10px] tracking-[0.3em] text-[#666] uppercase font-mono">
          sai@redteam — arsenal
        </span>
        <span className="text-[10px] text-[#444] font-mono">zsh</span>
      </div>

      {/* Terminal body */}
      <div className="px-5 py-4 md:px-6 md:py-5 bg-[#0a0a0a]">
        {/* ASCII banner */}
        <div className="text-[10px] text-[#444] font-mono leading-tight mb-4 select-none">
          <div>╔═══════════════════════════════════════════════╗</div>
          <div>║&nbsp;&nbsp;ARSENAL INVENTORY — AUTHORIZED ACCESS ONLY&nbsp;&nbsp;║</div>
          <div>╚═══════════════════════════════════════════════╝</div>
        </div>

        {/* Category blocks */}
        {CATEGORIES.map((cat, i) => (
          <TerminalBlock key={cat.path} category={cat} index={i} />
        ))}

        {/* Final prompt */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 3.5 }}
          className="flex items-center font-mono mt-2"
        >
          <span className="text-[#28c840] text-[13px]">sai</span>
          <span className="text-[#555] text-[13px]">@</span>
          <span className="text-[#888] text-[13px]">redteam</span>
          <span className="text-[#555] text-[13px]">:</span>
          <span className="text-[#5c9fd6] text-[13px]">~/arsenal</span>
          <span className="text-[#555] text-[13px]">$&nbsp;</span>
          <span className="text-[#28c840] text-[13px] animate-pulse">▊</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
