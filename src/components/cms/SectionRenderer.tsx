import { CmsSection } from "@/lib/cms";
import { assetUrl } from "@/lib/asset-url";
import FeatureBlock from "@/components/landing/FeatureBlock";
import StoreBadges from "@/components/landing/StoreBadges";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { Apple, ChevronLeft, ChevronRight, Quote, Smartphone, Target, Volume2, X, Zap } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useIsMobile } from "@/hooks/use-mobile";

const iconMap = [Smartphone, Target, Volume2, Zap];

function SectionCta({ data }: { data: Record<string, any> }) {
  if (!data._ctaEnabled || !data._ctaText) return null;
  return (
    <div className="flex justify-center pb-8">
      <a
        href={data._ctaUrl || "#"}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-foreground/30 text-foreground font-semibold text-sm hover:bg-foreground/5 transition-colors"
      >
        {data._ctaText}
      </a>
    </div>
  );
}

export default function SectionRenderer({ section }: { section: CmsSection }) {
  const hasCta = section.type !== "cta" && section.type !== "hero" && section.data._ctaEnabled && section.data._ctaText;
  return (
    <div id={section.id} className={hasCta ? "[&>section]:pb-4 [&>section]:lg:pb-6" : ""}>
      {section.data._separator && (
        <div className="container mx-auto px-6">
          <hr className="border-t border-border" />
        </div>
      )}
      <SectionContent section={section} />
      {section.type !== "cta" && section.type !== "hero" && (
        <div className="container mx-auto px-6">
          <SectionCta data={section.data} />
        </div>
      )}
    </div>
  );
}

