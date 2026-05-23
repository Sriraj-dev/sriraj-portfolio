interface SectionSubtitle {
  muted: string;
  highlight: string;
}

interface SectionHeadingProps {
  title: string;
  num: string;
  description?: SectionSubtitle;
}

export default function SectionHeading({ title, num, description }: SectionHeadingProps) {
  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 font-mono text-[10px] tracking-widest uppercase">
        <span className="text-[var(--text-dim)]">{num}</span>
        <span className="w-5 h-px bg-[var(--accent)] shrink-0" />
        <span className="text-[var(--accent)]">{title}</span>
        <span className="h-px bg-gradient-to-r from-[var(--accent)]/40 to-transparent flex-1 max-w-xs" />
      </div>
      {description && (
        <p className="mt-4 text-sm leading-relaxed">
          <span className="text-[var(--text-muted)]">{description.muted} </span>
          <span className="text-[var(--text-primary)]">{description.highlight}</span>
        </p>
      )}
    </div>
  );
}
