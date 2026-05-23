import { ArrowUpRight } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import type { BlogPost, SectionSubtitle } from "@/lib/types";

interface BlogsProps {
  blogs: BlogPost[];
  subtitle?: SectionSubtitle;
}

function formatDate(s: string): string {
  return new Date(s).toLocaleDateString("en-US", {
    month: "short",
    day:   "numeric",
    year:  "numeric",
  });
}

const platformLabel: Record<string, string> = {
  medium:   "Medium",
  hashnode: "Hashnode",
  substack: "Substack",
  devto:    "Dev.to",
};

export default function Blogs({ blogs, subtitle }: BlogsProps) {
  if (blogs.length === 0) return null;

  return (
    <section id="blogs" className="py-24 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <AnimatedSection>
          <SectionHeading title="Writing" description={subtitle} />
        </AnimatedSection>

        <div className="space-y-3">
          {blogs.map((blog, idx) => (
            <AnimatedSection key={blog.url} delay={idx * 0.08}>
              <a
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card-glow group flex items-start justify-between gap-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] p-5 no-underline"
              >
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors mb-1.5 leading-snug"
                    style={{ fontFamily: "var(--font-syne), sans-serif" }}
                  >
                    {blog.title}
                  </h3>
                  <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-3">
                    {blog.summary}
                  </p>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[10px] text-[var(--text-muted)]">
                      {formatDate(blog.publishedAt)}
                    </span>
                    <span className="text-[var(--border-bright)] text-xs">·</span>
                    <Badge
                      label={platformLabel[blog.platform] ?? blog.platform}
                      variant="accent"
                    />
                    {blog.tags.map((tag) => (
                      <Badge key={tag} label={tag} />
                    ))}
                  </div>
                </div>

                <ArrowUpRight
                  size={15}
                  className="shrink-0 mt-0.5 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