function SectionContent({ section }: { section: CmsSection }) {
  const d = section.data;

  switch (section.type) {
    case "hero":
      return <HeroRenderer data={d} />;

    case "feature-block-side":
      return (
        <FeatureBlock
          title={d.title}
          subtitle={d.subtitle}
          body={d.body}
          image={assetUrl(d.image)}
          imageAlt={d.imageAlt || ""}
          reversed={d.reversed}
          badge={d.badge}
          bullets={d.bullets ? d.bullets.split("\n").filter(Boolean) : undefined}
          layout="side-by-side"
        />
      );

    case "feature-block-stacked":
      return (
        <FeatureBlock
          title={d.title}
          subtitle={d.subtitle}
          body={d.body}
          image={assetUrl(d.image)}
          imageAlt={d.imageAlt || ""}
          badge={d.badge}
          bullets={d.bullets ? d.bullets.split("\n").filter(Boolean) : undefined}
          layout="stacked"
        />
      );

    case "feature-grid":
      return <FeatureGridRenderer data={d} />;


    case "stats": {
      const stats = [
        { value: d.stat1Value, label: d.stat1Label },
        { value: d.stat2Value, label: d.stat2Label },
        { value: d.stat3Value, label: d.stat3Label },
        { value: d.stat4Value, label: d.stat4Label },
      ].filter(s => s.value);
      return (
        <section className="py-16 border-y border-border">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <div key={i} className="text-center space-y-2">
                  <div className="text-3xl sm:text-4xl font-display font-bold text-gradient">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    }

    case "platform":
      return (
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-6 text-center space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gradient">{d.title}</h2>
              {d.subtitle && <p className="text-lg text-muted-foreground">{d.subtitle}</p>}
            </div>
            {d.image && (
              <div className="max-w-5xl mx-auto">
                <img src={assetUrl(d.image)} alt={d.title} className="w-full rounded-2xl shadow-card" loading="lazy" />
              </div>
            )}
          </div>
        </section>
      );

    case "testimonials":
      return <TestimonialsRenderer data={d} />;

    case "screenshots":
      return <ScreenshotsRenderer data={d} />;
    case "cta":
      return (
        <section className="py-16 lg:py-24">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gradient">{d.title}</h2>
              {d.subtitle && <p className="text-lg text-muted-foreground">{d.subtitle}</p>}
              <div className="flex justify-center pt-4">
                <StoreBadges appStoreUrl={d.appStoreUrl} playStoreUrl={d.playStoreUrl} />
              </div>
            </div>
          </div>
        </section>
      );

    default:
      return null;
  }
}

function HeroRenderer({ data: d }: { data: Record<string, any> }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section ref={ref} className="relative min-h-[60vh] flex items-center overflow-hidden">
      {(d.bgImage || d.videoUrl) && (
        <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
          {d.videoUrl ? (
            <video
              autoPlay loop muted playsInline
              poster={d.bgImage ? assetUrl(d.bgImage) : undefined}
              className="w-full h-full object-cover"
            >
              <source src={d.videoUrl} type="video/mp4" />
            </video>
          ) : (
            <img src={assetUrl(d.bgImage)} alt="" className="w-full h-full object-cover" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </motion.div>
      )}
      <motion.div className="relative z-10 container mx-auto px-6 py-24" style={{ y: textY }}>
        <div className="max-w-2xl space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold leading-tight">
            <span className="text-gradient">{d.title}</span>
          </h1>
          {d.subtitle && <p className="text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed">{d.subtitle}</p>}
          <StoreBadges appStoreUrl={d.appStoreUrl} playStoreUrl={d.playStoreUrl} />
        </div>
      </motion.div>
      {/* Feather mask at bottom edge */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </section>
  );
}

function FeatureGridCard({ card, i }: { card: { icon: any; title: string; body: string }; i: number }) {
  const Icon = card.icon;
  return (
    <div className="bg-gradient-card rounded-2xl border border-border p-8 space-y-4 hover:border-primary/30 transition-colors min-w-0">
      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <h3 className="text-xl font-display font-semibold text-foreground">{card.title}</h3>
      <p className="text-muted-foreground leading-relaxed text-sm">{card.body}</p>
    </div>
  );
}

function FeatureGridRenderer({ data: d }: { data: Record<string, any> }) {
  const isMobile = useIsMobile();
  const [emblaRef] = useEmblaCarousel({ align: "start", containScroll: "trimSnaps" });
  const cards = [
    { icon: iconMap[0], title: d.card1Title, body: d.card1Body },
    { icon: iconMap[1], title: d.card2Title, body: d.card2Body },
    { icon: iconMap[2], title: d.card3Title, body: d.card3Body },
    { icon: iconMap[3], title: d.card4Title, body: d.card4Body },
  ].filter(c => c.title);
  const gridCols = cards.length === 4 ? "md:grid-cols-2 lg:grid-cols-4" : "md:grid-cols-3";
  const useCarousel = d.mobileCarousel && isMobile;

  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gradient">{d.title}</h2>
          {d.subtitle && <p className="text-lg text-muted-foreground">{d.subtitle}</p>}
        </div>
        {useCarousel ? (
          <div className="overflow-hidden -mx-6 px-6" ref={emblaRef}>
            <div className="flex gap-4">
              {cards.map((card, i) => (
                <div key={i} className="flex-[0_0_80%] min-w-0">
                  <FeatureGridCard card={card} i={i} />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className={`grid grid-cols-1 ${gridCols} gap-8 max-w-5xl mx-auto`}>
            {cards.map((card, i) => (
              <FeatureGridCard key={i} card={card} i={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function TestimonialsRenderer({ data: d }: { data: Record<string, any> }) {
  const testimonials = [
    { quote: d.t1Quote, author: d.t1Author, desc: d.t1Desc },
    { quote: d.t2Quote, author: d.t2Author, desc: d.t2Desc },
    { quote: d.t3Quote, author: d.t3Author, desc: d.t3Desc },
  ].filter(t => t.quote);
  const [current, setCurrent] = useState(0);
  if (!testimonials.length) return null;
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);
  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-6">
        {d.title && (
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gradient">{d.title}</h2>
            {d.subtitle && <p className="text-lg text-muted-foreground">{d.subtitle}</p>}
          </div>
        )}
        <div className="max-w-3xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div key={current} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.4 }} className="bg-gradient-card rounded-2xl p-8 sm:p-12 border border-border shadow-card text-center">
              <Quote className="mx-auto mb-6 text-primary opacity-50" size={40} />
              <p className="text-lg sm:text-xl text-foreground/90 leading-relaxed mb-8 italic">"{testimonials[current].quote}"</p>
              <div className="flex items-center justify-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-display font-bold text-sm">
                  {testimonials[current].author?.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="font-display font-semibold text-foreground">{testimonials[current].author}</p>
                  <p className="text-sm text-muted-foreground">{testimonials[current].desc}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
          {testimonials.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button onClick={prev} className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"><ChevronLeft size={20} /></button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setCurrent(i)} className={`w-2 h-2 rounded-full transition-colors ${i === current ? "bg-primary" : "bg-muted"}`} />
                ))}
              </div>
              <button onClick={next} className="p-2 rounded-full border border-border hover:bg-secondary transition-colors"><ChevronRight size={20} /></button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function ScreenshotsRenderer({ data: d }: { data: Record<string, any> }) {
  const images = (d.images || "").split("\n").filter(Boolean).map((url: string) => assetUrl(url.trim()));
  const cols = d.columns || 3;
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ startIndex: 0 });

  const openLightbox = (i: number) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
  };

  useEffect(() => {
    if (lightboxOpen && emblaApi) {
      emblaApi.scrollTo(lightboxIndex, true);
    }
  }, [lightboxOpen, emblaApi, lightboxIndex]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") scrollPrev();
      else if (e.key === "ArrowRight") scrollNext();
      else if (e.key === "Escape") setLightboxOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxOpen, scrollPrev, scrollNext]);

  if (!images.length) return null;

  const gridCols = cols === 2 ? "grid-cols-2" : cols === 4 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2 md:grid-cols-3";

  return (
    <>
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6">
          {d.title && (
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gradient">{d.title}</h2>
              {d.subtitle && <p className="text-lg text-muted-foreground">{d.subtitle}</p>}
            </div>
          )}
          <div className={`grid ${gridCols} gap-4 max-w-5xl mx-auto`}>
            {images.map((src: string, i: number) => (
              <button
                key={i}
                onClick={() => openLightbox(i)}
                className="overflow-hidden rounded-xl border border-border hover:border-primary/30 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <img src={src} alt={`Screenshot ${i + 1}`} className="w-full h-auto object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/95 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full border border-border bg-card hover:bg-secondary transition-colors"
            >
              <X size={20} />
            </button>

            {/* Prev / Next buttons */}
            <button
              onClick={(e) => { e.stopPropagation(); scrollPrev(); }}
              className="absolute left-4 z-10 p-2 rounded-full border border-border bg-card hover:bg-secondary transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); scrollNext(); }}
              className="absolute right-4 z-10 p-2 rounded-full border border-border bg-card hover:bg-secondary transition-colors"
            >
              <ChevronRight size={24} />
            </button>

            <div
              className="w-full max-w-4xl mx-auto px-16"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex">
                  {images.map((src: string, i: number) => (
                    <div key={i} className="flex-[0_0_100%] min-w-0 flex items-center justify-center">
                      <img src={src} alt={`Screenshot ${i + 1}`} className="max-h-[85vh] w-auto max-w-full rounded-xl" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
