"use client";

import { useEffect, useRef } from "react";
import { motion, useTransform, useInView, useMotionValue } from "framer-motion";
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
  techStack: string[];
}

const MISSIONS: MissionItem[] = [
  {
    missionCode: "OP-2401",
    index: "01",
    date: "2024 — Present",
    year: 2024,
    role: "AI Red Team Engineer",
    company: "Independent",
    status: "ACTIVE",
    description: "Leading adversarial testing of LLM-based applications",
    details: [
      "Discovered 12+ critical vulnerabilities in production AI systems",
      "Developed automated red teaming frameworks for LLM evaluation",
      "Published research on prompt injection attack taxonomies",
      "Advised organizations on AI safety and security posture",
    ],
    techStack: ["Python", "GPT-4", "Claude", "Langchain", "Custom Tools"],
  },
  {
    missionCode: "OP-2201",
    index: "02",
    date: "2022 — 2024",
    year: 2022,
    role: "Security Engineer",
    company: "Tech Company",
    status: "COMPLETED",
    description: "Application security and penetration testing",
    details: [
      "Conducted 50+ penetration tests on web applications",
      "Built internal security tooling reducing vuln detection time by 40%",
      "Trained engineering teams on secure coding practices",
      "Established bug bounty program and triage process",
    ],
    techStack: ["Burp Suite", "Python", "Go", "AWS", "Docker"],
  },
  {
    missionCode: "OP-2001",
    index: "03",
    date: "2020 — 2022",
    year: 2020,
    role: "Full Stack Developer",
    company: "Startup",
    status: "COMPLETED",
    description: "Building scalable web applications",
    details: [
      "Architected microservices handling 1M+ requests/day",
      "Led migration from monolith to event-driven architecture",
      "Implemented CI/CD pipelines and infrastructure as code",
      "Mentored junior developers on best practices",
    ],
    techStack: ["TypeScript", "React", "Node.js", "PostgreSQL", "K8s"],
  },
  {
    missionCode: "OP-1801",
    index: "04",
    date: "2018 — 2020",
    year: 2018,
    role: "Software Engineer",
    company: "Enterprise",
    status: "COMPLETED",
    description: "Backend systems and API development",
    details: [
      "Developed RESTful APIs serving 500K+ users",
      "Optimized database queries reducing latency by 60%",
      "Implemented authentication and authorization systems",
      "Contributed to open-source security tools",
    ],
    techStack: ["Java", "Spring Boot", "MySQL", "Redis", "Linux"],
  },
];

const TOTAL = MISSIONS.length;
const STEP = 1 / TOTAL;

/* ══════════════════════════════════════════════
   FOLDER CARD — 3D stacked classified briefing
   ══════════════════════════════════════════════ */

