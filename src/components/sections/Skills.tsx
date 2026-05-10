import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Skills as SkillsType } from "@/lib/types";

interface SkillsProps {
  skills: SkillsType;
}

const groups: { label: string; key: keyof SkillsType; color: string }[] = [
  { label: "Languages",            key: "languages",  color: "#6366f1" },
  { label: "Frameworks",           key: "frameworks", color: "#8b5cf6" },
  { label: "Tools & Infra",        key: "tools",      color: "#a78bfa" },
];

export default function Skills({ skills }: SkillsProps) {
  return (
    <section id="skills" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <SectionHeading title="Skills" subtitle="Technologies I work with" />
        </AnimatedSection>

        <div className="space-y-10">
          {groups.map(({ label, key, color }, groupIdx) => (
            <AnimatedSection key={key} delay={groupIdx * 0.1}>
              <div className="grid grid-cols-[6rem_1fr] sm:grid-cols-[8rem_1fr] gap-4 items-start">
                <p
                  className="font-mono text-[10px] tracking-[0.18em] uppercase pt-1.5"
                  style={{ color }}
                >
                  {label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {skills[key].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-sm font-mono rounded-md bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-primary)] transition-all duration-200 hover:border-[var(--accent)] hover:text-[var(--accent)] hover:bg-[var(--bg-elevated)] cursor-default select-none"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
