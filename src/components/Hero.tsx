"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ROLES = [
  "AI Red Team Engineer",
  "LLM Exploitation Specialist",
  "Offensive Security Researcher",
  "Adversarial ML Engineer",
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const headlineScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.4]);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const headlineY = useTransform(scrollYProgress, [0, 0.6], [0, -120]);
  const subtitleOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const decorOpacity = useTransform(scrollYProgress, [0.05, 0.35], [1, 0]);

  // Typing effect for roles
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

  // GSAP word animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-word", {
        y: 80,
        opacity: 0,
        duration: 0.9,
        stagger: 0.14,
        ease: "power4.out",
        delay: 0.2,
      });

      gsap.from(".hero-meta", {
        y: 15,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out",
        delay: 1.0,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[120vh]"
      id="hero"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        {/* Subtle radial fade at edges */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,#F5F4EB_85%)]" />

        {/* Main content — centered */}
        <motion.div
          className="z-10 w-full max-w-7xl mx-auto px-8 md:px-16 lg:px-20 text-center"
          style={{
            scale: headlineScale,
            opacity: headlineOpacity,
            y: headlineY,
          }}
        >
          {/* Small label above headline */}
          <div className="hero-meta mb-6">
            <span className="text-[10px] tracking-[0.5em] text-charcoal/50 uppercase">
              Portfolio / 2026
            </span>
          </div>

          {/* Headline — centered, each sentence on one line, auto-scales to fit */}
          <h1 className="font-bold leading-[0.95] tracking-tight select-none whitespace-nowrap">
            <div className="overflow-hidden">
              <span className="hero-word block text-[clamp(1.2rem,4vw,6.5rem)] text-charcoal text-shadow-heavy">
                CURIOUS ENOUGH TO <span className="text-signal-red">BREAK.</span>
              </span>
            </div>
            <div className="overflow-hidden mt-1 md:mt-3">
              <span className="hero-word block text-[clamp(1.2rem,4vw,6.5rem)] text-charcoal text-shadow-heavy">
                CAREFUL ENOUGH TO <span className="text-signal-red">FIX.</span>
              </span>
            </div>
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
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
