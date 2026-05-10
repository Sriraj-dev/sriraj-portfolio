import { ArrowUpRight } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import type { SaasProduct } from "@/lib/types";

interface SaasProductsProps {
  products: SaasProduct[];
}

const statusVariant: Record<SaasProduct["status"], "success" | "warning" | "accent"> = {
  live:     "success",
  beta:     "warning",
  building: "accent",
};

const statusDot: Record<SaasProduct["status"], string> = {
  live:     "bg-emerald-400",
  beta:     "bg-amber-400",
  building: "bg-[var(--accent)]",
};

export default function SaasProducts({ products }: SaasProductsProps) {
  if (products.length === 0) return null;

  return (
    <section id="products" className="py-24 px-4 sm:px-6 bg-[var(--bg-surface)]">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <SectionHeading title="Products" subtitle="Things I've built and shipped" />
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product, idx) => (
            <AnimatedSection key={product.id} delay={idx * 0.1}>
              <a
                href={product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group card-glow h-full flex flex-col rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] p-6 no-underline"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <h3
                    className="text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-snug"
                    style={{ fontFamily: "var(--font-syne), sans-serif" }}
                  >
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-1.5 shrink-0 mt-0.5">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${statusDot[product.status]} ${
                        product.status === "live" ? "animate-pulse" : ""
                      }`}
                    />
                    <Badge label={product.status} variant={statusVariant[product.status]} />
                  </div>
                </div>

                <p className="text-sm text-[var(--text-muted)] leading-relaxed flex-1 mb-5">
                  {product.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {product.tags.map((tag) => (
                    <Badge key={tag} label={tag} />
                  ))}
                </div>

                <div className="inline-flex items-center gap-1 text-xs font-mono text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors">
                  Visit site
                  <ArrowUpRight
                    size={12}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </div>
              </a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
