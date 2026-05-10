interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-12">
      {subtitle && (
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-[var(--text-muted)] mb-3">
          <span className="text-[var(--accent)]">// </span>{subtitle}
        </p>
      )}
      <h2
        className="text-3xl sm:text-4xl font-display font-black tracking-tight text-[var(--text-primary)]"
        style={{ fontFamily: "var(--font-syne), sans-serif" }}
      >
        {title}
      </h2>
      <span className="accent-line" />
    </div>
  );
}
