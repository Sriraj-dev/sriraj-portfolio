interface BadgeProps {
  label: string;
  variant?: "default" | "accent" | "success" | "warning";
}

const variants = {
  default: "bg-[var(--bg-elevated)] text-[var(--text-muted)] border border-[var(--border-color)]",
  accent:  "bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20",
  success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  warning: "bg-amber-500/10  text-amber-400  border border-amber-500/20",
};

export default function Badge({ label, variant = "default" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium ${variants[variant]}`}
    >
      {label}
    </span>
  );
}
