"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Marquee from "@/components/Marquee";

gsap.registerPlugin(ScrollTrigger);

const PROFILE_STATS = [
  { label: "CALLSIGN", value: "SAI (DPR)" },
  { label: "ROLE", value: "AI & LLM SECURITY ENGINEER" },
  { label: "THREAT LEVEL", value: "CRITICAL", highlight: true },
  { label: "STATUS", value: "ACTIVE", green: true },
  { label: "PRIMARY MISSION", value: "IDENTIFY, EXPLOIT & SECURE HIGH-RISK DIGITAL SYSTEMS" },
  { label: "RESPONSE MODE", value: "24/7 THREAT HUNTING" },
  { label: "FAVORITE WEAPON", value: "LOGIC, LOGS, AND LINUX" },
  { label: "WEAKNESS", value: "OVER-OPTIMIZATION OF SECURITY MODELS" },
];

const PHILOSOPHY = "Assume Breach. Verify Everything.";

const BIO_PARAGRAPHS = [
  "I break AI systems before they break trust. Specializing in adversarial testing of large language models, I explore the boundary between what AI should do and what it [glitch]can be manipulated into doing[/glitch].",
  "My work lives at the intersection of offensive security, machine learning, and [redact]responsible disclosure[/redact]. Every vulnerability I uncover is one that never reaches production.",
  "From prompt injection to jailbreak methodologies, from training data extraction to model manipulation, I map the [type]attack surface[/type] of AI systems so defenses are built on reality, not assumptions.",
  "My background spans [highlight]cybersecurity[/highlight], [highlight]software engineering[/highlight], and [highlight]AI research[/highlight]. Each discipline sharpening how I think, test, and build.",
  "I believe the strongest security comes from thinking like an [redglow]attacker[/redglow] with the discipline and ethics of a [blueglow]defender[/blueglow].",
  "Every system has limits. My job is to find them. Quietly, responsibly, and [fade]before anyone else does[/fade].",
];

function renderBioHtml(text: string): string {
  return text
    .replace(
      /\[glitch\](.*?)\[\/glitch\]/g,
      '<span class="fx-glitch" data-text="$1">$1</span>'
    )
    .replace(
      /\[redact\](.*?)\[\/redact\]/g,
      '<span class="fx-redact">$1</span>'
    )
    .replace(
      /\[type\](.*?)\[\/type\]/g,
      '<span class="fx-type">$1</span>'
    )
    .replace(
      /\[highlight\](.*?)\[\/highlight\]/g,
      '<span class="fx-highlight">$1</span>'
    )
    .replace(
      /\[redglow\](.*?)\[\/redglow\]/g,
      '<span class="fx-redglow">$1</span>'
    )
    .replace(
      /\[blueglow\](.*?)\[\/blueglow\]/g,
      '<span class="fx-blueglow">$1</span>'
    )
    .replace(
      /\[fade\](.*?)\[\/fade\]/g,
      '<span class="fx-fade">$1</span>'
    );
}

const SPECIALIZATIONS = [
  "LLM Security",
  "Cloud Security",
  "Penetration Testing",
  "Web Application Security",
  "Threat Analysis",
];

const OPERATIONS = [
  "AI Red Teaming",
  "Vulnerability Research",
  "SIEM Log Analysis",
  "Incident Response",
  "Secure API Development",
];

const SKILL_STACK = [
  "Python",
  "Bash",
  "Linux",
  "AWS",
  "Azure",
  "SIEM",
  "Burp Suite",
  "Metasploit",
  "Elastic",
  "REST APIs",
];

const CERTIFICATIONS = [
  "CompTIA Security+",
  "AWS CCP",
  "Azure AZ-900",
  "IBM Cloud Advocate",
  "Google Cybersecurity Specialist",
  "Microsoft Cybersecurity Specialist",
];

const ACTIVE_PROJECTS = [
  "AI Powered SAST",
  "AI Continuous Red Teaming",
  "Automated Alerting System with MCP",
  "AI Guardrails",
  "Automated Cloud Misconfiguration Scanner",
];

