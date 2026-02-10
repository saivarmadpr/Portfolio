"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Marquee from "@/components/Marquee";

/* ══════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════ */

interface MissionItem {
  missionCode: string;
  index: string;
  date: string;
  year: number;
  role: string;
  company: string;
  status: "ACTIVE" | "COMPLETED";
  description: string;
  details: string[];
  verboseDetails: string[];
  techStack: string[];
}

const MISSIONS: MissionItem[] = [
  {
    missionCode: "OP-2601",
    index: "01",
    date: "Jan 2026 — Present",
    year: 2026,
    role: "AI Red Team Engineer",
    company: "Votal AI Inc.",
    status: "ACTIVE",
    description:
      "Red teaming AI agents and LLM applications to identify security, safety, and alignment vulnerabilities in real-world deployments.",
    details: [
      "Executed adversarial testing on LLMs (prompt injection, jailbreaks, data leakage)",
      "Assessed AI agents and tool-using workflows for security weaknesses",
      "Delivered actionable remediation guidance for AI security risks",
    ],
    verboseDetails: [
      "Tested multi-step reasoning chains and autonomous agent loops for exploitable behaviors",
      "Mapped traditional OWASP attack surfaces to AI-specific threat vectors",
      "Built internal testing methodologies and documentation for LLM security assessments",
      "Collaborated cross-functionally with ML engineers on model hardening strategies",
    ],
    techStack: [
      "Python",
      "LLMs",
      "AI Agents",
      "Prompt Engineering",
      "OWASP Top 10 for LLMs",
      "Linux",
      "Git",
    ],
  },
  {
    missionCode: "OP-2101",
    index: "02",
    date: "2021 — 2024",
    year: 2021,
    role: "API Security & Integration Engineer",
    company: "IBM",
    status: "COMPLETED",
    description:
      "Designed and secured enterprise REST APIs and integration systems with a strong focus on application security.",
    details: [
      "Built and secured RESTful APIs using OWASP-aligned best practices",
      "Implemented secure message-driven integrations with IBM ACE and MQ",
      "Applied secure coding and data validation across enterprise systems",
    ],
    verboseDetails: [
      "Performed security reviews and testing of APIs prior to production deployment",
      "Integrated automated security checks into CI/CD pipelines with DevOps teams",
      "Prevented malformed and malicious payloads from propagating across enterprise systems",
      "Built a foundation in application security that transitioned into dedicated cybersecurity roles",
    ],
    techStack: [
      "Java",
      "Python",
      "REST APIs",
      "API Security",
      "OWASP Top 10",
      "IBM ACE",
      "IBM MQ",
      "Jenkins",
      "Linux",
    ],
  },
];

/* ══════════════════════════════════════════════
   TYPEWRITER HOOK
   ══════════════════════════════════════════════ */

function useTypewriter(
  lines: string[],
  shouldStart: boolean,
  charDelay = 12,
  lineDelay = 120,
) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);
  const started = useRef(false);

  const run = useCallback(() => {
    if (started.current) return;
    started.current = true;

    let lineIdx = 0;
    let charIdx = 0;
    const output: string[] = [];

    function tick() {
      if (lineIdx >= lines.length) {
        setDone(true);
        return;
      }
      const currentLine = lines[lineIdx];
      charIdx++;
      output[lineIdx] = currentLine.slice(0, charIdx);
      setVisibleLines([...output]);

      if (charIdx >= currentLine.length) {
        lineIdx++;
        charIdx = 0;
        setTimeout(tick, lineDelay);
      } else {
        setTimeout(tick, charDelay);
      }
    }

    tick();
  }, [lines, charDelay, lineDelay]);

  useEffect(() => {
    if (shouldStart) run();
  }, [shouldStart, run]);

  return { visibleLines, done };
}

/* ══════════════════════════════════════════════
   BOOT SEQUENCE DATA
   ══════════════════════════════════════════════ */

const BOOT_LINES: Record<string, string[]> = {
  "OP-2601": [
    "[OK] Initializing red team protocol...",
    "[OK] Loading threat models...",
    "[OK] Connection established.",
  ],
  "OP-2101": [
    "[OK] Connecting to enterprise gateway...",
    "[OK] Loading API schemas...",
    "[OK] Session authenticated.",
  ],
};

