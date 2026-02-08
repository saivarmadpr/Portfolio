"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PROFILE_STATS = [
  { label: "CALLSIGN", value: "SAI" },
  { label: "ROLE", value: "AI RED TEAM ENGINEER" },
  { label: "SPECIALIZATION", value: "LLM EXPLOITATION" },
  { label: "CLEARANCE", value: "LEVEL 5" },
  { label: "OPERATIONS", value: "47 COMPLETED" },
  { label: "THREAT LEVEL", value: "CRITICAL", highlight: true },
  { label: "STATUS", value: "ACTIVE", green: true },
];

const BIO_PARAGRAPHS = [
  {
    text: "I break AI systems before they break trust. Specializing in adversarial testing of large language models, I probe the boundaries between what AI should do and what it <redacted>can be tricked into doing</redacted>.",
  },
  {
    text: "My work sits at the intersection of <redacted>offensive security</redacted>, machine learning, and responsible disclosure. Every vulnerability I find is a vulnerability that never reaches production.",
  },
  {
    text: "From prompt injection to jailbreak methodologies, from training data extraction to <redacted>model manipulation</redacted> — I map the attack surface of AI systems so organizations can build defenses that actually work.",
  },
  {
    text: "Previously, I've worked across cybersecurity, software engineering, and AI research. I believe the best security comes from thinking like an attacker — with the ethics of a <redacted>defender</redacted>.",
  },
];

const METRICS = [
  { value: "200+", label: "Attack Vectors Cataloged" },
  { value: "50+", label: "Systems Tested" },
  { value: "12", label: "Critical CVEs Found" },
  { value: "99.9%", label: "Uptime on Operations" },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.05 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-stat", {
        scrollTrigger: {
          trigger: ".about-stats-container",
          start: "top 80%",
        },
        x: -30,
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: "power3.out",
      });

      gsap.from(".metric-item", {
        scrollTrigger: {
          trigger: ".metrics-container",
          start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-20 px-6 md:px-12 lg:px-20"
      id="about"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-[0.02]">
        <div className="w-full h-full" style={{
          backgroundImage: "repeating-linear-gradient(45deg, #1A1A1A 0, #1A1A1A 1px, transparent 1px, transparent 20px)",
        }} />
      </div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-14"
      >
        <div className="flex items-center gap-4 mb-4">
          <span className="text-[10px] tracking-[0.5em] text-charcoal/45 uppercase">
            Section 02
          </span>
          <div className="flex-1 h-px bg-charcoal/10" />
        </div>
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-shadow-brutal leading-none">
          THE
          <br />
          <span className="text-signal-red">DOSSIER</span>
        </h2>
      </motion.div>

      {/* Split layout */}
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
        {/* Left: Sticky Profile Stats */}
        <div className="lg:w-2/5">
          <div className="lg:sticky lg:top-32 about-stats-container">
            {/* Photo placeholder with scanlines */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="photo-reveal mb-8 aspect-[4/5] bg-charcoal/5 border-2 border-charcoal flex items-center justify-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-charcoal/[0.03] to-charcoal/[0.08]" />
              <div className="text-center z-10">
                <div className="text-6xl mb-4 opacity-20">&#9608;&#9608;&#9608;</div>
                <div className="text-[10px] tracking-[0.4em] text-charcoal/45 uppercase">
                  [PHOTO CLASSIFIED]
                </div>
              </div>
              {/* Corner brackets */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-signal-red/40" />
              <div className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-signal-red/40" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-signal-red/40" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-signal-red/40" />
            </motion.div>

            {/* Stats card */}
            <div className="border-2 border-charcoal p-6 relative">
              <div className="absolute -top-3 left-4 bg-ivory px-3">
                <span className="text-[10px] tracking-[0.4em] text-charcoal/45 uppercase">
                  Personnel File
                </span>
              </div>
              {PROFILE_STATS.map((stat, i) => (
                <div
                  key={i}
                  className="about-stat flex justify-between items-baseline py-2.5 border-b border-charcoal/[0.06] last:border-none"
                >
                  <span className="text-[10px] tracking-[0.25em] text-charcoal/50 uppercase">
                    {stat.label}
                  </span>
                  <span
                    className={`text-xs font-bold tracking-wider ${
                      stat.highlight
                        ? "text-signal-red"
                        : stat.green
                        ? "text-terminal-green"
                        : "text-charcoal"
                    }`}
                  >
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Classification stamp */}
            <div className="mt-6 flex justify-center">
              <motion.span
                className="inline-block border-2 border-signal-red text-signal-red px-6 py-2 text-[10px] tracking-[0.4em] font-bold"
                style={{ rotate: -3 }}
                whileHover={{ scale: 1.05 }}
              >
                CLASSIFIED
              </motion.span>
            </div>
          </div>
        </div>

        {/* Right: Scrolling biography */}
        <div className="lg:w-3/5">
          {BIO_PARAGRAPHS.map((para, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: i * 0.08 }}
              className="mb-12"
            >
              <p
                className="text-base md:text-lg lg:text-xl leading-[1.8] text-charcoal/70"
                dangerouslySetInnerHTML={{
                  __html: para.text.replace(
                    /<redacted>(.*?)<\/redacted>/g,
                    '<span class="redacted">$1</span>'
                  ),
                }}
              />
            </motion.div>
          ))}

          {/* Metrics */}
          <div className="metrics-container grid grid-cols-2 gap-8 mt-20 pt-12 border-t-2 border-charcoal/10">
            {METRICS.map((metric, i) => (
              <div key={i} className="metric-item">
                <div className="text-3xl md:text-4xl font-bold text-charcoal text-shadow-heavy">
                  {metric.value}
                </div>
                <div className="text-[10px] tracking-[0.3em] text-charcoal/50 uppercase mt-2">
                  {metric.label}
                </div>
              </div>
            ))}
          </div>

          {/* Skills/Tools */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-16 pt-8 border-t border-charcoal/10"
          >
            <h3 className="text-[10px] tracking-[0.4em] text-charcoal/45 uppercase mb-6">
              Offensive Toolkit
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                "Prompt Injection",
                "Jailbreak Engineering",
                "LLM Red Teaming",
                "Python",
                "TypeScript",
                "Burp Suite",
                "OWASP Top 10",
                "Adversarial ML",
                "Next.js",
                "RAG Exploitation",
                "Agent Hijacking",
                "Data Exfiltration",
                "Social Engineering",
                "MITRE ATT&CK",
              ].map((skill) => (
                <motion.span
                  key={skill}
                  className="px-3 py-1.5 text-[10px] tracking-[0.15em] border border-charcoal/10 text-charcoal/50 hover:border-signal-red hover:text-signal-red hover:bg-signal-red/[0.03] transition-all duration-300"
                  whileHover={{ y: -2 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
