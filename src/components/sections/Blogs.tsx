import { ArrowUpRight } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import type { BlogPost, SectionSubtitle } from "@/lib/types";

interface BlogsProps {
  blogs: BlogPost[];
  subtitle?: SectionSubtitle;
}

function formatDate(s: string): string {
  return new Date(s)
    .toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    .toUpperCase();
}

const platformLabel: Record<string, string> = {
  medium: "MEDIUM", hashnode: "HASHNODE", substack: "SUBSTACK", devto: "DEV.TO",
};

export default function Blogs({ blogs, subtitle }: BlogsProps) {
  if (blogs.length === 0) return null;

  return (
    <section id="blogs" className="py-24 border-t border-[var(--border-color)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading title="Writing" num="§5" description={subtitle} />
        </AnimatedSection>

        <div className="border border-[var(--border-color)] divide-y divide-[var(--border-color)]">
          {blogs.map((blog, idx) => (
            <AnimatedSection key={blog.url} delay={idx * 0.07}>
              <a
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-4 px-5 py-4 hover:bg-[var(--accent)]/[0.03] transition-colors no-underline"
              >
                <div className="flex gap-4 items-start min-w-0">
                  <span className="font-mono text-[9px] tracking-widest text-[var(--text-dim)] shrink-0 pt-0.5">
                    #{String(idx + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-mono text-xs font-bold uppercase tracking-wider text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-1.5 leading-snug">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed mb-2">
                      {blog.summary}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 font-mono text-[9px] tracking-widest uppercase">
                      <span className="text-[var(--text-dim)]">{formatDate(blog.publishedAt)}</span>
                      <span className="text-[var(--text-dim)]">·</span>
                      <span className="text-[var(--accent)]">
                        {platformLabel[blog.platform] ?? blog.platform.toUpperCase()}
                      </span>
                      {blog.tags.map((tag) => (
                        <span key={tag} className="text-[var(--text-dim)] border border-[var(--border-color)] px-1.5 py-0.5">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <ArrowUpRight
                  size={14}
                  className="shrink-0 mt-1 text-[var(--text-dim)] group-hover:text-[var(--accent)] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