function FolderCard({
  mission,
  index,
  scrollProgress,
}: {
  mission: MissionItem;
  index: number;
  scrollProgress: ReturnType<typeof useMotionValue>;
}) {
  const isLast = index === TOTAL - 1;

  /* ── Build scroll-driven keyframes ──

     Each STEP of scrollProgress corresponds to one card's lifecycle.
     Within each step, the first half is a HOLD (active card is readable),
     and the second half is a TRANSITION (active card exits, next rises).

     For card at `index`:
       - While buried: offset down by depth × 50px, scaled down, dimmed
       - Holds at each depth until the card above starts its exit
       - When it becomes active: y=0, scale=1, opacity=1
       - When it exits: flies upward (y=-800), scales up, fades out      */

  const yIn: number[] = [];
  const yOut: number[] = [];
  const sIn: number[] = [];
  const sOut: number[] = [];
  const oIn: number[] = [];
  const oOut: number[] = [];
  const rIn: number[] = [];
  const rOut: number[] = [];

  const DEPTH_OFFSET = 50; // px per depth level — visible peek below active card
  const DEPTH_SCALE = 0.035; // scale reduction per depth level
  const DEPTH_OPACITY = 0.15; // opacity reduction per depth level

  // Phase 1: Depth states — hold at each depth, then transition when card above exits
  for (let j = 0; j <= index; j++) {
    const depth = index - j;
    const stepStart = j * STEP;
    const stepMid = stepStart + STEP * 0.5;

    const depthY = depth * DEPTH_OFFSET;
    const depthScale = 1 - depth * DEPTH_SCALE;
    const depthOpacity = depth === 0 ? 1 : Math.max(0.55, 1 - depth * DEPTH_OPACITY);

    // Arrive at this depth level
    yIn.push(stepStart);
    yOut.push(depthY);
    sIn.push(stepStart);
    sOut.push(depthScale);
    oIn.push(stepStart);
    oOut.push(depthOpacity);
    rIn.push(stepStart);
    rOut.push(0);

    // Hold at this depth through first half of the step (while card above is readable)
    if (depth > 0) {
      yIn.push(stepMid);
      yOut.push(depthY);
      sIn.push(stepMid);
      sOut.push(depthScale);
      oIn.push(stepMid);
      oOut.push(depthOpacity);
      rIn.push(stepMid);
      rOut.push(0);
    }
  }

  // Phase 2: Active hold → exit upward (skip exit for last card)
  if (!isLast) {
    const holdEnd = index * STEP + STEP * 0.5;
    const exitEnd = (index + 1) * STEP;

    // Hold at fully visible active state
    yIn.push(holdEnd);
    yOut.push(0);
    sIn.push(holdEnd);
    sOut.push(1);
    oIn.push(holdEnd);
    oOut.push(1);
    rIn.push(holdEnd);
    rOut.push(0);

    // Exit — fly upward like a page being turned
    yIn.push(exitEnd);
    yOut.push(-800);
    sIn.push(exitEnd);
    sOut.push(1.05);
    oIn.push(exitEnd);
    oOut.push(0);
    rIn.push(exitEnd);
    rOut.push(-5);
  }

  // Pad to progress = 1
  if (yIn[yIn.length - 1] < 1) {
    yIn.push(1);
    yOut.push(yOut[yOut.length - 1]);
    sIn.push(1);
    sOut.push(sOut[sOut.length - 1]);
    oIn.push(1);
    oOut.push(oOut[oOut.length - 1]);
    rIn.push(1);
    rOut.push(rOut[rOut.length - 1]);
  }

  const y = useTransform(scrollProgress, yIn, yOut);
  const scale = useTransform(scrollProgress, sIn, sOut);
  const opacity = useTransform(scrollProgress, oIn, oOut);
  const rotateX = useTransform(scrollProgress, rIn, rOut);
  const rotateZ = useTransform(
    scrollProgress,
    rIn,
    rOut.map((val) => val * 0.35)
  );
  const lift = useTransform(scrollProgress, yIn, yOut.map((val) => val * 0.5));
  const boxShadow = useTransform(
    scrollProgress,
    yIn,
    yOut.map((val) => {
      const blur = Math.max(6, 18 - val * 0.02);
      return `0 ${Math.round(blur)}px ${Math.round(
        blur * 2
      )}px rgba(0,0,0,0.12)`;
    })
  );

  return (
    <motion.div
      className="absolute inset-x-0 top-0"
      style={{
        y,
        scale,
        opacity,
        rotateX,
        rotateZ,
        z: lift,
        zIndex: TOTAL - index,
        transformOrigin: "top center",
        transformStyle: "preserve-3d",
        boxShadow,
      }}
    >
      {/* ── Classified Folder Card ── */}
      <div className="classified-folder relative bg-ivory border-2 border-charcoal/10 shadow-[0_8px_40px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)]">
        {/* Folder tab — protrudes above like a real file tab */}
        <div className="absolute -top-[28px] left-8 z-10">
          <div className="bg-ivory px-5 py-1.5 rounded-t-md border border-b-0 border-charcoal/[0.08] shadow-[0_-2px_8px_rgba(0,0,0,0.04)]">
            <span className="text-[10px] tracking-[0.25em] text-charcoal/50 font-mono uppercase">
              {mission.missionCode} — {mission.date}
            </span>
          </div>
        </div>

        {/* Red tape strip — top edge */}
        <div className="h-[3px] bg-gradient-to-r from-signal-red/80 via-signal-red/50 to-signal-red/10" />

        {/* Folder header bar */}
        <div className="flex items-center justify-between px-5 md:px-8 py-3 border-b border-charcoal/[0.06] bg-charcoal/[0.015]">
          <span className="text-[9px] tracking-[0.4em] text-charcoal/25 uppercase font-mono">
            FIELD OPERATION — {mission.company}
          </span>
          <div className="flex items-center gap-2.5">
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                mission.status === "ACTIVE"
                  ? "bg-terminal-green animate-pulse"
                  : "bg-charcoal/20"
              }`}
            />
            <span
              className={`text-[9px] tracking-[0.3em] font-bold uppercase ${
                mission.status === "ACTIVE"
                  ? "text-terminal-green"
                  : "text-charcoal/30"
              }`}
            >
              {mission.status}
            </span>
          </div>
        </div>

        {/* Card body */}
        <div className="p-5 md:p-8 lg:p-10 relative">
          {/* CLASSIFIED / COMPLETED stamp */}
          <div className="absolute top-4 right-4 md:top-6 md:right-8 pointer-events-none select-none">
            <div
              className={`border-[3px] px-4 py-1.5 text-[10px] tracking-[0.35em] font-bold uppercase ${
                mission.status === "ACTIVE"
                  ? "border-terminal-green/50 text-terminal-green/60"
                  : "border-signal-red/30 text-signal-red/40"
              }`}
              style={{ transform: "rotate(-12deg)" }}
            >
              {mission.status === "ACTIVE" ? "CLASSIFIED" : "COMPLETED"}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-10">
            {/* Left: Big index number */}
            <div className="md:col-span-2 hidden md:block">
              <span className="text-[80px] md:text-[110px] font-bold leading-none text-charcoal/[0.04] block select-none">
                {mission.index}
              </span>
            </div>

            {/* Right: Content */}
            <div className="md:col-span-10">
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-charcoal leading-[0.95]">
                {mission.role}
              </h3>
              <p className="text-[10px] tracking-[0.3em] text-charcoal/40 uppercase mt-2">
                @ {mission.company}
              </p>
              <p className="text-sm md:text-base text-charcoal/55 mt-4 leading-relaxed max-w-xl">
                {mission.description}
              </p>

              {/* Mission details */}
              <ul className="mt-5 space-y-2">
                {mission.details.map((detail, i) => (
                  <li
                    key={i}
                    className="text-sm text-charcoal/50 flex gap-3 leading-relaxed"
                  >
                    <span className="text-signal-red/60 shrink-0 text-[10px] mt-1">
                      ▸
                    </span>
                    {detail}
                  </li>
                ))}
              </ul>

              {/* Tech loadout */}
              <div className="mt-6">
                <span className="text-[9px] tracking-[0.35em] text-charcoal/25 uppercase block mb-2">
                  Loadout
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {mission.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] px-2.5 py-1 bg-charcoal/[0.04] text-charcoal/45 border border-charcoal/[0.08] tracking-wider uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Red tape accent — left edge */}
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-signal-red/25" />

        {/* Bottom reference strip */}
        <div className="px-5 md:px-8 py-2.5 border-t border-charcoal/[0.04]">
          <span className="text-[8px] tracking-[0.3em] text-charcoal/15 font-mono uppercase">
            REF/{mission.missionCode}/{mission.year} — PAGE{" "}
            {mission.index} OF {String(TOTAL).padStart(2, "0")}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   MAIN SECTION
   ══════════════════════════════════════════════ */

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(sectionRef, { once: true, amount: 0.02 });
  const scrollProgress = useMotionValue(0);
  const touchStartY = useRef<number | null>(null);
  const bodyOverflow = useRef<string>("");
  const bodyOverscroll = useRef<string>("");
  const isLocked = useRef(false);
  const hasSnapped = useRef(false);

  const lockBodyScroll = () => {
    if (isLocked.current) return;
    if (typeof document === "undefined") return;
    bodyOverflow.current = document.body.style.overflow;
    bodyOverscroll.current = document.body.style.overscrollBehavior;
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    isLocked.current = true;
  };

  const unlockBodyScroll = () => {
    if (!isLocked.current) return;
    if (typeof document === "undefined") return;
    document.body.style.overflow = bodyOverflow.current;
    document.body.style.overscrollBehavior = bodyOverscroll.current;
    isLocked.current = false;
  };

  /* ── Effect: lock scroll when snapped + card peel ──
     Lenis (SmoothScroll.tsx) handles the snap to this section.
     Once the marquee is in view, we lock body scroll and let
     wheel / touch / keyboard drive the card peel animation. */
  useEffect(() => {
    const clamp = (v: number) => Math.max(0, Math.min(1, v));

    /* --- Detect when Lenis has snapped us here --- */
    const handleScroll = () => {
      if (hasSnapped.current || !marqueeRef.current) return;

      const rect = marqueeRef.current.getBoundingClientRect();
      const header = document.querySelector("header");
      const headerH = header
        ? Math.ceil(header.getBoundingClientRect().height)
        : 56;

      // Marquee is near the top of the viewport (just below header) → Lenis snapped us
      if (rect.top > 0 && rect.top < headerH + 80) {
        hasSnapped.current = true;
        lockBodyScroll();
      }
    };

    /* --- Wheel: drives card peel when locked --- */
    const handleWheel = (event: WheelEvent) => {
      if (!isLocked.current) return;

      const delta = event.deltaY;
      if (delta === 0) return;

      const current = scrollProgress.get();

      // At the end → unlock and let page scroll normally
      if (current >= 1 && delta > 0) {
        unlockBodyScroll();
        return;
      }

      const next = clamp(current + delta / (window.innerHeight * TOTAL));
      if (next !== current) scrollProgress.set(next);

      if (event.cancelable) event.preventDefault();
    };

    /* --- Touch --- */
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!isLocked.current || touchStartY.current === null) return;

      const currentY = event.touches[0]?.clientY ?? touchStartY.current;
      const delta = touchStartY.current - currentY;
      if (delta === 0) return;

      const current = scrollProgress.get();
      if (current >= 1 && delta > 0) {
        unlockBodyScroll();
        return;
      }

      scrollProgress.set(
        clamp(current + delta / (window.innerHeight * TOTAL))
      );
      touchStartY.current = currentY;
      if (event.cancelable) event.preventDefault();
    };

    /* --- Keyboard --- */
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isLocked.current) return;
      const keys = ["ArrowDown", "ArrowUp", "PageDown", "PageUp", " "];
      if (!keys.includes(event.key)) return;

      const dir =
        event.key === "ArrowUp" || event.key === "PageUp" ? -1 : 1;
      const current = scrollProgress.get();
      if (current >= 1 && dir > 0) {
        unlockBodyScroll();
        return;
      }

      scrollProgress.set(clamp(current + 0.06 * dir));
      if (event.cancelable) event.preventDefault();
    };

    /* --- Progress watcher: unlock when last card revealed --- */
    const unsubscribe = scrollProgress.on("change", (latest) => {
      if (latest >= 1) {
        unlockBodyScroll();
      }
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKeyDown, { passive: false });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
      unsubscribe();
      unlockBodyScroll();
    };
  }, [scrollProgress]);

  return (
    <section ref={sectionRef} className="relative" id="experience">
      {/* Marquee banner */}
      <div ref={marqueeRef}>
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
      </div>

      {/* Section header */}
      <div className="px-6 md:px-12 lg:px-20 pt-14 pb-8">
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

      {/* ── Card stack scroll area ── */}
      <div ref={stackRef} className="relative h-screen overflow-hidden">
        <div
          className="relative mx-auto max-w-5xl px-6 md:px-12 pt-12"
          style={{ perspective: "1200px" }}
        >
          {MISSIONS.map((mission, i) => (
            <FolderCard
              key={mission.missionCode}
              mission={mission}
              index={i}
              scrollProgress={scrollProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
