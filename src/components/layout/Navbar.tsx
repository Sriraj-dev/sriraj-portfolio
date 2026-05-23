"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const NAV_LINKS = [
  { label: "About",      href: "#hero" },
  { label: "Skills",     href: "#skills" },
  { label: "Products",   href: "#products" },
  { label: "Projects",   href: "#projects" },
  { label: "Background", href: "#background" },
  { label: "Blogs",      href: "#blogs" },
  { label: "Contact",    href: "#contact" },
];

// Logo covers "About", Contact is a separate CTA — pill shows the rest
const PILL_LINKS = NAV_LINKS.filter(
  (l) => l.href !== "#hero" && l.href !== "#contact"
);

const SECTION_IDS = NAV_LINKS.map((l) => l.href.replace("#", ""));

export default function Navbar({ name }: { name: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const activeId = useScrollSpy(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <button
          onClick={() => handleNavClick("#hero")}
          className="font-mono text-sm font-bold tracking-wider text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
          style={{ fontFamily: "var(--font-syne), sans-serif" }}
        >
          <span className="text-[var(--accent)]">&lt;</span>
          {name}
          <span className="text-[var(--accent)]"> /&gt;</span>
        </button>

        {/* Floating pill — desktop only */}
        <div
          className={`hidden md:block rounded-full transition-all duration-500 ${
            scrolled
              ? "border border-[var(--border-color)] bg-[var(--bg-primary)]/70 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.4),0_0_0_1px_rgba(99,102,241,0.07)]"
              : "border border-transparent"
          }`}
        >
          <ul className="flex items-center gap-0.5 px-2 py-1.5">
            {PILL_LINKS.map((link) => {
              const id = link.href.replace("#", "");
              const isActive = activeId === id;
              return (
                <li key={link.href} className="relative">
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={`relative px-3 py-1.5 text-sm rounded-full transition-colors duration-200 ${
                      isActive
                        ? "text-[var(--text-primary)]"
                        : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-[var(--bg-elevated)] border border-[var(--border-bright)]"
                        transition={{ type: "spring", stiffness: 380, damping: 28 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right: Contact CTA + mobile toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick("#contact")}
            className="hidden md:block px-4 py-1.5 rounded-full text-sm font-medium border border-[var(--border-bright)] text-[var(--text-muted)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300 hover:shadow-[0_0_16px_rgba(99,102,241,0.25)]"
          >
            Contact
          </button>

          <button
            className="md:hidden text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden bg-[var(--bg-surface)]/95 backdrop-blur-xl border-b border-[var(--border-color)]"
          >
            <ul className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => {
                const id = link.href.replace("#", "");
                const isActive = activeId === id;
                return (
                  <li key={link.href}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className={`w-full text-left text-sm px-3 py-2 rounded-md transition-colors ${
                        isActive
                          ? "text-[var(--accent)] bg-[var(--bg-elevated)] font-medium"
                          : "text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-elevated)]"
                      }`}
                    >
                      {isActive && (
                        <span className="font-mono text-[var(--accent)] mr-2">›</span>
                      )}
                      {link.label}
                    </button>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
