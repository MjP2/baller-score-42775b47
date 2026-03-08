import { CmsSection } from "@/lib/cms";
import { assetUrl } from "@/lib/asset-url";
import FeatureBlock from "@/components/landing/FeatureBlock";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Apple, ChevronLeft, ChevronRight, Quote, Smartphone, Target, Volume2, Zap } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useIsMobile } from "@/hooks/use-mobile";

const iconMap = [Smartphone, Target, Volume2, Zap];

export default function SectionRenderer({ section }: { section: CmsSection }) {
  return (
    <div id={section.id}>
      <SectionContent section={section} />
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
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-6 text-center space-y-12">
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

    case "cta":
      return (
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-6">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-gradient">{d.title}</h2>
              {d.subtitle && <p className="text-lg text-muted-foreground">{d.subtitle}</p>}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                {d.appStoreUrl && (
                  <a href={d.appStoreUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                    <img src={`${import.meta.env.BASE_URL}assets/badge-appstore.svg`} alt="Download on the App Store" className="h-[40px] w-auto" />
                  </a>
                )}
                {d.playStoreUrl && (
                  <a href={d.playStoreUrl} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                    <img src={`${import.meta.env.BASE_URL}assets/badge-googleplay.png`} alt="Get it on Google Play" className="h-[60px] w-auto -my-[10px]" />
                  </a>
                )}
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
        </div>
      </motion.div>
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
