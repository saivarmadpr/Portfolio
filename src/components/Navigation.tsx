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
  const [hasScrolled, setHasScrolled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0);
      setHasScrolled(scrollTop > 50);

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
          {/* Fixed top bar with backdrop */}
          <motion.header
            className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
              hasScrolled
                ? "bg-ivory/80 backdrop-blur-md border-b border-charcoal/[0.06] shadow-[0_1px_8px_rgba(0,0,0,0.04)]"
                : "bg-transparent"
            }`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {/* Progress bar on top */}
            <div className="absolute top-0 left-0 right-0 h-[2px]">
              <div
                className="progress-bar h-full"
                style={{ transform: `scaleX(${scrollProgress})` }}
              />
            </div>

            {/* Bar content */}
            <div className="flex items-center justify-between px-6 md:px-10 py-4">
              {/* Left: Name */}
              <button
                onClick={() => scrollTo("hero")}
                className="text-[11px] tracking-[0.3em] text-charcoal font-bold uppercase hover:text-signal-red transition-colors duration-300"
              >
                SAI VARMA DANTULURI
              </button>

              {/* Right: Status */}
              <span className="text-[10px] tracking-[0.3em] text-signal-red uppercase hidden md:block font-bold">
                Red Team Ops
              </span>
            </div>
          </motion.header>

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
                <span
                  className={`text-[10px] tracking-[0.3em] uppercase transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-signal-red opacity-100"
                      : "text-charcoal/0 group-hover:text-charcoal/40 group-hover:opacity-100 opacity-0"
                  }`}
                >
                  {item.label} {item.title}
                </span>

                <div
                  className={`nav-dot ${
                    activeSection === item.id ? "active" : ""
                  } group-hover:bg-charcoal/50`}
                />
              </button>
            ))}
          </motion.nav>
        </>
      )}
    </AnimatePresence>
  );
}
