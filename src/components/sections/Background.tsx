import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Experience, Education, SectionSubtitle } from "@/lib/types";

interface BackgroundProps {
  experience: Experience[];
  education:  Education[];
  subtitle?: SectionSubtitle;
}

function formatDate(s: string | null): string {
  if (!s) return "PRESENT";
  const [y, m] = s.split("-");
  return new Date(+y, +m - 1)
    .toLocaleDateString("en-US", { month: "short", year: "numeric" })
    .toUpperCase();
}

export default function Background({ experience, education, subtitle }: BackgroundProps) {
  return (
    <section id="background" className="py-24 border-t border-[var(--border-color)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading title="Background" num="§4" description={subtitle} />
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 border border-[var(--border-color)]">

          {/* Experience column */}
          <div className="lg:border-r border-b lg:border-b-0 border-[var(--border-color)]">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-[var(--border-color)] bg-[var(--bg-elevated)]">
              <span className="text-[var(--accent)]/50 text-[8px]">■</span>
              <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-muted)]">
                Experience
              </span>
              <span className="font-mono text-[10px] text-[var(--text-dim)] ml-auto">
                {experience.length.toString().padStart(2, "0")} ENTRIES
              </span>
            </div>
            <div className="divide-y divide-[var(--border-color)]">
              {experience.map((exp, i) => (
                <AnimatedSection key={`${exp.company}-${i}`} delay={i * 0.1}>
                  <TimelineEntry
                    index={i}
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

          {/* Education column */}
          <div>
            <div className="flex items-center gap-2 px-5 py-3 border-b border-[var(--border-color)] bg-[var(--bg-elevated)]">
              <span className="text-[var(--accent)]/50 text-[8px]">■</span>
              <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--text-muted)]">
                Education
              </span>
              <span className="font-mono text-[10px] text-[var(--text-dim)] ml-auto">
                {education.length.toString().padStart(2, "0")} ENTRIES
              </span>
            </div>
            <div className="divide-y divide-[var(--border-color)]">
              {education.map((edu, i) => (
                <AnimatedSection key={`${edu.institution}-${i}`} delay={i * 0.1}>
                  <TimelineEntry
                    index={i}
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

interface TimelineEntryProps {
  index:        number;
  title:        string;
  subtitle:     string;
  range:        string;
  description?: string;
  highlights?:  string[];
  isCurrent?:   boolean;
}

function TimelineEntry({ index, title, subtitle, range, description, highlights, isCurrent }: TimelineEntryProps) {
  return (
    <div className="group px-5 py-5 hover:bg-[var(--accent)]/[0.02] transition-colors">
      {/* Entry index + range */}
      <div className="flex items-center justify-between gap-4 mb-3">
        <span className="font-mono text-[9px] tracking-widest text-[var(--text-dim)]">
          #{String(index + 1).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-2 font-mono text-[9px] tracking-widest text-[var(--text-muted)]">
          {isCurrent && (
            <span className="flex items-center gap-1 text-[var(--green)]">
              <span className="w-1 h-1 rounded-full bg-[var(--green)] scan-pulse" />
              NOW
            </span>
          )}
          <span>{range}</span>
        </div>
      </div>

      {/* Connector line */}
      <div className="w-full h-px border-t border-dashed border-[var(--border-color)] mb-3" />

      {/* Title */}
      <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] mb-1">
        {title}
      </h4>

      {/* Org */}
      <p className="font-mono text-[10px] tracking-wider text-[var(--accent)] uppercase mb-3">
        {subtitle}
      </p>

      {description && (
        <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-3">
          {description}
        </p>
      )}

      {highlights && highlights.length > 0 && (
        <ul className="space-y-1.5">
          {highlights.map((h, i) => (
            <li key={i} className="flex gap-2 text-xs text-[var(--text-muted)] leading-relaxed">
              <span className="text-[var(--accent)]/50 shrink-0 mt-0.5 font-mono">▸</span>
              {h}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
