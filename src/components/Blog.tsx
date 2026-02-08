"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

interface BlogPost {
  id: string;
  date: string;
  title: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "INFO";
  excerpt: string;
  content: string;
  tags: string[];
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: "POST-001",
    date: "2026-01-15",
    title: "The Anatomy of a Prompt Injection Attack",
    severity: "CRITICAL",
    excerpt: "Dissecting how indirect prompt injection can compromise entire AI agent pipelines...",
    content:
      "Prompt injection remains the most prevalent vulnerability in LLM-based applications. In this analysis, I break down a real-world attack chain that moved from a benign-looking document to full agent compromise.\n\nThe attack surface begins at the data ingestion layer — any untrusted content that reaches the model's context window is a potential injection point. RAG pipelines are particularly vulnerable because they inherently mix trusted prompts with untrusted retrieved content.\n\nKey findings from testing 50+ production systems:\n- 78% were vulnerable to basic indirect injection\n- 45% had no input sanitization on retrieved documents\n- 23% allowed tool-use hijacking through injected instructions\n\nDefense recommendations include strict content boundaries, output filtering, and human-in-the-loop validation for high-stakes actions.",
    tags: ["prompt-injection", "RAG", "agents"],
  },
  {
    id: "POST-002",
    date: "2025-12-03",
    title: "Jailbreaking GPT-4: A Taxonomy of Techniques",
    severity: "HIGH",
    excerpt: "A systematic classification of jailbreak methods and their effectiveness over time...",
    content:
      "This post presents a taxonomy of jailbreak techniques tested against major LLM providers over 6 months. The techniques are classified into four categories: role-play manipulation, encoding-based evasion, multi-turn escalation, and instruction hierarchy exploitation.\n\nNotable findings include the decreasing effectiveness of simple role-play jailbreaks (from 80% to 12% success rate), while multi-turn conversational attacks remain effective at 67%.\n\nThe arms race between model safety and adversarial techniques continues to evolve. Responsible disclosure timelines and coordination with AI labs remain critical.",
    tags: ["jailbreaking", "GPT-4", "safety"],
  },
  {
    id: "POST-003",
    date: "2025-10-21",
    title: "Why Your AI Guardrails Are Probably Broken",
    severity: "HIGH",
    excerpt: "Testing revealed systemic failures in how companies implement LLM safety measures...",
    content:
      "After auditing 30+ enterprise AI deployments, a pattern emerged: most safety implementations are theater rather than defense.\n\nCommon failures:\n1. Content filters applied only to outputs, not intermediate reasoning\n2. System prompts accessible through simple extraction techniques\n3. Rate limiting that doesn't account for semantic similarity\n4. No monitoring for adversarial behavioral patterns\n\nThe fix isn't just technical — it's architectural. Security must be designed into the LLM pipeline from the ground up, not bolted on as an afterthought.",
    tags: ["guardrails", "security-theater", "architecture"],
  },
  {
    id: "POST-004",
    date: "2025-08-14",
    title: "Training Data Extraction: What Models Remember",
    severity: "MEDIUM",
    excerpt: "Investigating memorization in large language models and its security implications...",
    content:
      "Large language models memorize more training data than commonly assumed. Through systematic probing techniques, we can extract verbatim training examples, PII, and proprietary content.\n\nThis has profound implications for enterprises fine-tuning models on sensitive data. Even with privacy safeguards, extraction attacks can recover substantial portions of fine-tuning datasets.",
    tags: ["data-extraction", "privacy", "memorization"],
  },
  {
    id: "POST-005",
    date: "2025-06-22",
    title: "Red Teaming Autonomous Agents: A Field Guide",
    severity: "CRITICAL",
    excerpt: "Lessons from red teaming AI agents with real-world tool access...",
    content:
      "Autonomous AI agents with tool access represent a fundamentally new attack surface. Unlike chatbots, compromised agents can take real-world actions — sending emails, modifying databases, executing code.\n\nThis field guide covers:\n- Mapping the agent's capability boundary\n- Identifying injection surfaces in tool outputs\n- Escalation paths from information gathering to action execution\n- Building robust agent sandboxes\n\nThe key insight: every tool an agent can use is a potential weapon in adversarial hands.",
    tags: ["agents", "tool-use", "autonomous-ai"],
  },
];

