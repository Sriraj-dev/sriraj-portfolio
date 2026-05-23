import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Skills as SkillsType, SectionSubtitle } from "@/lib/types";

interface SkillsProps {
  skills: SkillsType;
  subtitle?: SectionSubtitle;
}

const CATEGORIES = [
  { key: "languages" as const, label: "LANGUAGES" },
  { key: "frameworks" as const, label: "FRAMEWORKS" },
  { key: "tools" as const, label: "TOOLS" },
];

export default function Skills({ skills, subtitle }: SkillsProps) {
  return (
    <section id="skills" className="py-24 border-t border-[var(--border-color)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading title="Skills" num="§1" description={subtitle} />
        </AnimatedSection>

        <AnimatedSection delay={0.08}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-0 border border-[var(--border-color)]">
            {CATEGORIES.map((cat, ci) => (
              <div
                key={cat.key}
                className={`${ci < CATEGORIES.length - 1 ? "sm:border-r border-b sm:border-b-0 border-[var(--border-color)]" : ""}`}
              >
                {/* Column header */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border-color)] bg-[var(--bg-elevated)]">
                  <span className="text-[var(--accent)]/50 text-[8px]">■</span>
                  <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-muted)]">
                    {cat.label}
                  </span>
                  <span className="font-mono text-[10px] text-[var(--text-dim)] ml-auto">
                    {skills[cat.key].length.toString().padStart(2, "0")}
                  </span>
                </div>

                {/* Skill rows */}
                <div className="divide-y divide-[var(--border-color)]">
                  {skills[cat.key].map((skill) => (
                    <div
                      key={skill}
                      className="group flex items-center gap-3 px-4 py-2.5 hover:bg-[var(--accent)]/5 transition-colors"
                    >
                      <span className="w-1 h-1 rounded-full bg-[var(--border-bright)] group-hover:bg-[var(--accent)] transition-colors shrink-0" />
                      <span className="font-mono text-xs text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
