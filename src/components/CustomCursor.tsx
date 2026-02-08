"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useSpring(0, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("magnetic-btn")
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, [cursorX, cursorY, isVisible]);

  // Don't render on touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  return (
    <>
      {/* Main crosshair cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div
          className="relative -translate-x-1/2 -translate-y-1/2"
          style={{
            width: isHovering ? "40px" : "20px",
            height: isHovering ? "40px" : "20px",
            transition: "width 0.2s, height 0.2s",
          }}
        >
          {/* Crosshair lines */}
          <div
            className="absolute top-1/2 left-0 w-full bg-ivory"
            style={{
              height: "1px",
              transform: `translateY(-50%) ${isClicking ? "scaleX(1.5)" : "scaleX(1)"}`,
              transition: "transform 0.15s",
            }}
          />
          <div
            className="absolute top-0 left-1/2 h-full bg-ivory"
            style={{
              width: "1px",
              transform: `translateX(-50%) ${isClicking ? "scaleY(1.5)" : "scaleY(1)"}`,
              transition: "transform 0.15s",
            }}
          />
          {/* Center dot */}
          <div
            className="absolute top-1/2 left-1/2 rounded-full bg-signal-red"
            style={{
              width: isClicking ? "6px" : "3px",
              height: isClicking ? "6px" : "3px",
              transform: "translate(-50%, -50%)",
              transition: "width 0.15s, height 0.15s",
            }}
          />
        </div>
      </motion.div>
    </>
  );
}
