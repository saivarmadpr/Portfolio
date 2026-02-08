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

            <About />
            <Experience />
            <Projects />
            <Blog />
            <Contact />
          </motion.main>
        </SmoothScroll>
      )}
    </>
  );
}
