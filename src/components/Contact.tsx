"use client";

import { useRef, useState, FormEvent } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import Marquee from "@/components/Marquee";

/* ─── Channel data with accent colors ─── */
const CHANNELS = [
  {
    label: "EMAIL",
    sub: "saivarmadpr@gmail.com",
    href: "mailto:saivarmadpr@gmail.com",
    external: false,
    accent: "255, 59, 48",        // signal-red
    accentClass: "text-signal-red",
    glowClass: "shadow-[0_0_25px_rgba(255,59,48,0.15)]",
    tag: "SMTP",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-10 h-10">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: "GITHUB",
    sub: "github.com/saivarmadpr",
    href: "https://github.com/saivarmadpr",
    external: true,
    accent: "57, 255, 20",        // terminal-green
    accentClass: "text-terminal-green",
    glowClass: "shadow-[0_0_25px_rgba(57,255,20,0.15)]",
    tag: "SSH",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    label: "LINKEDIN",
    sub: "linkedin.com/in/sai-varma-dantuluri",
    href: "https://www.linkedin.com/in/sai-varma-dantuluri/",
    external: true,
    accent: "255, 176, 0",        // phosphor-amber
    accentClass: "text-phosphor-amber",
    glowClass: "shadow-[0_0_25px_rgba(255,176,0,0.15)]",
    tag: "HTTPS",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.08 });
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentLine, setCurrentLine] = useState(-1);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      console.log("EmailJS Config:", {
        serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
      });
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: formState.name,
          from_email: formState.email,
          message: formState.message,
        },
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! }
      );
      setIsSubmitted(true);
    } catch (err) {
      console.error("EmailJS Error:", err);
      alert("Transmission failed: " + (err instanceof Error ? err.message : JSON.stringify(err)));
    }
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: "", email: "", message: "" });
    }, 4500);
  };

  const formFields = [
    { label: "IDENTIFIER", field: "name" as const, placeholder: "Enter callsign...", type: "text" },
    { label: "RETURN CHANNEL", field: "email" as const, placeholder: "Secure email...", type: "email" },
    { label: "PAYLOAD", field: "message" as const, placeholder: "Begin transmission...", type: "textarea" },
  ];

  return (
    <section ref={sectionRef} className="relative pt-16 md:pt-20" id="contact">
      {/* Marquee — full width */}
      <Marquee
        items={["OPEN CHANNEL", "SECURE TRANSMISSION", "ENCRYPTED COMMS", "INITIATE CONTACT", "SIGNAL READY"]}
        variant="default"
        speed="normal"
      />

      <div className="px-6 md:px-12 lg:px-20 pt-14 pb-20">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-14"
        >
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-shadow-brutal leading-[0.95]">
            START <span className="text-signal-red">TRANSMISSION</span>
          </h2>
          <p className="mt-4 text-[10px] tracking-[0.2em] text-charcoal/35 uppercase font-mono">
            {"// SELECT A CHANNEL OR COMPOSE A SECURE DISPATCH"}
          </p>
        </motion.div>

        {/* Grid: channel terminals + form terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">

          {/* ════ LEFT — Channel terminal cards ════ */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            {CHANNELS.map((ch, i) => (
              <motion.a
                key={ch.label}
                href={ch.href}
                target={ch.external ? "_blank" : undefined}
                rel={ch.external ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                onMouseEnter={() => setHoveredCard(i)}
                onMouseLeave={() => setHoveredCard(null)}
                className="channel-terminal group"
                style={{ "--ch-accent": ch.accent } as React.CSSProperties}
              >
                {/* Title bar */}
                <div className="channel-terminal-bar">
                  <div className="flex items-center gap-[5px]">
                    <span className="w-[7px] h-[7px] rounded-full" style={{ background: `rgb(${ch.accent})` }} />
                    <span className="w-[7px] h-[7px] rounded-full bg-white/10" />
                    <span className="w-[7px] h-[7px] rounded-full bg-white/10" />
                  </div>
                  <span className="text-[8px] tracking-[0.2em] text-white/35 uppercase font-mono">
                    {ch.tag}
                  </span>
                </div>

                {/* Body */}
                <div className="p-5 flex items-center gap-5">
                  {/* Icon with glow ring */}
                  <div className="relative shrink-0">
                    <motion.div
                      className="relative z-10 text-white/50 group-hover:text-white/90 transition-colors duration-400"
                      animate={
                        hoveredCard === i
                          ? { scale: 1.1 }
                          : { scale: 1 }
                      }
                      transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    >
                      {ch.icon}
                    </motion.div>
                    {/* Glow ring behind icon */}
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `radial-gradient(circle, rgba(${ch.accent}, 0.12) 0%, transparent 70%)`,
                      }}
                      animate={
                        hoveredCard === i
                          ? { scale: 2.2, opacity: 1 }
                          : { scale: 1.5, opacity: 0.3 }
                      }
                      transition={{ duration: 0.4 }}
                    />
                  </div>

                  {/* Text */}
                  <div className="min-w-0 flex-1">
                    <div className={`text-xs tracking-[0.2em] font-bold uppercase transition-colors duration-300 ${hoveredCard === i ? ch.accentClass : "text-white/70"}`}>
                      {ch.label}
                    </div>
                    <div className="text-[10px] text-white/40 mt-0.5 truncate group-hover:text-white/60 transition-colors">
                      {ch.sub}
                    </div>
                  </div>

                  {/* Arrow */}
                  <motion.svg
                    className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors shrink-0"
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                    animate={hoveredCard === i ? { x: 3, y: -3 } : { x: 0, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </motion.svg>
                </div>

                {/* Status bar */}
                <div className="channel-terminal-status">
                  <span className="flex items-center gap-1.5">
                    <motion.span
                      className="w-1 h-1 rounded-full"
                      style={{ background: `rgb(${ch.accent})` }}
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                    />
                    <span className={hoveredCard === i ? "text-white/40" : ""}>
                      {hoveredCard === i ? "CONNECTING..." : "STANDBY"}
                    </span>
                  </span>
                  <span>ENCRYPTED</span>
                </div>
              </motion.a>
            ))}

            {/* Signal wave decoration */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
              className="mt-2 flex justify-center"
            >
              <svg viewBox="0 0 200 30" className="w-full max-w-[200px] h-6 overflow-visible">
                <motion.polyline
                  fill="none"
                  stroke="rgba(255,59,48,0.15)"
                  strokeWidth="1.5"
                  points="0,15 20,15 30,5 40,25 50,10 60,20 70,15 80,15 90,8 100,22 110,12 120,18 130,15 140,15 150,6 160,24 170,11 180,19 200,15"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 2, delay: 1.2, ease: "easeOut" }}
                />
              </svg>
            </motion.div>
          </div>

          {/* ════ RIGHT — Form terminal ════ */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="lg:col-span-8"
          >
            <div className="form-terminal">
              {/* Title bar */}
              <div className="form-terminal-bar">
                <div className="flex items-center gap-[5px]">
                  <span className="w-[7px] h-[7px] rounded-full bg-[#FF5F56]" />
                  <span className="w-[7px] h-[7px] rounded-full bg-[#FFBD2E]" />
                  <span className="w-[7px] h-[7px] rounded-full bg-[#27C93F]" />
                </div>
                <span className="text-[8px] tracking-[0.3em] text-white/35 uppercase font-mono">
                  dispatch.sh — encrypted
                </span>
              </div>

              {/* Body */}
              <div className="p-6 md:p-8 relative z-10">
                {/* Prompt */}
                <div className="text-[11px] text-white/30 mb-8 font-mono">
                  <span className="text-signal-red/70">agent</span>
                  <span className="text-white/25">@</span>
                  <span className="text-terminal-green/60">secure</span>
                  <span className="text-white/20">:~$</span>
                  <span className="ml-2 text-white/40">compose --encrypt --priority=high</span>
                  <span className="inline-block w-1.5 h-3.5 bg-signal-red/60 ml-1 align-text-bottom" style={{ animation: "terminalCursorBlink 1s step-end infinite" }} />
                </div>

                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.25 }}
                    >
                      {formFields.map((line, index) => (
                        <motion.div
                          key={line.field}
                          initial={{ opacity: 0, x: -15 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.4, delay: 0.7 + index * 0.12 }}
                          className="mb-6"
                        >
                          <label className="text-[9px] tracking-[0.3em] text-white/35 uppercase mb-2 block font-mono">
                            {line.label}
                          </label>
                          <div className="flex items-start gap-2">
                            <span
                              className={`text-xs shrink-0 mt-2 font-mono transition-colors duration-300 ${
                                currentLine === index ? "text-signal-red" : "text-white/25"
                              }`}
                            >
                              &gt;
                            </span>
                            {line.type === "textarea" ? (
                              <textarea
                                value={formState[line.field]}
                                onChange={(e) =>
                                  setFormState((prev) => ({ ...prev, [line.field]: e.target.value }))
                                }
                                onFocus={() => setCurrentLine(index)}
                                onBlur={() => setCurrentLine(-1)}
                                placeholder={line.placeholder}
                                rows={3}
                                className="form-terminal-input resize-none"
                                required
                              />
                            ) : (
                              <input
                                type={line.type}
                                value={formState[line.field]}
                                onChange={(e) =>
                                  setFormState((prev) => ({ ...prev, [line.field]: e.target.value }))
                                }
                                onFocus={() => setCurrentLine(index)}
                                onBlur={() => setCurrentLine(-1)}
                                placeholder={line.placeholder}
                                className="form-terminal-input"
                                required
                              />
                            )}
                          </div>
                        </motion.div>
                      ))}

                      <motion.button
                        type="submit"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : {}}
                        transition={{ duration: 0.4, delay: 1.2 }}
                        className="form-terminal-btn group"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        <span className="relative z-10 flex items-center gap-3">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                          </svg>
                          TRANSMIT
                        </span>
                        <div className="absolute inset-0 bg-signal-red -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                      </motion.button>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="py-12 text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 12, delay: 0.15 }}
                        className="w-14 h-14 mx-auto mb-5 rounded-full border border-terminal-green/40 flex items-center justify-center"
                        style={{ boxShadow: "0 0 30px rgba(57,255,20,0.1)" }}
                      >
                        <svg className="w-7 h-7 text-terminal-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                        </svg>
                      </motion.div>
                      <div className="text-terminal-green text-lg font-bold tracking-[0.15em] mb-2" style={{ textShadow: "0 0 12px rgba(57,255,20,0.3)" }}>
                        TRANSMISSION COMPLETE
                      </div>
                      <p className="text-[11px] text-white/40 tracking-wider">
                        Encrypted &amp; queued. Response ETA: 24-48h.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Status bar */}
              <div className="form-terminal-statusbar">
                <span>TLS 1.3 — E2E ENCRYPTED</span>
                <span>PRIORITY: HIGH</span>
              </div>

              {/* CRT scanlines */}
              <div className="absolute inset-0 pointer-events-none z-[2]" style={{
                background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.008) 2px, rgba(255,255,255,0.008) 4px)"
              }} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 md:px-12 lg:px-20 pb-16">
        <motion.footer
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="pt-8 border-t border-charcoal/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex gap-8">
              {[
                { label: "GitHub", href: "https://github.com/saivarmadpr" },
                { label: "LinkedIn", href: "https://www.linkedin.com/in/sai-varma-dantuluri/" },
              ].map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] tracking-[0.3em] text-charcoal/35 hover:text-signal-red transition-colors uppercase"
                  whileHover={{ y: -2 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
            <div className="text-[10px] tracking-[0.2em] text-charcoal/30 uppercase">
              &copy; {new Date().getFullYear()} SAI — All systems monitored
            </div>
          </div>
          <div className="mt-12 flex justify-center">
            <div className="text-[10px] text-charcoal/25 font-mono tracking-wider text-center">
              <div>END OF TRANSMISSION</div>
              <div className="mt-1">&#9608;&#9608;&#9608;</div>
            </div>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}
