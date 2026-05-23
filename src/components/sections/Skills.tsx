import AnimatedSection from "@/components/ui/AnimatedSection";
import type { Skills as SkillsType, SectionSubtitle } from "@/lib/types";

interface SkillsProps {
  skills: SkillsType;
  subtitle?: SectionSubtitle;
}

export default function Skills({ skills, subtitle }: SkillsProps) {
  const allSkills = [
    ...skills.languages,
    ...skills.frameworks,
    ...skills.tools,
  ];
  // 4 copies → -50% translation moves exactly 2 copies, seamless loop
  const track = [...allSkills, ...allSkills, ...allSkills, ...allSkills];

  return (
    <section id="skills" className="py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Heading */}
        <AnimatedSection>
          <div className="mb-10">
            <h2
              className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--text-primary)]"
              style={{ fontFamily: "var(--font-syne), sans-serif" }}
            >
              Skills{" "}
            </h2>
            <span className="accent-line" />
            {subtitle && (
              <p className="mt-5 text-sm sm:text-base leading-relaxed">
                <span className="text-[var(--text-muted)]">{subtitle.muted} </span>
                <span className="text-[var(--text-primary)]">{subtitle.highlight}</span>
              </p>
            )}
          </div>
        </AnimatedSection>

        {/* Single scrolling row */}
        <AnimatedSection delay={0.05}>
          <div className="relative overflow-hidden">

            {/* Fade masks */}
            <div
              className="absolute inset-y-0 left-0 w-12 sm:w-20 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to right, var(--bg-primary), transparent)" }}
            />
            <div
              className="absolute inset-y-0 right-0 w-12 sm:w-20 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to left, var(--bg-primary), transparent)" }}
            />

            {/* Animated strip — speeds up on hover */}
            <div
              className="flex gap-3 w-max hover:[animation-duration:12s]"
              style={{ animation: "marquee 50s linear infinite" }}
            >
              {track.map((skill, i) => (
                <span
                  key={`${skill}-${i}`}
                  className="px-4 py-2 text-sm font-mono rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-primary)] whitespace-nowrap select-none cursor-default hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors duration-200"
                >
                  {skill}
                </span>
              ))}
            </div>

          </div>
        </AnimatedSection>

      </div>
    </section>
  );
}
