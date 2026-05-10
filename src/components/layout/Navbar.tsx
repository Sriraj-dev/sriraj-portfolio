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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[var(--bg-primary)]/75 backdrop-blur-xl border-b border-[var(--border-color)]"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
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

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const id = link.href.replace("#", "");
            const isActive = activeId === id;
            return (
              <li key={link.href} className="relative">
                <button
                  onClick={() => handleNavClick(link.href)}
                  className={`relative px-3 py-1.5 text-sm transition-colors rounded-md ${
                    isActive
                      ? "text-[var(--text-primary)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-md bg-[var(--bg-elevated)] border border-[var(--border-bright)]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              </li>
            );
          })}
        </ul>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
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
