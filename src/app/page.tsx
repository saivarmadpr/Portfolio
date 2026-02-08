"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navigation from "@/components/Navigation";
import BootSequence from "@/components/BootSequence";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";
import Marquee from "@/components/Marquee";
import FlowingLines from "@/components/FlowingLines";

export default function Home() {
  const [booted, setBooted] = useState(false);

  return (
    <>
      <CustomCursor />

      <AnimatePresence mode="wait">
        {!booted && (
          <BootSequence onComplete={() => setBooted(true)} />
        )}
      </AnimatePresence>

      {booted && (
        <SmoothScroll>
          <Navigation />

          <motion.main
            className="bg-ivory min-h-screen noise-overlay relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <FlowingLines />
            <Hero />

            <Marquee
              items={[
                "PROMPT INJECTION",
                "JAILBREAK ENGINEERING",
                "MODEL EXPLOITATION",
                "ADVERSARIAL ML",
                "RED TEAM OPS",
                "LLM SECURITY",
                "AGENT HIJACKING",
                "DATA EXFILTRATION",
              ]}
              variant="red"
              speed="normal"
            />

            <About />

            <div className="section-divider mx-6 md:mx-12 lg:mx-20" />

            <Experience />

            <Marquee
              items={[
                "TOP SECRET",
                "CLASSIFIED",
                "AUTHORIZED PERSONNEL ONLY",
                "EYES ONLY",
                "RESTRICTED ACCESS",
                "DO NOT DISTRIBUTE",
              ]}
              variant="default"
              speed="slow"
            />

            <Projects />

            <div className="section-divider mx-6 md:mx-12 lg:mx-20" />

            <Blog />

            <Marquee
              items={[
                "BREAKING THINGS TO FIX THEM",
                "OFFENSIVE SECURITY",
                "RESPONSIBLE DISCLOSURE",
                "ZERO TRUST",
                "DEFENSE IN DEPTH",
              ]}
              variant="green"
              speed="fast"
            />

            <Contact />
          </motion.main>
        </SmoothScroll>
      )}
    </>
  );
}
