"use client";

import { useState } from "react";
import { Copy, Check, Mail } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Contact as ContactType, SectionSubtitle } from "@/lib/types";

interface ContactProps {
  contact: ContactType;
  subtitle?: SectionSubtitle;
}

const socialConfig: Record<
  string,
  { icon: React.ComponentType<{ size?: number }>; hoverColor: string }
> = {
  linkedin:  { icon: FaLinkedin,  hoverColor: "#0a66c2" },
  whatsapp:  { icon: FaWhatsapp,  hoverColor: "#25d366" },
  github:    { icon: FaGithub,    hoverColor: "#e2e8f0" },
  instagram: { icon: FaInstagram, hoverColor: "#e1306c" },
};

export default function Contact({ contact, subtitle }: ContactProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact" className="relative py-24 px-4 sm:px-6 bg-[var(--bg-surface)] overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse, rgba(99,102,241,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-2xl mx-auto text-center">
        <AnimatedSection>
          <SectionHeading title="Get In Touch" description={subtitle} />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <p className="text-[var(--text-muted)] text-base mb-10 leading-relaxed">
          </p>
        </AnimatedSection>

        {/* Email pill */}
        <AnimatedSection delay={0.2}>
          <div className="inline-flex items-center gap-3 bg-[var(--bg-primary)] border border-[var(--border-bright)] rounded-xl px-5 py-3 mb-10 group">
            <Mail size={14} className="text-[var(--text-muted)]" />
            <span className="font-mono text-sm text-[var(--text-primary)]">
              {contact.email}
            </span>
            <button
              onClick={handleCopy}
              aria-label="Copy email"
              className="ml-1 text-[var(--text-muted)] hover:text-[var(--accent)] transition-colors relative w-4 h-4"
            >
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span
                    key="check"
                    className="absolute inset-0 flex items-center justify-center text-emerald-400"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Check size={14} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="copy"
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ scale: 0.6, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.6, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Copy size={14} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </AnimatedSection>

        {/* Social icons */}
        <AnimatedSection delay={0.32}>
          <div className="flex items-center justify-center gap-6">
            {contact.socials.map((social) => {
              const cfg = socialConfig[social.platform];
              if (!cfg) return null;
              const Icon = cfg.icon;
              return (
                <a
                  key={social.platform}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="group/icon flex flex-col items-center gap-1.5"
                >
                  <span
                    className="flex items-center justify-center w-10 h-10 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-muted)] transition-all duration-200 group-hover/icon:border-[var(--border-bright)] group-hover/icon:scale-110"
                    style={{
                      "--hover-color": cfg.hoverColor,
                    } as React.CSSProperties}
                  >
                    <Icon size={17} />
                  </span>
                  <span className="font-mono text-[9px] tracking-wider uppercase text-[var(--text-muted)] opacity-0 group-hover/icon:opacity-100 transition-opacity">
                    {social.label}
                  </span>
                </a>
              );
            })}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
