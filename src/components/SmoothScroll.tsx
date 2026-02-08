"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const hasSnapped = useRef(false);

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

    // Snap to #about after scrolling past the hero
    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      const aboutEl = document.getElementById("about");
      if (!aboutEl || hasSnapped.current) return;

      const heroHeight = window.innerHeight;
      const aboutTop = aboutEl.getBoundingClientRect().top + scroll;

      // Trigger snap once user scrolls past 40% of viewport — catch fast scrolls too
      if (scroll > heroHeight * 0.4 && scroll < aboutTop + heroHeight) {
        hasSnapped.current = true;
        lenis.stop();
        lenis.scrollTo(aboutEl, {
          offset: 0,
          duration: 1.0,
          force: true,
          onComplete: () => {
            lenis.start();
          },
        });
      }
    });

    // Reset snap when user scrolls back to top
    lenis.on("scroll", ({ scroll }: { scroll: number }) => {
      if (hasSnapped.current && scroll < window.innerHeight * 0.2) {
        hasSnapped.current = false;
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
