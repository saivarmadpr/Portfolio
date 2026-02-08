"use client";

import { useEffect, useRef } from "react";

export default function FlowingLines() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = document.documentElement.scrollHeight;

    const resize = () => {
      width = window.innerWidth;
      height = Math.max(document.documentElement.scrollHeight, window.innerHeight * 5);
      canvas.width = width;
      canvas.height = height;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY + window.scrollY };
    };
    window.addEventListener("mousemove", handleMouse);

    // Define a set of organic curves — large sweeping paths
    const curves = [
      // Large swooping curves across the page
      { yStart: 0.05, amplitude: 200, frequency: 0.8, phaseOffset: 0, strokeWidth: 1.8, opacity: 0.07 },
      { yStart: 0.08, amplitude: 250, frequency: 0.6, phaseOffset: 0.5, strokeWidth: 1.2, opacity: 0.05 },
      { yStart: 0.15, amplitude: 300, frequency: 0.4, phaseOffset: 1.0, strokeWidth: 2.0, opacity: 0.06 },
      { yStart: 0.12, amplitude: 180, frequency: 1.0, phaseOffset: 1.5, strokeWidth: 1.0, opacity: 0.04 },
      { yStart: 0.25, amplitude: 350, frequency: 0.3, phaseOffset: 2.0, strokeWidth: 2.5, opacity: 0.06 },
      { yStart: 0.22, amplitude: 220, frequency: 0.7, phaseOffset: 2.5, strokeWidth: 1.4, opacity: 0.05 },
      { yStart: 0.35, amplitude: 280, frequency: 0.5, phaseOffset: 3.0, strokeWidth: 1.8, opacity: 0.07 },
      { yStart: 0.38, amplitude: 150, frequency: 0.9, phaseOffset: 3.5, strokeWidth: 1.0, opacity: 0.04 },
      { yStart: 0.45, amplitude: 320, frequency: 0.35, phaseOffset: 4.0, strokeWidth: 2.2, opacity: 0.06 },
      { yStart: 0.50, amplitude: 200, frequency: 0.65, phaseOffset: 4.5, strokeWidth: 1.5, opacity: 0.05 },
      { yStart: 0.55, amplitude: 260, frequency: 0.45, phaseOffset: 5.0, strokeWidth: 1.8, opacity: 0.06 },
      { yStart: 0.60, amplitude: 190, frequency: 0.85, phaseOffset: 5.5, strokeWidth: 1.2, opacity: 0.04 },
      { yStart: 0.68, amplitude: 340, frequency: 0.3, phaseOffset: 6.0, strokeWidth: 2.0, opacity: 0.06 },
      { yStart: 0.72, amplitude: 170, frequency: 0.75, phaseOffset: 6.5, strokeWidth: 1.3, opacity: 0.05 },
      { yStart: 0.80, amplitude: 280, frequency: 0.5, phaseOffset: 7.0, strokeWidth: 1.8, opacity: 0.06 },
      { yStart: 0.85, amplitude: 230, frequency: 0.55, phaseOffset: 7.5, strokeWidth: 1.5, opacity: 0.05 },
      { yStart: 0.92, amplitude: 200, frequency: 0.7, phaseOffset: 8.0, strokeWidth: 1.2, opacity: 0.04 },
      // Circular / elliptical swoops
      { yStart: 0.10, amplitude: 400, frequency: 0.25, phaseOffset: 0.3, strokeWidth: 2.5, opacity: 0.05 },
      { yStart: 0.40, amplitude: 450, frequency: 0.2, phaseOffset: 1.8, strokeWidth: 2.8, opacity: 0.04 },
      { yStart: 0.65, amplitude: 380, frequency: 0.28, phaseOffset: 3.3, strokeWidth: 2.2, opacity: 0.05 },
    ];

    let time = 0;

    const drawCurve = (
      curve: typeof curves[0],
      t: number
    ) => {
      const baseY = curve.yStart * height;
      const steps = 120;

      ctx.beginPath();

      for (let i = 0; i <= steps; i++) {
        const progress = i / steps;
        const x = progress * (width + 200) - 100;

        // Layered sine waves for organic feel
        const y =
          baseY +
          Math.sin(progress * Math.PI * 2 * curve.frequency + curve.phaseOffset + t * 0.15) * curve.amplitude +
          Math.sin(progress * Math.PI * 3 * curve.frequency + curve.phaseOffset * 1.3 + t * 0.1) * curve.amplitude * 0.3 +
          Math.cos(progress * Math.PI * 1.5 * curve.frequency + curve.phaseOffset * 0.7 + t * 0.08) * curve.amplitude * 0.2;

        if (i === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.strokeStyle = `rgba(26, 26, 26, ${curve.opacity})`;
      ctx.lineWidth = curve.strokeWidth;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
    };

    const animate = () => {
      time += 0.02;

      ctx.clearRect(0, 0, width, height);

      curves.forEach((curve) => {
        drawCurve(curve, time);
      });

      animRef.current = requestAnimationFrame(animate);
    };

    // Small delay to ensure page height is computed
    setTimeout(() => {
      resize();
      animate();
    }, 100);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full pointer-events-none z-0"
    />
  );
}
