"use client";

import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.4,
      easing: (t: number) => {
        // Custom ultra-smooth ease-out curve — long, luxurious deceleration
        return t === 1 ? 1 : 1 - Math.pow(2, -12 * t);
      },
      smoothWheel: true,
      wheelMultiplier: 0.7,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Connect to GSAP ScrollTrigger if available
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
