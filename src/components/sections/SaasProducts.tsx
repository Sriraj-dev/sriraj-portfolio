import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import type { SaasProduct, SectionSubtitle } from "@/lib/types";

function getYouTubeId(url: string): string | null {
  const short = url.match(/youtu\.be\/([^?&]+)/);
  if (short) return short[1];
  const long = url.match(/[?&]v=([^&]+)/);
  if (long) return long[1];
  return null;
}

function buildYouTubeEmbed(id: string): string {
  const params = new URLSearchParams({
    autoplay: "1", mute: "1", loop: "1", playlist: id,
    controls: "0", modestbranding: "1", rel: "0", showinfo: "0",
  });
  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}

interface SaasProductsProps {
  products: SaasProduct[];
  subtitle?: SectionSubtitle;
}

const statusConfig: Record<SaasProduct["status"], { label: string; color: string; dot: string }> = {
  live:     { label: "LIVE",     color: "var(--green)", dot: "var(--green)" },
  beta:     { label: "BETA",     color: "var(--amber)", dot: "var(--amber)" },
  building: { label: "BUILDING", color: "var(--accent)", dot: "var(--accent)" },
};

export default function SaasProducts({ products, subtitle }: SaasProductsProps) {
  if (products.length === 0) return null;

  return (
    <section id="products" className="py-24 border-t border-[var(--border-color)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeading title="Products" num="§2" description={subtitle} />
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {products.map((product, idx) => (
            <AnimatedSection key={product.id} delay={idx * 0.1}>
              <ProductCard product={product} index={idx} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({ product, index }: { product: SaasProduct; index: number }) {
  const status = statusConfig[product.status];
  const ytId = product.videoUrl ? getYouTubeId(product.videoUrl) : null;

  return (
    <a
      href={product.url}
      target="_blank"
      rel="noopener noreferrer"
      className="bp-card group relative flex flex-col border border-[var(--border-color)] bg-[var(--bg-elevated)] no-underline overflow-visible"
    >
      {/* Corner marks */}
      <span className="absolute -top-px -left-px w-3 h-3 border-t-2 border-l-2 border-[var(--accent)] opacity-50 transition-opacity group-hover:opacity-100" />
      <span className="absolute -top-px -right-px w-3 h-3 border-t-2 border-r-2 border-[var(--accent)] opacity-50 transition-opacity group-hover:opacity-100" />
      <span className="absolute -bottom-px -left-px w-3 h-3 border-b-2 border-l-2 border-[var(--accent)] opacity-50 transition-opacity group-hover:opacity-100" />
      <span className="absolute -bottom-px -right-px w-3 h-3 border-b-2 border-r-2 border-[var(--accent)] opacity-50 transition-opacity group-hover:opacity-100" />

      {/* Media */}
      <div className="relative h-44 w-full bg-[var(--bg-primary)] overflow-hidden shrink-0 border-b border-[var(--border-color)]">
        {ytId ? (
          <iframe
            src={buildYouTubeEmbed(ytId)}
            className="absolute inset-0 w-full h-full scale-[1.02]"
            allow="autoplay; encrypted-media"
            allowFullScreen={false}
            title={product.name}
            style={{ border: "none", pointerEvents: "none" }}
          />
        ) : product.videoUrl ? (
          <video
            src={product.videoUrl}
            autoPlay muted loop playsInline
            className="w-full h-full object-cover"
          />
        ) : product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div
            className="w-full h-full"
            style={{ background: "linear-gradient(135deg, var(--bg-elevated) 0%, rgba(0,184,217,0.06) 100%)" }}
          />
        )}

        {/* Index label */}
        <div className="absolute top-2 left-2 font-mono text-[9px] tracking-widest text-[var(--text-dim)] bg-[var(--bg-primary)]/80 px-2 py-0.5">
          {String(index + 1).padStart(2, "0")}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <h3 className="font-mono text-sm font-bold uppercase tracking-wider text-[var(--text-primary)] group-hover:text-[var(--accent)] transition-colors leading-snug">
            {product.name}
          </h3>
          <div
            className="flex items-center gap-1.5 shrink-0 font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 border"
            style={{
              color: status.color,
              borderColor: `color-mix(in srgb, ${status.color} 25%, transparent)`,
              background: `color-mix(in srgb, ${status.color} 8%, transparent)`,
            }}
          >
            <span
              className="w-1 h-1 rounded-full shrink-0"
              style={{ background: status.dot, ...(product.status === "live" ? { animation: "scan-pulse 1.8s ease-in-out infinite" } : {}) }}
            />
            {status.label}
          </div>
        </div>

        <p className="text-xs text-[var(--text-muted)] leading-relaxed flex-1 mb-4">
          {product.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {product.tags.map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 border border-[var(--border-color)] text-[var(--text-dim)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1 font-mono text-[10px] tracking-widest uppercase text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors">
          VISIT SITE
          <ArrowUpRight
            size={11}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
      </div>
    </a>
  );
}
