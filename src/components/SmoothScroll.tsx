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
          lenis.scrollTo(terminalEl, {
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

      // --- Reset snaps when scrolling back ---
      if (heroSnapped.current && scroll < heroHeight * 0.2) {
        heroSnapped.current = false;
        terminalSnapped.current = false;
      }
      if (terminalSnapped.current && aboutEl) {
        const aboutTop = aboutEl.getBoundingClientRect().top + scroll;
        if (scroll < aboutTop + aboutEl.offsetHeight * 0.3) {
          terminalSnapped.current = false;
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
