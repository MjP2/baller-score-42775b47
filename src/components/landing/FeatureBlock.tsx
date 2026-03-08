import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface FeatureBlockProps {
  id?: string;
  title: string;
  subtitle?: string;
  body: string;
  bullets?: string[];
  image: string;
  imageAlt: string;
  reversed?: boolean;
  badge?: string;
  layout?: "side-by-side" | "stacked";
}

const FeatureBlock = ({ id, title, subtitle, body, bullets, image, imageAlt, reversed = false, badge, layout = "side-by-side" }: FeatureBlockProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!image) return;
    const img = new Image();
    img.src = image;
    if (img.complete) {
      setImageLoaded(true);
    } else {
      img.onload = () => setImageLoaded(true);
    }
  }, [image]);

  if (layout === "stacked") {
    return (
      <section id={id} className="py-20 lg:py-32">
        <div className="container mx-auto px-6">
          {/* Text above */}
          <motion.div
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="space-y-3 max-w-xl">
              {badge && (
                <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                  </span>
                  {badge}
                </span>
              )}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gradient">
                {title}
              </h2>
              {subtitle && (
                <p className="text-lg text-muted-foreground pt-1">{subtitle}</p>
              )}
            </div>
            <div className="max-w-lg space-y-4">
              <p className="text-lg text-muted-foreground leading-relaxed">{body}</p>
              {bullets && bullets.length > 0 && (
                <ul className="space-y-3 pt-2">
                  {bullets.map((bullet, i) => (
                    <li key={i} className="flex items-center gap-3 text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>

          {/* Large image below */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-card glow-purple">
              <img
                src={image}
                alt={imageAlt}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id={id} className="py-20 lg:py-32">
      <div className="container mx-auto px-6">
        <div
          className={`flex flex-col ${
            reversed ? "md:flex-row-reverse" : "md:flex-row"
          } items-center gap-12 md:gap-16 lg:gap-20`}
        >
          {/* Image */}
          <motion.div
            className="flex-1 w-full"
            initial={{ opacity: 0, x: reversed ? 60 : -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-card glow-purple">
              <img
                src={image}
                alt={imageAlt}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            className="flex-1 space-y-5"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            {badge && (
              <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                {badge}
              </span>
            )}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-gradient">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xl text-foreground/80 font-display">{subtitle}</p>
            )}
            <p className="text-lg text-muted-foreground leading-relaxed">{body}</p>
            {bullets && bullets.length > 0 && (
              <ul className="space-y-3 pt-2">
                {bullets.map((bullet, i) => (
                  <li key={i} className="flex items-center gap-3 text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                    {bullet}
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeatureBlock;
