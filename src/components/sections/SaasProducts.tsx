import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import Badge from "@/components/ui/Badge";
import type { SaasProduct } from "@/lib/types";

function getYouTubeId(url: string): string | null {
  const short = url.match(/youtu\.be\/([^?&]+)/);
  if (short) return short[1];
  const long = url.match(/[?&]v=([^&]+)/);
  if (long) return long[1];
  return null;
}

function buildYouTubeEmbed(id: string): string {
  const params = new URLSearchParams({
    autoplay: "1",
    mute: "1",
    loop: "1",
    playlist: id,
    controls: "0",
    modestbranding: "1",
    rel: "0",
    showinfo: "0",
  });
  return `https://www.youtube.com/embed/${id}?${params.toString()}`;
}

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
                className="card-glow group h-full flex flex-col rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)] no-underline overflow-hidden"
              >
                {/* ── Media preview ── */}
                <div className="relative h-48 w-full bg-[var(--bg-elevated)] overflow-hidden shrink-0">
                  {(() => {
                    const ytId = product.videoUrl ? getYouTubeId(product.videoUrl) : null;
                    if (ytId) {
                      return (
                        <iframe
                          src={buildYouTubeEmbed(ytId)}
                          className="absolute inset-0 w-full h-full scale-[1.02]"
                          allow="autoplay; encrypted-media"
                          allowFullScreen={false}
                          title={product.name}
                          style={{ border: "none", pointerEvents: "none" }}
                        />
                      );
                    }
                    if (product.videoUrl) {
                      return (
                        <video
                          src={product.videoUrl}
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      );
                    }
                    if (product.image) {
                      return (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      );
                    }
                    return (
                      <div
                        className="w-full h-full"
                        style={{
                          background:
                            "linear-gradient(135deg, var(--bg-elevated) 0%, rgba(99,102,241,0.08) 100%)",
                        }}
                      />
                    );
                  })()}

                  {/* Subtle dark scrim so text below is readable on any image */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/60 via-transparent to-transparent" />
                </div>

                {/* ── Card content ── */}
                <div className="flex flex-col flex-1 p-6">
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

                  <div className="inline-flex items-center gap-1 font-mono text-xs text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors">
                    Visit site
                    <ArrowUpRight
                      size={12}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </div>
                </div>
              </a>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
