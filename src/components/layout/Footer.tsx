export default function Footer({ name }: { name: string }) {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-[var(--border-color)] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-[10px] tracking-widest uppercase text-[var(--text-dim)]">
        <span>
          DOC: {name.toUpperCase()}_PORTFOLIO
          <span className="text-[var(--accent)]/40 mx-2">·</span>
          REV.01
        </span>
        <span>
          BUILD DATE: {year}
          <span className="text-[var(--accent)]/40 mx-2">·</span>
          NEXT.JS &amp; TAILWIND
        </span>
      </div>
    </footer>
  );
}
