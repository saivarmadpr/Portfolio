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
    id: "AI-RT-001",
    codename: "SENTINEL-SAST",
    title: "AI-Driven Static Application Security Testing Engine",
    classification: "CRITICAL",
    description:
      "An AI-powered Static Application Security Testing (SAST) tool designed to analyze source code for security vulnerabilities, insecure logic patterns, and architectural flaws. The platform augments traditional static analysis with LLM-assisted reasoning to detect OWASP-class vulnerabilities.",
    techStack: ["Python", "LLMs", "Static Code Analysis", "AST Parsing", "OWASP Top 10", "CI/CD Security", "Git", "Linux"],
    status: "ACTIVE",
  },
  {
    id: "AI-RT-002",
    codename: "CART-LLM",
    title: "Continuous Automated Red Teaming for LLM Applications",
    classification: "CRITICAL",
    description:
      "A Continuous Automated Red Teaming (CART) framework for Large Language Models that systematically generates, executes, and evaluates adversarial attack scenarios. The system emulates real attacker behavior to identify prompt injection, jailbreaks, sensitive data leakage, tool abuse, and policy bypasses in both single-agent and multi-agent AI systems.",
    techStack: ["Python", "LLMs", "Prompt Engineering", "AI Agents", "OWASP Top 10 for LLMs", "Adversarial Testing", "Automation Pipelines"],
    status: "ACTIVE",
  },
  {
    id: "AI-SEC-001",
    codename: "AEGIS-AI",
    title: "LLM Guardrails & Safety Enforcement Framework",
    classification: "HIGH",
    description:
      "A defensive AI framework that enforces security, safety, and policy guardrails on LLM outputs in real time. The system monitors prompts and responses to detect unsafe behavior, sensitive data exposure, and policy violations, enabling defense-in-depth for production-grade AI applications.",
    techStack: ["Python", "LLMs", "AI Safety", "Policy Enforcement", "Prompt Filtering", "Output Validation", "Secure AI Architecture"],
    status: "ACTIVE",
  },
  {
    id: "CLOUD-SEC-001",
    codename: "CLOUD-FIXER",
    title: "Cloud Security Misconfiguration Scanner & Automated Remediation Engine",
    classification: "HIGH",
    description:
      "A cloud security platform that continuously scans cloud environments for misconfigurations, overly permissive IAM policies, and insecure defaults. The system correlates findings with best-practice security baselines and automatically applies safe remediations to reduce cloud attack surface and configuration drift.",
    techStack: ["AWS", "Cloud Security", "Python", "IAM Analysis", "Infrastructure Scanning", "Security Automation", "Configuration Management"],
    status: "COMPLETED",
    link: "https://github.com/saivarmadpr/Cloud_Security_Posture_-_Deception_Platform",
  },
  {
    id: "DECEPT-001",
    codename: "PHANTOM-NET",
    title: "Honeypot Deployer & Deception-Based Threat Intelligence Platform",
    classification: "MEDIUM",
    description:
      "A deception-driven security platform that deploys honeypots across cloud and network environments to attract malicious actors. The system captures attacker techniques, payloads, and movement patterns, enabling the study of real-world attack vectors and informing defensive strategy and threat modeling.",
    techStack: ["Python", "Honeypots", "Deception Technology", "Network Security", "Threat Intelligence", "Linux", "Log Analysis"],
    status: "COMPLETED.",
    link: "https://github.com/saivarmadpr/Cloud_Security_Posture_-_Deception_Platform",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const statusColor: Record<string, string> = {
    ACTIVE: "text-terminal-green",
    COMPLETED: "text-charcoal/60",
    CLASSIFIED: "text-phosphor-amber",
    REDACTED: "text-signal-red",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="folder-card w-[340px] sm:w-[420px] flex-shrink-0 group"
    >
      {/* ── Folder tab ── */}
      <div className="folder-tab">
        <span>{project.id}</span>
        <span className="text-ivory/40">|</span>
        <span className="text-[0.5rem] tracking-[0.15em] text-ivory/70">
          {project.classification}
        </span>
      </div>

      {/* ── Folder body ── */}
      <div className="folder-body flex flex-col">
        {/* Codename — fixed height zone */}
        <div>
          <div className="text-[10px] tracking-[0.5em] text-charcoal/60 uppercase mb-2">
            Codename
          </div>
          <h3
            className="text-2xl sm:text-3xl font-bold text-shadow-heavy mb-1 group-hover:text-signal-red transition-colors duration-300 glitch"
            data-text={project.codename}
          >
            {project.codename}
          </h3>
          <p className="text-xs text-charcoal/70 tracking-wider line-clamp-2 min-h-[2.5rem]">{project.title}</p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-charcoal/15 via-charcoal/15 to-transparent my-4" />

        {/* Description — grows to fill available space */}
        <p className="text-xs text-charcoal/75 leading-[1.8] flex-1 line-clamp-5">
          {project.description}
        </p>

        {/* Tech stack — fixed position from bottom */}
        <div className="flex flex-wrap gap-1.5 mt-5 mb-5 min-h-[3.5rem]">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[10px] px-2 py-1 bg-charcoal/[0.05] text-charcoal/60 border border-charcoal/[0.1] tracking-wider rounded-sm h-fit"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Footer — always pinned to bottom */}
        <div className="flex items-center justify-between pt-4 mt-auto border-t border-charcoal/[0.1]">
          <span
            className={`text-[10px] font-bold tracking-[0.2em] flex items-center gap-1.5 ${
              statusColor[project.status] || "text-charcoal/60"
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            {project.status}
          </span>
          {project.link ? (
            <motion.a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] tracking-[0.2em] text-charcoal/65 hover:text-signal-red transition-colors uppercase flex items-center gap-1.5"
              whileHover={{ x: 3 }}
            >
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              View Intel
              <span>&rarr;</span>
            </motion.a>
          ) : (
            <span className="text-[10px] tracking-[0.2em] text-charcoal/50 uppercase">
              [ACCESS DENIED]
            </span>
          )}
        </div>
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
          THE <span className="text-signal-red">ARSENAL</span>
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
