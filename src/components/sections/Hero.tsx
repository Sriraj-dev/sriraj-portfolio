"use client";

import Link from "next/link";
import { ChevronDown, Download, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import type { Intro, Meta } from "@/lib/types";

interface HeroProps {
  intro: Intro;
  meta: Meta;
}

export default function Hero({ intro, meta }: HeroProps) {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setRoleIndex((i) => (i + 1) % intro.roles.length),
      2800
    );
    return () => clearInterval(id);
  }, [intro.roles.length]);

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

      {/* ── Mobile layout: single centered column ── */}
      <div className="md:hidden relative max-w-3xl mx-auto w-full text-center">
        <motion.p
          className="font-mono text-xs sm:text-sm tracking-[0.22em] uppercase text-[var(--text-muted)] mb-7"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[var(--accent)]">// </span>
          {intro.greeting}
        </motion.p>

        <motion.h1
          className="gradient-text text-[clamp(4rem,14vw,9rem)] leading-[0.9] font-black tracking-tight mb-8"
          style={{ fontFamily: "var(--font-syne), sans-serif" }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          {intro.name}
        </motion.h1>

        <motion.div
          className="h-7 flex items-center justify-center mb-8"
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

        <motion.p
          className="text-[var(--text-muted)] text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.62, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {intro.bio}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <CTAButtons intro={intro} meta={meta} align="center" />
        </motion.div>
      </div>

      {/* ── Desktop layout: two-column ── */}
      <div className="hidden md:flex relative max-w-6xl mx-auto w-full items-center gap-16 lg:gap-24">

        {/* Left: identity */}
        <div className="flex-none w-[42%]">
          <motion.p
            className="font-mono text-sm tracking-[0.22em] uppercase text-[var(--text-muted)] mb-7"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[var(--accent)]">// </span>
            {intro.greeting}
          </motion.p>

          <motion.h1
            className="gradient-text text-[clamp(3rem,6vw,5.5rem)] leading-[0.88] font-black tracking-tight mb-8"
            style={{ fontFamily: "var(--font-syne), sans-serif" }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            {intro.name}
          </motion.h1>

          <motion.div
            className="h-7 flex items-center mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                className="font-mono text-base text-[var(--text-muted)]"
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

          <motion.div
            className="flex flex-row gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <CTAButtons intro={intro} meta={meta} align="left" />
          </motion.div>
        </div>

        {/* Right: bio as prominent statement with tilt */}
        <TiltBio bio={intro.bio} />

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

function TiltBio({ bio }: { bio: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 180, damping: 22 });
  const springY = useSpring(rotateY, { stiffness: 180, damping: 22 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    rotateY.set((x - 0.5) * 14);
    rotateX.set((0.5 - y) * 9);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="flex-1 cursor-default"
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 900 }}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.45, duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="text-[7rem] leading-[0.7] font-black text-[var(--accent)] opacity-20 mb-2 select-none"
        aria-hidden="true"
        style={{ fontFamily: "var(--font-syne), sans-serif" }}
      >
        "
      </div>
      <p className="text-[var(--text-primary)] text-xl lg:text-2xl leading-relaxed font-light">
        {bio}
      </p>
    </motion.div>
  );
}

function CTAButtons({
  intro,
  meta,
  align,
}: {
  intro: Intro;
  meta: Meta;
  align: "center" | "left";
}) {
  const justifyClass = align === "center" ? "justify-center" : "justify-start";
  return (
    <>
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
        <span className={`relative z-10 flex items-center ${justifyClass} gap-1.5`}>
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
    </>
  );
}
