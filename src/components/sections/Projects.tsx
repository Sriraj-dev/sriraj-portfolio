import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Project, SectionSubtitle } from "@/lib/types";

interface ProjectsProps {
  projects: Project[];
  subtitle?: SectionSubtitle;
}

export default function Projects({ projects, subtitle }: ProjectsProps) {
  if (projects.length === 0) return null;

  const featured = projects.filter((p) => p.featured);
  const rest     = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 border-t border-[var(--border-color)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading title="Projects" num="§3" description={subtitle} />
        </AnimatedSection>

        {featured.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {featured.map((p, i) => (
              <AnimatedSection key={p.id} delay={i * 0.1}>
                <ProjectCard project={p} index={i} featured />
              </AnimatedSection>
            ))}
          </div>
        )}

        {rest.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rest.map((p, i) => (
              <AnimatedSection key={p.id} delay={i * 0.1}>
                <ProjectCard project={p} index={featured.length + i} />
              </AnimatedSection>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  featured = false,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) {
  return (
    <div className="bp-card group relative flex flex-col border border-[var(--border-color)] bg-[var(--bg-elevated)] p-5 overflow-visible h-full">
      {/* Corner marks */}
      <span className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-[var(--accent)] opacity-40 transition-opacity group-hover:opacity-100" />
      <span className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 border-[var(--accent)] opacity-40 transition-opacity group-hover:opacity-100" />
      <span className="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-[var(--accent)] opacity-40 transition-opacity group-hover:opacity-100" />
      <span className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-[var(--accent)] opacity-40 transition-opacity group-hover:opacity-100" />

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2 min-w-0">
          <span className="font-mono text-[9px] tracking-widest text-[var(--text-dim)] shrink-0">
            #{String(index + 1).padStart(3, "0")}
          </span>
          <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] leading-snug">
            {project.title}
          </h3>
        </div>
        {featured && (
          <span className="shrink-0 font-mono text-[9px] tracking-widest uppercase text-[var(--accent)] border border-[var(--accent)]/30 px-2 py-0.5">
            FEATURED
          </span>
        )}
      </div>

      <p className="text-xs text-[var(--text-muted)] leading-relaxed flex-1 mb-4">
        {project.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 border border-[var(--border-color)] text-[var(--text-dim)]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      {(project.githubUrl || project.demoUrl) && (
        <div className="flex items-center gap-4">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-widest uppercase text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              <FaGithub size={12} />
              GITHUB
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase text-[var(--accent)] hover:opacity-70 transition-opacity"
            >
              DEMO
              <ArrowUpRight size={10} />
            </a>
          )}
        </div>
      )}
    </div>
  );
}
