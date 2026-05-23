"use client";

import Image from "next/image";
import Link from "next/link";
import { Download, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
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
      <div className="md:hidden relative max-w-3xl mx-auto w-full text-center pt-20">
        {meta.avatar && (
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Avatar src={meta.avatar} name={intro.name} size={158} />
          </motion.div>
        )}

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
          className="gradient-text text-[clamp(3rem,11vw,7rem)] leading-[0.9] font-black tracking-tight mb-8"
          style={{ fontFamily: "var(--font-outfit), sans-serif" }}
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

        <MobileBio bio={intro.bio} />

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
          {meta.avatar && (
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Avatar src={meta.avatar} name={intro.name} size={200} />
            </motion.div>
          )}

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
            className="gradient-text text-[clamp(2rem,4.5vw,4.2rem)] leading-[0.88] font-black tracking-tight mb-8"
            style={{ fontFamily: "var(--font-outfit), sans-serif" }}
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

        {/* Right: bio */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.45, duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Thin accent rule at top */}
          <div
            className="w-10 h-px mb-6"
            style={{ background: "linear-gradient(to right, var(--accent), transparent)" }}
          />
          <div className="space-y-4">
            {intro.bio.split("\n\n").map((para, i) => (
              <p
                key={i}
                className="text-[var(--text-primary)] text-sm lg:text-base leading-relaxed font-light pl-4 border-l border-[var(--accent)] opacity-80 hover:opacity-100 transition-opacity"
                style={{ borderColor: "rgba(99,102,241,0.25)" }}
              >
                {para}
              </p>
            ))}
          </div>
        </motion.div>

      </div>

    </section>
  );
}

function MobileBio({ bio }: { bio: string }) {
  const [expanded, setExpanded] = useState(false);
  const paragraphs = bio.split("\n\n");
  const visible = expanded ? paragraphs : [paragraphs[0]];

  return (
    <motion.div
      className="max-w-xl mx-auto mb-10 text-left"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.62, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="space-y-3">
        {visible.map((para, i) => (
          <p key={i} className="text-[var(--text-muted)] text-sm sm:text-base leading-relaxed">
            {para}
          </p>
        ))}
      </div>
      {paragraphs.length > 1 && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-3 font-mono text-xs text-[var(--accent)] hover:opacity-80 transition-opacity"
        >
          {expanded ? "View Less ↑" : "View More ↓"}
        </button>
      )}
    </motion.div>
  );
}

function Avatar({ src, name, size }: { src: string; name: string; size: number }) {
  return (
    <div
      className="rounded-full p-[2.5px] inline-block"
      style={{
        background: "linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary) 100%)",
        boxShadow: "0 0 24px rgba(99,102,241,0.25)",
      }}
    >
      <div className="rounded-full overflow-hidden bg-[var(--bg-primary)]" style={{ width: size, height: size }}>
        <Image
          src={src}
          alt={name}
          width={size}
          height={size}
          className="object-cover w-full h-full"
          priority
        />
      </div>
    </div>
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
