interface BadgeProps {
  label: string;
  variant?: "default" | "accent" | "success" | "warning";
}

const variants = {
  default: "text-[var(--text-muted)] border border-[var(--border-color)] bg-[var(--bg-elevated)]",
  accent:  "text-[var(--accent)] border border-[var(--accent)]/25 bg-[var(--accent)]/5",
  success: "text-[var(--green)] border border-[var(--green)]/25 bg-[var(--green)]/5",
  warning: "text-[var(--amber)] border border-[var(--amber)]/25 bg-[var(--amber)]/5",
};

export default function Badge({ label, variant = "default" }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase rounded-none ${variants[variant]}`}>
      {label}
    </span>
  );
}
