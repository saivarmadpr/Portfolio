"use client";

import { useRef, useState, FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import Marquee from "@/components/Marquee";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentLine, setCurrentLine] = useState(-1);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: "", email: "", message: "" });
    }, 4000);
  };

  const formLines = [
    { label: "IDENTIFIER", field: "name" as const, placeholder: "Enter your callsign...", type: "text" },
    { label: "COMM_CHANNEL", field: "email" as const, placeholder: "Enter secure email...", type: "email" },
    { label: "TRANSMISSION", field: "message" as const, placeholder: "Begin encrypted transmission...", type: "textarea" },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-20 px-6 md:px-12 lg:px-20"
      id="contact"
    >

      <div className="w-full max-w-3xl mx-auto relative z-10">
        {/* Marquee banner */}
        <div className="mb-4 -mx-6 md:-mx-12 lg:-mx-20">
          <Marquee
            items={["OPEN CHANNEL", "SECURE TRANSMISSION", "ENCRYPTED COMMS", "INITIATE CONTACT", "SIGNAL READY"]}
            variant="default"
            speed="normal"
          />
        </div>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-shadow-brutal leading-none">
            START
            <br />
            <span className="text-signal-red">TRANSMISSION</span>
          </h2>
        </motion.div>

        {/* Terminal form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="border-2 border-charcoal relative"
        >
          {/* Terminal header */}
          <div className="flex items-center gap-2 px-5 py-3 border-b border-charcoal/10 bg-charcoal/[0.02]">
            <div className="w-2.5 h-2.5 rounded-full bg-signal-red" />
            <div className="w-2.5 h-2.5 rounded-full bg-phosphor-amber" />
            <div className="w-2.5 h-2.5 rounded-full bg-terminal-green" />
            <span className="ml-3 text-[10px] text-charcoal/40 tracking-[0.3em] uppercase">
              secure_channel.sh — encrypted
            </span>
          </div>

          <div className="p-8 md:p-12">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit}>
                {/* Command prompt */}
                <div className="text-xs text-charcoal/40 mb-8 font-mono">
                  <span className="text-terminal-green">root@portfolio</span>
                  <span className="text-charcoal/40">:</span>
                  <span className="text-phosphor-amber">~/secure</span>
                  <span className="text-charcoal/40">$</span>
                  <span className="ml-2 text-charcoal/50">
                    ./init_transmission.sh --encrypt --priority=high
                  </span>
                </div>

                {formLines.map((line, index) => (
                  <motion.div
                    key={line.field}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.15 }}
                    className="mb-8"
                  >
                    <label className="text-[10px] tracking-[0.3em] text-charcoal/45 uppercase mb-3 block">
                      {line.label}
                    </label>
                    <div className="flex items-start gap-3">
                      <span
                        className={`text-sm shrink-0 mt-2.5 transition-colors duration-300 ${
                          currentLine === index
                            ? "text-terminal-green"
                            : "text-charcoal/35"
                        }`}
                      >
                        &gt;
                      </span>
                      {line.type === "textarea" ? (
                        <textarea
                          value={formState[line.field]}
                          onChange={(e) =>
                            setFormState((prev) => ({
                              ...prev,
                              [line.field]: e.target.value,
                            }))
                          }
                          onFocus={() => setCurrentLine(index)}
                          onBlur={() => setCurrentLine(-1)}
                          placeholder={line.placeholder}
                          rows={5}
                          className="terminal-input resize-none text-sm"
                          required
                        />
                      ) : (
                        <input
                          type={line.type}
                          value={formState[line.field]}
                          onChange={(e) =>
                            setFormState((prev) => ({
                              ...prev,
                              [line.field]: e.target.value,
                            }))
                          }
                          onFocus={() => setCurrentLine(index)}
                          onBlur={() => setCurrentLine(-1)}
                          placeholder={line.placeholder}
                          className="terminal-input text-sm"
                          required
                        />
                      )}
                    </div>
                  </motion.div>
                ))}

                {/* Submit button */}
                <motion.button
                  type="submit"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.4, delay: 1.2 }}
                  className="mt-4 px-10 py-4 bg-charcoal text-ivory text-xs tracking-[0.4em] uppercase font-bold hover:bg-signal-red transition-all duration-300 magnetic-btn relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Transmit Message</span>
                  <div className="absolute inset-0 bg-signal-red transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                </motion.button>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-16 text-center"
              >
                <div className="text-terminal-green text-3xl font-bold mb-4 text-shadow-glow">
                  TRANSMISSION SENT
                </div>
                <div className="w-16 h-px bg-terminal-green/30 mx-auto mb-4" />
                <p className="text-xs text-charcoal/40 tracking-wider">
                  Message encrypted and queued. Response ETA: 24-48 hours.
                </p>
                <div className="mt-6 text-[10px] text-charcoal/40 font-mono tracking-wider">
                  STATUS: DELIVERED | ENCRYPTION: AES-256-GCM | PRIORITY: HIGH
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 1.5 }}
          className="mt-14 pt-8 border-t border-charcoal/10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex gap-8">
              {[
                { label: "GitHub", href: "https://github.com/sai" },
                { label: "LinkedIn", href: "https://linkedin.com/in/sai" },
                { label: "X / Twitter", href: "https://twitter.com/sai" },
              ].map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] tracking-[0.3em] text-charcoal/45 hover:text-signal-red transition-colors uppercase"
                  whileHover={{ y: -2 }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
            <div className="text-[10px] tracking-[0.2em] text-charcoal/40 uppercase">
              &copy; {new Date().getFullYear()} SAI — All systems monitored
            </div>
          </div>

          {/* Bottom decoration */}
          <div className="mt-12 flex justify-center">
            <div className="text-[10px] text-charcoal/45 font-mono tracking-wider text-center">
              <div>END OF TRANSMISSION</div>
              <div className="mt-1">&#9608;&#9608;&#9608;</div>
            </div>
          </div>
        </motion.footer>
      </div>
    </section>
  );
}
