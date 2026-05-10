"use client";

import Link from "next/link";
import { ChevronDown, Download, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import type { Intro, Meta } from "@/lib/types";

interface HeroProps {
  intro: Intro;
  meta: Meta;
}

export default function Hero({ intro, meta }: HeroProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedBio, setTypedBio] = useState("");
  const [bioTypingDone, setBioTypingDone] = useState(false);

  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % intro.roles.length),
      2800
    );
    return () => clearInterval(id);
  }, [intro.roles.length]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    const startDelay = setTimeout(() => {
      let i = 0;
      timer = setInterval(() => {
        i++;
        setTypedBio(intro.bio.slice(0, i));
        if (i >= intro.bio.length) {
          clearInterval(timer);
          setBioTypingDone(true);
        }
      }, 18);
    }, 1400);
    return () => {
      clearTimeout(startDelay);
      clearInterval(timer);
    };
  }, [intro.bio]);

  return (
    <section
      id="hero"
      className="relative min-h-dvh flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Dot grid */}
      <div className="absolute inset-0 dot-grid opacity-[0.35] pointer-events-none" />

      {/* Glow orb */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(99,102,241,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto w-full">
        <div className="flex flex-col md:flex-row md:items-center gap-12 lg:gap-20">

          {/* ── Left / mobile-center: identity ── */}
          <div className="flex-1 text-center md:text-left">

            {/* Greeting */}
            <motion.p
              className="font-mono text-xs sm:text-sm tracking-[0.22em] uppercase text-[var(--text-muted)] mb-7"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-[var(--accent)]">// </span>
              {intro.greeting}
            </motion.p>

            {/* Name — fluid on mobile, tighter on desktop */}
            <motion.h1
              className="gradient-text leading-[0.9] font-black tracking-tight mb-8 text-[clamp(4rem,14vw,9rem)] md:text-[clamp(2.8rem,5.5vw,5rem)]"
              style={{ fontFamily: "var(--font-syne), sans-serif" }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            >
              {intro.name}
            </motion.h1>

            {/* Cycling role */}
            <motion.div
              className="h-7 flex items-center justify-center md:justify-start mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  className="font-mono text-sm sm:text-base text-[var(--text-muted)]"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                >
                  {intro.roles[roleIndex]}
                  <span className="cursor-blink text-[var(--accent)] ml-0.5">▊</span>
                </motion.span>
              </AnimatePresence>
            </motion.div>

            {/* Bio — mobile only (desktop shows it in the terminal) */}
            <motion.p
              className="md:hidden text-[var(--text-muted)] text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {intro.bio}
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start mb-10 md:mb-0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                onClick={() => {
                  const id = intro.cta.href.replace("#", "");
                  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative px-8 py-3.5 rounded-lg overflow-hidden text-white text-sm font-semibold transition-all duration-300 hover:shadow-[0_0_28px_rgba(99,102,241,0.35)]"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary) 100%)",
                }}
              >
                <span className="relative z-10 flex items-center justify-center gap-1.5">
                  {intro.cta.label}
                  <ArrowUpRight
                    size={15}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </span>
              </button>

              {meta.resumeUrl && (
                <Link
                  href={meta.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3.5 rounded-lg border border-[var(--border-bright)] text-[var(--text-primary)] text-sm font-semibold hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300 inline-flex items-center justify-center gap-2 hover:shadow-[0_0_16px_rgba(99,102,241,0.12)]"
                >
                  <Download size={14} />
                  Resume
                </Link>
              )}
            </motion.div>
          </div>

          {/* ── Right: Mac terminal — desktop only ── */}
          <motion.div
            className="hidden md:flex flex-1 justify-center"
            initial={{ opacity: 0, x: 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45, duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="w-full max-w-[520px] rounded-xl overflow-hidden border border-[var(--border-color)] shadow-[0_24px_64px_rgba(0,0,0,0.55),0_0_0_1px_rgba(99,102,241,0.08),inset_0_1px_0_rgba(255,255,255,0.04)]">

              {/* macOS title bar */}
              <div className="bg-[#1a1a28] flex items-center gap-2 px-4 py-3 border-b border-[var(--border-color)]">
                <div className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all" />
                <div className="w-3 h-3 rounded-full bg-[#febc2e] hover:brightness-110 transition-all" />
                <div className="w-3 h-3 rounded-full bg-[#28c840] hover:brightness-110 transition-all" />
                <span className="flex-1 text-center font-mono text-xs text-[var(--text-muted)] select-none tracking-wide">
                  sriraj — about.sh
                </span>
              </div>

              {/* Terminal body */}
              <div className="bg-[#09090f] px-5 py-4 font-mono text-[13px] min-h-[220px]">

                {/* Command line */}
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[var(--accent)]">➜</span>
                  <span className="text-[#50fa7b]">~</span>
                  <span className="text-[var(--text-muted)]">$</span>
                  <span className="text-white ml-1">./about.sh</span>
                </div>

                {/* Comment line */}
                <div className="mb-4 text-[#6272a4] text-xs">
                  # Loading profile...
                </div>

                {/* Typewriter bio output */}
                <div className="text-[#cdd6f4] leading-[1.75] min-h-[80px]">
                  {typedBio}
                  {!bioTypingDone && (
                    <span className="cursor-blink text-[var(--accent)]">▊</span>
                  )}
                </div>

                {/* Idle prompt after typing */}
                {bioTypingDone && (
                  <motion.div
                    className="flex items-center gap-1.5 mt-5"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <span className="text-[var(--accent)]">➜</span>
                    <span className="text-[#50fa7b]">~</span>
                    <span className="text-[var(--text-muted)]">$</span>
                    <span className="cursor-blink text-[var(--accent)] ml-1">▊</span>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() =>
          document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })
        }
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors group"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6 }}
      >
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-60 group-hover:opacity-100 transition-opacity">
          scroll
        </span>
        <ChevronDown size={18} className="animate-bounce" />
      </motion.button>
    </section>
  );
}
