"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useScrollSpy } from "@/hooks/useScrollSpy";

const NAV_LINKS = [
  { label: "ABOUT",      href: "#hero",       num: "§0" },
  { label: "SKILLS",     href: "#skills",     num: "§1" },
  { label: "PRODUCTS",   href: "#products",   num: "§2" },
  { label: "PROJECTS",   href: "#projects",   num: "§3" },
  { label: "BACKGROUND", href: "#background", num: "§4" },
  { label: "WRITING",    href: "#blogs",      num: "§5" },
  { label: "CONTACT",    href: "#contact",    num: "§6" },
];

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
    document.getElementById(href.replace("#", ""))?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-13 flex items-center justify-between font-mono text-[10px] tracking-widest transition-all duration-300 ${
          scrolled
            ? "bg-[rgba(7,17,30,0.94)] backdrop-blur-xl border-b border-[var(--border-color)]"
            : "border-b border-[var(--border-color)]/50"
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => handleNavClick("#hero")}
          className="flex items-center gap-2 uppercase text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
        >
          <span className="text-[var(--accent)] opacity-70">▶</span>
          <span>{name.toUpperCase()}</span>
          <span className="text-[var(--text-dim)] hidden sm:inline">· SPEC</span>
        </button>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-0.5">
          {PILL_LINKS.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeId === id;
            return (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`relative px-3 py-3.5 text-[10px] tracking-widest uppercase transition-colors ${
                  isActive
                    ? "text-[var(--accent)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-x-2 bottom-0 h-px bg-[var(--accent)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Right: contact + mobile toggle */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick("#contact")}
            className="hidden md:flex items-center gap-2 uppercase text-[var(--accent)] border border-[var(--accent)]/30 px-3 py-1.5 hover:bg-[var(--accent)]/5 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] scan-pulse" />
            CONTACT
          </button>

          <button
            className="md:hidden text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="md:hidden bg-[rgba(7,17,30,0.97)] backdrop-blur-xl border-b border-[var(--border-color)]"
          >
            <ul className="max-w-7xl mx-auto px-4 py-3 flex flex-col font-mono text-[10px] tracking-widest">
              {NAV_LINKS.map((link) => {
                const id = link.href.replace("#", "");
                const isActive = activeId === id;
                return (
                  <li key={link.href}>
                    <button
                      onClick={() => handleNavClick(link.href)}
                      className={`w-full text-left flex items-center gap-4 px-3 py-2.5 uppercase transition-colors border-l ${
                        isActive
                          ? "text-[var(--accent)] border-[var(--accent)] bg-[var(--accent)]/5"
                          : "text-[var(--text-muted)] border-transparent hover:text-[var(--text-primary)]"
                      }`}
                    >
                      <span className="text-[var(--text-dim)] w-5">{link.num}</span>
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
