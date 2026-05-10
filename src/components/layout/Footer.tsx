export default function Footer({ name }: { name: string }) {
  return (
    <footer className="border-t border-[var(--border-color)] py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p
          className="font-mono text-xs text-[var(--text-muted)]"
          style={{ fontFamily: "var(--font-syne), sans-serif" }}
        >
          <span className="text-[var(--accent)]">&lt;</span>
          {name}
          <span className="text-[var(--accent)]"> /&gt;</span>
        </p>
        <p className="font-mono text-xs text-[var(--text-muted)]">
          © {new Date().getFullYear()} · Built with Next.js & Tailwind
        </p>
      </div>
    </footer>
  );
}
