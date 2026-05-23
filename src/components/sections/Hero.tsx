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
      className="relative min-h-dvh flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-x-hidden py-20"
    >
      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(0,184,217,0.05) 0%, transparent 70%)" }}
      />

      {/* ── Mobile layout ── */}
      <div className="md:hidden relative w-full max-w-lg mx-auto text-center pt-8">
        {meta.avatar && (
          <motion.div
            className="flex justify-center mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.05, duration: 0.6 }}
          >
            <DrawingFrame src={meta.avatar} name={intro.name} size={140} />
          </motion.div>
        )}

        <motion.h1
          className="gradient-text font-mono text-[clamp(2.8rem,12vw,5rem)] leading-none font-bold tracking-tight mb-4"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          {intro.name.toUpperCase()}
        </motion.h1>

        <motion.div
          className="h-6 flex items-center justify-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}
              className="font-mono text-xs tracking-widest uppercase text-[var(--text-muted)]"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
            >
              {intro.roles[roleIndex]}
              <span className="cursor-blink text-[var(--accent)] ml-1">▊</span>
            </motion.span>
          </AnimatePresence>
        </motion.div>

        {/* Compact spec table on mobile */}
        <motion.div
          className="mb-8 font-mono text-[10px] tracking-wider border border-[var(--border-color)] bg-[var(--bg-elevated)] p-4 text-left"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="text-[var(--text-dim)] uppercase mb-3">Specification</div>
          <div className="space-y-2">
            <SpecRow label="ORG" value="AQR Capital Management" />
            <SpecRow label="INST" value="IIT (BHU) Varanasi, 2024" />
            <SpecRow label="STATUS" value="● ACTIVE" accent />
          </div>
        </motion.div>

        <MobileBio bio={intro.bio} />

        <motion.div
          className="flex flex-col sm:flex-row gap-3 justify-center"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6 }}
        >
          <CTAButtons intro={intro} meta={meta} />
        </motion.div>
      </div>

      {/* ── Desktop layout ── */}
      <div className="hidden md:grid relative max-w-6xl mx-auto w-full grid-cols-[auto_1fr] gap-12 lg:gap-20 items-center">

        {/* Left: avatar in drawing frame */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.05, duration: 0.7 }}
        >
          {meta.avatar && <DrawingFrame src={meta.avatar} name={intro.name} size={280} />}
        </motion.div>

        {/* Right: identity + spec + bio */}
        <div>
          {/* Name */}
          <motion.h1
            className="gradient-text font-mono text-[clamp(2.5rem,5vw,4.5rem)] leading-none font-bold tracking-tight mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
          >
            {intro.name.toUpperCase()}
          </motion.h1>

          {/* Role cycling */}
          <motion.div
            className="h-6 flex items-center mb-5"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIndex}
                className="font-mono text-xs tracking-widest uppercase text-[var(--text-muted)]"
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.25 }}
              >
                {intro.roles[roleIndex]}
                <span className="cursor-blink text-[var(--accent)] ml-1">▊</span>
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Spec table */}
          <motion.div
            className="font-mono text-xs border border-[var(--border-color)] bg-[var(--bg-elevated)] mb-5"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
          >
            <div className="flex items-center gap-3 px-4 py-2 border-b border-[var(--border-color)] text-[10px] tracking-widest uppercase text-[var(--text-dim)]">
              <span className="text-[var(--accent)]/50">■</span>
              SPECIFICATION — SRIRAJ PALAKURTHI
            </div>
            <div className="px-4 py-3 space-y-2.5">
              <SpecRow label="DESIGNATION" value="Software Developer" />
              <SpecRow label="ORGANIZATION" value="AQR Capital Management" />
              <SpecRow label="EDUCATION" value="IIT (BHU) Varanasi · 2024" />
              <SpecRow label="CLASSIFICATION" value="Builder · Engineer · Solopreneur" />
              <SpecRow label="STATUS" value="● ACTIVE" accent />
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            className="mb-5 space-y-3"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.55, duration: 0.8 }}
          >
            {intro.bio.split("\n\n").map((para, i) => (
              <p
                key={i}
                className="text-sm text-[var(--text-muted)] leading-relaxed border-l border-[var(--border-color)] pl-4 hover:border-[var(--accent)]/40 hover:text-[var(--text-primary)] transition-all"
              >
                {para}
              </p>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            className="flex gap-3"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <CTAButtons intro={intro} meta={meta} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ── Avatar in technical drawing frame ── */
function DrawingFrame({ src, name, size }: { src: string; name: string; size: number }) {
  return (
    <div className="relative inline-block" style={{ padding: "16px" }}>
      {/* Corner L-marks */}
      <span className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-[var(--accent)] opacity-70" />
      <span className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-[var(--accent)] opacity-70" />
      <span className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-[var(--accent)] opacity-70" />
      <span className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-[var(--accent)] opacity-70" />

      {/* Image */}
      <div
        className="overflow-hidden border border-[var(--border-color)]"
        style={{ width: size, height: size }}
      >
        <Image
          src={src}
          alt={name}
          width={size}
          height={size}
          className="object-cover w-full h-full grayscale-[20%]"
          priority
        />
      </div>

      {/* Bottom label */}
      <div className="font-mono text-[8px] tracking-widest uppercase text-[var(--text-dim)] mt-2 flex justify-between">
        <span>REV.01</span>
        <span>2024</span>
      </div>
    </div>
  );
}

/* ── Spec row: LABEL ··· VALUE ── */
function SpecRow({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="grid grid-cols-[auto_1fr_auto] items-center gap-1">
      <span className="text-[var(--text-muted)] uppercase tracking-widest whitespace-nowrap">{label}</span>
      <span className="border-b border-dotted border-[var(--border-color)] h-0 mt-1" />
      <span className={accent ? "text-[var(--accent)] scan-pulse" : "text-[var(--text-primary)]"}>{value}</span>
    </div>
  );
}

/* ── Mobile bio with expand/collapse ── */
function MobileBio({ bio }: { bio: string }) {
  const [expanded, setExpanded] = useState(false);
  const paragraphs = bio.split("\n\n");
  const visible = expanded ? paragraphs : [paragraphs[0]];

  return (
    <motion.div
      className="max-w-sm mx-auto mb-8 text-left"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.6 }}
    >
      <div className="space-y-3">
        {visible.map((para, i) => (
          <p key={i} className="text-xs text-[var(--text-muted)] leading-relaxed">
            {para}
          </p>
        ))}
      </div>
      {paragraphs.length > 1 && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-2 font-mono text-[10px] tracking-widest uppercase text-[var(--accent)] hover:opacity-70 transition-opacity"
        >
          {expanded ? "COLLAPSE ↑" : "EXPAND ↓"}
        </button>
      )}
    </motion.div>
  );
}

/* ── CTA Buttons ── */
function CTAButtons({ intro, meta }: { intro: Intro; meta: Meta }) {
  return (
    <>
      <button
        onClick={() => {
          const id = intro.cta.href.replace("#", "");
          document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        }}
        className="group flex items-center gap-2 px-6 py-2.5 font-mono text-xs tracking-widest uppercase text-[var(--bg-primary)] bg-[var(--accent)] hover:bg-[var(--accent)]/90 transition-colors"
      >
        {intro.cta.label}
        <ArrowUpRight
          size={13}
          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </button>

      {meta.resumeUrl && (
        <Link
          href={meta.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-2.5 font-mono text-xs tracking-widest uppercase text-[var(--text-muted)] border border-[var(--border-bright)] hover:border-[var(--accent)]/50 hover:text-[var(--accent)] transition-all"
        >
          <Download size={12} />
          Resume
        </Link>
      )}
    </>
  );
}
