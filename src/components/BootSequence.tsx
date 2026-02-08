"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BootSequenceProps {
  onComplete: () => void;
}

const ASCII_LOGO = `
 ███████╗ █████╗ ██╗
 ██╔════╝██╔══██╗██║
 ███████╗███████║██║
 ╚════██║██╔══██║██║
 ███████║██║  ██║██║
 ╚══════╝╚═╝  ╚═╝╚═╝`;

const BOOT_LINES = [
  { text: "BIOS v4.2.1 — Red Team Operations Unit", delay: 60, type: "system" },
  { text: "Checking memory.................. 32768 MB OK", delay: 120, type: "system" },
  { text: "Mounting encrypted volumes........ /dev/sda1 OK", delay: 150, type: "system" },
  { text: "Loading kernel modules........... OK", delay: 100, type: "system" },
  { text: "Initializing network stack....... eth0 UP", delay: 130, type: "system" },
  { text: "Establishing TOR circuit......... 3 hops OK", delay: 200, type: "system" },
  { text: "Connecting to C2 satellite....... LOCKED", delay: 250, type: "warn" },
  { text: "Verifying PGP fingerprint........ MATCH", delay: 180, type: "system" },
  { text: "Decrypting personnel archive..... OK", delay: 150, type: "system" },
  { text: "Loading offensive toolkit........ 47 modules", delay: 120, type: "system" },
  { text: "Scanning attack surface.......... READY", delay: 180, type: "green" },
  { text: "", delay: 50, type: "blank" },
  { text: "╔══════════════════════════════════════════╗", delay: 30, type: "border" },
  { text: "║  TARGET IDENTIFIED: SAI                  ║", delay: 300, type: "target" },
  { text: "║  STATUS: ACTIVE  |  CLEARANCE: LEVEL 5   ║", delay: 150, type: "status" },
  { text: "║  ROLE: AI RED TEAM ENGINEER               ║", delay: 150, type: "role" },
  { text: "╚══════════════════════════════════════════╝", delay: 30, type: "border" },
  { text: "", delay: 50, type: "blank" },
  { text: "> INITIATING PORTFOLIO INTERFACE...", delay: 400, type: "init" },
];

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [visibleLines, setVisibleLines] = useState<number>(0);
  const [isExiting, setIsExiting] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [progress, setProgress] = useState(0);

  const startExit = useCallback(() => {
    setIsExiting(true);
    setTimeout(onComplete, 1000);
  }, [onComplete]);

  useEffect(() => {
    // Show ASCII logo first
    const logoTimer = setTimeout(() => setShowLogo(true), 200);
    return () => clearTimeout(logoTimer);
  }, []);

  useEffect(() => {
    if (!showLogo) return;

    if (visibleLines >= BOOT_LINES.length) {
      const timer = setTimeout(startExit, 500);
      return () => clearTimeout(timer);
    }

    const timer = setTimeout(() => {
      setVisibleLines((prev) => prev + 1);
      setProgress(((visibleLines + 1) / BOOT_LINES.length) * 100);
    }, BOOT_LINES[visibleLines]?.delay || 100);

    return () => clearTimeout(timer);
  }, [visibleLines, startExit, showLogo]);

  const handleSkip = () => {
    if (!isExiting) {
      setVisibleLines(BOOT_LINES.length);
    }
  };

  const getLineColor = (type: string) => {
    switch (type) {
      case "target": return "text-signal-red font-bold text-sm";
      case "status": return "text-terminal-green";
      case "role": return "text-phosphor-amber";
      case "warn": return "text-phosphor-amber";
      case "green": return "text-terminal-green";
      case "border": return "text-ivory/40";
      case "init": return "text-ivory animate-pulse";
      case "blank": return "";
      default: return "text-ivory/50";
    }
  };

  return (
    <AnimatePresence>
      {!isExiting ? (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#0a0a0a] flex flex-col items-center justify-center"
          onClick={handleSkip}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full" style={{
              backgroundImage: "linear-gradient(rgba(57,255,20,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(57,255,20,0.3) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }} />
          </div>

          <div className="w-full max-w-2xl px-6 relative">
            {/* ASCII Logo */}
            <motion.pre
              className="text-terminal-green text-[10px] sm:text-xs mb-6 leading-tight font-mono"
              initial={{ opacity: 0, y: -20 }}
              animate={showLogo ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              style={{ textShadow: "0 0 10px rgba(57,255,20,0.5)" }}
            >
              {ASCII_LOGO}
            </motion.pre>

            {/* Terminal window */}
            <div className="border border-ivory/10 rounded-sm overflow-hidden bg-[#0a0a0a]/80 backdrop-blur">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-ivory/10 bg-ivory/[0.02]">
                <div className="w-2.5 h-2.5 rounded-full bg-signal-red" />
                <div className="w-2.5 h-2.5 rounded-full bg-phosphor-amber" />
                <div className="w-2.5 h-2.5 rounded-full bg-terminal-green" />
                <span className="ml-3 text-ivory/50 text-[10px] tracking-[0.3em] uppercase">
                  boot_sequence.sh — sai@redteam
                </span>
              </div>

              {/* Terminal body */}
              <div className="p-5 font-mono text-xs leading-loose min-h-[350px] max-h-[50vh] overflow-hidden">
                {BOOT_LINES.slice(0, visibleLines).map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.1 }}
                    className={`${getLineColor(line.type)} ${line.type === "blank" ? "h-3" : ""}`}
                  >
                    {line.type !== "blank" && line.type !== "border" && line.type !== "target" && line.type !== "status" && line.type !== "role" && (
                      <span className="text-terminal-green/40 mr-2">$</span>
                    )}
                    {line.text}
                  </motion.div>
                ))}

                {/* Blinking cursor */}
                {visibleLines < BOOT_LINES.length && (
                  <span
                    className="inline-block w-2 h-3.5 bg-terminal-green mt-1"
                    style={{
                      animation: "blink 0.8s step-end infinite",
                      boxShadow: "0 0 6px rgba(57,255,20,0.5)",
                    }}
                  />
                )}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-4 h-[2px] bg-ivory/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-terminal-green via-phosphor-amber to-signal-red"
                initial={{ width: "0%" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.2 }}
              />
            </div>

            {/* Bottom info */}
            <div className="flex justify-between mt-3">
              <span className="text-ivory/40 text-[10px] tracking-[0.2em]">
                {Math.round(progress)}% LOADED
              </span>
              <span className="text-ivory/40 text-[10px] tracking-[0.3em] uppercase">
                Click to skip
              </span>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          className="fixed inset-0 z-[9999] bg-[#0a0a0a]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />
      )}
    </AnimatePresence>
  );
}
