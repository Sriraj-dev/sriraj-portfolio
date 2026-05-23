"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Contact as ContactType, SectionSubtitle } from "@/lib/types";

interface ContactProps {
  contact: ContactType;
  subtitle?: SectionSubtitle;
}

const socialConfig: Record<string, { icon: React.ComponentType<{ size?: number }>; label: string }> = {
  linkedin:  { icon: FaLinkedin,  label: "LINKEDIN"  },
  whatsapp:  { icon: FaWhatsapp,  label: "WHATSAPP"  },
  github:    { icon: FaGithub,    label: "GITHUB"    },
  instagram: { icon: FaInstagram, label: "INSTAGRAM" },
};

export default function Contact({ contact, subtitle }: ContactProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(contact.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section id="contact" className="py-24 border-t border-[var(--border-color)]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading title="Contact" num="§6" description={subtitle} />
        </AnimatedSection>

        {/* Contact spec block */}
        <AnimatedSection delay={0.1}>
          <div className="border border-[var(--border-color)] bg-[var(--bg-elevated)] relative overflow-visible mb-8">
            {/* Corner marks */}
            <span className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-[var(--accent)] opacity-60" />
            <span className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 border-[var(--accent)] opacity-60" />
            <span className="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-[var(--accent)] opacity-60" />
            <span className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-[var(--accent)] opacity-60" />

            {/* Header */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-[var(--border-color)]">
              <span className="text-[var(--accent)]/50 text-[8px]">■</span>
              <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-muted)]">
                Contact Details
              </span>
            </div>

            {/* Email row */}
            <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-[var(--border-color)]">
              <div className="flex items-center gap-4 min-w-0">
                <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-muted)] shrink-0">EMAIL</span>
                <span className="font-mono text-xs text-[var(--text-primary)] truncate">
                  {contact.email}
                </span>
              </div>
              <button
                onClick={handleCopy}
                aria-label="Copy email"
                className="relative w-8 h-8 flex items-center justify-center border border-[var(--border-color)] hover:border-[var(--accent)]/40 hover:text-[var(--accent)] text-[var(--text-muted)] transition-all shrink-0"
              >
                <AnimatePresence mode="wait">
                  {copied ? (
                    <motion.span
                      key="check"
                      className="text-[var(--green)]"
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.6, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Check size={13} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="copy"
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.6, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      <Copy size={13} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>

            {/* Social rows */}
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
                  className="group flex items-center justify-between gap-4 px-5 py-3.5 border-b border-[var(--border-color)] last:border-b-0 hover:bg-[var(--accent)]/[0.03] transition-colors no-underline"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-muted)] w-20 shrink-0">
                      {cfg.label}
                    </span>
                    <Icon size={13} />
                    <span className="font-mono text-xs text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors">
                      {social.label}
                    </span>
                  </div>
                  <span className="font-mono text-[9px] tracking-widest uppercase text-[var(--text-dim)] group-hover:text-[var(--accent)] transition-colors">
                    OPEN →
                  </span>
                </a>
              );
            })}
          </div>
        </AnimatedSection>

        {/* Status */}
        <AnimatedSection delay={0.25}>
          <div className="flex items-center gap-3 font-mono text-[10px] tracking-widest uppercase text-[var(--text-muted)]">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--green)] scan-pulse" />
            <span>Available for interesting conversations</span>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
