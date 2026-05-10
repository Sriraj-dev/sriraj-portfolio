import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import type { Project } from "@/lib/types";

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  if (projects.length === 0) return null;

  const featured = projects.filter((p) => p.featured);
  const rest     = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="py-24 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <SectionHeading title="Projects" subtitle="What I've been building" />
        </AnimatedSection>

        {featured.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            {featured.map((p, i) => (
              <AnimatedSection key={p.id} delay={i * 0.1}>
                <ProjectCard project={p} featured />
              </AnimatedSection>
            ))}
          </div>
        )}

        {rest.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((p, i) => (
              <AnimatedSection key={p.id} delay={i * 0.1}>
                <ProjectCard project={p} />
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
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  return (
    <div
      className={`card-glow group h-full flex flex-col rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-6 ${
        featured ? "relative overflow-hidden" : ""
      }`}
    >
      {/* Featured accent stripe */}
      {featured && (
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--accent), var(--accent-secondary), transparent)",
          }}
        />
      )}

      {/* Numbered index label */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3
          className="text-base font-bold text-[var(--text-primary)] leading-snug"
          style={{ fontFamily: "var(--font-syne), sans-serif" }}
        >
          {project.title}
        </h3>
        {featured && (
          <span className="shrink-0 font-mono text-[10px] tracking-wider text-[var(--accent)] border border-[var(--accent)]/30 px-1.5 py-0.5 rounded">
            featured
          </span>
        )}
      </div>

      <p className="text-sm text-[var(--text-muted)] leading-relaxed flex-1 mb-5">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-1.5 mb-5">
        {project.tags.map((tag) => (
          <Badge key={tag} label={tag} />
        ))}
      </div>

      <div className="flex items-center gap-4">
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <FaGithub size={13} />
            GitHub
          </a>
        )}
        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-mono text-xs text-[var(--accent)] hover:underline transition-colors"
          >
            Demo
            <ArrowUpRight size={11} />
          </a>
        )}
      </div>
    </div>
  );
}