const OPERATIONAL_HISTORY = [
  "IBM Integration Systems",
  "Votal AI Red Team",
  "Competitive CTFs",
  "Phishing Defense Operations",
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
      className="relative py-6 md:py-8 px-6 md:px-12 lg:px-20"
      id="about"
    >
      {/* Marquee banner */}
      <div className="mb-4 -mx-6 md:-mx-12 lg:-mx-20">
        <Marquee
          items={["PERSONNEL FILE", "CLASSIFIED DOSSIER", "THREAT ASSESSMENT", "SECURITY CLEARANCE", "OPERATOR PROFILE"]}
          variant="red"
          speed="normal"
        />
      </div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-4"
      >
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-shadow-heavy leading-none">
          THE <span className="text-signal-red">DOSSIER</span>
        </h2>
      </motion.div>

      {/* Photo + Personnel File + Bio — side by side */}
      <div className="about-stats-container flex flex-col sm:flex-row gap-4 mb-4">
        {/* Photo + De-Classified stamp */}
        <div className="sm:w-[28%] flex-shrink-0 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="photo-reveal w-full aspect-[3/4] bg-charcoal/5 border-2 border-charcoal relative overflow-hidden"
          >
            <img
              src="/photo.png"
              alt="Sai Varma Dantuluri"
              className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute top-1.5 left-1.5 w-4 h-4 border-t-2 border-l-2 border-signal-red/40" />
            <div className="absolute top-1.5 right-1.5 w-4 h-4 border-t-2 border-r-2 border-signal-red/40" />
            <div className="absolute bottom-1.5 left-1.5 w-4 h-4 border-b-2 border-l-2 border-signal-red/40" />
            <div className="absolute bottom-1.5 right-1.5 w-4 h-4 border-b-2 border-r-2 border-signal-red/40" />
          </motion.div>

          <div className="mt-3 flex justify-center">
            <motion.span
              className="inline-block border-2 border-signal-red text-signal-red px-4 py-1.5 text-[9px] tracking-[0.4em] font-bold"
              style={{ rotate: -3 }}
              whileHover={{ scale: 1.05 }}
            >
              DE-CLASSIFIED
            </motion.span>
          </div>
        </div>

        {/* Personnel File + Bio */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="border-2 border-charcoal p-3 relative">
            <div className="absolute -top-3 left-4 bg-ivory px-3">
              <span className="text-[10px] tracking-[0.4em] text-charcoal/45 uppercase">
                Personnel File
              </span>
            </div>
            {PROFILE_STATS.map((stat, i) => (
              <div
                key={i}
                className="about-stat flex justify-between items-baseline py-1 border-b border-charcoal/[0.06] last:border-none gap-4"
              >
                <span className="text-[9px] tracking-[0.25em] text-charcoal/50 uppercase whitespace-nowrap">
                  {stat.label}
                </span>
                <span
                  className={`text-[9px] sm:text-[11px] font-bold tracking-wider text-right ${
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

            {/* Philosophy quote */}
            <div className="mt-2 pt-2 border-t border-charcoal/10">
              <p className="text-[9px] tracking-[0.2em] text-charcoal/40 uppercase text-center italic">
                &ldquo;{PHILOSOPHY}&rdquo;
              </p>
            </div>
          </div>

          {/* Bio with effects */}
          <div className="mt-3">
            {BIO_PARAGRAPHS.map((text, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="mb-3.5"
              >
                <p
                  className="text-xs sm:text-sm leading-[1.7] text-charcoal/65"
                  dangerouslySetInnerHTML={{
                    __html: renderBioHtml(text),
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Tag sections grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* Specialization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-[10px] tracking-[0.4em] text-charcoal/45 uppercase mb-3">
            Specialization
          </h3>
          <div className="flex flex-wrap gap-2">
            {SPECIALIZATIONS.map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 text-[10px] tracking-[0.15em] border border-signal-red/20 text-signal-red/70 bg-signal-red/[0.03]"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Operations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
        >
          <h3 className="text-[10px] tracking-[0.4em] text-charcoal/45 uppercase mb-3">
            Operations
          </h3>
          <div className="flex flex-wrap gap-2">
            {OPERATIONS.map((item) => (
              <span
                key={item}
                className="px-3 py-1.5 text-[10px] tracking-[0.15em] border border-charcoal/10 text-charcoal/50"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Skill Stack */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="text-[10px] tracking-[0.4em] text-charcoal/45 uppercase mb-3">
            Skill Stack
          </h3>
          <div className="flex flex-wrap gap-2">
            {SKILL_STACK.map((skill) => (
              <motion.span
                key={skill}
                className="px-3 py-1.5 text-[10px] tracking-[0.15em] border border-terminal-green/20 text-terminal-green/70 bg-terminal-green/[0.03] hover:border-terminal-green hover:text-terminal-green transition-all duration-300"
                whileHover={{ y: -2 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <h3 className="text-[10px] tracking-[0.4em] text-charcoal/45 uppercase mb-3">
            Certifications
          </h3>
          <div className="flex flex-wrap gap-2">
            {CERTIFICATIONS.map((cert) => (
              <span
                key={cert}
                className="px-3 py-1.5 text-[10px] tracking-[0.15em] border border-phosphor-amber/20 text-phosphor-amber/80 bg-phosphor-amber/[0.03]"
              >
                {cert}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Active Projects */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-3 pt-3 border-t border-charcoal/10"
      >
        <h3 className="text-[10px] tracking-[0.4em] text-charcoal/45 uppercase mb-3">
          Active Projects
        </h3>
        <div className="flex flex-wrap gap-2">
          {ACTIVE_PROJECTS.map((project) => (
            <span
              key={project}
              className="px-3 py-1.5 text-[10px] tracking-[0.15em] border border-charcoal/15 text-charcoal/60 hover:border-signal-red hover:text-signal-red transition-all duration-300"
            >
              {project}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Operational History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mb-2"
      >
        <h3 className="text-[10px] tracking-[0.4em] text-charcoal/45 uppercase mb-3">
          Operational History
        </h3>
        <div className="flex flex-wrap gap-2">
          {OPERATIONAL_HISTORY.map((item) => (
            <span
              key={item}
              className="px-3 py-1.5 text-[10px] tracking-[0.15em] border border-charcoal/10 text-charcoal/45"
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
