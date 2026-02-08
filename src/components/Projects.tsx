"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Marquee from "@/components/Marquee";

interface Project {
  id: string;
  codename: string;
  title: string;
  classification: "CRITICAL" | "HIGH" | "MEDIUM";
  description: string;
  techStack: string[];
  status: string;
  link?: string;
}

const PROJECTS: Project[] = [
  {
    id: "RT-001",
    codename: "PHANTOM",
    title: "LLM Red Team Framework",
    classification: "CRITICAL",
    description:
      "Automated adversarial testing framework for large language models. Implements 200+ attack vectors including prompt injection, jailbreaking, and data extraction techniques.",
    techStack: ["Python", "LangChain", "OpenAI", "Anthropic"],
    status: "ACTIVE",
    link: "#",
  },
  {
    id: "RT-002",
    codename: "SPECTER",
    title: "Prompt Injection Scanner",
    classification: "HIGH",
    description:
      "Static and dynamic analysis tool for detecting prompt injection vulnerabilities in RAG pipelines and agent-based systems.",
    techStack: ["TypeScript", "Python", "AST Analysis", "ML"],
    status: "ACTIVE",
    link: "#",
  },
  {
    id: "RT-003",
    codename: "WRAITH",
    title: "AI Guardrail Bypass Toolkit",
    classification: "CRITICAL",
    description:
      "Research toolkit for testing the robustness of AI safety guardrails. Systematically evaluates alignment techniques against adversarial inputs.",
    techStack: ["Python", "PyTorch", "Transformers", "CUDA"],
    status: "CLASSIFIED",
  },
  {
    id: "RT-004",
    codename: "SENTINEL",
    title: "LLM Monitoring Dashboard",
    classification: "MEDIUM",
    description:
      "Real-time monitoring and alerting system for detecting anomalous LLM behavior in production. Tracks prompt patterns and exploitation attempts.",
    techStack: ["Next.js", "Python", "ClickHouse", "Grafana"],
    status: "ACTIVE",
    link: "#",
  },
  {
    id: "RT-005",
    codename: "VIPER",
    title: "Agent Hijacking PoC",
    classification: "CRITICAL",
    description:
      "Proof-of-concept demonstrating how autonomous AI agents can be redirected through indirect prompt injection to perform unintended actions.",
    techStack: ["Python", "AutoGPT", "LangGraph", "Docker"],
    status: "REDACTED",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const classificationColor = {
    CRITICAL: "text-signal-red border-signal-red bg-signal-red/[0.04]",
    HIGH: "text-phosphor-amber border-phosphor-amber bg-phosphor-amber/[0.04]",
    MEDIUM: "text-charcoal/50 border-charcoal/30 bg-charcoal/[0.02]",
  };

  const statusColor: Record<string, string> = {
    ACTIVE: "text-terminal-green",
    CLASSIFIED: "text-phosphor-amber",
    REDACTED: "text-signal-red",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="file-folder w-[340px] sm:w-[420px] flex-shrink-0 group relative"
    >
      {/* Glitch overlay on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-signal-red/[0.02]" />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-5 relative">
        <span className="text-[10px] font-mono text-charcoal/40 tracking-wider">{project.id}</span>
        <span
          className={`text-[10px] font-bold px-2.5 py-1 border ${
            classificationColor[project.classification]
          }`}
        >
          {project.classification}
        </span>
      </div>

      {/* Codename */}
      <div className="text-[10px] tracking-[0.5em] text-charcoal/40 uppercase mb-2">
        Codename
      </div>
      <h3
        className="text-3xl font-bold text-shadow-heavy mb-1 group-hover:text-signal-red transition-colors duration-300 glitch"
        data-text={project.codename}
      >
        {project.codename}
      </h3>
      <p className="text-xs text-charcoal/50 mb-5 tracking-wider">{project.title}</p>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-charcoal/10 via-charcoal/10 to-transparent mb-5" />

      {/* Description */}
      <p className="text-xs text-charcoal/60 leading-[1.8] mb-6">
        {project.description}
      </p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-1.5 mb-6">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="text-[10px] px-2 py-1 bg-charcoal/[0.03] text-charcoal/40 border border-charcoal/[0.06] tracking-wider"
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-5 border-t border-charcoal/[0.06]">
        <span
          className={`text-[10px] font-bold tracking-[0.2em] flex items-center gap-1.5 ${
            statusColor[project.status] || "text-charcoal/40"
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          {project.status}
        </span>
        {project.link ? (
          <motion.a
            href={project.link}
            className="text-[10px] tracking-[0.2em] text-charcoal/45 hover:text-signal-red transition-colors uppercase flex items-center gap-1"
            whileHover={{ x: 3 }}
          >
            View Intel
            <span>&rarr;</span>
          </motion.a>
        ) : (
          <span className="text-[10px] tracking-[0.2em] text-charcoal/35 uppercase">
            [ACCESS DENIED]
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.05 });

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-20"
      id="projects"
    >
      {/* Marquee banner */}
      <div className="mb-4">
        <Marquee
          items={["OFFENSIVE TOOLS", "EXPLOIT FRAMEWORKS", "PROOF OF CONCEPT", "WEAPONIZED CODE", "FIELD TESTED"]}
          variant="red"
          speed="fast"
        />
      </div>

      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="mb-12 px-6 md:px-12 lg:px-20"
      >
        <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-shadow-brutal leading-none">
          THE
          <br />
          <span className="text-signal-red">ARSENAL</span>
        </h2>
        <p className="text-xs text-charcoal/45 mt-6 font-mono tracking-wider">
          $ ls -la /tools/offensive/ --color=always
        </p>
      </motion.div>

      {/* Horizontal scrolling gallery */}
      <div className="horizontal-scroll gap-8 px-6 md:px-12 lg:px-20 pb-6">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
        <div className="w-12 flex-shrink-0" />
      </div>

      {/* Scroll hint */}
      <div className="mt-8 px-6 md:px-12 lg:px-20 flex items-center gap-3">
        <motion.div
          className="flex items-center gap-2"
          animate={{ x: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-8 h-px bg-charcoal/15" />
          <span className="text-[10px] text-charcoal/40 tracking-[0.3em] uppercase">
            Scroll horizontally
          </span>
          <div className="w-8 h-px bg-charcoal/15" />
        </motion.div>
      </div>
    </section>
  );
}
