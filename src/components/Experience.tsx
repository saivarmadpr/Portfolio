"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Marquee from "@/components/Marquee";

interface ExperienceItem {
  hash: string;
  date: string;
  role: string;
  company: string;
  branch: string;
  description: string;
  details: string[];
  techStack: string[];
}

const EXPERIENCE_DATA: ExperienceItem[] = [
  {
    hash: "a3f7c2d",
    date: "2024 — Present",
    role: "AI Red Team Engineer",
    company: "Independent",
    branch: "main",
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
    hash: "e8b1f4a",
    date: "2022 — 2024",
    role: "Security Engineer",
    company: "Tech Company",
    branch: "feature/security",
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
    hash: "c4d9e7b",
    date: "2020 — 2022",
    role: "Full Stack Developer",
    company: "Startup",
    branch: "feature/platform",
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
    hash: "f2a6b8c",
    date: "2018 — 2020",
    role: "Software Engineer",
    company: "Enterprise",
    branch: "develop",
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

function ExperienceCard({ item, index }: { item: ExperienceItem; index: number }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative pl-16 md:pl-24 pb-20 last:pb-0 group"
    >
      {/* Timeline line */}
      <div className="absolute left-[18px] md:left-[34px] top-0 bottom-0 w-px bg-charcoal/10 group-last:bg-gradient-to-b group-last:from-charcoal/10 group-last:to-transparent" />

      {/* Commit dot - enhanced */}
      <motion.div
        className="absolute left-[12px] md:left-[28px] top-1"
        whileHover={{ scale: 1.5 }}
      >
        <div className="w-3.5 h-3.5 border-2 border-charcoal/30 bg-ivory rounded-full group-hover:bg-signal-red group-hover:border-signal-red transition-all duration-300 relative">
          <div className="absolute inset-0 rounded-full bg-signal-red/0 group-hover:bg-signal-red/20 group-hover:animate-ping" />
        </div>
      </motion.div>

      {/* Content */}
      <div
        className="cursor-pointer group/card"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Git-style header */}
        <div className="flex items-center gap-3 mb-2 flex-wrap">
          <span className="text-[10px] font-mono text-phosphor-amber bg-charcoal/[0.04] px-2 py-0.5 border border-charcoal/[0.06]">
            {item.hash}
          </span>
          <span className="text-[10px] text-charcoal/40 font-mono">
            ({item.branch})
          </span>
          <span className="text-[10px] text-charcoal/45 ml-auto tracking-wider">
            {item.date}
          </span>
        </div>

        <h3 className="text-2xl md:text-3xl font-bold text-shadow-heavy mt-3 group-hover/card:text-signal-red transition-colors duration-300">
          {item.role}
        </h3>
        <p className="text-xs tracking-[0.2em] text-charcoal/50 mt-1 uppercase">
          @ {item.company}
        </p>
        <p className="text-sm text-charcoal/60 mt-3 leading-relaxed">
          {item.description}
        </p>

        {/* Expand hint */}
        <motion.span
          className="text-[10px] text-charcoal/40 mt-3 inline-flex items-center gap-1 tracking-wider"
          animate={{ x: isExpanded ? 0 : [0, 3, 0] }}
          transition={{ duration: 1.5, repeat: isExpanded ? 0 : Infinity }}
        >
          {isExpanded ? "[-] collapse" : "[+] view details"}
        </motion.span>
      </div>

      {/* Expanded details */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="mt-6 ml-4 pl-5 border-l-2 border-signal-red/20">
              <div className="text-[10px] tracking-[0.3em] text-charcoal/45 uppercase mb-4">
                Impact / Achievements
              </div>
              <ul className="space-y-3">
                {item.details.map((detail, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="text-sm text-charcoal/65 flex gap-3 leading-relaxed"
                  >
                    <span className="text-terminal-green shrink-0 text-xs mt-0.5">&#9654;</span>
                    {detail}
                  </motion.li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-2">
                {item.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] px-2 py-1 bg-charcoal/[0.03] text-charcoal/40 border border-charcoal/[0.06] tracking-wider"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.05 });

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-20 px-6 md:px-12 lg:px-20"
      id="experience"
    >
      {/* Marquee banner */}
      <div className="mb-4 -mx-6 md:-mx-12 lg:-mx-20">
        <Marquee
          items={["COMMIT HISTORY", "OPERATION TIMELINE", "DEPLOYMENT LOG", "MISSION RECORDS", "INCIDENT REPORTS"]}
          variant="default"
          speed="slow"
        />
      </div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-14"
      >
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-shadow-brutal leading-none">
          GIT
          <br />
          <span className="text-signal-red">LOG</span>
        </h2>
        <p className="text-xs text-charcoal/45 mt-6 font-mono tracking-wider">
          $ git log --oneline --graph --all --decorate
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="max-w-3xl">
        {EXPERIENCE_DATA.map((item, index) => (
          <ExperienceCard key={item.hash} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}
