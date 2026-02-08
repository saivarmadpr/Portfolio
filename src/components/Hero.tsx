"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ROLES = [
  "AI Red Team Engineer",
  "LLM Exploitation Specialist",
  "Offensive Security Researcher",
  "Adversarial ML Engineer",
];

/* ── Split a string into per-character <span> elements ── */
function CharSplit({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className={`hero-char inline-block ${className} ${
            char === " " ? "w-[0.3em]" : ""
          }`}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  /* ── Shared scroll transforms ── */
  const headlineScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.4]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const decorOpacity = useTransform(scrollYProgress, [0.05, 0.35], [1, 0]);

  /* ── Enhancement 5: Cinematic split-apart exit ── */
  // Line 1 — drifts up-left, rotates counter-clockwise, scales up, blurs
  const line1X = useTransform(scrollYProgress, [0.05, 0.55], [0, -150]);
  const line1Y = useTransform(scrollYProgress, [0.05, 0.55], [0, -100]);
  const line1Rotate = useTransform(scrollYProgress, [0.05, 0.55], [0, -5]);
  const line1Scale = useTransform(scrollYProgress, [0.05, 0.55], [1, 1.08]);
  const line1BlurVal = useTransform(scrollYProgress, [0.15, 0.5], [0, 8]);
  const line1Filter = useMotionTemplate`blur(${line1BlurVal}px)`;

  // Line 2 — drifts down-right, rotates clockwise, scales up, blurs
  const line2X = useTransform(scrollYProgress, [0.05, 0.55], [0, 150]);
  const line2Y = useTransform(scrollYProgress, [0.05, 0.55], [0, 100]);
  const line2Rotate = useTransform(scrollYProgress, [0.05, 0.55], [0, 5]);
  const line2Scale = useTransform(scrollYProgress, [0.05, 0.55], [1, 1.08]);
  const line2BlurVal = useTransform(scrollYProgress, [0.15, 0.5], [0, 8]);
  const line2Filter = useMotionTemplate`blur(${line2BlurVal}px)`;

  /* ── Enhancement 1: Mouse-following spotlight ── */
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      e.currentTarget.style.setProperty("--mx", `${x}%`);
      e.currentTarget.style.setProperty("--my", `${y}%`);
    },
    []
  );

  /* ── Typing effect for roles ── */
  useEffect(() => {
    const currentRole = ROLES[roleIndex];
    let charIndex = 0;
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      timeout = setInterval(() => {
        if (charIndex <= currentRole.length) {
          setDisplayText(currentRole.slice(0, charIndex));
          charIndex++;
        } else {
          clearInterval(timeout);
          setTimeout(() => setIsTyping(false), 2000);
        }
      }, 60);
    } else {
      let delIndex = currentRole.length;
      timeout = setInterval(() => {
        if (delIndex >= 0) {
          setDisplayText(currentRole.slice(0, delIndex));
          delIndex--;
        } else {
          clearInterval(timeout);
          setRoleIndex((prev) => (prev + 1) % ROLES.length);
          setIsTyping(true);
        }
      }, 30);
    }

    return () => clearInterval(timeout);
  }, [roleIndex, isTyping]);

  /* ── Enhancements 2 + 3: Character reveal + glitch flash ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Per-character staggered reveal — cascading wave
      gsap.from(".hero-char", {
        y: 80,
        opacity: 0,
        duration: 0.6,
        stagger: 0.025,
        ease: "power4.out",
        delay: 0.2,
      });

      // Enhancement 3: Glitch flash on BREAK. and FIX. after chars land
      // 48 total chars × 0.025 stagger + 0.2 delay + 0.6 duration ≈ 2.0s
      gsap.delayedCall(2.0, () => {
        const glitchChars = containerRef.current?.querySelectorAll(
          ".hero-glitch-target .hero-char"
        );
        if (!glitchChars?.length) return;

        const tl = gsap.timeline();
        // Quick jitter with colored ghost offsets
        tl.to(glitchChars, {
          x: () => (Math.random() - 0.5) * 5,
          textShadow: "-2px 0 #39FF14, 2px 0 #FFB000",
          duration: 0.06,
          stagger: { each: 0.015, from: "random" },
        })
          .to(glitchChars, {
            x: () => (Math.random() - 0.5) * 4,
            textShadow: "2px 0 #39FF14, -2px 0 #FFB000",
            duration: 0.06,
            stagger: { each: 0.015, from: "random" },
          })
          .to(glitchChars, {
            x: () => (Math.random() - 0.5) * 3,
            textShadow: "-1px 0 #39FF14, 1px 0 #FFB000",
            duration: 0.05,
            stagger: { each: 0.01, from: "random" },
          })
          // Settle: snap back to position with brief red glow
          .to(glitchChars, {
            x: 0,
            textShadow:
              "0 0 10px rgba(255,59,48,0.6), 0 0 25px rgba(255,59,48,0.25)",
            duration: 0.15,
            stagger: { each: 0.008, from: "start" },
          })
          // Fade glow out
          .to(glitchChars, {
            textShadow: "none",
            duration: 0.6,
            delay: 0.4,
          });
      });

      // Meta elements fade in after headline
      gsap.from(".hero-meta", {
        y: 15,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        delay: 2.2,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative min-h-[120vh]" id="hero">
      <div
        className="group sticky top-0 h-screen flex flex-col justify-center overflow-hidden"
        onMouseMove={handleMouseMove}
      >
        {/* Subtle radial fade at edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,#F5F4EB_85%)]" />

        {/* Enhancement 1: Mouse-following spotlight — red ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none z-[1] opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background:
              "radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(255,59,48,0.06), transparent 40%)",
          }}
        />

        {/* Main content — centered */}
        <motion.div
          className="z-10 w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-20 text-center"
          style={{
            scale: headlineScale,
            opacity: headlineOpacity,
          }}
        >
          {/* Small label above headline */}
          <div className="hero-meta mb-6">
            <span className="text-[10px] tracking-[0.5em] text-charcoal/50 uppercase">
              Portfolio / 2026
            </span>
          </div>

          {/* Enhancement 2 + 5: Per-character headline with split-apart exit */}
          <h1 className="font-bold leading-[0.95] tracking-tight select-none whitespace-nowrap inline-block text-left">
            {/* Line 1 — drifts up-left, rotates, scales, blurs on scroll */}
            <motion.div
              className="overflow-hidden"
              style={{
                x: line1X,
                y: line1Y,
                rotate: line1Rotate,
                scale: line1Scale,
                filter: line1Filter,
              }}
            >
              <span className="block text-[clamp(1.2rem,4vw,6.5rem)] text-charcoal text-shadow-heavy">
                <CharSplit text="CURIOUS ENOUGH TO " />
                <span className="text-signal-red hero-glitch-target inline-block">
                  <CharSplit text="BREAK." className="text-signal-red" />
                </span>
              </span>
            </motion.div>

            {/* Line 2 — drifts down-right, rotates, scales, blurs on scroll */}
            <motion.div
              className="overflow-hidden mt-1 md:mt-3"
              style={{
                x: line2X,
                y: line2Y,
                rotate: line2Rotate,
                scale: line2Scale,
                filter: line2Filter,
              }}
            >
              <span className="block text-[clamp(1.2rem,4vw,6.5rem)] text-charcoal text-shadow-heavy">
                <CharSplit text="CAREFUL ENOUGH TO " />
                <span className="text-signal-red hero-glitch-target inline-block">
                  <CharSplit text="FIX." className="text-signal-red" />
                </span>
              </span>
            </motion.div>
          </h1>

          {/* Divider line — centered */}
          <div className="hero-meta mt-8 mb-6 w-16 h-[2px] bg-signal-red mx-auto" />

          {/* Typing subtitle */}
          <motion.div
            className="hero-meta"
            style={{ opacity: subtitleOpacity }}
          >
            <div className="flex items-center justify-center gap-3 text-sm sm:text-base">
              <span className="text-signal-red font-bold">&gt;</span>
              <span className="text-charcoal/70 tracking-[0.1em]">
                {displayText}
              </span>
              <span className="w-2 h-5 bg-signal-red animate-blink" />
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator — bottom center only */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 hero-meta"
          style={{ opacity: decorOpacity }}
        >
          <span className="text-[10px] tracking-[0.5em] uppercase text-charcoal/45">
            Scroll
          </span>
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-charcoal/40 to-transparent"
            animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.4, 1, 0.4] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