const severityColors = {
  CRITICAL: "text-signal-red",
  HIGH: "text-phosphor-amber",
  MEDIUM: "text-charcoal/60",
  LOW: "text-terminal-green",
  INFO: "text-charcoal/40",
};

function BlogModal({
  post,
  onClose,
}: {
  post: BlogPost;
  onClose: () => void;
}) {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-charcoal/50 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
        style={{ cursor: "auto" }}
      />

      {/* Panel */}
      <motion.div
        className="relative w-full max-w-2xl h-full bg-ivory border-l-2 border-charcoal overflow-y-auto"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      >
        <div className="p-8 md:p-12">
          {/* Close button */}
          <button
            onClick={onClose}
            className="mb-8 text-xs tracking-[0.3em] text-charcoal/40 hover:text-signal-red transition-colors uppercase"
            style={{ cursor: "none" }}
          >
            [ESC] Close
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <span className="text-xs font-mono text-charcoal/45">
              {post.id}
            </span>
            <span
              className={`text-xs font-bold ${severityColors[post.severity]}`}
            >
              {post.severity}
            </span>
          </div>

          <time className="text-xs text-charcoal/40 tracking-wider">
            {post.date}
          </time>

          <h2 className="text-2xl md:text-3xl font-bold text-shadow-heavy mt-3 mb-6">
            {post.title}
          </h2>

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2 py-0.5 bg-charcoal/5 text-charcoal/50"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="w-full h-px bg-charcoal/10 mb-8" />

          {/* Content */}
          <div className="prose prose-sm max-w-none">
            {post.content.split("\n\n").map((paragraph, i) => (
              <p
                key={i}
                className="text-sm md:text-base text-charcoal/80 leading-relaxed mb-4"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Blog() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.05 });
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  return (
    <>
      <section
        ref={sectionRef}
        className="relative py-16 md:py-20 px-6 md:px-12 lg:px-20"
        id="blog"
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-xs tracking-[0.5em] text-charcoal/40 uppercase">
            Section 05
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-shadow-heavy mt-2">
            FIELD REPORTS
          </h2>
          <div className="w-20 h-0.5 bg-signal-red mt-4" />
          <p className="text-sm text-charcoal/40 mt-4 font-mono">
            $ cat /var/log/redteam/reports.log
          </p>
        </motion.div>

        {/* Terminal-style list */}
        <div className="max-w-4xl">
          {/* Table header */}
          <div className="hidden md:grid grid-cols-[100px_1fr_100px] gap-4 pb-3 border-b-2 border-charcoal/20 mb-2">
            <span className="text-xs tracking-[0.2em] text-charcoal/45 uppercase">
              Date
            </span>
            <span className="text-xs tracking-[0.2em] text-charcoal/45 uppercase">
              Title
            </span>
            <span className="text-xs tracking-[0.2em] text-charcoal/45 uppercase text-right">
              Severity
            </span>
          </div>

          {BLOG_POSTS.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              onClick={() => setSelectedPost(post)}
              className="grid grid-cols-1 md:grid-cols-[100px_1fr_100px] gap-1 md:gap-4 py-4 border-b border-charcoal/10 cursor-pointer hover:bg-charcoal/[0.02] hover:pl-2 transition-all duration-200 group"
              style={{ cursor: "none" }}
            >
              <span className="text-xs font-mono text-charcoal/40">
                {post.date}
              </span>
              <div>
                <span className="text-sm md:text-base font-bold text-charcoal group-hover:text-signal-red transition-colors duration-200">
                  {post.title}
                </span>
                <p className="text-xs text-charcoal/40 mt-1 md:hidden">
                  {post.excerpt}
                </p>
              </div>
              <span
                className={`text-xs font-bold text-right ${
                  severityColors[post.severity]
                }`}
              >
                {post.severity}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Blog detail modal */}
      <AnimatePresence>
        {selectedPost && (
          <BlogModal
            post={selectedPost}
            onClose={() => setSelectedPost(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