/* ══════════════════════════════════════════════
   TERMINAL READOUT CARD
   ══════════════════════════════════════════════ */

function TerminalCard({
  mission,
  index,
}: {
  mission: MissionItem;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.25 });
  const isActive = mission.status === "ACTIVE";
  const filePath = `~/ops/${mission.missionCode.toLowerCase()}.log`;

  // Boot phase state
  const [bootPhase, setBootPhase] = useState<"idle" | "booting" | "ready">("idle");
  const bootStarted = useRef(false);

  // Verbose toggle
  const [verbose, setVerbose] = useState(false);

  const bootLines = BOOT_LINES[mission.missionCode] || [
    "[OK] Loading mission data...",
    "[OK] Decrypting payload... done.",
  ];

  // Start boot when card scrolls into view
  useEffect(() => {
    if (isInView && !bootStarted.current) {
      bootStarted.current = true;
      setBootPhase("booting");
      // Boot lines stagger in over ~0.9s (3 lines * 300ms), then pause briefly, then transition
      const bootDuration = bootLines.length * 300 + 400;
      setTimeout(() => {
        setBootPhase("ready");
      }, bootDuration);
    }
  }, [isInView, bootLines.length]);

  // Typewriter starts only after boot completes
  const { visibleLines, done: typewriterDone } = useTypewriter(
    mission.details,
    bootPhase === "ready",
    10,
    100,
  );

  return (
    <motion.div
      ref={cardRef}
      className={`terminal-card ${isActive ? "terminal-card-active" : ""}`}
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.7,
        ease: [0.23, 1, 0.32, 1],
        delay: index * 0.15,
      }}
      whileHover={{ y: -6, transition: { duration: 0.3 } }}
    >
      {/* ── Terminal title bar ── */}
      <div className="terminal-card-titlebar">
        <div className="flex items-center gap-[6px]">
          <span className="terminal-card-dot terminal-card-dot--red" />
          <span className="terminal-card-dot terminal-card-dot--yellow" />
          <span className="terminal-card-dot terminal-card-dot--green" />
        </div>
        <span className="text-[10px] text-[#39FF14]/40 font-mono ml-3 tracking-wider">
          {filePath}
        </span>
        <div className="ml-auto flex items-center gap-2">
          <span
            className={`w-1.5 h-1.5 rounded-full ${
              isActive
                ? "bg-[#39FF14] shadow-[0_0_6px_rgba(57,255,20,0.5)] animate-pulse"
                : "bg-[#FFB000]/30"
            }`}
          />
          <span
            className={`text-[8px] tracking-[0.25em] font-bold uppercase font-mono ${
              isActive ? "text-[#39FF14]" : "text-[#FFB000]/50"
            }`}
          >
            {isActive ? "ACTIVE" : "DONE"}
          </span>
        </div>
      </div>

      {/* ── Card body ── */}
      <div className="relative z-[1] p-4 md:p-5 lg:p-6 font-mono min-h-[280px]">
        {/* ── Boot sequence overlay ── */}
        {bootPhase === "booting" && (
          <motion.div
            className="absolute inset-0 z-10 p-4 md:p-5 lg:p-6 flex flex-col justify-center"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mb-3">
              <span className="text-[10px] text-[#39FF14]/50">
                <span className="text-[#39FF14]/70">$</span> ./boot {mission.missionCode.toLowerCase()} --init
              </span>
            </div>
            <div className="space-y-2.5">
              {bootLines.map((line, i) => (
                <motion.div
                  key={i}
                  className="text-[11px] text-[#39FF14]/70"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.2,
                    delay: i * 0.3,
                    ease: "easeOut",
                  }}
                >
                  <span className="text-[#39FF14]">{line.slice(0, 4)}</span>
                  <span className="text-[#39FF14]/50">{line.slice(4)}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Real content (fades in after boot) ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={bootPhase === "ready" ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {/* Command prompt with clickable --verbose */}
          <div className="mb-4">
            <span className="text-[10px] text-[#39FF14]/50">
              <span className="text-[#39FF14]/70">$</span> cat {filePath}{" "}
              <motion.button
                onClick={() => setVerbose((v) => !v)}
                className={`relative transition-colors duration-200 border-b border-dashed ${
                  verbose
                    ? "text-[#FFB000] hover:text-[#FFB000]/80 border-[#FFB000]/40"
                    : "text-[#39FF14]/60 hover:text-[#39FF14]/90 border-[#39FF14]/30 hover:border-[#39FF14]/50"
                }`}
                title={verbose ? "Collapse verbose output" : "Expand verbose output"}
                animate={
                  !verbose
                    ? {
                        textShadow: [
                          "0 0 0px rgba(57,255,20,0)",
                          "0 0 6px rgba(57,255,20,0.4)",
                          "0 0 0px rgba(57,255,20,0)",
                        ],
                      }
                    : {}
                }
                transition={
                  !verbose
                    ? { duration: 2, repeat: 2, delay: 1.5 }
                    : {}
                }
              >
                --verbose
              </motion.button>
            </span>
          </div>

          {/* Date */}
          <span className="text-[9px] tracking-[0.2em] text-[#FFB000]/50 block mb-1.5">
            [{mission.date}]
          </span>

          {/* Role title */}
          <h3 className="text-lg md:text-xl font-bold text-[#39FF14] leading-tight tracking-wide uppercase mb-1 text-shadow-glow">
            {mission.role}
          </h3>

          {/* Company */}
          <p className="text-[10px] tracking-[0.3em] text-[#FFB000]/60 uppercase">
            @ {mission.company}
          </p>

          {/* Description */}
          <p className="text-[11px] text-[#39FF14]/30 mt-3 leading-relaxed">
            {mission.description}
          </p>

          {/* Divider */}
          <div className="border-t border-[#39FF14]/[0.08] my-4" />

          {/* Typewriter detail lines */}
          <div className="space-y-2">
            {visibleLines.map((line, i) => (
              <div key={i} className="flex gap-2 items-start">
                <span className="shrink-0 text-[#39FF14]/40 text-[10px] mt-0.5 select-none">
                  {">"}
                </span>
                <span className="text-[11px] md:text-xs text-[#39FF14]/60 leading-relaxed">
                  {line}
                  {/* Show cursor at end of currently typing line */}
                  {i === visibleLines.length - 1 && !typewriterDone && (
                    <span className="terminal-cursor" />
                  )}
                </span>
              </div>
            ))}
            {/* Blinking cursor after all lines are done, then fade out */}
            {typewriterDone && (
              <motion.div
                className="flex gap-2 items-start"
                initial={{ opacity: 1 }}
                animate={{ opacity: 0 }}
                transition={{ delay: 2, duration: 0.5 }}
              >
                <span className="shrink-0 text-[#39FF14]/40 text-[10px] mt-0.5 select-none">
                  {">"}
                </span>
                <span className="terminal-cursor" />
              </motion.div>
            )}
          </div>

          {/* Verbose expanded details */}
          <AnimatePresence>
            {verbose && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="overflow-hidden"
              >
                <div className="border-t border-[#FFB000]/[0.1] my-3" />
                <div className="mb-1">
                  <span className="text-[7px] tracking-[0.35em] text-[#FFB000]/30 uppercase">
                    // verbose output
                  </span>
                </div>
                <div className="space-y-2 mt-2">
                  {mission.verboseDetails.map((detail, i) => (
                    <motion.div
                      key={i}
                      className="flex gap-2 items-start"
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.25, delay: i * 0.08 }}
                    >
                      <span className="shrink-0 text-[#FFB000]/40 text-[10px] mt-0.5 select-none">
                        {">"}
                      </span>
                      <span className="text-[11px] md:text-xs text-[#FFB000]/50 leading-relaxed">
                        {detail}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Divider */}
          <div className="border-t border-[#39FF14]/[0.08] my-4" />

          {/* Tech stack — fades in after typewriter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={typewriterDone ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-[7px] tracking-[0.35em] text-[#FFB000]/30 uppercase block mb-2">
              // loaded_modules
            </span>
            <div className="flex flex-wrap gap-1.5">
              {mission.techStack.map((tech, i) => (
                <motion.span
                  key={tech}
                  className="text-[9px] px-2.5 py-1 bg-[#39FF14]/[0.04] text-[#39FF14]/50 border border-[#39FF14]/[0.12] tracking-wider uppercase rounded-sm hover:text-[#39FF14]/80 hover:border-[#39FF14]/30 transition-colors duration-200"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={typewriterDone ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.3 + i * 0.04 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Status bar (tmux/vim style) ── */}
      <div className="terminal-card-statusbar">
        <span className="text-[7px] tracking-[0.25em] text-[#39FF14]/20 uppercase">
          {mission.missionCode}/REV-{mission.year}
        </span>
        <div className="flex items-center gap-3">
          <span className="text-[7px] text-[#FFB000]/20 tracking-wider">
            {mission.details.length} entries
          </span>
          <span className="text-[7px] text-[#39FF14]/20">
            {mission.date}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   MAIN SECTION — THE SPOTLIGHT TABLE
   ══════════════════════════════════════════════ */

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(sectionRef, { once: true, amount: 0.02 });

  return (
    <section ref={sectionRef} className="relative" id="experience">
      {/* Marquee banner */}
      <Marquee
        items={[
          "MISSION LOG",
          "FIELD OPERATIONS",
          "CAMPAIGN RECORD",
          "DEPLOYMENT HISTORY",
          "THREAT RESPONSE",
        ]}
        variant="default"
        speed="slow"
      />

      {/* ── Spotlight Table ── */}
      <div className="spotlight-table py-16 md:py-24">
        {/* Section header */}
        <div className="px-6 md:px-12 lg:px-20 mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-shadow-brutal leading-none">
              <span>MISSION </span>
              <span className="text-signal-red">LOG</span>
            </h2>
            <p className="text-xs text-charcoal/40 mt-5 font-mono tracking-wider">
              $ cat /ops/missions.log --all --chronological
            </p>
          </motion.div>
        </div>

        {/* ── Mission Cards with Timeline ── */}
        <div className="px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
          <div className="relative">
            {/* Timeline connector — visible only on desktop side-by-side */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 z-0 pointer-events-none">
              {/* Dashed vertical line */}
              <div
                className="absolute left-1/2 -translate-x-1/2 top-[10%] bottom-[10%]"
                style={{
                  width: "1px",
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, rgba(57,255,20,0.2) 0px, rgba(57,255,20,0.2) 6px, transparent 6px, transparent 14px)",
                }}
              />
              {/* Top node dot */}
              <div className="absolute left-1/2 -translate-x-1/2 top-[50%] -translate-y-[calc(50%+2rem)]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#39FF14]/20 border border-[#39FF14]/30 shadow-[0_0_8px_rgba(57,255,20,0.15)]">
                  <div className="w-1 h-1 rounded-full bg-[#39FF14]/60 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
              {/* Center node dot */}
              <div className="absolute left-1/2 -translate-x-1/2 top-[50%] -translate-y-1/2">
                <div className="w-3 h-3 rounded-full bg-[#39FF14]/15 border border-[#39FF14]/25 shadow-[0_0_12px_rgba(57,255,20,0.1)]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#39FF14]/50 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
              {/* Bottom node dot */}
              <div className="absolute left-1/2 -translate-x-1/2 top-[50%] translate-y-[calc(-50%+2rem)]">
                <div className="w-2.5 h-2.5 rounded-full bg-[#39FF14]/20 border border-[#39FF14]/30 shadow-[0_0_8px_rgba(57,255,20,0.15)]">
                  <div className="w-1 h-1 rounded-full bg-[#39FF14]/60 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            {/* Card grid */}
            <div className="relative z-[1] grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
              {MISSIONS.map((mission, i) => (
                <TerminalCard
                  key={mission.missionCode}
                  mission={mission}
                  index={i}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Decorative bottom fade */}
        <div className="mt-12 md:mt-16 flex justify-center">
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-charcoal/10 to-transparent" />
        </div>
      </div>
    </section>
  );
}
