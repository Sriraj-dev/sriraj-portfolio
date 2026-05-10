import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { Briefcase, GraduationCap } from "lucide-react";
import type { Experience, Education } from "@/lib/types";

interface BackgroundProps {
  experience: Experience[];
  education:  Education[];
}

function formatDate(s: string | null): string {
  if (!s) return "Present";
  const [y, m] = s.split("-");
  return new Date(+y, +m - 1).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export default function Background({ experience, education }: BackgroundProps) {
  return (
    <section id="background" className="py-24 px-4 sm:px-6 bg-[var(--bg-surface)]">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <SectionHeading title="Background" subtitle="Experience & Education" />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Experience */}
          <div>
            <div className="flex items-center gap-2 mb-8">
              <Briefcase size={13} className="text-[var(--accent)]" />
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--accent)]">
                Experience
              </p>
            </div>
            <div className="space-y-8">
              {experience.map((exp, i) => (
                <AnimatedSection key={`${exp.company}-${i}`} delay={i * 0.1}>
                  <TimelineItem
                    title={exp.role}
                    subtitle={exp.company}
                    range={`${formatDate(exp.startDate)} – ${formatDate(exp.endDate)}`}
                    description={exp.description}
                    highlights={exp.highlights}
                    isCurrent={!exp.endDate}
                  />
                </AnimatedSection>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="flex items-center gap-2 mb-8">
              <GraduationCap size={13} className="text-[var(--accent-secondary)]" />
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-[var(--accent-secondary)]">
                Education
              </p>
            </div>
            <div className="space-y-8">
              {education.map((edu, i) => (
                <AnimatedSection key={`${edu.institution}-${i}`} delay={i * 0.1}>
                  <TimelineItem
                    title={`${edu.degree} · ${edu.field}`}
                    subtitle={edu.institution}
                    range={`${edu.startYear} – ${edu.endYear}`}
                    highlights={edu.highlights}
                  />
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

interface TimelineItemProps {
  title:       string;
  subtitle:    string;
  range:       string;
  description?: string;
  highlights?:  string[];
  isCurrent?:   boolean;
}

function TimelineItem({
  title,
  subtitle,
  range,
  description,
  highlights,
  isCurrent,
}: TimelineItemProps) {
  return (
    <div className="relative pl-6">
      {/* Vertical line */}
      <div
        className="absolute left-0 top-2 bottom-0 w-px"
        style={{
          background:
            "linear-gradient(to bottom, var(--accent), var(--border-color))",
        }}
      />

      {/* Dot marker */}
      <div
        className="absolute -left-[5px] top-1.5 w-[11px] h-[11px] rounded-full border-2 border-[var(--bg-surface)]"
        style={{
          background:
            "linear-gradient(135deg, var(--accent), var(--accent-secondary))",
          boxShadow: "0 0 8px rgba(99,102,241,0.5)",
        }}
      />

      {/* Date range */}
      <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-[var(--text-muted)] mb-1">
        {range}
        {isCurrent && (
          <span className="ml-2 text-emerald-400">
            ● now
          </span>
        )}
      </p>

      {/* Title */}
      <h4
        className="text-sm font-bold text-[var(--text-primary)] mb-0.5"
        style={{ fontFamily: "var(--font-syne), sans-serif" }}
      >
        {title}
      </h4>

      {/* Subtitle */}
      <p className="font-mono text-xs text-[var(--accent)] mb-3">{subtitle}</p>

      {description && (
        <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-3">
          {description}
        </p>
      )}

      {highlights && highlights.length > 0 && (
        <ul className="space-y-1.5">
          {highlights.map((h, i) => (
            <li key={i} className="flex gap-2 text-sm text-[var(--text-muted)]">
              <span className="text-[var(--accent)] shrink-0 mt-0.5 text-xs">▸</span>
              {h}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
