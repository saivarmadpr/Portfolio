"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { id: "hero", label: "00", title: "HOME" },
  { id: "about", label: "01", title: "DOSSIER" },
  { id: "experience", label: "02", title: "LOG" },
  { id: "projects", label: "03", title: "ARSENAL" },
  { id: "blog", label: "04", title: "REPORTS" },
  { id: "contact", label: "05", title: "COMMS" },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);

      // Determine active section
      const sections = NAV_ITEMS.map((item) => {
        const el = document.getElementById(item.id);
        if (!el) return { id: item.id, top: 0 };
        return { id: item.id, top: el.offsetTop };
      });

      const current = sections.reduce((prev, curr) => {
        return scrollTop >= curr.top - 300 ? curr : prev;
      });

      setActiveSection(current.id);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Top progress bar */}
          <motion.div
            className="fixed top-0 left-0 right-0 z-[100] h-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div
              className="progress-bar h-full"
              style={{ transform: `scaleX(${scrollProgress})` }}
            />
          </motion.div>

          {/* Side navigation dots */}
          <motion.nav
            className="fixed right-6 top-1/2 -translate-y-1/2 z-[100] hidden md:flex flex-col items-end gap-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="group flex items-center gap-3"
              >
                {/* Label - shows on hover */}
                <span
                  className={`text-[10px] tracking-[0.3em] uppercase transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-signal-red opacity-100"
                      : "text-charcoal/0 group-hover:text-charcoal/40 group-hover:opacity-100 opacity-0"
                  }`}
                >
                  {item.label} {item.title}
                </span>

                {/* Dot */}
                <div
                  className={`nav-dot ${
                    activeSection === item.id ? "active" : ""
                  } group-hover:bg-charcoal/50`}
                />
              </button>
            ))}
          </motion.nav>

          {/* Top-left branding */}
          <motion.div
            className="fixed top-6 left-6 z-[100] mix-blend-difference"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <button
              onClick={() => scrollTo("hero")}
              className="text-xs tracking-[0.3em] text-ivory font-bold uppercase"
            >
              SAI VARMA DANTULURI
            </button>
          </motion.div>

          {/* Top-right status */}
          <motion.div
            className="fixed top-6 right-6 z-[100] mix-blend-difference hidden md:block"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <span className="text-[10px] tracking-[0.3em] text-ivory/60 uppercase">
              Red Team Ops
            </span>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
