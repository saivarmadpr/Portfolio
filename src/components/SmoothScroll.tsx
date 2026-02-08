"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const heroSnapped = useRef(false);
  const terminalSnapped = useRef(false);
  const experienceSnapped = useRef(false);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.4,
      easing: (t: number) => {
        return t === 1 ? 1 : 1 - Math.pow(2, -12 * t);
      },
      smoothWheel: true,
      wheelMultiplier: 0.7,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    lenis.on("scroll", ({ scroll, direction }: { scroll: number; direction: number }) => {
      const aboutEl = document.getElementById("about");
      const terminalEl = document.getElementById("terminal");
      const experienceEl = document.getElementById("experience");
      const heroHeight = window.innerHeight;

      // --- Snap 1: Hero → About ---
      if (aboutEl && !heroSnapped.current && direction > 0) {
        const aboutTop = aboutEl.getBoundingClientRect().top + scroll;
        if (scroll > heroHeight * 0.4 && scroll < aboutTop + heroHeight) {
          heroSnapped.current = true;
          lenis.stop();
          lenis.scrollTo(aboutEl, {
            offset: 0,
            duration: 1.0,
            force: true,
            onComplete: () => {
              lenis.start();
            },
          });
          return;
        }
      }

      // --- Snap 2: About/Dossier → Terminal ---
      if (terminalEl && aboutEl && !terminalSnapped.current && heroSnapped.current && direction > 0) {
        const aboutTop = aboutEl.getBoundingClientRect().top + scroll;
        const aboutHeight = aboutEl.offsetHeight;
        const terminalTop = terminalEl.getBoundingClientRect().top + scroll;

        // Trigger when user has scrolled past 60% of the about section
        if (scroll > aboutTop + aboutHeight * 0.6 && scroll < terminalTop + heroHeight * 0.5) {
          terminalSnapped.current = true;
          lenis.stop();
          // Land so dossier bottom is still visible and terminal header is at ~30% viewport
          lenis.scrollTo(terminalEl, {
            offset: -heroHeight * 0.28,
            duration: 1.2,
            force: true,
            easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
            onComplete: () => {
              // Lock scroll while terminal content dynamically loads
              setTimeout(() => {
                lenis.start();
              }, 3500);
            },
          });
          return;
        }
      }

      // --- Snap 3: Terminal → Experience ---
      if (experienceEl && terminalEl && !experienceSnapped.current && terminalSnapped.current && direction > 0) {
        const terminalTop = terminalEl.getBoundingClientRect().top + scroll;
        const terminalHeight = terminalEl.offsetHeight;

        // Trigger when user has scrolled past 55% of the terminal section
        if (scroll > terminalTop + terminalHeight * 0.55 && scroll < terminalTop + terminalHeight + heroHeight * 0.5) {
          experienceSnapped.current = true;
          lenis.stop();
          lenis.scrollTo(experienceEl, {
            offset: 0,
            duration: 1.2,
            force: true,
            easing: (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t)),
            onComplete: () => {
              lenis.start();
            },
          });
          return;
        }
      }

      // --- Reset snaps when scrolling back ---
      if (heroSnapped.current && scroll < heroHeight * 0.2) {
        heroSnapped.current = false;
        terminalSnapped.current = false;
        experienceSnapped.current = false;
      }
      if (terminalSnapped.current && aboutEl) {
        const aboutTop = aboutEl.getBoundingClientRect().top + scroll;
        if (scroll < aboutTop + aboutEl.offsetHeight * 0.3) {
          terminalSnapped.current = false;
          experienceSnapped.current = false;
        }
      }
      if (experienceSnapped.current && terminalEl) {
        const terminalTop = terminalEl.getBoundingClientRect().top + scroll;
        if (scroll < terminalTop + terminalEl.offsetHeight * 0.3) {
          experienceSnapped.current = false;
        }
      }
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
