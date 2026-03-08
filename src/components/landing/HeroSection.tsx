import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { t } from "@/lib/i18n";
import { Apple } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import heroVideo from "@/assets/hero-video.mp4";

const HeroSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden">
      {/* Parallax background */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          poster={heroBg}
          className="w-full h-[120%] object-cover object-center"
        >
          <source src={heroVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 container mx-auto px-6 pt-24"
        style={{ opacity }}
      >
        <div className="max-w-2xl space-y-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-display font-bold leading-tight"
          >
            <span className="text-gradient">{t("hero.title")}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-lg leading-relaxed"
          >
            {t("hero.subtitle")}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <a
              href="#"
              className="inline-flex items-center gap-3 bg-foreground text-background px-6 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity"
            >
              <Apple size={22} />
              <div className="text-left">
                <div className="text-[10px] opacity-70 leading-none">Download on the</div>
                <div className="text-sm leading-tight">App Store</div>
              </div>
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-3 bg-foreground text-background px-6 py-3.5 rounded-xl font-semibold hover:opacity-90 transition-opacity"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-1.4l2.834 1.639a1 1 0 0 1 0 1.74l-2.834 1.64-2.532-2.533 2.532-2.486zM5.864 2.658L16.8 9.291l-2.302 2.302-8.634-8.935z" />
              </svg>
              <div className="text-left">
                <div className="text-[10px] opacity-70 leading-none">Get it on</div>
                <div className="text-sm leading-tight">Google Play</div>
              </div>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
