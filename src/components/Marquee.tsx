"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface MarqueeProps {
  items: string[];
  separator?: string;
  speed?: "slow" | "normal" | "fast";
  variant?: "default" | "red" | "green";
}

export default function Marquee({
  items,
  separator = "//",
  speed = "normal",
  variant = "default",
}: MarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const speedMap = {
    slow: "40s",
    normal: "30s",
    fast: "20s",
  };

  const variantStyles = {
    default: "bg-charcoal text-ivory",
    red: "bg-signal-red text-ivory",
    green: "bg-charcoal text-terminal-green",
  };

  const content = items.join(` ${separator} `) + ` ${separator} `;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className={`overflow-hidden py-4 ${variantStyles[variant]} select-none`}
    >
      <div
        className="marquee-track whitespace-nowrap"
        style={{ animationDuration: speedMap[speed] }}
      >
        <span className="text-xs tracking-[0.3em] uppercase font-bold px-4">
          {content}
        </span>
        <span className="text-xs tracking-[0.3em] uppercase font-bold px-4">
          {content}
        </span>
      </div>
    </motion.div>
  );
}
